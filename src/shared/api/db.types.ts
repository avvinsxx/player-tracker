﻿export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      accounts: {
        Row: {
          created_at: string;
          external_id: string;
          favourite_champ: string | null;
          game: "lol" | "dota2";
          id: number;
          leaderboard: number | null;
          level: number | null;
          mmr: number | null;
          name: string;
          platform: string | null;
          player_id: number | null;
          rank: string | null;
          refreshed_at: string | null;
          tier: string | null;
          win_rate: number | null;
          win_rate_games: number | null;
        };
        Insert: {
          created_at?: string;
          external_id: string;
          favourite_champ?: string | null;
          game: "lol" | "dota2";
          id?: number;
          leaderboard?: number | null;
          level?: number | null;
          mmr?: number | null;
          name: string;
          platform?: string | null;
          player_id?: number | null;
          rank?: string | null;
          refreshed_at?: string | null;
          tier?: string | null;
          win_rate?: number | null;
          win_rate_games?: number | null;
        };
        Update: {
          created_at?: string;
          external_id?: string;
          favourite_champ?: string | null;
          game?: "lol" | "dota2";
          id?: number;
          leaderboard?: number | null;
          level?: number | null;
          mmr?: number | null;
          name?: string;
          platform?: string | null;
          player_id?: number | null;
          rank?: string | null;
          refreshed_at?: string | null;
          tier?: string | null;
          win_rate?: number | null;
          win_rate_games?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "accounts_player_id_fkey";
            columns: ["player_id"];
            isOneToOne: false;
            referencedRelation: "players";
            referencedColumns: ["id"];
          },
        ];
      };
      players: {
        Row: {
          birthdate: string | null;
          created_at: string;
          id: number;
          main_game: "lol" | "dota2" | null;
          nickname: string;
          role: string | null;
        };
        Insert: {
          birthdate?: string | null;
          created_at?: string;
          id?: number;
          main_game?: "lol" | "dota2" | null;
          nickname: string;
          role?: string | null;
        };
        Update: {
          birthdate?: string | null;
          created_at?: string;
          id?: number;
          main_game?: "lol" | "dota2" | null;
          nickname?: string;
          role?: string | null;
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
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

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
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

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
    : never;
