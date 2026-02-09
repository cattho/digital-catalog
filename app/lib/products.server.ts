import { supabase } from "./supabase";
import type { Product } from "~/types/catalog";

// Map Supabase response to our Product type
const mapProduct = (row: any): Product => ({
  id: row.id,
  name: row.name,
  price: Number(row.price),
  description: row.description || "",
  imageUrl: row.images?.[0] || row.image_url || "",
  images: row.images || (row.image_url ? [row.image_url] : []),
});

export type StoreProfile = {
  id: string; // user_id
  slug: string;
  storeName: string;
  whatsapp: string;
  currency: string;
};

export async function getStoreBySlug(
  slug: string,
): Promise<StoreProfile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    slug: data.slug,
    storeName: data.store_name,
    whatsapp: data.whatsapp,
    currency: data.currency,
  };
}

export async function getProductsByUserId(userId: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return data.map(mapProduct);
}
