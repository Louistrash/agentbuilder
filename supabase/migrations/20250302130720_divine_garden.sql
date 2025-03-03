-- Add RLS policies for chat_analytics
CREATE POLICY "Allow admins to manage chat analytics"
  ON chat_analytics
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND is_admin = true
    )
  );

-- Add RLS policies for organization_usage
CREATE POLICY "Users can view their organization usage"
  ON organization_usage FOR SELECT
  TO authenticated
  USING (profile_id = auth.uid());

CREATE POLICY "Users can update their organization usage"
  ON organization_usage FOR UPDATE
  TO authenticated
  USING (profile_id = auth.uid());

CREATE POLICY "Users can insert their organization usage"
  ON organization_usage FOR INSERT
  TO authenticated
  WITH CHECK (profile_id = auth.uid());

-- Insert initial analytics data for today
INSERT INTO chat_analytics (
  date,
  total_sessions,
  total_messages,
  active_users,
  avg_response_time_ms,
  avg_session_duration_sec,
  engagement_rate
) VALUES (
  CURRENT_DATE,
  0,
  0,
  0,
  0,
  0,
  0
) ON CONFLICT (date) DO NOTHING;

-- Function to update daily analytics
CREATE OR REPLACE FUNCTION update_daily_analytics()
RETURNS void AS $$
BEGIN
  -- Insert or update today's analytics
  INSERT INTO chat_analytics (
    date,
    total_sessions,
    total_messages,
    active_users,
    avg_response_time_ms,
    avg_session_duration_sec,
    engagement_rate
  ) VALUES (
    CURRENT_DATE,
    (SELECT COUNT(*) FROM chat_sessions WHERE DATE(created_at) = CURRENT_DATE),
    (SELECT COUNT(*) FROM chat_messages WHERE DATE(created_at) = CURRENT_DATE),
    (SELECT COUNT(DISTINCT visitor_id) FROM chat_sessions WHERE DATE(created_at) = CURRENT_DATE),
    COALESCE((SELECT AVG(response_time_ms) FROM chat_messages WHERE DATE(created_at) = CURRENT_DATE), 0),
    COALESCE((
      SELECT AVG(EXTRACT(EPOCH FROM (ended_at - started_at)))
      FROM chat_sessions 
      WHERE DATE(created_at) = CURRENT_DATE 
      AND ended_at IS NOT NULL
    ), 0),
    COALESCE((
      SELECT CAST(COUNT(DISTINCT session_id) AS FLOAT) / NULLIF(COUNT(DISTINCT visitor_id), 0) * 100
      FROM chat_messages m
      JOIN chat_sessions s ON m.session_id = s.id
      WHERE DATE(m.created_at) = CURRENT_DATE
    ), 0)
  )
  ON CONFLICT (date) 
  DO UPDATE SET
    total_sessions = EXCLUDED.total_sessions,
    total_messages = EXCLUDED.total_messages,
    active_users = EXCLUDED.active_users,
    avg_response_time_ms = EXCLUDED.avg_response_time_ms,
    avg_session_duration_sec = EXCLUDED.avg_session_duration_sec,
    engagement_rate = EXCLUDED.engagement_rate,
    updated_at = now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to update analytics every hour
CREATE OR REPLACE FUNCTION trigger_update_analytics()
RETURNS trigger AS $$
BEGIN
  PERFORM update_daily_analytics();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_analytics_on_message
AFTER INSERT ON chat_messages
FOR EACH STATEMENT
EXECUTE FUNCTION trigger_update_analytics();

CREATE TRIGGER update_analytics_on_session
AFTER INSERT OR UPDATE ON chat_sessions
FOR EACH STATEMENT
EXECUTE FUNCTION trigger_update_analytics();