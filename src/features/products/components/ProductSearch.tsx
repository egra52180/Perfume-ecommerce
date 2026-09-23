"use client";

import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { useProductSearch } from "@/features/products/hooks/useProductSearch";
import styles from "@/features/products/styles/ProductSearch.module.css";
import type { Product } from "@/features/products/types/product.types";

type ProductSearchProps = {
  value?: string;
  inline?: boolean;
  products?: Product[];
  compact?: boolean;
};

/** US-02: search field for the product listing. */
export function ProductSearch({
  value,
  inline = false,
  products = [],
  compact = false,
}: ProductSearchProps) {
  const [inlineSearch, setInlineSearch] = useState(value ?? "");
  const { search: routeSearch, setSearch: setRouteSearch } = useProductSearch(value, !inline);
  const search = inline ? inlineSearch : routeSearch;
  const setSearch = inline ? setInlineSearch : setRouteSearch;
  const normalizedSearch = search.trim().toLowerCase();
  const matches = inline && normalizedSearch
    ? products.filter((product) =>
        [product.name, product.notes, product.description]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch),
      ).slice(0, 4)
    : [];

  return (
    <div className={compact ? styles.detailSearch : "relative block min-w-56 flex-1"}>
      <label className={compact ? styles.detailSearchLabel : undefined}>
      <span className={compact ? "sr-only" : "mb-1 block text-sm font-medium"}>Search</span>
      {compact ? <span className={styles.detailSearchIcon} aria-hidden><svg viewBox="0 0 16 16" className="size-3.5 fill-none stroke-current" strokeWidth="1.4"><circle cx="7" cy="7" r="4.5" /><path d="m10.5 10.5 3 3" /></svg></span> : null}
      <Input
        className={compact ? styles.detailSearchInput : undefined}
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder={compact ? "Search fragrances..." : "Search products"}
        aria-label={compact ? "Search fragrances" : "Search products"}
      />
      </label>
      {inline && normalizedSearch ? (
        <div className={compact ? styles.detailSearchResults : "absolute left-0 right-0 top-full z-20 mt-2 rounded-md border border-[#ebe6de] bg-[#faf8f5] p-2 shadow-lg"}>
          {matches.length > 0 ? matches.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} onClick={() => setInlineSearch("")} className={compact ? styles.detailSearchResult : "block rounded px-3 py-2 hover:bg-[#f4f0eb]"}>
              <span className={compact ? styles.detailSearchResultName : "block text-xs font-semibold text-[#1a1a1a]"}>{product.name}</span>
              <span className={compact ? styles.detailSearchResultDescription : "block text-[10px] text-[#605a54]"}>{product.description}</span>
              <span className={compact ? styles.detailSearchResultPrice : "block text-[10px] text-[#c5a880]"}>${product.price}</span>
            </Link>
          )) : <p className={compact ? styles.detailSearchEmpty : "px-3 py-2 text-xs text-[#605a54]"}>No products found.</p>}
        </div>
      ) : null}
    </div>
  );
}
