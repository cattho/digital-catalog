import { defaultProducts } from "~/data/defaultProducts";
import type { Product } from "~/types/catalog";
import { readJsonFromStorage, writeJsonToStorage } from "~/lib/storage.client";

const PRODUCTS_KEY = "catalog_products_v1";

type ProductsPayload = {
  products: Product[];
};

export function getProducts(): Product[] {
  const payload = readJsonFromStorage<ProductsPayload>(PRODUCTS_KEY, {
    products: defaultProducts,
  });
  return payload.products;
}

export function saveProducts(products: Product[]) {
  writeJsonToStorage<ProductsPayload>(PRODUCTS_KEY, { products });
}
