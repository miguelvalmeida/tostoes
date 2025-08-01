export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)";
  };
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      assets_and_liabilities: {
        Row: {
          created_at: string;
          id: number;
          name: string;
          type: Database["public"]["Enums"]["balance-type"];
          updated_at: string | null;
          user_id: string;
          value: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name: string;
          type: Database["public"]["Enums"]["balance-type"];
          updated_at?: string | null;
          user_id: string;
          value: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string;
          type?: Database["public"]["Enums"]["balance-type"];
          updated_at?: string | null;
          user_id?: string;
          value?: number;
        };
        Relationships: [];
      };
      expenses: {
        Row: {
          amount: number;
          created_at: string;
          date: string | null;
          id: number;
          name: string;
          recurrence: Database["public"]["Enums"]["expense-recurrence"];
          status: Database["public"]["Enums"]["expense-status"];
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          amount: number;
          created_at?: string;
          date?: string | null;
          id?: number;
          name: string;
          recurrence: Database["public"]["Enums"]["expense-recurrence"];
          status: Database["public"]["Enums"]["expense-status"];
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          amount?: number;
          created_at?: string;
          date?: string | null;
          id?: number;
          name?: string;
          recurrence?: Database["public"]["Enums"]["expense-recurrence"];
          status?: Database["public"]["Enums"]["expense-status"];
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      income: {
        Row: {
          amount: number;
          category: Database["public"]["Enums"]["income-categories"];
          created_at: string;
          date: string;
          id: number;
          name: string;
          status: Database["public"]["Enums"]["income-status"];
          type: Database["public"]["Enums"]["income-type"];
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          amount: number;
          category: Database["public"]["Enums"]["income-categories"];
          created_at?: string;
          date: string;
          id?: number;
          name: string;
          status: Database["public"]["Enums"]["income-status"];
          type: Database["public"]["Enums"]["income-type"];
          updated_at?: string | null;
          user_id?: string;
        };
        Update: {
          amount?: number;
          category?: Database["public"]["Enums"]["income-categories"];
          created_at?: string;
          date?: string;
          id?: number;
          name?: string;
          status?: Database["public"]["Enums"]["income-status"];
          type?: Database["public"]["Enums"]["income-type"];
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      "balance-type": "asset" | "liability";
      "expense-recurrence": "one-time" | "monthly" | "annual";
      "expense-status":
        | "pending"
        | "paid"
        | "cancelled"
        | "inactive"
        | "active";
      "income-categories":
        | "salary"
        | "freelance"
        | "bonus"
        | "investment"
        | "gift"
        | "rental"
        | "sale"
        | "grant"
        | "other";
      "income-status": "received" | "pending";
      "income-type": "one-time" | "recurring";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      "balance-type": ["asset", "liability"],
      "expense-recurrence": ["one-time", "monthly", "annual"],
      "expense-status": ["pending", "paid", "cancelled", "inactive", "active"],
      "income-categories": [
        "salary",
        "freelance",
        "bonus",
        "investment",
        "gift",
        "rental",
        "sale",
        "grant",
        "other",
      ],
      "income-status": ["received", "pending"],
      "income-type": ["one-time", "recurring"],
    },
  },
} as const;
