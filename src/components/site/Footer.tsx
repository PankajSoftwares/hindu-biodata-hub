import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-card/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Create beautiful Hindu marriage biodata for free. Multiple templates,
            instant PDF download, no watermark, no signup required.
          </p>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold">Product</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/templates" className="hover:text-primary">Templates</Link></li>
            <li><Link to="/create" className="hover:text-primary">Create Biodata</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            <li><Link to="/privacy" className="hover:text-primary">Privacy</Link></li>
            <li><Link to="/terms" className="hover:text-primary">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Free Biodata for Hindus. Made with care.
      </div>
    </footer>
  );
}