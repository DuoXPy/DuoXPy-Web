import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ManualPayment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [pendingId, setPendingId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    // Get pendingId and email from URL params
    const params = new URLSearchParams(location.search);
    const idParam = params.get("id");
    const emailParam = params.get("email");

    if (idParam) setPendingId(idParam);
    if (emailParam) setEmail(emailParam);
  }, [location]);

  const handleConfirmPayment = async () => {
    if (!pendingId || !email) {
      toast({
        title: "Error",
        description: "Missing information. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setIsConfirming(true);
    try {
      const response = await fetch("/api/confirm-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pendingId,
          email
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to confirm payment");
      }

      const { key } = await response.json();

      // Navigate to success page
      navigate(`/success?key=${key}&email=${encodeURIComponent(email)}`);
    } catch (error) {
      console.error("Payment confirmation error:", error);
      toast({
        title: "Confirmation Error",
        description: "There was an error confirming your payment. Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-background/95 backdrop-blur">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 bg-blue-100 p-3 rounded-full">
            <CheckCircle className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">Confirm Your Payment</CardTitle>
          <CardDescription>
            After sending payment via PayPal, confirm below to receive your key
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-medium mb-2">Payment Instructions:</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Send payment to <span className="font-medium">smhaaa@proton.me</span> using Friends & Family</li>
              <li>Include your email address in the payment note</li>
              <li>After sending payment, click the "I've Sent Payment" button below</li>
            </ol>
          </div>

          <div className="bg-blue-50 text-blue-800 p-4 rounded-lg text-sm">
            <p>Your key will be displayed on the next page after payment confirmation</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button
            className="w-full"
            onClick={handleConfirmPayment}
            disabled={isConfirming}
          >
            {isConfirming ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "I've Sent Payment"
            )}
          </Button>
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
