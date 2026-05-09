import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Free Biodata for Hindus" },
      { name: "description", content: "Learn about Free Biodata for Hindus — a free biodata maker built with care for Hindu families." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-xs uppercase tracking-[0.3em] text-gold">About us</p>
      <h1 className="mt-2 font-display text-4xl text-primary md:text-5xl">Built with care for Hindu families</h1>
      <div className="mt-6 space-y-5 text-base leading-relaxed text-foreground/85">
        <p>
          Free Biodata for Hindus was created with one simple goal — to make it easy
          for every family to put together a beautiful biodata, without
          paying a rupee or fighting with confusing software.
        </p>
        <p>
          Every template is hand-crafted with the warmth and elegance of a Hindu
          wedding card. Every field is editable. Every download is watermark-free.
          And every detail you enter stays in your browser — never on our servers.
        </p>
        <p>
          We believe celebrating tradition shouldn't be expensive or complicated.
          We hope this small tool helps your family take one step closer to the big day.
        </p>
      </div>
      <Button asChild className="mt-8">
        <Link to="/create">Create your biodata</Link>
      </Button>
    </div>
  );
}