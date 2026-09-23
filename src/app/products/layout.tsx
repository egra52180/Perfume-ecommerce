import type { ReactNode } from "react";

export default function ProductsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className="min-h-full bg-[#faf8f5] font-[family-name:var(--font-manrope)] text-[#1a1a1a]"
    >
      {children}
    </div>
  );
}
