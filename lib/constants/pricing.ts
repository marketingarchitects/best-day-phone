import { PricingOption } from "@/components/marketing/PricingPlans";

export const pricingOptions: PricingOption[] = [
  {
    title: "Base WiFi",
    description: "Perfect for home use with WiFi connection",
    price: "$25",
    period: "/month",
    priceId: "price_1SnejsC8UztKoaSsFIgd9BKh",
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
    priceId: "price_1SnenOC8UztKoaSsvpH6lgZK",
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
