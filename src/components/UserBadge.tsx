
import { Crown, Shield } from "lucide-react";

type UserBadgeProps = {
  role?: string;
  isPremium?: boolean;
};

export function UserBadge({ role, isPremium }: UserBadgeProps) {
  return (
    <div className="flex gap-2">
      {role === "admin" && (
        <div className="flex items-center gap-1 text-xs bg-red-500/10 text-red-500 px-2 py-1 rounded-full">
          <Shield className="w-3 h-3" />
          Admin
        </div>
      )}
      {isPremium && (
        <div className="flex items-center gap-1 text-xs bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded-full">
          <Crown className="w-3 h-3" />
          Premium
        </div>
      )}
    </div>
  );
}
