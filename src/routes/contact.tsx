import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Free Biodata for Hindus" },
      { name: "description", content: "Get in touch with Free Biodata for Hindus." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill all fields");
      return;
    }
    toast.success("Thanks! We'll get back to you soon.");
    setName(""); setEmail(""); setMessage("");
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-xs uppercase tracking-[0.3em] text-gold">Contact</p>
      <h1 className="mt-2 font-display text-4xl text-primary md:text-5xl">We'd love to hear from you</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Have feedback, a feature request, or a template idea? Drop us a note.
      </p>
      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4 text-sm">
          <div className="flex items-start gap-3 rounded-lg border border-border/70 bg-card p-4">
            <Mail className="mt-0.5 h-4 w-4 text-gold" />
            <div>
              <p className="font-medium">Email</p>
              <p className="text-muted-foreground">hello@freebiodataforhindus.app</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg border border-border/70 bg-card p-4">
            <MessageSquare className="mt-0.5 h-4 w-4 text-gold" />
            <div>
              <p className="font-medium">Response time</p>
              <p className="text-muted-foreground">Usually within 1–2 business days.</p>
            </div>
          </div>
        </div>
        <form onSubmit={onSubmit} className="rounded-xl border border-border/70 bg-card p-6">
          <div className="grid gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="n">Name</Label>
              <Input id="n" value={name} onChange={(e) => setName(e.target.value)} maxLength={80} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="e">Email</Label>
              <Input id="e" type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={120} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="m">Message</Label>
              <Textarea id="m" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} maxLength={1000} />
            </div>
            <Button type="submit"><Send className="mr-1.5 h-4 w-4" /> Send message</Button>
          </div>
        </form>
      </div>
    </div>
  );
}