
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUpdateProfile, useProfile } from "@/lib/profile";
import { useSession } from "@/lib/supabase-auth";
import { UserBadge } from "./UserBadge";

export function ProfileEdit() {
  const { data: session } = useSession();
  const { data: profile } = useProfile(session?.user.id);
  const { toast } = useToast();
  const updateProfile = useUpdateProfile();
  const [username, setUsername] = useState(profile?.username || "");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await updateProfile.mutateAsync({ username });
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
    }
  }

  if (!profile) return null;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Edit Profile</CardTitle>
          <UserBadge role={profile.role} isPremium={profile.is_premium} />
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Username</label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>
          <Button type="submit" disabled={updateProfile.isPending}>
            Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
