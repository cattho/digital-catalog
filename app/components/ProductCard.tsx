import type { Product } from "~/types/catalog";
import { formatMoney } from "~/lib/money";

export function ProductCard({
  product,
  currency,
  onAdd,
}: {
  product: Product;
  currency: string;
  onAdd: () => void;
}) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="aspect-[4/3] bg-gray-100">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : null}
      </div>

      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-sm font-semibold text-gray-900 leading-5">
            {product.name}
          </h3>
          <div className="text-sm font-semibold text-gray-900">
            {formatMoney(product.price, currency)}
          </div>
        </div>

        {product.description ? (
          <p className="text-sm text-gray-600 leading-5 line-clamp-3">
            {product.description}
          </p>
        ) : null}

        <button
          type="button"
          onClick={onAdd}
          className="w-full rounded-xl px-4 py-2 text-sm font-semibold bg-[var(--color-brand)] text-[var(--color-brand-foreground)] hover:opacity-95 active:opacity-90"
        >
          Agregar al carrito
        </button>
      </div>
    </article>
  );
}
