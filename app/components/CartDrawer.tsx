import { useMemo } from "react";
import type { CartItem, Product } from "~/types/catalog";
import { formatMoney } from "~/lib/money";

export function CartDrawer({
  open,
  onClose,
  items,
  productsById,
  currency,
  onAdd,
  onRemove,
  onCheckout,
}: {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  productsById: Record<string, Product>;
  currency: string;
  onAdd: (productId: string) => void;
  onRemove: (productId: string) => void;
  onCheckout: () => void;
}) {
  const total = useMemo(() => {
    return items.reduce((acc, item) => {
      const p = productsById[item.productId];
      if (!p) return acc;
      return acc + p.price * item.quantity;
    }, 0);
  }, [items, productsById]);

  const count = items.reduce((acc, i) => acc + i.quantity, 0);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="Cerrar carrito"
      />

      <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-gray-900">Tu carrito</div>
            <div className="text-xs text-gray-600">{count} artículo(s)</div>
          </div>
          <button
            type="button"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="text-sm text-gray-600">Tu carrito está vacío.</div>
          ) : (
            items.map((item) => {
              const p = productsById[item.productId];
              if (!p) return null;

              return (
                <div
                  key={item.productId}
                  className="rounded-xl border border-gray-200 p-3 flex items-start justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-gray-900 truncate">
                      {p.name}
                    </div>
                    <div className="text-xs text-gray-600">
                      {formatMoney(p.price, currency)}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="h-9 w-9 rounded-lg border border-gray-200 text-gray-900 hover:bg-gray-50"
                      onClick={() => onRemove(item.productId)}
                      aria-label={`Quitar ${p.name}`}
                    >
                      -
                    </button>
                    <div className="w-8 text-center text-sm font-semibold text-gray-900">
                      {item.quantity}
                    </div>
                    <button
                      type="button"
                      className="h-9 w-9 rounded-lg border border-gray-200 text-gray-900 hover:bg-gray-50"
                      onClick={() => onAdd(item.productId)}
                      aria-label={`Agregar ${p.name}`}
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="p-4 border-t border-gray-200 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-gray-900">Total</div>
            <div className="text-sm font-semibold text-gray-900">
              {formatMoney(total, currency)}
            </div>
          </div>

          <button
            type="button"
            disabled={items.length === 0}
            onClick={onCheckout}
            className="w-full rounded-xl px-4 py-3 text-sm font-semibold bg-[var(--color-brand)] text-[var(--color-brand-foreground)] disabled:opacity-50"
          >
            Finalizar por WhatsApp
          </button>
        </div>
      </aside>
    </div>
  );
}
