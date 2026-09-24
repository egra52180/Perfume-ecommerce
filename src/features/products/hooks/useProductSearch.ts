"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function useProductSearch(search = "", navigate = true) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function setSearch(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set("search", value.trim());
    } else {
      params.delete("search");
    }

    params.delete("page");
    if (navigate) {
      router.replace(`/products?${params.toString()}`);
    }
  }

  return {
    search,
    setSearch,
  };
}
