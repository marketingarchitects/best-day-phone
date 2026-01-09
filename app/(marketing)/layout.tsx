import Header from "@/components/marketing/Header";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header className="py-4 z-10 relative" />
      <main>{children}</main>
    </>
  );
}
