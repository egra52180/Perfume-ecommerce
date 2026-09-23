import { mockProducts } from "@/features/products/services/products.mock-data";
import type { ProductsService } from "@/features/products/services/products.service";

export const mockProductsService: ProductsService = {
  async list(query) {
    const normalizedSearch = query.search?.toLowerCase();
    let filteredProducts = mockProducts.filter((product) => {
      const matchesSearch = normalizedSearch
        ? [product.name, product.description, product.notes, product.scentFamily]
            .join(" ")
            .toLowerCase()
            .includes(normalizedSearch)
        : true;
      const matchesCategory = query.category
        ? product.category === query.category
        : true;

      return matchesSearch && matchesCategory;
    });

    if (query.sort) {
      filteredProducts = [...filteredProducts].sort((left, right) => {
        if (query.sort === "name-asc") return left.name.localeCompare(right.name);
        if (query.sort === "name-desc") return right.name.localeCompare(left.name);
        if (query.sort === "price-asc") return left.price - right.price;
        return right.price - left.price;
      });
    }

    const page = query.page ?? 1;
    const pageSize = query.pageSize ?? 8;
    const start = (page - 1) * pageSize;

    return {
      items: filteredProducts.slice(start, start + pageSize),
      total: filteredProducts.length,
      page,
      pageSize,
    };
  },

  async getById(id) {
    return mockProducts.find((product) => product.id === id) ?? null;
  },
};
