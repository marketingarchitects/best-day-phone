interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    question: "Will they actually use it?",
    answer:
      "That's the whole point. It looks like a phone they've used their whole life. It rings. They pick up. No learning curve, no tech support calls to you.",
  },
  {
    question: "What if they have Alzheimer's or dementia?",
    answer:
      'Best Day Phone is designed specifically for cognitive accessibility. Conversations are gentle, repetition is welcomed, and the AI never corrects or says "no." We use a "yes and" approach that de-escalates confusion rather than creating more.',
  },
  {
    question: "Does it sound human?",
    answer:
      "We spent years making sure it isn't. Our voices are warm, patient, and natural. Most users forget they're talking to AI within the first minute. And if you want, you can add your own voice for an even more familiar feel.",
  },
  {
    question: "Can I listen to the calls?",
    answer:
      "You'll receive summaries and mood insights, but we don't store full conversation recordings by default. Their privacy matters — even from you.",
  },
  {
    question: "What if something goes wrong?",
    answer:
      'If they say certain keywords — "help," "I fell," "I can\'t breathe" — you\'re notified immediately. On our Always There plan, the call is automatically forwarded to a registered caregiver so they can respond.',
  },
  {
    question: "What's the Memory Book?",
    answer:
      'It\'s a physical book we send to your loved one, filled with photos and stories you provide. The AI companion uses it as a reference during calls: "I see you visited the Grand Canyon in 1985 in your book, tell me about that trip!" It grounds the conversation in reality.',
  },
];

export function FaqSection() {
  return (
    <section className="py-20 bg-accent relative scroll-mt-16" id="faq">
      {/* Jagged Edge */}
      <svg
        className="absolute -top-[20px] left-0 w-full h-[20px] z-10 fill-accent"
        preserveAspectRatio="none"
        viewBox="0 0 1200 20"
      >
        <polygon points="0,20 0,12 250,8 510,14 700,6 880,11 1080,7 1200,10 1200,20" />
      </svg>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl md:text-4xl font-bold text-center mb-12">
          Questions families ask us.
        </h2>
        <div className="space-y-4">
          {faqItems.map((item: FaqItem, index: number) => (
            <details
              key={index}
              className="bg-white rounded-2xl shadow-sm overflow-hidden border group"
            >
              <summary className="w-full px-6 py-4 text-left flex justify-between items-center cursor-pointer focus:outline-none list-none">
                <span className="font-bold text-lg">{item.question}</span>
                <span className="material-icons-round text-primary transform transition-transform duration-200 group-open:rotate-180">
                  expand_more
                </span>
              </summary>
              <div className="px-6 pb-4 text-muted-foreground">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
