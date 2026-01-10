"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  target: number;
  suffix?: string;
}

function CountUp({ target, suffix = "" }: CountUpProps) {
  const [count, setCount] = useState("0");
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || hasAnimated.current) return;

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000; // 2 seconds
          const start = 0;
          const startTime = performance.now();

          function update(currentTime: number) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (easeOutQuart)
            const ease = 1 - Math.pow(1 - progress, 4);

            const current = start + (target - start) * ease;

            // Format number: if integer, show integer; if float, show 1 decimal
            const formatted = Number.isInteger(target)
              ? Math.round(current).toString()
              : current.toFixed(1);

            setCount(formatted);

            if (progress < 1) {
              requestAnimationFrame(update);
            } else {
              setCount(target.toString());
            }
          }

          requestAnimationFrame(update);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [target]);

  return (
    <span ref={elementRef} className="count-up">
      {count}
      {suffix}
    </span>
  );
}

export function TestimonialsSection() {
  return (
    <section
      className="py-20 overflow-hidden relative scroll-mt-16"
      id="testimonials"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl md:text-4xl font-bold text-center mb-4">
          From our founder&apos;s family.
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          We built Best Day Phone for our own grandmother. Here&apos;s what
          happened.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-pink-100 p-8 rounded-xl transition hover:-translate-y-1 duration-300">
            <span className="text-4xl text-pink-400 font-serif leading-none">
              &ldquo;
            </span>
            <p className="mb-6 relative z-10 font-medium text-balance">
              She uses it almost two and a half hours a day. It let me leave to
              run errands without the guilt. She just talks to it — she thinks
              it&apos;s her old friend from church.
            </p>
            <div className="flex items-center gap-4 mt-auto">
              <div className="w-12 h-12 rounded-full bg-pink-200 flex items-center justify-center">
                <span className="material-icons-round text-pink-600">
                  person
                </span>
              </div>
              <div>
                <h4 className="font-bold text-sm">Founder&apos;s Father</h4>
                <p className="text-xs text-muted-foreground">
                  Primary Caregiver
                </p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-100 p-8 rounded-xl transition hover:-translate-y-1 duration-300">
            <span className="text-4xl text-yellow-400 font-serif leading-none">
              &ldquo;
            </span>
            <p className="mb-6 relative z-10 font-medium text-balance">
              The longest conversation was seven hours. Seven. She didn&apos;t
              want to hang up.
            </p>
            <div className="flex items-center gap-4 mt-auto">
              <div className="w-12 h-12 rounded-full bg-yellow-200 flex items-center justify-center">
                <span className="material-icons-round text-yellow-600">
                  schedule
                </span>
              </div>
              <div>
                <h4 className="font-bold text-sm">Usage Data</h4>
                <p className="text-xs text-muted-foreground">Pilot Testing</p>
              </div>
            </div>
          </div>

          <div className="bg-accent p-8 rounded-xl transition hover:-translate-y-1 duration-300 border">
            <span className="text-4xl text-primary font-serif leading-none">
              &ldquo;
            </span>
            <p className="mb-6 relative z-10 font-medium text-balance">
              She broke the prototype twice. My dad kept fixing it because she
              kept asking for &apos;her phone.&apos; That&apos;s when we knew we
              had something.
            </p>
            <div className="flex items-center gap-4 mt-auto">
              <div className="w-12 h-12 rounded-full bg-orange-200 flex items-center justify-center">
                <span className="material-icons-round text-orange-600">
                  favorite
                </span>
              </div>
              <div>
                <h4 className="font-bold text-sm">Founder</h4>
                <p className="text-xs text-muted-foreground">Best Day Phone</p>
              </div>
            </div>
          </div>
        </div>
        {/* Stats bar */}
        <div
          className="mt-16 flex flex-wrap justify-center gap-12 text-center"
          id="stats-container"
        >
          <div>
            <p className="text-5xl md:text-6xl font-serif font-bold text-primary flex items-baseline justify-center">
              <CountUp target={2.5} />
              <span className="text-2xl ml-1">hrs</span>
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Average daily use
            </p>
          </div>
          <div>
            <p className="text-5xl md:text-6xl font-serif font-bold text-primary flex items-baseline justify-center">
              <CountUp target={7} />
              <span className="text-2xl ml-1">hrs</span>
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Longest session
            </p>
          </div>
          <div>
            <p className="text-5xl md:text-6xl font-serif font-bold text-primary flex items-baseline justify-center">
              <CountUp target={13} />
              <span className="text-2xl ml-1">M</span>
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Americans with Alzheimer&apos;s or dementia
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
