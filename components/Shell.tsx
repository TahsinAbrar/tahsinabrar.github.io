import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { profile } from "@/content/profile";
export function SocialLinks() {
  return (
    <div className="social-links">
      <a href={profile.linkedin}>
        LinkedIn <ArrowUpRight size={16} aria-hidden="true" />
      </a>
      <a href={profile.github}>
        GitHub <ArrowUpRight size={16} aria-hidden="true" />
      </a>
    </div>
  );
}
export function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="wordmark" href="/" aria-label="Tahsin Abrar home">
          tahsin abrar<span>.</span>
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/#about">About</Link>
          <Link href="/#experience">Experience</Link>
          <Link href="/blog/">Writing</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <Link className="wordmark" href="/">
        tahsin abrar<span>.</span>
      </Link>
      <p>Engineering with purpose. Sharing what I learn.</p>
      <span>© {new Date().getFullYear()} Tahsin Abrar</span>
    </footer>
  );
}
export function Section({
  id,
  number,
  label,
  children,
}: {
  id: string;
  number: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="section">
      <div className="section-label">
        <span>{number}</span>
        {label}
      </div>
      <div className="section-content">{children}</div>
    </section>
  );
}
