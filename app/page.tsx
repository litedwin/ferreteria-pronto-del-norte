"use client";

import { useState } from "react";
import { useCart } from "./context/CartContext";
import CartModal from "./components/CartModal";

export default function Home() {
  const { addToCart } = useCart();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [busquedaWhats, setBusquedaWhats] = useState("");

  const telefonoFijo = "614-419-3049";
  const whatsapp = "526143167360";

  const productosData = [
    {
      id: 1,
      nombre: "Cemento Apasco 25kg",
      precio: 140,
      categoria: "Cementos",
      imagen: "/productos/cemento-apasco.jpg",
    },
    {
      id: 2,
      nombre: "Cemento Chihuahua 25kg",
      precio: 150,
      categoria: "Cementos",
      imagen: "/productos/cemento-chihuahua.jpg",
    },
    {
      id: 3,
      nombre: "Mortero 25kg",
      precio: 120,
      categoria: "Cementos",
      imagen: "/productos/mortero.jpg",
    },
    {
      id: 4,
      nombre: "Yeso 40kg",
      precio: 180,
      categoria: "Recubrimientos",
      imagen: "/productos/yeso.jpg",
    },
    {
      id: 5,
      nombre: "Estuco Bexel 20kg",
      precio: 115,
      categoria: "Recubrimientos",
      imagen: "/productos/estuco bexeel.jpg",
    },
    {
      id: 6,
      nombre: "Estuco Real 25kg",
      precio: 105,
      categoria: "Recubrimientos",
      imagen: "/productos/estuco real.jpg",
    },
    {
      id: 7,
      nombre: "Estuco Texa 20kg",
      precio: 95,
      categoria: "Recubrimientos",
      imagen: "/productos/estuco texa.jpg",
    },
    {
      id: 8,
      nombre: "Pegazulejo Blanco 20kg",
      precio: 100,
      categoria: "Recubrimientos",
      imagen: "/productos/pegazulejo blanco.jpg",
    },
    {
      id: 9,
      nombre: "Pegazulejo Gris 20kg",
      precio: 90,
      categoria: "Recubrimientos",
      imagen: "/productos/pegazulejo gris.jpg",
    },
    {
      id: 10,
      nombre: "Block 15",
      precio: 17,
      categoria: "Estructura",
      imagen: "/productos/block15.jpg",
    },
    {
      id: 11,
      nombre: "Block 12",
      precio: 17,
      categoria: "Estructura",
      imagen: "/productos/block12.jpg",
    },
    {
      id: 12,
      nombre: "Block 10",
      precio: 17,
      categoria: "Estructura",
      imagen: "/productos/block10.jpg",
    },
    {
      id: 13,
      nombre: "Ladrillo",
      precio: 6,
      categoria: "Estructura",
      imagen: "/productos/ladrillo.jpg",
    },
    {
      id: 14,
      nombre: 'Casetón 6" 41x48',
      precio: 25,
      categoria: "Estructura",
      imagen: "/productos/caseton6.jpg",
    },
    {
      id: 15,
      nombre: "Metro Arena",
      precio: 400,
      categoria: "Agregados",
      imagen: "/productos/arena.jpg",
    },
    {
      id: 16,
      nombre: "Metro Revuelto",
      precio: 400,
      categoria: "Agregados",
      imagen: "/productos/revuelto.jpg",
    },
    {
      id: 17,
      nombre: "Cucharón",
      precio: 150,
      categoria: "Agregados",
      imagen: "/productos/cucharon.jpg",
    },
    {
      id: 18,
      nombre: "Medio",
      precio: 250,
      categoria: "Agregados",
      imagen: "/productos/medio.jpg",
    },
    {
      id: 19,
      nombre: "Carrucha",
      precio: 60,
      categoria: "Agregados",
      imagen: "/productos/carrucha.jpg",
    },
    {
      id: 20,
      nombre: "Bote",
      precio: 13,
      categoria: "Agregados",
      imagen: "/productos/bote.jpg",
    },
    {
      id: 21,
      nombre: "Pala",
      precio: 4,
      categoria: "Agregados",
      imagen: "/productos/pala.jpg",
    },
  ];

  const categorias = [
    "Todos",
    ...Array.from(new Set(productosData.map((p) => p.categoria))),
  ];

  const productosFiltrados = productosData.filter(
    (p) =>
      (categoria === "Todos" || p.categoria === categoria) &&
      p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const preguntarWhatsApp = () => {
    if (!busquedaWhats.trim()) {
      alert("Escribe el producto que buscas");
      return;
    }

    const mensaje = `Hola, estoy buscando este producto:\n\n${busquedaWhats}\n\n¿Lo tienen disponible?`;

    const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
      mensaje
    )}`;

    window.open(url, "_blank");
  };

  return (
    <main className="bg-black text-white min-h-screen">

      <div className="bg-gray-900 text-gray-300 text-center py-2 text-sm border-b border-gray-700">
        Tel: {telefonoFijo} | WhatsApp: 614-316-7360
      </div>

      <nav className="bg-black border-b border-gray-800 p-5 flex justify-between items-center">

        <div className="flex items-center gap-3">
          <img src="/logo.png" className="h-10" />
          <h1 className="text-xl md:text-2xl font-bold">
            Ferretería Pronto del Norte
          </h1>
        </div>

        <div className="flex items-center gap-6">

          <button
            onClick={() => setIsCartOpen(true)}
            className="bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            🛒 Ver carrito
          </button>

          <a href="#productos" className="hover:text-gray-400">
            Productos
          </a>

          <a href="#contacto" className="hover:text-gray-400">
            Contacto
          </a>

        </div>

      </nav>

      <section className="text-center py-24 bg-gray-950">

        <h2 className="text-4xl font-bold mb-6">
          Materiales para Construcción en Chihuahua
        </h2>

        <a
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          className="bg-white text-black px-8 py-3 rounded-xl font-semibold hover:bg-gray-300 transition"
        >
          Cotizar por WhatsApp
        </a>

      </section>

      <section id="productos" className="py-14 px-6 md:px-10">

        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10">

          <input
            type="text"
            placeholder="Buscar producto..."
            className="p-3 rounded-lg bg-gray-900 border border-gray-700 w-full md:w-1/3"
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <select
  value={categoria}
  className="p-3 rounded-lg bg-gray-900 border border-gray-700"
  onChange={(e) => setCategoria(e.target.value)}
>
            {categorias.map((cat, i) => (
              <option key={i}>{cat}</option>
            ))}
          </select>

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

          {productosFiltrados.map((producto) => (

            <div
              key={producto.id}
              className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden hover:scale-105 transition"
            >

              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-full h-44 object-cover"
              />

              <div className="p-5 space-y-3">

                <h4 className="font-semibold">
                  {producto.nombre}
                </h4>

                <p className="font-bold text-lg">
                  ${producto.precio}
                </p>

                <button
                  onClick={() =>
                    addToCart({
                      id: producto.id,
                      nombre: producto.nombre,
                      precio: producto.precio,
                    })
                  }
                  className="w-full bg-white text-black py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  ➕ Agregar al carrito
                </button>

              </div>

            </div>
          ))}

        </div>

        {/* SECCIÓN NUEVA */}

        <div className="mt-20 max-w-xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center">

          <h3 className="text-2xl font-bold mb-2">
            ¿No encuentras lo que buscas?
          </h3>

          <p className="text-gray-400 mb-6">
            Tenemos más de 5000 productos disponibles en tienda.
          </p>

          <input
            type="text"
            placeholder="Ejemplo: tubo de cobre 1/2, cople pvc..."
            value={busquedaWhats}
            onChange={(e) => setBusquedaWhats(e.target.value)}
            className="w-full p-3 rounded-lg bg-black border border-gray-700 mb-4"
          />

          <button
            onClick={preguntarWhatsApp}
            className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-semibold"
          >
            Preguntar por WhatsApp
          </button>

        </div>

      </section>

      <section
        id="contacto"
        className="bg-gray-950 py-16 text-center border-t border-gray-800"
      >

        <h3 className="text-2xl font-bold mb-6">
          Contacto
        </h3>

        <p>Tel: {telefonoFijo}</p>
        <p>WhatsApp: 614-316-7360</p>

      </section>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

    </main>
  );
}