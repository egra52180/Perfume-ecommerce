"use client";

import { Button } from "@/components/ui/Button";
import { useCart } from "@/features/cart/hooks/useCart";
import type { AddToCartInput } from "@/features/cart/types/cart.types";

type AddToCartButtonProps = AddToCartInput;

type StyledAddToCartButtonProps = AddToCartButtonProps & {
  className?: string;
  children?: React.ReactNode;
};

export function AddToCartButton({
  className,
  children,
  ...props
}: StyledAddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <Button className={className} onClick={() => addItem(props)}>
      {children ?? "Add to cart"}
    </Button>
  );
}
