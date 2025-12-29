import { useEffect, useMemo, useState } from "react";
import type { CartItem, Product } from "~/types/catalog";
import { ProductCard } from "~/components/ProductCard";
import { BrandHeader } from "~/components/BrandHeader";
import { CartDrawer } from "~/components/CartDrawer";
import { addToCart, readCart, removeFromCart, writeCart } from "~/lib/cart.client";
import { getProducts } from "~/lib/products.client";
import { buildWhatsAppUrl, generateWhatsAppMessage } from "~/lib/whatsapp";

export function CatalogPage({
  storeName,
  whatsappPhone,
  currency,
}: {
  storeName: string;
  whatsappPhone: string;
  currency: string;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    setProducts(getProducts());
    setCartItems(readCart());
  }, []);

  useEffect(() => {
    writeCart(cartItems);
  }, [cartItems]);

  const productsById = useMemo(() => {
    return Object.fromEntries(products.map((p) => [p.id, p])) as Record<
      string,
      Product
    >;
  }, [products]);

  const cartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  const onCheckout = () => {
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

          <a
            href="/admin"
            className="text-sm font-semibold text-gray-700 hover:underline"
          >
            Admin
          </a>
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
      </main>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        productsById={productsById}
        currency={currency}
        onAdd={(productId) => setCartItems((prev) => addToCart(prev, productId))}
        onRemove={(productId) =>
          setCartItems((prev) => removeFromCart(prev, productId))
        }
        onCheckout={onCheckout}
      />
    </div>
  );
}
