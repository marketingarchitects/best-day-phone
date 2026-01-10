import Image from "next/image";

export const ProblemSection = () => {
  return (
    <section className="py-20 bg-accent relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="font-serif text-3xl md:text-5xl text-balance font-bold mb-6 max-w-4xl mx-auto">
          You can&apos;t always be there. But you never stop worrying.
        </h2>
        <p className="text-lg text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto">
          You&apos;ve tried the smartphones, tablets, and other devices. They
          sit untouched. Technology wasn&apos;t built for the people you love
          most.
        </p>
        <div className="grid md:grid-cols-3 gap-8 text-left max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-orange-100 dark:border-orange-900/30">
            <Image
              src="/images/phone.png"
              alt="Phone"
              width={64}
              height={64}
              className="w-16 h-16 object-contain mb-6"
            />

            <h3 className="font-serif font-bold text-3xl mb-4">
              They can&apos;t learn new technology
            </h3>
            <p className="text-muted-foreground text-base">
              People with dementia remember childhood most strongly. Smartphones
              will never feel familiar.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-orange-100 dark:border-orange-900/30">
            <Image
              src="/images/clock.png"
              width={64}
              height={64}
              alt="Clock"
              className="w-16 h-16 object-contain mb-6"
            />
            <h3 className="font-serif font-bold text-3xl mb-4">
              You can&apos;t call enough
            </h3>
            <p className="text-muted-foreground text-base">
              Work, kids, life. You love them, but finding time for daily calls
              is hard.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-orange-100 dark:border-orange-900/30">
            <Image
              src="/images/sad.png"
              width={64}
              height={64}
              alt="Sad"
              className="w-16 h-16 object-contain mb-6"
            />
            <h3 className="font-serif font-bold text-3xl mb-4">
              Silence is dangerous
            </h3>
            <p className="text-muted-foreground text-base">
              Studies show isolation rivals smoking in health risks.
              Conversation keeps minds engaged.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
