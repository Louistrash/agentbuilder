
import { supabase } from "@/integrations/supabase/client";
import { Addon, PurchasedAddon } from "./types";

export async function fetchAddons(): Promise<Addon[]> {
  const { data, error } = await supabase
    .from('marketplace_addons')
    .select('*')
    .eq('status', 'active');
  
  if (error) throw error;
  
  return data as Addon[];
}

export async function fetchPurchasedAddons(): Promise<PurchasedAddon[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('purchased_addons')
    .select('*')
    .eq('profile_id', user.id);
  
  if (error) throw error;
  
  return data as PurchasedAddon[];
}

export async function purchaseAddon(addon: Addon, userId: string): Promise<void> {
  const { error } = await supabase
    .from('purchased_addons')
    .insert({
      profile_id: userId,
      addon_id: addon.id,
      status: 'active',
      purchased_at: new Date().toISOString(),
    });

  if (error) throw error;
}
