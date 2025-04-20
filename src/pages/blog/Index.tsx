
import { useNavigate, Link } from "react-router-dom";
import { useSession } from "@/lib/supabase-auth";
import { useBlogs, useUserRole } from "@/lib/blog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon, PlusIcon, User2Icon } from "lucide-react";
import { format } from "date-fns";
import { UserBadge } from "@/components/UserBadge";

export default function BlogIndex() {
  const navigate = useNavigate();
  const { data: session } = useSession();
  const { data: blogs, isLoading } = useBlogs();
  const { data: userRole } = useUserRole();

  return (
    <div className="min-h-screen py-20 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-4xl font-bold text-foreground">Blog Posts</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Discover the latest articles and insights
            </p>
          </div>
          <div className="flex gap-2">
            {session && userRole === 'admin' && (
              <Button onClick={() => navigate('/blog/new')}>
                <PlusIcon className="mr-2 h-4 w-4" />
                New Blog
              </Button>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3].map((n) => (
              <Card key={n} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-muted rounded"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : !blogs?.length ? (
          <div className="text-center text-muted-foreground">No blog posts yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {blogs.map((blog) => (
              <Card key={blog.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <CalendarIcon className="h-4 w-4" />
                    {format(new Date(blog.created_at), 'MMM d, yyyy')}
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3 mb-4">
                    {blog.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <Link to={`/profile/${blog.author_id}`} className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={blog.author?.avatar_url || ""} alt={blog.author?.username || "User"} />
                        <AvatarFallback>
                          <User2Icon className="h-3 w-3 text-muted-foreground" />
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {blog.author?.username || 'Unknown'}
                      </span>
                    </Link>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/blog/${blog.id}`}>Read more</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
