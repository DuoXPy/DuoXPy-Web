
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export type Blog = {
  id: string;
  created_at: string;
  title: string;
  content: string;
  author_id: string;
  author?: {
    username: string;
    avatar_url: string | null;
    role: "admin" | "user";
    is_premium: boolean;
  };
};

export type BlogComment = {
  id: string;
  content: string;
  blog_id: string;
  user_id: string;
  created_at: string;
  author: {
    username: string;
    avatar_url: string | null;
    role: "admin" | "user";
    is_premium: boolean;
  };
};

export function useBlogs() {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select(`
          *,
          author:author_id(username, avatar_url, role, is_premium)
        `)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Blog[];
    },
  });
}

export function useBlog(id: string | undefined) {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("blogs")
        .select(`
          *,
          author:author_id(username, avatar_url, role, is_premium)
        `)
        .eq("id", id)
        .single();
      if (error) throw error;
      return data as Blog;
    },
    enabled: !!id,
  });
}

export function useCreateBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ title, content }: { title: string; content: string }) => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData?.session) throw new Error("Not authenticated");
      const { error } = await supabase
        .from("blogs")
        .insert({ title, content, author_id: sessionData.session.user.id });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
}

export function useUpdateBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, title, content }: { id: string; title: string; content: string }) => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData?.session) throw new Error("Not authenticated");
      const { error } = await supabase
        .from("blogs")
        .update({ title, content })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
}

export function useDeleteBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData?.session) throw new Error("Not authenticated");
      const { error } = await supabase
        .from("blogs")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
}

export function useUserRole() {
  return useQuery({
    queryKey: ["userRole"],
    queryFn: async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData?.session) return null;

      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", sessionData.session.user.id)
        .single();

      if (error) throw error;
      return data?.role as "admin" | "user";
    },
  });
}

export function useComments(blogId: string | undefined) {
  return useQuery({
    queryKey: ["comments", blogId],
    queryFn: async () => {
      if (!blogId) return [];
      
      const { data, error } = await supabase
        .from("blog_comments")
        .select(`
          *,
          author:user_id(username, avatar_url, role, is_premium)
        `)
        .eq("blog_id", blogId)
        .order("created_at", { ascending: false });
        
      if (error) throw error;
      
      return data as unknown as BlogComment[];
    },
    enabled: !!blogId,
  });
}

export function useCreateComment() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      blogId, 
      content 
    }: { 
      blogId: string; 
      content: string;
    }) => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData?.session) throw new Error("Not authenticated");
      
      const { error } = await supabase
        .from("blog_comments")
        .insert({
          blog_id: blogId,
          user_id: sessionData.session.user.id,
          content
        });
        
      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["comments", variables.blogId] });
    },
  });
}
