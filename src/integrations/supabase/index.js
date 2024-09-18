// Import all the relevant exports from other files in the supabase directory
import { supabase } from './supabase.js';
import { SupabaseAuthProvider, useSupabaseAuth, SupabaseAuthUI } from './auth.jsx';
import {
  useProjects,
  useProject,
  useAddProject,
  useUpdateProject,
  useDeleteProject
} from './hooks/projects.js';
import {
  useTasks,
  useTask,
  useAddTask,
  useUpdateTask,
  useDeleteTask
} from './hooks/tasks.js';

// Export all the imported functions and objects
export {
  supabase,
  SupabaseAuthProvider,
  useSupabaseAuth,
  SupabaseAuthUI,
  useProjects,
  useProject,
  useAddProject,
  useUpdateProject,
  useDeleteProject,
  useTasks,
  useTask,
  useAddTask,
  useUpdateTask,
  useDeleteTask
};
