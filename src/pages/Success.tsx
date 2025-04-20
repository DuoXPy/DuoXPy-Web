import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Copy, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Success() {
  const location = useLocation();
  const { toast } = useToast();
  const [key, setKey] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    // Get key and email from URL params
    const params = new URLSearchParams(location.search);
    const keyParam = params.get("key");
    const emailParam = params.get("email");

    if (keyParam) setKey(keyParam);
    if (emailParam) setEmail(emailParam);
  }, [location]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The key has been copied to your clipboard",
    });
  };

  const copyDiscordCommand = () => {
    const command = `/redeem :key${key}`;
    navigator.clipboard.writeText(command);
    toast({
      title: "Discord command copied",
      description: "The redeem command has been copied to your clipboard",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-background/95 backdrop-blur">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 bg-green-100 p-3 rounded-full">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
          <CardDescription>
            Your license key is ready to use
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Your Key</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => copyToClipboard(key)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="font-mono text-sm break-all bg-background p-3 rounded border">
              {key}
            </div>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Discord Command</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={copyDiscordCommand}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="font-mono text-sm break-all bg-background p-3 rounded border">
              /redeem :key{key}
            </div>
          </div>

          <div className="bg-blue-50 text-blue-800 p-4 rounded-lg text-sm">
            <p>Go to the Discord bot and use the command above to activate your key.</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline" className="w-full">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
