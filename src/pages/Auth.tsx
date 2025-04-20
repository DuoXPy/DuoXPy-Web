
import { AuthForm } from "@/components/AuthForm";
import { useSession } from "@/lib/supabase-auth";
import { Navigate } from "react-router-dom";

export default function Auth() {
  const { data: session } = useSession();

  if (session) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <AuthForm />
    </div>
  );
}
