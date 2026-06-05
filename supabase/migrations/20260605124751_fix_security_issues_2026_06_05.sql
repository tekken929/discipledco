
-- 1. Fix mutable search_path on set_email_preferences_updated_at
ALTER FUNCTION public.set_email_preferences_updated_at()
  SET search_path = '';

-- 2. Recreate handle_new_user with fixed search_path and revoke public execute
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;

  return new;
end;
$$;

-- Revoke execute from anon, authenticated, and public (auth trigger invokes it directly)
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM public;

-- 3. Add RLS policies for public.profiles (users can only access their own row)
CREATE POLICY "select_own_profile" ON public.profiles
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "insert_own_profile" ON public.profiles
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "update_own_profile" ON public.profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "delete_own_profile" ON public.profiles
  FOR DELETE TO authenticated
  USING (auth.uid() = id);
