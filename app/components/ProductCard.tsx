import type { Product } from "~/types/catalog";
import { formatMoney } from "~/lib/money";

export function ProductCard({
  product,
  currency,
  onAdd,
  onClickProduct,
}: {
  product: Product;
  currency: string;
  onAdd: (e: React.MouseEvent) => void;
  onClickProduct: () => void;
}) {
  return (
    <article 
      className="group rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer flex flex-col h-full"
      onClick={onClickProduct}
    >
      {/* Contenedor de la imagen arreglado para que no se estire */}
      <div className="aspect-[4/3] bg-gray-50 p-4 flex items-center justify-center relative border-b border-gray-100">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-300">
            ?
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1 gap-3">
        <div className="space-y-1 flex-1">
          <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-green-600 transition-colors">
            {product.name}
          </h3>
          {product.description ? (
            <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
              {product.description}
            </p>
          ) : null}
        </div>
        
        <div className="pt-2 flex items-center justify-between border-t border-gray-50 mt-auto">
          <div className="text-sm font-extrabold text-gray-900">
            {formatMoney(product.price, currency)}
          </div>
          
          <button
            type="button"
            onClick={onAdd}
            className="rounded-full px-4 py-1.5 text-xs font-bold bg-green-50 text-green-700 hover:bg-green-600 hover:text-white transition-colors border border-green-200 group-hover:border-green-600"
          >
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
}
