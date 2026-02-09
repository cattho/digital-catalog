import { useEffect, useMemo, useState } from "react";
import type { CartItem, Product } from "~/types/catalog";
import { ProductCard } from "~/components/ProductCard";
import { BrandHeader } from "~/components/BrandHeader";
import { CartDrawer } from "~/components/CartDrawer";
import {
  addToCart,
  readCart,
  removeFromCart,
  writeCart,
} from "~/lib/cart.client";
import { buildWhatsAppUrl, generateWhatsAppMessage } from "~/lib/whatsapp";

export function CatalogPage({
  storeName,
  whatsappPhone,
  currency,
  initialProducts = [],
}: {
  storeName: string;
  whatsappPhone: string;
  currency: string;
  initialProducts?: Product[];
}) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [isCartsLoaded, setIsCartsLoaded] = useState(false);

  useEffect(() => {
    setCartItems(readCart());
    setIsCartsLoaded(true);
  }, []);

  useEffect(() => {
    if (isCartsLoaded) {
      writeCart(cartItems);
    }
  }, [cartItems, isCartsLoaded]);

  const productsById = useMemo(() => {
    return Object.fromEntries(products.map((p) => [p.id, p])) as Record<
      string,
      Product
    >;
  }, [products]);

  const cartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  const onCheckout = () => {
    if (!whatsappPhone) {
      alert(
        "Esta tienda aún no tiene configurado un número para recibir pedidos.",
      );
      return;
    }

    const encoded = generateWhatsAppMessage({
      storeName,
      currency,
      items: cartItems,
      productsById,
    });

    const url = buildWhatsAppUrl(whatsappPhone, encoded);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      <BrandHeader
        storeName={storeName}
        onOpenCart={() => setCartOpen(true)}
        cartCount={cartCount}
      />

      <main className="container mx-auto px-4 py-6">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Productos</h1>
            <p className="text-sm text-gray-600">
              Agrega productos al carrito y finaliza por WhatsApp.
            </p>
          </div>
        </div>

        <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currency={currency}
              onAdd={() => setCartItems((prev) => addToCart(prev, product.id))}
            />
          ))}
        </section>

        <footer className="mt-12 py-6 text-center border-t border-gray-100">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} {storeName}
          </p>
          <a
            href="/"
            className="inline-block mt-2 text-[10px] bg-gray-100 text-gray-500 px-3 py-1 rounded-full hover:bg-gray-200 transition"
          >
            ¿Quieres tener tu propia tienda? 🚀
          </a>
        </footer>
      </main>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        productsById={productsById}
        currency={currency}
        onAdd={(productId) =>
          setCartItems((prev) => addToCart(prev, productId))
        }
        onRemove={(productId) =>
          setCartItems((prev) => removeFromCart(prev, productId))
        }
        onCheckout={onCheckout}
      />
    </div>
  );
}
