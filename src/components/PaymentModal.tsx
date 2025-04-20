import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CreditCard } from "lucide-react";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PaymentModal({ open, onOpenChange }: PaymentModalProps) {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Validate email
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(email));
  }, [email]);

  // Load PayPal script
  useEffect(() => {
    if (!open) return;

    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${import.meta.env.VITE_PAYPAL_CLIENT_ID || 'AS0XGxa85kz2vF0os1QnNz...'}&currency=EUR`;
    script.async = true;
    script.onload = () => setPaypalLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [open]);

  // Initialize PayPal buttons
  useEffect(() => {
    if (!paypalLoaded || !window.paypal || !isValidEmail) return;

    const paypalButtonsContainer = document.getElementById("paypal-button-container");
    if (!paypalButtonsContainer) return;

    // Clear existing buttons
    paypalButtonsContainer.innerHTML = "";

    window.paypal.Buttons({
      style: {
        layout: "vertical",
        color: "blue",
        shape: "rect",
        label: "paypal"
      },
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: "10.00", // Set your price here
              currency_code: "EUR"
            },
            description: "DuoXPy License Key"
          }]
        });
      },
      onApprove: async (data, actions) => {
        setIsLoading(true);
        try {
          // Process the payment
          const orderDetails = await actions.order.capture();

          // Generate a key and send email
          const response = await fetch("/api/generate-key", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              orderId: data.orderID
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to generate key");
          }

          const { key } = await response.json();

          // Navigate to success page
          navigate(`/success?key=${key}&email=${encodeURIComponent(email)}`);
        } catch (error) {
          console.error("Payment processing error:", error);
          toast({
            title: "Payment Error",
            description: "There was an error processing your payment. Please try again.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
          onOpenChange(false);
        }
      },
      onError: (err) => {
        console.error("PayPal error:", err);
        toast({
          title: "PayPal Error",
          description: "There was an error with PayPal. Please try again.",
          variant: "destructive",
        });
      }
    }).render("#paypal-button-container");
  }, [paypalLoaded, isValidEmail, email, navigate, toast, onOpenChange]);

  const handleManualPayment = async () => {
    if (!isValidEmail) return;

    setIsLoading(true);
    try {
      // Generate a temporary key and redirect to manual payment page
      const response = await fetch("/api/create-pending-key", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to create pending key");
      }

      const { pendingId } = await response.json();

      // Open PayPal in a new window
      window.open(`https://www.paypal.com/paypalme/smhaaa/10`, "_blank");

      // Navigate to a page where they can confirm payment
      navigate(`/manual-payment?id=${pendingId}&email=${encodeURIComponent(email)}`);
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating pending key:", error);
      toast({
        title: "Error",
        description: "There was an error setting up your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Get Your DuoXPy License</DialogTitle>
          <DialogDescription>
            Enter your email and complete payment to get your license key.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {isValidEmail && (
            <>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Pay with
                  </span>
                </div>
              </div>

              <div id="paypal-button-container" className="min-h-[150px] flex items-center justify-center">
                {!paypalLoaded && <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />}
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or
                  </span>
                </div>
              </div>

              <Button
                variant="outline"
                onClick={handleManualPayment}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <CreditCard className="mr-2 h-4 w-4" />
                )}
                Manual PayPal Payment
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Add PayPal type definition
declare global {
  interface Window {
    paypal: any;
  }
}
