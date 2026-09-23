"use client";

import Link from "next/link";
import { useCart } from "@/features/cart/hooks/useCart";
import { cartPaths } from "@/features/cart/paths";

export function CartNavLink({ compact = true }: { compact?: boolean }) {
  const { quantity } = useCart();

  if (compact) {
    return (
      <Link
        href={cartPaths.cart}
        aria-label={`Shopping bag${quantity > 0 ? `, ${quantity} items` : ""}`}
        className="relative inline-flex size-5 items-center justify-center text-[#1a1a1a]"
      >
        <svg aria-hidden="true" viewBox="0 0 20 20" className="size-5 fill-none stroke-current" strokeWidth="1.25">
          <path d="M5.5 7.25h9l.75 10h-10l.75-10Z" />
          <path d="M7.75 7.25V5.5a2.25 2.25 0 0 1 4.5 0v1.75" />
        </svg>
        {quantity > 0 ? <span className="absolute -right-2 -top-2 rounded-full bg-[#c5a880] px-1.5 py-0.5 text-[9px] font-bold leading-none text-white">{quantity}</span> : null}
      </Link>
    );
  }

  return (
    <Link href={cartPaths.cart} className="hover:text-zinc-600">
      Cart{quantity > 0 ? ` (${quantity})` : ""}
    </Link>
  );
}
