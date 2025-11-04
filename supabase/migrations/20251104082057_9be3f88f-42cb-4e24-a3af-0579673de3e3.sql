-- Create inbody_measurements table to store InBody scan data
CREATE TABLE public.inbody_measurements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  measurement_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  weight DECIMAL(5,2),
  body_fat_percentage DECIMAL(4,2),
  muscle_mass DECIMAL(5,2),
  body_water DECIMAL(5,2),
  protein DECIMAL(5,2),
  mineral DECIMAL(5,2),
  visceral_fat_level INTEGER,
  basal_metabolic_rate INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.inbody_measurements ENABLE ROW LEVEL SECURITY;

-- RLS Policies for inbody_measurements
CREATE POLICY "Users can view their own measurements"
ON public.inbody_measurements
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own measurements"
ON public.inbody_measurements
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own measurements"
ON public.inbody_measurements
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own measurements"
ON public.inbody_measurements
FOR DELETE
USING (auth.uid() = user_id);

-- Create user_settings table for InBody API configuration
CREATE TABLE public.user_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  inbody_api_key TEXT,
  inbody_device_id TEXT,
  sync_enabled BOOLEAN DEFAULT false,
  last_sync TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_settings
CREATE POLICY "Users can view their own settings"
ON public.user_settings
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own settings"
ON public.user_settings
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own settings"
ON public.user_settings
FOR UPDATE
USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_user_settings_updated_at
BEFORE UPDATE ON public.user_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();