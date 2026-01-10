import { CheckCircle } from "lucide-react";

export const FamiliarSection = () => {
  return (
    <section
      className="py-24 bg-background-light dark:bg-background-dark relative"
      id="how-it-works"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative">
            <div className="absolute -left-10 -top-10 w-40 h-40 bg-soft-pink dark:bg-pink-900/20 rounded-full blur-2xl"></div>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="relative z-10 rounded-2xl shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500 w-full aspect-square object-cover"
            >
              <source src="videos/solution-montage.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="order-1 md:order-2">
            <span className="text-primary font-bold tracking-wider uppercase text-sm">
              The Solution
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2 mb-6">
              Designed to be instantly familiar.
            </h2>
            <p className="text-base text-muted-foreground mb-8">
              We built Best Day Phone to look and feel like the phones
              they&apos;ve used their whole life. It rings. They pick up. A
              kind, patient voice asks about their garden, their grandkids,
              their memories — and actually listens.
            </p>
            <ul className="space-y-6">
              <li className="flex items-start">
                <CheckCircle className="text-primary size-5 mt-1" />
                <div className="ml-4">
                  <h4 className="text-lg font-bold">Instantly familiar</h4>
                  <p className="text-muted-foreground">
                    A rotary phone they recognize from childhood. Zero learning
                    curve.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-primary size-5 mt-1" />
                <div className="ml-4">
                  <h4 className="text-lg font-bold">
                    Never says &quot;no&quot;
                  </h4>
                  <p className="text-muted-foreground">
                    Uses &quot;yes and&quot; technique — redirects with
                    kindness, never corrects or frustrates.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-primary size-5 mt-1" />
                <div className="ml-4">
                  <h4 className="text-lg font-bold">You stay in the loop</h4>
                  <p className="text-muted-foreground">
                    After every call, get a summary of how they&apos;re doing —
                    mood, topics, anything unusual.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
