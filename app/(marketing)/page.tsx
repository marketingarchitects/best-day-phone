import { createClient } from "@/lib/supabase/server";
import { PricingPlans } from "@/components/marketing/PricingPlans";
import { pricingOptions } from "@/lib/constants/pricing";

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const isAuthenticated = !!data?.claims;

  return (
    <PricingPlans options={pricingOptions} isAuthenticated={isAuthenticated} />
  );
}
