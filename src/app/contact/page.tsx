import type { Metadata } from "next";
import { ContactForm } from "@/components/site/ContactForm";
import { ReviewFrame } from "@/components/site/ReviewFrame";

const title = "Request a Free Consultation";
const description =
  "Tell us a little about your business, and let's explore how Meridian Integrations can help.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title,
    description,
    url: "/contact",
    siteName: "Meridian Integrations",
    locale: "en_US",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <ReviewFrame>
      <main id="content" className="flex-1">
        <section className="mx-auto w-full max-w-xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="text-xs font-semibold tracking-[0.22em] text-brandRedInk">
            LET&apos;S TALK ABOUT YOUR BUSINESS
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white">
            Request a Free Consultation
          </h1>
          <p className="mt-4 text-sm leading-7 text-zinc-300 sm:text-base">{description}</p>
          <div className="relative mt-8 border border-white/10 bg-brandCard px-5 py-6 sm:px-6">
            <ContactForm idPrefix="contact" />
          </div>
        </section>
      </main>
    </ReviewFrame>
  );
}
