import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

interface PricingOption {
  title: string;
  description: string;
  price: string;
  period?: string;
  features: string[];
  paymentLink: string;
  badge?: string;
}

const pricingOptions: PricingOption[] = [
  {
    title: "Base WiFi",
    description: "Perfect for home use with WiFi connection",
    price: "$25",
    period: "/month",
    paymentLink: "https://buy.stripe.com/test_4gM3cu1VOaHr5HZ5Aea7C02",
    features: [
      "Best Day Phone device (free)",
      "Daily companion calls",
      "WiFi connectivity required",
      "Weekly caregiver updates",
      "30-day money-back guarantee",
    ],
  },

  {
    title: "Premium 5G",
    description: "Works anywhere, perfect for care facilities",
    price: "$50",
    period: "/month",
    paymentLink: "https://buy.stripe.com/test_9B69AS7g8dTD6M37Ima7C03",
    badge: "MOST POPULAR",
    features: [
      "Best Day Phone device (free)",
      "Built-in 5G connectivity",
      "Works in care facilities",
      "Daily companion calls",
      "Priority support",
      "30-day money-back guarantee",
    ],
  },
];

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  return (
    <>
      {user && (
        <>
          <section className="py-24 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="font-serif text-3xl font-bold mb-4">
                  Choose Your Plan
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  No contracts. Cancel anytime. 30-day money-back guarantee.
                  <br />
                  Device is included free with subscription.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {pricingOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`border rounded-3xl p-8 bg-white text-left flex flex-col relative transition-shadow hover:shadow-xl ${
                      option.badge
                        ? "border-2 border-primary shadow-lg"
                        : "border-gray-200"
                    }`}
                  >
                    {option.badge && (
                      <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl">
                        {option.badge}
                      </div>
                    )}

                    <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {option.description}
                    </p>

                    <div className="mb-6">
                      <span className="text-4xl font-bold">{option.price}</span>
                      {option.period && (
                        <span className="text-muted-foreground">
                          {option.period}
                        </span>
                      )}
                    </div>

                    <ul className="space-y-3 mb-8 grow">
                      {option.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-start text-gray-700"
                        >
                          <svg
                            className="w-5 h-5 text-primary mr-3 mt-0.5 shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button asChild size="lg">
                      <Link href={option.paymentLink}>Subscribe</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {!user && (
        <div className="text-center mt-16 text-sm text-muted-foreground">
          marketing material here
        </div>
      )}
    </>
  );
}
