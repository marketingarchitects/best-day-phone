import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-secondary text-gray-300 py-12 relative">
      {/* Jagged Edge */}
      <svg
        className="absolute -top-[20px] left-0 w-full h-[20px] fill-secondary"
        preserveAspectRatio="none"
        viewBox="0 0 1200 20"
      >
        <polygon points="0,20 0,11 300,7 530,13 750,5 920,10 1100,8 1200,12 1200,20" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="block mb-4">
              <Image
                src="/images/logo-white.svg"
                alt="Best Day Phone"
                width={56}
                height={56}
                className="h-14 w-auto"
              />
            </Link>
            <p className="text-gray-400 text-sm">
              A companion for people with Alzheimer&apos;s and dementia. Because
              no one should wait by a phone that doesn&apos;t ring.
            </p>
            <p className="text-gray-500 text-xs mt-2 italic">
              Give yourself time to breathe.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-primary">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="hover:text-white transition"
                  href="/#how-it-works"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white transition"
                  href="/#ai-explained"
                >
                  About the AI
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white transition"
                  href="/#testimonials"
                >
                  Stories
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition" href="/#pricing">
                  Pricing
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition" href="/#faq">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-primary">Company</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link className="hover:text-white transition" href="/about">
                  About Us
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition" href="/mission">
                  Mission
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition" href="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-primary">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link className="hover:text-white transition" href="/privacy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition" href="/terms">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div>© 2026 Best Day Phone. All rights reserved.</div>
          <div className="flex gap-4 mt-4 md:mt-0 text-2xl text-gray-400">
            <span className="material-icons-round" title="Secure Payment">
              lock
            </span>
            <span className="material-icons-round" title="Visa">
              credit_card
            </span>
            <span className="material-icons-round" title="Verified">
              verified_user
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
