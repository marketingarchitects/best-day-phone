export function AiExplainedSection() {
  return (
    <section
      className="py-20 relative overflow-hidden scroll-mt-16"
      id="ai-explained"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Let&apos;s Talk About AI
          </span>
          <h2 className="font-serif text-2xl md:text-4xl font-bold mt-4">
            &ldquo;Wait — is this an AI calling my parent?&rdquo;
          </h2>
          <p className="mt-4 text-muted-foreground text-balance max-w-2xl mx-auto">
            Yes. But not the way you&apos;re imagining. This isn&apos;t a
            chatbot reading scripts. It&apos;s a companion trained to{" "}
            <em>listen</em> — really listen. To be patient in a way that busy
            humans sometimes can&apos;t.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-accent p-8 rounded-2xl relative overflow-hidden group">
            <h3 className="font-serif text-2xl font-bold mb-4">
              Think of it like a good neighbor.
            </h3>
            <p className="text-muted-foreground mb-6">
              You know how some people light up talking to a kind nurse or the
              barista who remembers their order? That&apos;s what we&apos;re
              building. A voice that shows up every day — without judgment,
              without rushing, without ever being too tired.
            </p>
            <div className="flex items-center gap-2 text-sm text-primary font-semibold">
              <span className="material-icons-round">verified_user</span>
              <span>It doesn&apos;t replace you. It fills the gaps.</span>
            </div>
          </div>
          <div className="bg-gray-50 p-8 rounded-2xl border border-dashed border-gray-300 relative overflow-hidden">
            <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs px-2 py-1 rounded font-bold">
              OPTIONAL
            </span>
            <h3 className="font-serif text-2xl font-bold mb-4">
              A familiar voice.
            </h3>
            <p className="text-muted-foreground mb-6">
              Want the calls to sound like you? Or a grandchild? With our
              optional voice cloning, the AI can adopt a familiar tone to
              increase comfort. Or choose from our warm, pre-set companion
              voices.
            </p>
            <p className="text-xs text-muted-foreground italic border-l-2 border-primary pl-3">
              Voice cloning is completely optional. Most families find our
              companion voices work beautifully.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
