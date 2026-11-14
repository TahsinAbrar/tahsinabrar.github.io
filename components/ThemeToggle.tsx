"use client";
import { Moon, Sun } from "lucide-react";
export default function ThemeToggle() {
  function toggle() {
    const next =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
    >
      <Sun className="sun" size={18} aria-hidden="true" />
      <Moon className="moon" size={18} aria-hidden="true" />
    </button>
  );
}
