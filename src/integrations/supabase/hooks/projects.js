import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/*
### Projects

| name        | type                     | format    | required |
|-------------|--------------------------|-----------|----------|
| id          | integer                  | bigint    | true     |
| name        | string                   | text      | false    |
| description | string                   | text      | false    |
| start_date  | string                   | date      | false    |
| end_date    | string                   | date      | false    |
| created_at  | string                   | timestamp | true     |
| updated_at  | string                   | timestamp | false    |

Note: id is the Primary Key.
*/

export const useProjects = () => useQuery({
    queryKey: ['projects'],
    queryFn: () => fromSupabase(supabase.from('Projects').select('*')),
});

export const useProject = (id) => useQuery({
    queryKey: ['projects', id],
    queryFn: () => fromSupabase(supabase.from('Projects').select('*').eq('id', id).single()),
});

export const useAddProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newProject) => fromSupabase(supabase.from('Projects').insert([newProject])),
        onSuccess: () => {
            queryClient.invalidateQueries('projects');
        },
    });
};

export const useUpdateProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('Projects').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('projects');
        },
    });
};

export const useDeleteProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('Projects').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('projects');
        },
    });
};