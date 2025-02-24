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
          updated_at: string
          welcome_message: string
        }
        Insert: {
          bot_name?: string
          chat_settings?: Json | null
          created_at?: string
          id?: string
          logo_url?: string | null
          updated_at?: string
          welcome_message?: string
        }
        Update: {
          bot_name?: string
          chat_settings?: Json | null
          created_at?: string
          id?: string
          logo_url?: string | null
          updated_at?: string
          welcome_message?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          is_admin: boolean | null
          sleep_preferences: Json | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id: string
          is_admin?: boolean | null
          sleep_preferences?: Json | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          is_admin?: boolean | null
          sleep_preferences?: Json | null
          updated_at?: string
        }
        Relationships: []
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
