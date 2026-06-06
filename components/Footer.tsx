"use client";

import { useLanguage } from "@/lib/context";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-8 bg-page border-t border-default">
      <div className="max-w-6xl mx-auto px-6">
        <p className="font-mono text-xs text-muted">{t.footer.copy}</p>
      </div>
    </footer>
  );
}
