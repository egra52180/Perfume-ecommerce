"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { CartNavLink } from "@/features/cart";
import { ProductSearch } from "@/features/products/components/ProductSearch";
import { useProduct } from "@/features/products/hooks/useProduct";
import { mockProducts } from "@/features/products/services/products.mock-data";
import styles from "@/features/products/styles/ProductDetailsPage.module.css";
import type { Product } from "@/features/products/types/product.types";
import { formatPrice } from "@/features/products/utils/product.utils";

export type ProductDetailsActionsContext = {
  product: Product;
  selectedOptions: Record<string, string>;
};

type ProductDetailsPageProps = {
  productId: string;
  actions?: (context: ProductDetailsActionsContext) => ReactNode;
};

export function ProductDetailsPage({
  productId,
  actions,
}: ProductDetailsPageProps) {
  const productQuery = useProduct(productId);
  const product = productQuery.data;
  const [selectedVolume, setSelectedVolume] = useState("100 ml");
  const [quantity, setQuantity] = useState(1);

  if (productQuery.isLoading) {
    return <p className="text-sm text-zinc-600">Loading product...</p>;
  }

  if (!product) {
    return <p className="text-sm text-zinc-600">Product not found.</p>;
  }

  const galleryImages = [
    product.images[0],
    "/images/products/fleur-de-lune.png",
    "/images/products/atelier-oud.png",
  ].filter(Boolean) as string[];
  const recommendationOrder = [
    "fleur-de-lune",
    "noir-cocoon",
    "sol-dor",
    "rose-absolute",
  ];
  const recommendations = recommendationOrder
    .map((id) => mockProducts.find((item) => item.id === id))
    .filter((item): item is Product => Boolean(item))
    .filter((item) => item.id !== product.id)
    .slice(0, 4);
  const volumes = [
    { label: "30 ml", price: 140 },
    { label: "50 ml", price: 180 },
    { label: "100 ml", price: product.price },
  ];

  return (
    <div className={`${styles.page} font-[family-name:var(--font-manrope)]`}>
      <DetailHeader products={mockProducts} />
      <div data-section="content" className="px-5 sm:px-8 lg:px-20">
        <nav data-section="breadcrumbs" className="flex flex-wrap items-center gap-2 py-5 text-[11px] text-[#605a54] sm:py-6">
          {['Home', 'Shop', 'Fragrances'].map((item) => (
            <span key={item} className="flex items-center gap-2">
              {item}<span className="text-[#c5a880]">›</span>
            </span>
          ))}
          <span className="font-semibold text-[#1a1a1a]">{product.name}</span>
        </nav>

        <section data-section="detail-body" className="grid gap-10 pb-16 lg:grid-cols-[minmax(0,1fr)_560px] lg:gap-16 lg:pb-24">
          <div data-section="gallery" className="min-w-0">
            <div data-section="main-image" className="relative aspect-[1.08] overflow-hidden rounded-lg sm:aspect-[1.2] lg:aspect-auto lg:h-[600px]">
              <Image src={galleryImages[0]} alt={product.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 55vw" priority />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 sm:gap-4">
              {galleryImages.map((image, index) => (
                <button key={`${image}-${index}`} type="button" className={`relative aspect-[1.85] overflow-hidden rounded ${index === 0 ? 'border-2 border-[#c5a880]' : ''}`}>
                  <Image src={image} alt={`${product.name} view ${index + 1}`} fill className="object-cover" sizes="(max-width: 1024px) 33vw, 20vw" />
                </button>
              ))}
            </div>
          </div>

          <div data-section="specifications" className="flex flex-col gap-7">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2 text-[10px] font-semibold uppercase">
                <span className="rounded-full bg-[#f2ede4] px-2.5 py-1.5">Scent Family: {product.scentFamily}</span>
                <span className="rounded-full bg-[#f4f0eb] px-2.5 py-1.5 text-[#605a54]">Occasion: Evening</span>
              </div>
              <h1 className="font-[family-name:var(--font-instrument-serif)] text-4xl leading-none sm:text-5xl">{product.name}</h1>
              <div className="flex items-center justify-between">
                <p className="text-xl font-semibold">{formatPrice(product.price)}</p>
                <p className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-500"><span>•</span> Available in Atelier</p>
              </div>
            </div>
            <div className="h-px bg-[#ebe6de]" />

            <div className="space-y-3">
              <p className="text-[10px] font-bold uppercase">Select volume</p>
              <div className="grid grid-cols-3 gap-3">
                {volumes.map((volume) => (
                  <button key={volume.label} type="button" onClick={() => setSelectedVolume(volume.label)} className={`rounded border p-3 text-center ${selectedVolume === volume.label ? 'border-2 border-[#1a1a1a] bg-white' : 'border-[#ebe6de]'}`}>
                    <span className="block text-xs font-medium">{volume.label}</span>
                    <span className="mt-1 block text-[10px] text-[#605a54]">{formatPrice(volume.price)}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between rounded-md bg-[#f4f0eb] p-4 sm:p-5">
              <div><p className="text-xs font-semibold">Complimentary Signature Gift Wrapping</p><p className="mt-1 text-[11px] text-[#605a54]">Encased in linen paper box with custom wax seal stamp.</p></div>
              <span className="relative h-5 w-10 rounded-full bg-[#c5a880]"><span className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white" /></span>
            </div>

            <div data-section="action-row" className="flex gap-3">
              <div className="flex items-center gap-4 rounded border border-[#ebe6de] px-4 py-3 text-sm"><button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-[#605a54]">-</button><span className="font-semibold">{quantity}</span><button type="button" onClick={() => setQuantity(quantity + 1)} className="text-[#605a54]">+</button></div>
              {actions?.({ product, selectedOptions: { volume: selectedVolume } })}
            </div>
            <div className="h-px bg-[#ebe6de]" />

            <div className="space-y-5">
              <h2 className="font-[family-name:var(--font-instrument-serif)] text-3xl">Scent Anatomy</h2>
              <p className="text-sm leading-[1.6] text-[#605a54]">{product.description} It opens with bright top notes, shifting to clean papyrus and warm, rich sandalwood that dry down into dry cardamom and amber.</p>
              <div className="text-xs">
                {[['Top Notes', 'Sicilian Bergamot, Pink Pepper'], ['Heart Notes', 'Egyptian Jasmine Sambac, Papyrus'], ['Base Notes', 'West Indian Sandalwood, Cardamom, Amber']].map(([label, value]) => <div key={label} className="flex justify-between gap-4 border-b border-[#ebe6de] py-2"><span className="font-bold uppercase">{label}</span><span className="text-right text-[#605a54]">{value}</span></div>)}
              </div>
            </div>
          </div>
        </section>
      </div>

      <section data-section="recommendations" className="px-5 py-12 sm:px-8 lg:px-20 lg:py-16">
        <div className="mx-auto max-w-[1360px]"><div className="mb-8 text-center"><h2 className="font-[family-name:var(--font-instrument-serif)] text-3xl sm:text-4xl">Olfactory Companions</h2><p className="mt-2 text-[10px] uppercase text-[#8a8178]">Fragrances of synonymous sophistication</p></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">{recommendations.map((item) => <Link key={item.id} href={`/products/${item.id}`} className="rounded bg-white p-1.5 sm:p-2"><div className="relative aspect-[.9] overflow-hidden bg-[#eee8df]"><Image src={item.images[0]} alt={item.name} fill className="object-cover" sizes="25vw" /></div><div className="flex items-center justify-between gap-2 px-1 pt-2 text-[11px]"><span>{item.name}</span><span>{formatPrice(item.price)}</span></div><p className="px-1 pt-1 text-[8px] uppercase text-[#c5a880]">{item.notes}</p><span className="mt-3 block border border-[#ebe6de] py-1.5 text-center text-[8px] uppercase">Add to cart +</span></Link>)}</div></div>
      </section>
      <DetailFooter />
    </div>
  );
}

function DetailHeader({ products }: { products: Product[] }) {
  return <><div className="bg-[#1a1a1a] px-4 py-1.5 text-center text-[8px] font-semibold uppercase tracking-wide text-white">Complimentary Signature Gift Wrapping on all orders above $150</div><header className="border-b border-[#ebe6de] bg-[#faf8f5]"><div className="mx-auto flex min-h-[90px] max-w-[1440px] items-center justify-between gap-5 px-5 sm:px-8 lg:px-20"><nav className="hidden gap-8 text-[10px] font-medium uppercase text-[#605a54] md:flex"><Link href="/products" className="font-semibold text-[#1a1a1a]">Home</Link><Link href="/products">Shop</Link><Link href="/products">Categories</Link><Link href="/products">The Atelier</Link></nav><Link href="/products" className="font-[family-name:var(--font-instrument-serif)] text-2xl tracking-[.28em]">ODORATUS</Link><div className="flex items-center gap-5 text-xs"><ProductSearch inline compact products={products} /><span aria-hidden className="inline-flex size-5 items-center justify-center text-[#1a1a1a]"><svg viewBox="0 0 20 20" className="size-5 fill-none stroke-current" strokeWidth="1.25"><circle cx="10" cy="6" r="3" /><path d="M4.5 17a5.5 5.5 0 0 1 11 0" /></svg></span><CartNavLink compact /></div></div></header></>;
}

function DetailFooter() {
  return <footer data-section="footer" className="px-5 py-10 text-white sm:px-8 lg:px-20"><div className="mx-auto grid max-w-[1360px] gap-8 sm:grid-cols-[1.5fr_1fr_1fr_1fr]"><div><p className="font-[family-name:var(--font-instrument-serif)] text-2xl tracking-[.2em]">ODORATUS</p><p className="mt-4 max-w-xs text-[10px] leading-[1.6] text-[#b4aea7]">An independent olfactory house cultivating slow-luxury liquid narratives. Every bottle is hand-poured in small batches using sustainably sourced botanicals.</p></div><FooterColumn title="Collections" items={['Le Maison', 'Private Reserve', 'Scented Candles', 'Discovery Sets']} /><FooterColumn title="Customer Care" items={['Olfactory Consultation', 'Shipping & Returns', 'Atelier Appointments', 'Care Guide']} /><FooterColumn title="About Us" items={['Our Philosophy', 'Sourcing Standards', 'Sustainability Commitments', 'Journal']} /></div><div className="mx-auto mt-8 max-w-[1360px] border-t border-[#393633] pt-4 text-[8px] text-[#8a8178]">© 2026 Odoratus. All rights reserved.</div></footer>;
}

function FooterColumn({ title, items }: { title: string; items: string[] }) {
  return <div><p className="mb-4 text-[9px] font-semibold uppercase text-[#c5a880]">{title}</p>{items.map((item) => <p key={item} className="mb-2 text-[9px] text-[#b4aea7]">{item}</p>)}</div>;
}
