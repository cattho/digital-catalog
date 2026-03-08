import { useEffect, useState } from "react";
import type { Product } from "~/types/catalog";
import { formatMoney } from "~/lib/money";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ProductModal({
  product,
  currency,
  isOpen,
  onClose,
  onAdd,
}: {
  product: Product | null;
  currency: string;
  isOpen: boolean;
  onClose: () => void;
  onAdd: (product: Product) => void;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Resetear el índice cuando cambia el producto
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [product]);

  // Manejar el cierre con la tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Bloquear el scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm transition-opacity">
      <div 
        className="absolute inset-0" 
        onClick={onClose} 
        aria-label="Cerrar modal"
      />
      
      <div className="relative w-full max-w-2xl max-h-[90vh] sm:max-h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-md text-gray-700 hover:bg-gray-100 rounded-full transition shadow-sm"
        >
          ✕
        </button>

        {/* Contenedor escrolleable interno */}
        <div className="flex-1 overflow-y-auto w-full flex flex-col">
          {product.images && product.images.length > 0 ? (
            <div className="w-full bg-gray-50 border-b border-gray-100 p-8 flex shrink-0 items-center justify-center relative group h-[35vh] sm:h-[40vh]">
              <img
                src={product.images[currentImageIndex]}
                alt={`${product.name} - Imagen ${currentImageIndex + 1}`}
                className="max-h-full w-auto object-contain drop-shadow-sm transition-opacity duration-300"
              />
              
              {/* Controles del Carrusel (solo si hay más de 1 imagen) */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex((prev) => 
                        prev === 0 ? product.images!.length - 1 : prev - 1
                      );
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full shadow border border-gray-100 flex items-center justify-center text-gray-700 opacity-0 group-hover:opacity-100 transition-all active:scale-95"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex((prev) => 
                        prev === product.images!.length - 1 ? 0 : prev + 1
                      );
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full shadow border border-gray-100 flex items-center justify-center text-gray-700 opacity-0 group-hover:opacity-100 transition-all active:scale-95"
                    aria-label="Siguiente imagen"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  {product.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/10 backdrop-blur-md px-3 py-1.5 rounded-full z-10">
                      {product.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            idx === currentImageIndex 
                              ? "bg-gray-800 scale-125" 
                              : "bg-gray-400 hover:bg-gray-600"
                          }`}
                          aria-label={`Ir a imagen ${idx + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ) : product.imageUrl ? (
            <div className="w-full bg-gray-50 border-b border-gray-100 p-8 flex shrink-0 items-center justify-center h-[35vh] sm:h-[40vh]">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="max-h-full w-auto object-contain drop-shadow-sm"
              />
            </div>
          ) : (
             <div className="w-full bg-gray-50 border-b border-gray-100 flex shrink-0 items-center justify-center h-[35vh] sm:h-[40vh]">
               <div className="text-gray-400">Sin imagen</div>
             </div>
          )}
          
          <div className="p-6 sm:p-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h2>
              <div className="text-2xl font-extrabold text-green-600 whitespace-nowrap">
                {formatMoney(product.price, currency)}
              </div>
            </div>

            {product.description ? (
              <div className="prose prose-sm sm:prose-base text-gray-600">
                <p className="whitespace-pre-line leading-relaxed text-sm">
                  {product.description}
                </p>
              </div>
            ) : null}
          </div>
        </div>

        {/* Footer fijo del modal */}
        <div className="p-4 sm:p-5 bg-white border-t border-gray-100 flex shrink-0 flex-col-reverse sm:flex-row justify-end gap-3 w-full">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 active:scale-[0.98] transition-all"
          >
            Seguir viendo
          </button>
          <button
            onClick={() => {
              onAdd(product);
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-2.5 font-semibold text-white bg-green-600 rounded-xl hover:bg-green-700 active:scale-[0.98] transition-all shadow-md shadow-green-200"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}
