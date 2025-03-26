import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface Summary {
  id: string;
  user_id: string;
  title: string;
  original_text: string;
  summary: string | null;
  highlights: string[];
  created_at: string;
  updated_at: string;
}

interface SummariesState {
  summaries: Summary[];
  loading: boolean;
  error: string | null;
  fetchSummaries: () => Promise<void>;
  createSummary: (title: string, text: string) => Promise<Summary>;
  updateSummary: (id: string, updates: Partial<Summary>) => Promise<void>;
  deleteSummary: (id: string) => Promise<void>;
}

export const useSummariesStore = create<SummariesState>((set, get) => ({
  summaries: [],
  loading: false,
  error: null,

  fetchSummaries: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('summaries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ summaries: data as Summary[] });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  createSummary: async (title: string, text: string) => {
    set({ loading: true, error: null });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User must be authenticated to create a summary');
      }

      const { data, error } = await supabase
        .from('summaries')
        .insert([
          {
            title,
            original_text: text,
            highlights: [],
            user_id: user.id, // Add the user_id to satisfy RLS policy
          },
        ])
        .select()
        .single();

      if (error) throw error;
      
      const newSummary = data as Summary;
      set(state => ({
        summaries: [newSummary, ...state.summaries],
      }));
      
      return newSummary;
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateSummary: async (id: string, updates: Partial<Summary>) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('summaries')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      set(state => ({
        summaries: state.summaries.map(summary =>
          summary.id === id ? { ...summary, ...updates } : summary
        ),
      }));
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  deleteSummary: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('summaries')
        .delete()
        .eq('id', id);

      if (error) throw error;

      set(state => ({
        summaries: state.summaries.filter(summary => summary.id !== id),
      }));
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));