import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useProfile, useUpdateProfile } from "@/lib/profile";
import { useSession, signOut } from "@/lib/supabase-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserBadge } from "@/components/UserBadge";
import { User2Icon, Upload, Loader2, ArrowLeft } from "lucide-react";
import { useBlogs } from "@/lib/blog";

export default function Profile() {
  const { id } = useParams<{ id: string }>();
  const { data: session } = useSession();
  const isOwnProfile = session?.user.id === id;
  const { data: profile, isLoading } = useProfile(id);
  const navigate = useNavigate();
  const { toast } = useToast();
  const updateProfile = useUpdateProfile();
  
  const [username, setUsername] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { data: allBlogs } = useBlogs();
  const userBlogs = allBlogs?.filter(blog => blog.author_id === id);

  useEffect(() => {
    if (profile) {
      setUsername(profile.username || "");
    }
  }, [profile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      toast({
        title: "Error",
        description: "You must be logged in to update your profile",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploading(true);

      let avatar_url = profile?.avatar_url;
      if (avatarFile) {
        const fileName = `${session.user.id}-${Date.now()}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(fileName, avatarFile);

        if (uploadError) throw uploadError;

        const { data: publicURL } = supabase.storage
          .from("avatars")
          .getPublicUrl(fileName);

        avatar_url = publicURL.publicUrl;
      }

      await updateProfile.mutateAsync({ 
        username,
        ...(avatar_url && { avatar_url })
      });

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Success",
        description: "You've been signed out. Come back soon!",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container max-w-4xl mx-auto py-12 px-4">
        <div className="flex justify-center items-center h-32">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container max-w-4xl mx-auto py-12 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Profile not found</CardTitle>
            <CardDescription>
              This user profile doesn't exist or has been removed.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => navigate("/")}>Return to home</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to="/blog">Blog Posts</Link>
            </Button>
            {isOwnProfile && (
              <Button variant="destructive" onClick={handleSignOut}>
                Sign Out
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="h-24 w-24 mx-auto">
                  <AvatarImage src={profile.avatar_url || ""} alt={profile.username || "User"} />
                  <AvatarFallback>
                    <User2Icon className="h-12 w-12 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4">{profile.username || "User"}</CardTitle>
                <div className="flex justify-center mt-2">
                  <UserBadge role={profile.role} isPremium={profile.is_premium} />
                </div>
              </CardHeader>
            </Card>
          </div>

          <div className="md:w-2/3">
            <Tabs defaultValue={isOwnProfile ? "settings" : "posts"}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="posts">Blog Posts</TabsTrigger>
                {isOwnProfile && (
                  <TabsTrigger value="settings">Profile Settings</TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="posts" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Blog Posts</CardTitle>
                    <CardDescription>
                      Posts written by this user
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {userBlogs?.length === 0 ? (
                      <p className="text-center text-muted-foreground py-4">
                        This user hasn't written any blog posts yet.
                      </p>
                    ) : (
                      <div className="space-y-4">
                        {userBlogs?.map((blog) => (
                          <div
                            key={blog.id}
                            className="border-b pb-4 last:border-0 last:pb-0"
                          >
                            <Link
                              to={`/blog/${blog.id}`}
                              className="text-lg font-medium hover:text-primary"
                            >
                              {blog.title}
                            </Link>
                            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                              {blog.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {isOwnProfile && (
                <TabsContent value="settings" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Settings</CardTitle>
                      <CardDescription>
                        Update your profile information
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          <Input
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="avatar">Profile Picture</Label>
                          <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16">
                              <AvatarImage
                                src={avatarPreview || profile.avatar_url || ""}
                                alt={username || "User"}
                              />
                              <AvatarFallback>
                                <User2Icon className="h-8 w-8" />
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <Label
                                htmlFor="avatar-upload"
                                className="cursor-pointer bg-muted hover:bg-muted/80 text-foreground inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium"
                              >
                                <Upload className="h-4 w-4" />
                                Choose Image
                              </Label>
                              <input
                                id="avatar-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                              />
                              <p className="text-xs text-muted-foreground mt-1">
                                JPG, PNG or GIF. 1MB max.
                              </p>
                            </div>
                          </div>
                        </div>

                        <Button
                          type="submit"
                          disabled={isUploading || updateProfile.isPending}
                          className="w-full"
                        >
                          {(isUploading || updateProfile.isPending) && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          )}
                          Save Changes
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
