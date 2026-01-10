import Header from "@/components/marketing/Header";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <footer className="mt-20 h-64 bg-accent"></footer>
    </>
  );
}
