export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activity_logs: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          id: string
          ip_address: string | null
          resource_id: string | null
          resource_type: string
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: string | null
          resource_id?: string | null
          resource_type: string
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: string | null
          resource_id?: string | null
          resource_type?: string
          user_id?: string
        }
        Relationships: []
      }
      agent_availability: {
        Row: {
          agent_id: string
          available_days: number[] | null
          created_at: string
          id: string
          time_slots: Json | null
          updated_at: string
        }
        Insert: {
          agent_id: string
          available_days?: number[] | null
          created_at?: string
          id?: string
          time_slots?: Json | null
          updated_at?: string
        }
        Update: {
          agent_id?: string
          available_days?: number[] | null
          created_at?: string
          id?: string
          time_slots?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_availability_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      agents: {
        Row: {
          bio: string | null
          created_at: string
          email: string
          id: string
          is_active: boolean | null
          name: string
          profile_image_url: string | null
          updated_at: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          email: string
          id?: string
          is_active?: boolean | null
          name: string
          profile_image_url?: string | null
          updated_at?: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          email?: string
          id?: string
          is_active?: boolean | null
          name?: string
          profile_image_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      appointment_settings: {
        Row: {
          appointment_duration: number | null
          available_days: number[] | null
          break_between_appointments: number | null
          created_at: string
          id: string
          max_advance_days: number | null
          max_appointments_per_day: number | null
          min_notice_hours: number | null
          time_slots: Json | null
          updated_at: string
        }
        Insert: {
          appointment_duration?: number | null
          available_days?: number[] | null
          break_between_appointments?: number | null
          created_at?: string
          id?: string
          max_advance_days?: number | null
          max_appointments_per_day?: number | null
          min_notice_hours?: number | null
          time_slots?: Json | null
          updated_at?: string
        }
        Update: {
          appointment_duration?: number | null
          available_days?: number[] | null
          break_between_appointments?: number | null
          created_at?: string
          id?: string
          max_advance_days?: number | null
          max_appointments_per_day?: number | null
          min_notice_hours?: number | null
          time_slots?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      appointments: {
        Row: {
          agent_id: string | null
          appointment_date: string
          created_at: string
          customer_email: string
          customer_name: string
          customer_phone: string | null
          end_time: string
          id: string
          notes: string | null
          profile_id: string | null
          start_time: string
          status: string | null
          updated_at: string
        }
        Insert: {
          agent_id?: string | null
          appointment_date: string
          created_at?: string
          customer_email: string
          customer_name: string
          customer_phone?: string | null
          end_time: string
          id?: string
          notes?: string | null
          profile_id?: string | null
          start_time: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          agent_id?: string | null
          appointment_date?: string
          created_at?: string
          customer_email?: string
          customer_name?: string
          customer_phone?: string | null
          end_time?: string
          id?: string
          notes?: string | null
          profile_id?: string | null
          start_time?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      bot_settings: {
        Row: {
          bot_name: string
          chat_settings: Json | null
          created_at: string
          id: string
          logo_url: string | null
          number_of_quick_actions: number | null
          updated_at: string
          welcome_message: string
        }
        Insert: {
          bot_name?: string
          chat_settings?: Json | null
          created_at?: string
          id?: string
          logo_url?: string | null
          number_of_quick_actions?: number | null
          updated_at?: string
          welcome_message?: string
        }
        Update: {
          bot_name?: string
          chat_settings?: Json | null
          created_at?: string
          id?: string
          logo_url?: string | null
          number_of_quick_actions?: number | null
          updated_at?: string
          welcome_message?: string
        }
        Relationships: []
      }
      chat_agents: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          system_prompt: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          system_prompt: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          system_prompt?: string
          updated_at?: string
        }
        Relationships: []
      }
      chat_analytics: {
        Row: {
          active_users: number | null
          avg_response_time_ms: number | null
          avg_session_duration_sec: number | null
          created_at: string
          date: string
          engagement_rate: number | null
          id: string
          total_messages: number | null
          total_sessions: number | null
          updated_at: string
        }
        Insert: {
          active_users?: number | null
          avg_response_time_ms?: number | null
          avg_session_duration_sec?: number | null
          created_at?: string
          date: string
          engagement_rate?: number | null
          id?: string
          total_messages?: number | null
          total_sessions?: number | null
          updated_at?: string
        }
        Update: {
          active_users?: number | null
          avg_response_time_ms?: number | null
          avg_session_duration_sec?: number | null
          created_at?: string
          date?: string
          engagement_rate?: number | null
          id?: string
          total_messages?: number | null
          total_sessions?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          message_type: string
          response_time_ms: number | null
          sent_at: string
          session_id: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          message_type: string
          response_time_ms?: number | null
          sent_at?: string
          session_id: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          message_type?: string
          response_time_ms?: number | null
          sent_at?: string
          session_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_queries: {
        Row: {
          avg_response_time_ms: number | null
          created_at: string
          frequency: number | null
          id: string
          last_asked_at: string
          query_text: string
          updated_at: string
        }
        Insert: {
          avg_response_time_ms?: number | null
          created_at?: string
          frequency?: number | null
          id?: string
          last_asked_at?: string
          query_text: string
          updated_at?: string
        }
        Update: {
          avg_response_time_ms?: number | null
          created_at?: string
          frequency?: number | null
          id?: string
          last_asked_at?: string
          query_text?: string
          updated_at?: string
        }
        Relationships: []
      }
      chat_sessions: {
        Row: {
          created_at: string
          device_type: string | null
          ended_at: string | null
          id: string
          platform: string | null
          started_at: string
          updated_at: string
          visitor_id: string
        }
        Insert: {
          created_at?: string
          device_type?: string | null
          ended_at?: string | null
          id?: string
          platform?: string | null
          started_at?: string
          updated_at?: string
          visitor_id: string
        }
        Update: {
          created_at?: string
          device_type?: string | null
          ended_at?: string | null
          id?: string
          platform?: string | null
          started_at?: string
          updated_at?: string
          visitor_id?: string
        }
        Relationships: []
      }
      integration_settings: {
        Row: {
          api_token: string | null
          created_at: string
          id: string
          is_active: boolean | null
          platform: string
          settings: Json | null
          updated_at: string
        }
        Insert: {
          api_token?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          platform: string
          settings?: Json | null
          updated_at?: string
        }
        Update: {
          api_token?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          platform?: string
          settings?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      marketplace_features: {
        Row: {
          category: string
          created_at: string | null
          description: string
          id: string
          name: string
          price: number
          status: string | null
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description: string
          id?: string
          name: string
          price: number
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string
          id?: string
          name?: string
          price?: number
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      marketplace_transactions: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          status: string | null
          stripe_session_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          status?: string | null
          stripe_session_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          status?: string | null
          stripe_session_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      organization_usage: {
        Row: {
          created_at: string
          id: string
          profile_id: string | null
          total_words_used: number | null
          updated_at: string
          words_limit: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          profile_id?: string | null
          total_words_used?: number | null
          updated_at?: string
          words_limit?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          profile_id?: string | null
          total_words_used?: number | null
          updated_at?: string
          words_limit?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "organization_usage_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          is_admin: boolean | null
          sleep_preferences: Json | null
          tokens: number | null
          tokens_used: number | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          is_admin?: boolean | null
          sleep_preferences?: Json | null
          tokens?: number | null
          tokens_used?: number | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          is_admin?: boolean | null
          sleep_preferences?: Json | null
          tokens?: number | null
          tokens_used?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      purchased_features: {
        Row: {
          activated_at: string | null
          created_at: string | null
          expires_at: string | null
          feature_id: string
          id: string
          purchased_at: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          activated_at?: string | null
          created_at?: string | null
          expires_at?: string | null
          feature_id: string
          id?: string
          purchased_at?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          activated_at?: string | null
          created_at?: string | null
          expires_at?: string | null
          feature_id?: string
          id?: string
          purchased_at?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchased_features_feature_id_fkey"
            columns: ["feature_id"]
            isOneToOne: false
            referencedRelation: "marketplace_features"
            referencedColumns: ["id"]
          },
        ]
      }
      quick_actions: {
        Row: {
          action: string
          created_at: string
          id: string
          order_index: number
          text: string
          updated_at: string
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          order_index: number
          text: string
          updated_at?: string
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          order_index?: number
          text?: string
          updated_at?: string
        }
        Relationships: []
      }
      subscription_invoices: {
        Row: {
          amount_due: number
          created_at: string | null
          id: string
          messages_count: number
          status: string
          stripe_invoice_id: string | null
          subscription_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount_due: number
          created_at?: string | null
          id?: string
          messages_count: number
          status?: string
          stripe_invoice_id?: string | null
          subscription_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount_due?: number
          created_at?: string | null
          id?: string
          messages_count?: number
          status?: string
          stripe_invoice_id?: string | null
          subscription_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscription_invoices_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_tiers: {
        Row: {
          created_at: string
          features: Json
          id: string
          name: Database["public"]["Enums"]["tier_type"]
          pages_limit: number
          price: number
          storage_days: number
          updated_at: string
          words_limit: number
        }
        Insert: {
          created_at?: string
          features?: Json
          id?: string
          name: Database["public"]["Enums"]["tier_type"]
          pages_limit: number
          price: number
          storage_days: number
          updated_at?: string
          words_limit: number
        }
        Update: {
          created_at?: string
          features?: Json
          id?: string
          name?: Database["public"]["Enums"]["tier_type"]
          pages_limit?: number
          price?: number
          storage_days?: number
          updated_at?: string
          words_limit?: number
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string
          is_using_own_api: boolean | null
          level: Database["public"]["Enums"]["subscription_level"]
          messages_limit: number | null
          messages_used: number | null
          openai_api_key: string | null
          profile_id: string | null
          storage_expires_at: string | null
          stripe_subscription_id: string | null
          tier_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          is_using_own_api?: boolean | null
          level: Database["public"]["Enums"]["subscription_level"]
          messages_limit?: number | null
          messages_used?: number | null
          openai_api_key?: string | null
          profile_id?: string | null
          storage_expires_at?: string | null
          stripe_subscription_id?: string | null
          tier_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          is_using_own_api?: boolean | null
          level?: Database["public"]["Enums"]["subscription_level"]
          messages_limit?: number | null
          messages_used?: number | null
          openai_api_key?: string | null
          profile_id?: string | null
          storage_expires_at?: string | null
          stripe_subscription_id?: string | null
          tier_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_tier_id_fkey"
            columns: ["tier_id"]
            isOneToOne: false
            referencedRelation: "subscription_tiers"
            referencedColumns: ["id"]
          },
        ]
      }
      token_transactions: {
        Row: {
          amount: number
          created_at: string
          description: string
          feature_used: string | null
          id: string
          profile_id: string
          transaction_type: string
        }
        Insert: {
          amount: number
          created_at?: string
          description: string
          feature_used?: string | null
          id?: string
          profile_id: string
          transaction_type: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string
          feature_used?: string | null
          id?: string
          profile_id?: string
          transaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "token_transactions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      training_files: {
        Row: {
          content_type: string
          created_at: string
          file_path: string
          filename: string
          id: string
          processed: boolean | null
          profile_id: string
          size: number
        }
        Insert: {
          content_type: string
          created_at?: string
          file_path: string
          filename: string
          id?: string
          processed?: boolean | null
          profile_id: string
          size: number
        }
        Update: {
          content_type?: string
          created_at?: string
          file_path?: string
          filename?: string
          id?: string
          processed?: boolean | null
          profile_id?: string
          size?: number
        }
        Relationships: [
          {
            foreignKeyName: "training_files_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["role_type"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["role_type"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["role_type"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      website_training_sources: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          processed: boolean | null
          profile_id: string | null
          retention_expires_at: string | null
          status: string | null
          storage_size: number | null
          updated_at: string
          url: string
          word_count: number | null
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          processed?: boolean | null
          profile_id?: string | null
          retention_expires_at?: string | null
          status?: string | null
          storage_size?: number | null
          updated_at?: string
          url: string
          word_count?: number | null
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          processed?: boolean | null
          profile_id?: string | null
          retention_expires_at?: string | null
          status?: string | null
          storage_size?: number | null
          updated_at?: string
          url?: string
          word_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "website_training_sources_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      grant_tokens: {
        Args: {
          user_id: string
          amount: number
        }
        Returns: undefined
      }
      handle_data_retention: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      has_role: {
        Args: {
          user_id: string
          role: Database["public"]["Enums"]["role_type"]
        }
        Returns: boolean
      }
      is_admin: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
      log_admin_activity: {
        Args: {
          action: string
          resource_type: string
          resource_id?: string
          details?: Json
        }
        Returns: undefined
      }
      update_daily_analytics: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      upsert_chat_query: {
        Args: {
          p_query_text: string
          p_response_time: number
        }
        Returns: undefined
      }
    }
    Enums: {
      role_type: "admin" | "moderator" | "user"
      subscription_level: "basic" | "enhanced"
      tier_type: "free" | "pro" | "enterprise"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
