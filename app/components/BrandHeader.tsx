export function BrandHeader({
  storeName,
  onOpenCart,
  cartCount,
}: {
  storeName: string;
  onOpenCart: () => void;
  cartCount: number;
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-9 w-9 rounded-xl bg-[var(--color-brand)]" />
          <div className="min-w-0">
            <div className="text-sm font-semibold text-gray-900 truncate">
              {storeName}
            </div>
            <div className="text-xs text-gray-600 truncate">
              Catálogo digital
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenCart}
          className="relative rounded-xl border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
        >
          Carrito
          {cartCount > 0 ? (
            <span className="absolute -top-2 -right-2 h-6 min-w-6 px-2 rounded-full bg-[var(--color-brand)] text-[var(--color-brand-foreground)] text-xs font-semibold grid place-items-center">
              {cartCount}
            </span>
          ) : null}
        </button>
      </div>
    </header>
  );
}
