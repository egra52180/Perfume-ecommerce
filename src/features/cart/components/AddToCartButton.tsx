"use client";

import type { ReactNode } from "react";
import { useCart } from "@/features/cart/hooks/useCart";
import type { AddToCartInput } from "@/features/cart/types/cart.types";

type AddToCartButtonProps = AddToCartInput & {
  className?: string;
  label?: string;
  quantity?: number;
  children?: ReactNode;
};

export function AddToCartButton({
  className,
  label,
  quantity,
  children,
  ...input
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const nextQuantity = Math.max(1, Math.floor(quantity ?? 1));

  return (
    <button
      type="button"
      className={
        className ??
        "inline-flex items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
      }
      onClick={() => addItem({ ...input, quantity: nextQuantity })}
    >
      {children ?? label ?? "Add to cart"}
    </button>
  );
}
