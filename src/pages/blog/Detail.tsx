
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { CalendarIcon, EyeIcon, User2Icon } from "lucide-react";
import { useSession } from "@/lib/supabase-auth";
import { UserBadge } from "@/components/UserBadge";
import { useBlog, useComments, useCreateComment, BlogComment } from "@/lib/blog";

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const { toast } = useToast();

  // Fetch blog with author details
  const { data: blog, isLoading: isBlogLoading } = useBlog(id);

  // Fetch comments for this blog
  const { data: comments, isLoading: areCommentsLoading } = useComments(id);

  // Add comment mutation
  const createComment = useCreateComment();

  const handleCommentSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!comment.trim()) return;

    createComment.mutate(
      { blogId: id!, content: comment },
      {
        onSuccess: () => {
          setComment("");
          toast({
            title: "Comment added",
            description: "Your comment has been added successfully",
            duration: 3000,
          });
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: error instanceof Error ? error.message : "Failed to add comment",
            variant: "destructive",
            duration: 3000,
          });
        },
      }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit();
    }
  };

  if (isBlogLoading) {
    return (
      <div className="container mx-auto max-w-4xl py-8 px-4">
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto max-w-4xl py-8 px-4 text-center">
        <h1 className="text-2xl font-bold">Blog post not found</h1>
        <p className="mt-4">The blog post you're looking for doesn't exist or has been removed.</p>
        <Button asChild className="mt-6">
          <Link to="/blog">Back to blogs</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 mb-6">
          ← Back to blogs
        </Link>

        <article className="space-y-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">{blog.title}</h1>
            <div className="flex items-center gap-4 mt-4 flex-wrap">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarIcon className="h-4 w-4" />
                {format(new Date(blog.created_at), 'MMM d, yyyy')}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <EyeIcon className="h-4 w-4" />
                {blog.views} views
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to={`/profile/${blog.author_id}`}>
              <Avatar className="h-10 w-10">
                <AvatarImage src={blog.author?.avatar_url || ""} />
                <AvatarFallback>
                  <User2Icon className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </Link>
            <div className="flex flex-col">
              <Link to={`/profile/${blog.author_id}`} className="text-sm font-medium hover:underline">
                {blog.author?.username || "Unknown"}
              </Link>
              <UserBadge role={blog.author?.role} isPremium={blog.author?.is_premium} />
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="whitespace-pre-wrap">{blog.content}</p>
          </div>
        </article>

        <div className="mt-16 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">Comments</h2>
          
          {session ? (
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <Textarea
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={handleKeyDown}
                className="min-h-24 resize-none mb-2"
              />
              <Button 
                type="submit" 
                disabled={createComment.isPending}
                className="float-right"
              >
                Post Comment
              </Button>
            </form>
          ) : (
            <Card className="mb-8">
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  You need to be logged in to comment.
                </p>
                <div className="flex justify-center mt-4">
                  <Button asChild>
                    <Link to="/auth">Sign In</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4 mt-8 clear-both">
            {areCommentsLoading ? (
              <div className="space-y-4">
                <div className="h-24 bg-gray-200 rounded"></div>
                <div className="h-24 bg-gray-200 rounded"></div>
              </div>
            ) : comments?.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No comments yet. Be the first to comment!
              </p>
            ) : (
              comments?.map((comment: BlogComment) => (
                <Card key={comment.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <Link to={`/profile/${comment.user_id}`}>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={comment.author?.avatar_url || ""} />
                          <AvatarFallback>
                            <User2Icon className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      </Link>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <Link to={`/profile/${comment.user_id}`} className="text-sm font-medium hover:underline">
                            {comment.author?.username || "Unknown"}
                          </Link>
                          <UserBadge role={comment.author?.role} isPremium={comment.author?.is_premium} />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(comment.created_at), 'MMM d, yyyy • HH:mm')}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap text-sm">{comment.content}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
