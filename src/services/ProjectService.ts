
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  is_active: boolean | null;
}

export class ProjectService {
  static async fetchProjects(userId: string, sortOrder: 'asc' | 'desc' = 'desc'): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: sortOrder === 'asc' });
    
    if (error) throw error;
    return data || [];
  }

  static async createProject(userId: string, name: string, description: string): Promise<Project> {
    const { data, error } = await supabase
      .from('projects')
      .insert([
        {
          name,
          profile_id: userId,
          description,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateProject(projectId: string, name: string, description: string): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .update({
        name,
        description,
      })
      .eq('id', projectId);

    if (error) throw error;
  }

  static async deleteProject(projectId: string): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId);

    if (error) throw error;
  }
}
