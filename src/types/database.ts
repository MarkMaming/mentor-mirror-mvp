export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      mentor_followups: {
        Row: {
          answer: string;
          created_at: string;
          id: string;
          mentor_name: string;
          mentor_reply_id: string;
          question: string;
          reflection_id: string;
          user_id: string;
        };
        Insert: {
          answer: string;
          created_at?: string;
          id?: string;
          mentor_name: string;
          mentor_reply_id: string;
          question: string;
          reflection_id: string;
          user_id: string;
        };
        Update: {
          answer?: string;
          created_at?: string;
          id?: string;
          mentor_name?: string;
          mentor_reply_id?: string;
          question?: string;
          reflection_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "mentor_followups_mentor_reply_id_fkey";
            columns: ["mentor_reply_id"];
            isOneToOne: false;
            referencedRelation: "mentor_replies";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "mentor_followups_reflection_id_fkey";
            columns: ["reflection_id"];
            isOneToOne: false;
            referencedRelation: "reflections";
            referencedColumns: ["id"];
          },
        ];
      };
      mentor_profiles: {
        Row: {
          caution_note: string;
          communication_style: string;
          created_at: string;
          distilled_at: string;
          distilled_summary: string;
          focus_areas: string[];
          id: string;
          mentor_name: string;
          perspective_prompt: string;
          signature_questions: string[];
          status: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          caution_note: string;
          communication_style: string;
          created_at?: string;
          distilled_at?: string;
          distilled_summary: string;
          focus_areas?: string[];
          id?: string;
          mentor_name: string;
          perspective_prompt: string;
          signature_questions?: string[];
          status?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          caution_note?: string;
          communication_style?: string;
          created_at?: string;
          distilled_at?: string;
          distilled_summary?: string;
          focus_areas?: string[];
          id?: string;
          mentor_name?: string;
          perspective_prompt?: string;
          signature_questions?: string[];
          status?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      mentor_replies: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          mentor_name: string;
          reflection_id: string;
          style_note: string | null;
          user_id: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: string;
          mentor_name: string;
          reflection_id: string;
          style_note?: string | null;
          user_id: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          mentor_name?: string;
          reflection_id?: string;
          style_note?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "mentor_replies_reflection_id_fkey";
            columns: ["reflection_id"];
            isOneToOne: false;
            referencedRelation: "reflections";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "mentor_followups_mentor_reply_id_fkey";
            columns: ["id"];
            isOneToOne: false;
            referencedRelation: "mentor_followups";
            referencedColumns: ["mentor_reply_id"];
          },
        ];
      };
      mentor_selections: {
        Row: {
          created_at: string;
          id: string;
          mentor_names: string[];
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          mentor_names: string[];
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          mentor_names?: string[];
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          created_at: string;
          display_name: string | null;
          id: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          display_name?: string | null;
          id: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          display_name?: string | null;
          id?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      reflections: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          source_metadata: Json | null;
          source_type: string | null;
          summary: string | null;
          user_id: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: string;
          source_metadata?: Json | null;
          source_type?: string | null;
          summary?: string | null;
          user_id: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          source_metadata?: Json | null;
          source_type?: string | null;
          summary?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
