-- Insert initial bot settings
INSERT INTO bot_settings (
  id,
  bot_name,
  welcome_message,
  chat_settings,
  number_of_quick_actions
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  'AI Assistant',
  'Hello! How can I help you today?',
  '{
    "maxMessagesPerChat": 50,
    "responseDelay": 0,
    "aiPersonality": "Friendly and helpful AI assistant",
    "fallbackMessage": "I apologize, but I don''t have enough information to answer that question. Could you please rephrase or ask something else?",
    "reasoningLevel": "advanced",
    "emotionalIntelligence": true,
    "contextMemory": {
      "enabled": true,
      "messageHistory": 10
    },
    "multimodalSupport": {
      "images": false,
      "voice": false,
      "video": false
    },
    "voiceSettings": {
      "enabled": false,
      "language": "en-US",
      "voice": "natural"
    }
  }',
  4
);

-- Insert initial quick actions
INSERT INTO quick_actions (text, action, order_index) VALUES
  ('How can I help?', 'help', 1),
  ('Tell me more', 'more_info', 2),
  ('Features', 'features', 3),
  ('Contact support', 'support', 4);

-- Insert initial subscription tiers
INSERT INTO subscription_tiers (
  id,
  name,
  price,
  words_limit,
  pages_limit,
  storage_days,
  features
) VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    'free',
    0,
    100000,
    50,
    30,
    '{"api_access": false, "priority_support": false, "custom_training": false}'
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'pro',
    25,
    1000000,
    500,
    90,
    '{"api_access": true, "priority_support": true, "custom_training": true}'
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'enterprise',
    100,
    5000000,
    2000,
    365,
    '{"api_access": true, "priority_support": true, "custom_training": true, "custom_models": true}'
  );