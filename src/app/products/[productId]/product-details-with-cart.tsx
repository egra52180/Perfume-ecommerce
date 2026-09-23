"use client";

import { AddToCartButton } from "@/features/cart";
import { ProductDetailsPage } from "@/features/products";

type ProductDetailsWithCartProps = {
  productId: string;
};

export function ProductDetailsWithCart({
  productId,
}: ProductDetailsWithCartProps) {
  return (
    <ProductDetailsPage
      productId={productId}
      actions={({ product, selectedOptions }) => (
        <AddToCartButton
          productId={product.id}
          name={product.name}
          price={product.price}
          image={product.images[0]}
          selectedOptions={selectedOptions}
          className="min-w-0 flex-1 rounded-[4px] bg-[#1a1a1a] py-4 text-[13px] font-bold uppercase text-white hover:bg-[#2b2b2b]"
        >
          Add to Cart / ${product.price}
        </AddToCartButton>
      )}
    />
  );
}
