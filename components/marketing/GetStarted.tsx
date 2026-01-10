import Link from "next/link";

export function GetStartedSection() {
  return (
    <section className="py-20 bg-accent relative scroll-mt-16" id="get-started">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="font-serif text-2xl md:text-4xl font-bold mb-6 text-balance">
          Give them someone to talk to.
          <br />
          Give yourself time to breathe.
        </h2>
        <p className="text-xl text-muted-foreground mb-10">
          You can&apos;t be there every day. But you can make sure they&apos;re
          never alone.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            className="inline-flex justify-center items-center px-8 py-4 bg-primary text-white rounded-full font-medium shadow-xl shadow-primary/30 hover:bg-opacity-90 hover:-translate-y-1 transition-all text-lg"
            href="#pricing"
          >
            Start Free Trial — Device Included
          </Link>
        </div>
        <p className="mt-6 text-sm text-gray-500">
          Free shipping. Cancel anytime.
        </p>
      </div>
    </section>
  );
}
