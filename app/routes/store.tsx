import type { Route } from "./+types/store";
import { CatalogPage } from "~/components/CatalogPage";
import { getProductsByUserId, getStoreBySlug } from "~/lib/products.server";
import { redirect } from "react-router";

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: data?.store?.storeName || "Tienda no encontrada" },
    { name: "description", content: "Catálogo digital" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const { slug } = params;
  if (!slug) throw redirect("/"); // Should be caught by route config, but safety check

  const store = await getStoreBySlug(slug);

  if (!store) {
    throw new Response("Tienda no encontrada", { status: 404 });
  }

  const products = await getProductsByUserId(store.id);

  return { store, products };
}

export default function StoreRoute({ loaderData }: Route.ComponentProps) {
  const { store, products } = loaderData;
  return (
    <CatalogPage
      storeName={store.storeName}
      whatsappPhone={store.whatsapp || ""} // Value from DB
      currency={store.currency || "COP"}
      initialProducts={products}
    />
  );
}
