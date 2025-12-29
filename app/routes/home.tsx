import type { Route } from "./+types/home";
import { CatalogPage } from "~/components/CatalogPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Catalogo Digital" },
    { name: "description", content: "Catálogo digital minimalista para vender por WhatsApp" },
  ];
}

export default function Home() {
  return (
    <CatalogPage
      storeName="Tu Marca"
      whatsappPhone="+573001112233"
      currency="COP"
    />
  );
}
