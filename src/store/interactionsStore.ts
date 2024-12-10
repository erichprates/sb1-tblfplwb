import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Interaction } from '../types/supabase';

interface InteractionsState {
  interactions: Interaction;
  isLoading: boolean;
  error: string | null;
  initialize: () => Promise<void>;
  updateLikes: (value: number) => Promise<void>;
  updateShares: (value: number) => Promise<void>;
}

export const useInteractionsStore = create<InteractionsState>((set, get) => ({
  interactions: {
    id: 1,
    likes: 0,
    shares: 0,
    created_at: new Date().toISOString(),
  },
  isLoading: true,
  error: null,

  initialize: async () => {
    try {
      const { data, error } = await supabase
        .from('interactions')
        .select('*')
        .eq('id', 1)
        .single();

      if (error) {
        // Se não encontrar, tenta criar
        const { data: newData, error: insertError } = await supabase
          .from('interactions')
          .insert([{ id: 1, likes: 0, shares: 0 }])
          .select()
          .single();

        if (insertError) {
          set({ error: insertError.message, isLoading: false });
          return;
        }

        set({ interactions: newData, isLoading: false });
        return;
      }

      set({ interactions: data, isLoading: false });
    } catch (error) {
      set({ error: 'Erro ao inicializar interações', isLoading: false });
    }
  },

  updateLikes: async (value: number) => {
    if (value < 0 || get().isLoading) return;

    try {
      const { error } = await supabase
        .from('interactions')
        .update({ likes: value })
        .eq('id', 1);

      if (error) throw error;

      set(state => ({
        interactions: { ...state.interactions, likes: value }
      }));
    } catch (error) {
      set({ error: 'Erro ao atualizar likes' });
    }
  },

  updateShares: async (value: number) => {
    if (value < 0 || get().isLoading) return;

    try {
      const { error } = await supabase
        .from('interactions')
        .update({ shares: value })
        .eq('id', 1);

      if (error) throw error;

      set(state => ({
        interactions: { ...state.interactions, shares: value }
      }));
    } catch (error) {
      set({ error: 'Erro ao atualizar compartilhamentos' });
    }
  },
}));