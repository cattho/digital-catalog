import { useEffect, useMemo, useState } from "react";
import type { Product } from "~/types/catalog";
import { getProducts, saveProducts } from "~/lib/products.client";

function emptyProduct(): Product {
  return {
    id: crypto.randomUUID(),
    name: "",
    price: 0,
    description: "",
    imageUrl: "",
  };
}

export default function AdminRoute() {
  const [products, setProducts] = useState<Product[]>([]);
  const [draft, setDraft] = useState<Product>(emptyProduct());
  const [importText, setImportText] = useState<string>("");

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const exportText = useMemo(() => {
    return JSON.stringify({ products }, null, 2);
  }, [products]);

  const persist = (next: Product[]) => {
    setProducts(next);
    saveProducts(next);
  };

  const addProduct = () => {
    if (!draft.name.trim()) return;
    persist([draft, ...products]);
    setDraft(emptyProduct());
  };

  const updateProduct = (id: string, patch: Partial<Product>) => {
    persist(products.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  };

  const deleteProduct = (id: string) => {
    persist(products.filter((p) => p.id !== id));
  };

  const importProducts = () => {
    try {
      const parsed = JSON.parse(importText) as { products?: Product[] };
      if (!parsed.products || !Array.isArray(parsed.products)) return;
      persist(parsed.products);
    } catch {
      return;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-gray-900">Admin</div>
            <div className="text-xs text-gray-600">
              Gestiona productos (LocalStorage)
            </div>
          </div>
          <a
            href="/"
            className="rounded-xl border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
          >
            Volver
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-8">
        <section className="rounded-2xl border border-gray-200 bg-white p-4 space-y-4">
          <div className="text-sm font-semibold text-gray-900">Nuevo producto</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              value={draft.name}
              onChange={(e) => setDraft((p) => ({ ...p, name: e.target.value }))}
              placeholder="Nombre"
              className="rounded-xl border border-gray-200 px-3 py-2 text-sm"
            />
            <input
              value={draft.price}
              onChange={(e) =>
                setDraft((p) => ({ ...p, price: Number(e.target.value) }))
              }
              placeholder="Precio"
              type="number"
              className="rounded-xl border border-gray-200 px-3 py-2 text-sm"
            />
            <input
              value={draft.imageUrl ?? ""}
              onChange={(e) =>
                setDraft((p) => ({ ...p, imageUrl: e.target.value }))
              }
              placeholder="URL de imagen"
              className="rounded-xl border border-gray-200 px-3 py-2 text-sm sm:col-span-2"
            />
            <textarea
              value={draft.description ?? ""}
              onChange={(e) =>
                setDraft((p) => ({ ...p, description: e.target.value }))
              }
              placeholder="Descripción"
              className="rounded-xl border border-gray-200 px-3 py-2 text-sm sm:col-span-2 min-h-24"
            />
          </div>

          <button
            type="button"
            onClick={addProduct}
            className="rounded-xl px-4 py-2 text-sm font-semibold bg-[var(--color-brand)] text-[var(--color-brand-foreground)]"
          >
            Agregar
          </button>
        </section>

        <section className="space-y-3">
          <div className="text-sm font-semibold text-gray-900">Productos</div>

          <div className="grid grid-cols-1 gap-3">
            {products.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl border border-gray-200 bg-white p-4 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-gray-900 truncate">
                      {p.name}
                    </div>
                    <div className="text-xs text-gray-600 truncate">{p.id}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteProduct(p.id)}
                    className="rounded-xl border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Eliminar
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    value={p.name}
                    onChange={(e) => updateProduct(p.id, { name: e.target.value })}
                    className="rounded-xl border border-gray-200 px-3 py-2 text-sm"
                  />
                  <input
                    value={p.price}
                    onChange={(e) =>
                      updateProduct(p.id, { price: Number(e.target.value) })
                    }
                    type="number"
                    className="rounded-xl border border-gray-200 px-3 py-2 text-sm"
                  />
                  <input
                    value={p.imageUrl ?? ""}
                    onChange={(e) =>
                      updateProduct(p.id, { imageUrl: e.target.value })
                    }
                    className="rounded-xl border border-gray-200 px-3 py-2 text-sm sm:col-span-2"
                  />
                  <textarea
                    value={p.description ?? ""}
                    onChange={(e) =>
                      updateProduct(p.id, { description: e.target.value })
                    }
                    className="rounded-xl border border-gray-200 px-3 py-2 text-sm sm:col-span-2 min-h-24"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-4 space-y-3">
          <div className="text-sm font-semibold text-gray-900">Export / Import</div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="space-y-2">
              <div className="text-xs font-semibold text-gray-700">Export</div>
              <textarea
                readOnly
                value={exportText}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs font-mono min-h-56"
              />
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-gray-700">Import</div>
              <textarea
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs font-mono min-h-56"
              />
              <button
                type="button"
                onClick={importProducts}
                className="rounded-xl px-4 py-2 text-sm font-semibold bg-[var(--color-brand)] text-[var(--color-brand-foreground)]"
              >
                Importar
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
