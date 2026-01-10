import { createClient } from "@/lib/supabase/server";
import { HeroSection } from "@/components/marketing/Hero";
import { PricingPlans } from "@/components/marketing/PricingPlans";
import { pricingOptions } from "@/lib/constants/pricing";
import { ProblemSection } from "@/components/marketing/Problem";
import { FamiliarSection } from "@/components/marketing/Familiar";

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const isAuthenticated = !!data?.claims;

  return (
    <>
      <HeroSection />
      <ProblemSection />
      <FamiliarSection />
      <PricingPlans
        options={pricingOptions}
        isAuthenticated={isAuthenticated}
      />
    </>
  );
}
