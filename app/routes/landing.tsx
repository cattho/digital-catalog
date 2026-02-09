import { Link } from "react-router";
import type { Route } from "./+types/landing";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "CatalogoYa - Vende por WhatsApp" },
    {
      name: "description",
      content: "Crea tu catálogo digital gratis y recibe pedidos en WhatsApp.",
    },
  ];
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-gray-900">
            <div className="h-8 w-8 rounded-lg bg-green-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              C
            </div>
            CatalogoYa
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
            <a href="#features" className="hover:text-green-600 transition">
              Funciones
            </a>
            <a href="#how-it-works" className="hover:text-green-600 transition">
              Cómo funciona
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="hidden sm:block text-sm font-medium text-gray-600 hover:text-gray-900 transition"
            >
              Ingresar
            </Link>
            <Link
              to="/login"
              className="rounded-full px-5 py-2.5 text-sm font-bold bg-green-600 text-white hover:bg-green-700 transition shadow-lg shadow-green-200"
            >
              Crear Tienda Gratis
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-green-50 rounded-full blur-3xl -z-10 opacity-70"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-blue-50 rounded-full blur-3xl -z-10 opacity-70"></div>

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-100 bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Nuevo: Panel Administrativo
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-gray-900">
              Vende por <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                WhatsApp
              </span>{" "}
              sin complicaciones
            </h1>

            <p className="text-xl text-gray-500 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Crea tu catálogo digital en segundos. Tus clientes eligen, el
              pedido te llega al WhatsApp listo para enviar. Sin comisiones
              ocultas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/login"
                className="rounded-full px-8 py-4 text-lg font-bold bg-gray-900 text-white hover:bg-gray-800 transition hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-xl shadow-gray-200"
              >
                Comenzar Gratis
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  ></path>
                </svg>
              </Link>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-500 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-400"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <p>+2,500 negocios ya confían en nosotros</p>
            </div>
          </div>

          {/* Phone Mockup (Light Theme) */}
          <div className="relative mx-auto lg:ml-auto w-full max-w-sm group perspective-1000">
            <div className="relative z-10 bg-white border border-gray-200 rounded-[3rem] p-3 shadow-2xl transition-transform duration-500 group-hover:rotate-y-6 group-hover:rotate-x-6 ring-8 ring-gray-50">
              {/* Notch */}
              <div className="h-6 w-32 bg-gray-900 absolute top-3 left-1/2 -translate-x-1/2 rounded-b-2xl z-20"></div>

              {/* Screen Content */}
              <div className="bg-gray-50 rounded-[2.2rem] overflow-hidden h-[600px] border border-gray-100 relative">
                {/* App Header */}
                <div className="bg-white p-6 pt-12 border-b border-gray-100 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <div className="text-gray-900 font-bold text-sm">
                        Mi Tienda
                      </div>
                      <div className="text-green-600 text-xs font-medium">
                        Catálogo Digital
                      </div>
                    </div>
                  </div>
                </div>

                {/* Products Grid Mockup */}
                <div className="p-4 grid grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="bg-white rounded-xl p-3 space-y-2 border border-gray-100 shadow-sm"
                    >
                      <div className="aspect-square bg-gray-100 rounded-lg animate-pulse"></div>
                      <div className="h-3 w-2/3 bg-gray-100 rounded animate-pulse"></div>
                      <div className="h-3 w-1/3 bg-green-100 rounded"></div>
                    </div>
                  ))}
                </div>

                {/* Notification Toast Mockup */}
                <div className="absolute top-28 -right-8 bg-white border border-gray-100 p-3 rounded-xl shadow-xl flex items-center gap-3 animate-bounce-slow">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Nuevo Pedido</div>
                    <div className="text-sm font-bold text-gray-900">
                      2x Producto 1
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Negocios activos", value: "2,500+" },
            { label: "Pedidos procesados", value: "50K+" },
            { label: "Clientes satisfechos", value: "98%" },
            { label: "Para crear tu tienda", value: "< 30s" },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-3xl sm:text-4xl font-extrabold text-green-600 mb-1 tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-gray-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 tracking-tight">
              Todo lo que necesitas para vender más
            </h2>
            <p className="text-gray-500 text-lg">
              Herramientas poderosas y fáciles de usar para hacer crecer tu
              negocio.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Catálogo optimizado",
                desc: "Tu catálogo se ve perfecto en cualquier dispositivo. Carga rápida y navegación intuitiva.",
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    ></path>
                  </svg>
                ),
              },
              {
                title: "Pedidos por WhatsApp",
                desc: "Recibe los pedidos directamente en tu WhatsApp con todos los detalles listos.",
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    ></path>
                  </svg>
                ),
              },
              {
                title: "Panel Administrativo",
                desc: "Gestiona tus productos y configuración visual de la tienda muy fácilmente.",
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    ></path>
                  </svg>
                ),
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-gray-50 border border-gray-100 p-8 rounded-3xl hover:shadow-xl hover:shadow-gray-200/50 transition group duration-300"
              >
                <div className="w-12 h-12 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-green-600 shadow-sm group-hover:bg-green-600 group-hover:text-white transition mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section id="how-it-works" className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">
              Empieza a vender en 4 simples pasos
            </h2>
            <p className="text-gray-400 text-lg">
              No necesitas experiencia técnica.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                num: "01",
                title: "Crea tu cuenta",
                desc: "Regístrate gratis en menos de 1 minuto.",
              },
              {
                num: "02",
                title: "Agrega productos",
                desc: "Sube fotos, precios y descripciones.",
              },
              {
                num: "03",
                title: "Comparte enlace",
                desc: "Envía tu catálogo por redes sociales.",
              },
              {
                num: "04",
                title: "Recibe pedidos",
                desc: "Los pedidos llegan directo a tu WhatsApp.",
              },
            ].map((step, i) => (
              <div key={i} className="relative group">
                <div className="text-6xl font-black text-white/10 mb-4 transition group-hover:text-green-500/20">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-gray-100 bg-white text-center text-gray-500">
        <p>
          © {new Date().getFullYear()} CatalogoYa. Todos los derechos
          reservados.
        </p>
      </footer>
    </div>
  );
}
