export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      interactions: {
        Row: {
          id: number
          created_at: string
          likes: number
          shares: number
        }
        Insert: {
          id?: number
          created_at?: string
          likes?: number
          shares?: number
        }
        Update: {
          id?: number
          created_at?: string
          likes?: number
          shares?: number
        }
      }
    }
  }
}