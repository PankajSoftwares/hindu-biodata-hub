import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Free Biodata for Hindus" },
      { name: "description", content: "Terms of using Free Biodata for Hindus." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-xs uppercase tracking-[0.3em] text-gold">Legal</p>
      <h1 className="mt-2 font-display text-4xl text-primary">Terms & Conditions</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-foreground/85">
        <p>By using Free Biodata for Hindus, you agree to use the service for lawful, personal purposes only.</p>
        <h2 className="font-display text-xl text-primary">Use of service</h2>
        <p>The biodata maker is provided free of charge, "as is", without warranty. You are responsible for the accuracy of details you enter.</p>
        <h2 className="font-display text-xl text-primary">Intellectual property</h2>
        <p>Templates and designs remain the property of Free Biodata for Hindus. The biodata you create is yours.</p>
        <h2 className="font-display text-xl text-primary">Liability</h2>
        <p>We are not liable for any indirect or consequential loss arising from use of this service.</p>
      </div>
    </article>
  );
}