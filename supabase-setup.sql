-- Create license_keys table
CREATE TABLE IF NOT EXISTS public.license_keys (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL,
    key TEXT NOT NULL,
    order_id TEXT,
    used BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create pending_payments table
CREATE TABLE IF NOT EXISTS public.pending_payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL,
    pending_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_license_keys_email ON public.license_keys(email);
CREATE INDEX IF NOT EXISTS idx_license_keys_key ON public.license_keys(key);
CREATE INDEX IF NOT EXISTS idx_pending_payments_pending_id ON public.pending_payments(pending_id);
CREATE INDEX IF NOT EXISTS idx_pending_payments_email ON public.pending_payments(email);

-- Set up Row Level Security (RLS)
ALTER TABLE public.license_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pending_payments ENABLE ROW LEVEL SECURITY;

-- Create policies for license_keys
CREATE POLICY "Allow service role full access to license_keys" 
ON public.license_keys 
FOR ALL 
TO service_role 
USING (true);

-- Create policies for pending_payments
CREATE POLICY "Allow service role full access to pending_payments" 
ON public.pending_payments 
FOR ALL 
TO service_role 
USING (true);
