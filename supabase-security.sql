-- Create explicit policies to deny anon role access to license_keys
CREATE POLICY "Deny anon role access to license_keys" 
ON public.license_keys 
FOR ALL 
TO anon 
USING (false);

-- Create explicit policies to deny anon role access to pending_payments
CREATE POLICY "Deny anon role access to pending_payments" 
ON public.pending_payments 
FOR ALL 
TO anon 
USING (false);

-- Verify that RLS is enabled on both tables
ALTER TABLE public.license_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pending_payments ENABLE ROW LEVEL SECURITY;
