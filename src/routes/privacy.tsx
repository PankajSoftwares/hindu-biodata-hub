import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Free Biodata for Hindus" },
      { name: "description", content: "How Free Biodata for Hindus handles your data." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-xs uppercase tracking-[0.3em] text-gold">Legal</p>
      <h1 className="mt-2 font-display text-4xl text-primary">Privacy Policy</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-foreground/85">
        <p>We respect your privacy. The biodata details you enter are saved only in your browser's local storage and never transmitted to our servers.</p>
        <h2 className="font-display text-xl text-primary">What we store</h2>
        <p>The biodata draft you create is stored locally on your device. Clearing your browser data will remove it.</p>
        <h2 className="font-display text-xl text-primary">Cookies & analytics</h2>
        <p>We may use minimal anonymous analytics to understand site usage. We do not sell or share personal information.</p>
        <h2 className="font-display text-xl text-primary">Contact</h2>
        <p>Questions? Email hello@freebiodataforhindus.app.</p>
      </div>
    </article>
  );
}