import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { supabase } from "~/lib/supabase";
import type { Route } from "./+types/login";

// 1. Meta datos para el título de la pestaña
export function meta({}: Route.MetaArgs) {
  return [{ title: "Iniciar Sesión - Catalogo Digital" }];
}

// 2. Componente principal (CLIENT SIDE ONLY)
export default function Login() {
  const [params] = useSearchParams();
  const navigate = useNavigate(); // Usamos esto para redirigir más rápido

  const success = params.get("success");

  // Estados
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado para bloqueo de botón

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true); // Activamos carga

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const slug = formData.get("slug") as string;

    try {
      if (isSignUp) {
        // --- LÓGICA DE REGISTRO ---
        if (!slug) throw new Error("Debes elegir una URL para tu tienda");

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              slug,
              store_name: "Mi Tienda",
            },
          },
        });

        if (error) throw error;

        setMessage("Cuenta creada! Revisa tu email para confirmar.");
        setIsSignUp(false);
      } else {
        // --- LÓGICA DE LOGIN ---
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        // Login exitoso: Redirigir al admin
        navigate("/admin");
      }
    } catch (error: any) {
      setMessage(error.message || "Ocurrió un error inesperado");
    } finally {
      setIsLoading(false); // Desactivamos carga pase lo que pase
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 font-sans">
      <div className="w-full max-w-md space-y-8 rounded-3xl bg-white p-10 shadow-xl shadow-gray-200/50 border border-gray-100">
        {/* Encabezado */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-xl bg-green-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-green-200 mb-6">
            C
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            {isSignUp ? "Crea tu tienda gratis" : "Bienvenido de nuevo"}
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            {isSignUp
              ? "Empieza a vender por WhatsApp en segundos"
              : "Ingresa tus credenciales para administrar tu catálogo"}
          </p>
        </div>

        {/* Mensajes de éxito o error */}
        {success && (
          <div className="rounded-xl bg-green-50 p-4 text-sm font-medium text-green-700 border border-green-100">
            ✅ Registro exitoso. Por favor inicia sesión.
          </div>
        )}

        {message && (
          <div
            className={`rounded-xl p-4 text-sm font-medium border ${message.includes("creada") ? "bg-blue-50 text-blue-700 border-blue-100" : "bg-red-50 text-red-600 border-red-100"}`}
          >
            {message}
          </div>
        )}

        {/* Formulario */}
        <form className="mt-8 space-y-5" onSubmit={handleAuth}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                disabled={isLoading}
                className="block w-full rounded-xl border-gray-200 bg-gray-50/50 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-green-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all sm:text-sm disabled:opacity-50"
                placeholder="ejemplo@correo.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                disabled={isLoading}
                className="block w-full rounded-xl border-gray-200 bg-gray-50/50 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-green-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all sm:text-sm disabled:opacity-50"
                placeholder="••••••••"
              />
            </div>

            {isSignUp && (
              <div>
                <label
                  htmlFor="slug"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  URL de tu tienda
                </label>
                <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50/50 px-3 focus-within:border-green-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-green-500/20 transition-all">
                  <span className="shrink-0 text-gray-500 select-none sm:text-sm">
                    catalogo.app/
                  </span>
                  <input
                    id="slug"
                    name="slug"
                    type="text"
                    required
                    disabled={isLoading}
                    className="block w-full border-0 bg-transparent py-3 pl-1 text-gray-900 placeholder-gray-400 focus:ring-0 sm:text-sm disabled:opacity-50"
                    placeholder="mi-negocio"
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-xl bg-green-600 px-4 py-3 text-sm font-bold text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all shadow-lg shadow-green-200 hover:shadow-green-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Procesando...
                </span>
              ) : isSignUp ? (
                "Crear Cuenta"
              ) : (
                "Iniciar Sesión"
              )}
            </button>
          </div>
        </form>

        <div className="text-center pt-2">
          <button
            type="button"
            className="text-sm font-medium text-gray-500 hover:text-green-600 transition"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setMessage("");
            }}
          >
            {isSignUp
              ? "¿Ya tienes cuenta? Inicia sesión aquí"
              : "¿No tienes cuenta? Regístrate gratis"}
          </button>
        </div>
      </div>

      <div className="absolute bottom-6 text-xs text-center text-gray-400">
        © {new Date().getFullYear()} CatalogoYa. Plataforma segura.
      </div>
    </div>
  );
}
