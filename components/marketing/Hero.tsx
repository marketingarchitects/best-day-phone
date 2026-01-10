import { Heart, ArrowRight } from "lucide-react";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[500px] md:min-h-[600px] overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full object-cover">
        <video autoPlay muted loop playsInline>
          <source src="/videos/hero-montage.mp4" type="video/mp4" />
        </video>
      </div>
      {/* dark video overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-transparent"></div>

      <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-semibold mb-6 border border-white/20">
            <Heart className="w-4 h-4 text-white" />
            <span>For families caring for loved ones with memory loss</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6">
            The call that&apos;s <br />
            <span className="relative inline-block">
              always answered.
              <svg
                className="absolute -bottom-5 left-0 w-full h-3 text-primary/60"
                preserveAspectRatio="none"
                viewBox="0 0 100 10"
              >
                <path
                  d="M0 5 Q 50 10 100 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                />
              </svg>
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8">
            A familiar voice inside a familiar phone — for people with
            Alzheimer&apos;s and dementia. No screens. No confusion. Just pick
            up and talk.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-full font-medium shadow-xl shadow-primary/30 hover:bg-opacity-90 hover:-translate-y-1 transition-all text-lg"
              href="#pricing"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>

            <Link
              href="#how-it-works"
              className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-full font-medium hover:bg-white/20 transition-colors text-lg"
            >
              <span className="material-icons-round text-xl mr-2">
                play_circle
              </span>
              See How It Works
            </Link>
          </div>

          <p className="mt-6 text-sm text-white/60 italic">
            Free device included. 30-day trial. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
};
