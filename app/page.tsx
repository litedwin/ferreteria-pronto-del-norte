"use client";

import { useState } from "react";
import { useCart } from "./context/CartContext";
import CartModal from "./components/CartModal";

export default function Home() {

const { addToCart, cart } = useCart();

const [isCartOpen,setIsCartOpen] = useState(false);
const [busqueda,setBusqueda] = useState("");
const [categoria,setCategoria] = useState("Todos");
const [busquedaWhats,setBusquedaWhats] = useState("");
const [mensaje,setMensaje] = useState("");

const telefonoFijo="614-419-3049";
const whatsapp="5216143167360";

const totalItems = cart.reduce((acc,item)=>acc+item.cantidad,0);

const productosData=[
{ id:1,nombre:"Cemento Apasco 25kg",precio:140,categoria:"Cementos",imagen:"/productos/cemento-apasco.jpg"},
{ id:2,nombre:"Cemento Chihuahua 25kg",precio:150,categoria:"Cementos",imagen:"/productos/cemento-chihuahua.jpg"},
{ id:3,nombre:"Mortero 25kg",precio:120,categoria:"Cementos",imagen:"/productos/mortero.jpg"},
{ id:4,nombre:"Yeso 40kg",precio:180,categoria:"Recubrimientos",imagen:"/productos/yeso.jpg"},
{ id:5,nombre:"Estuco Bexel 20kg",precio:115,categoria:"Recubrimientos",imagen:"/productos/estuco bexeel.jpg"},
{ id:6,nombre:"Estuco Real 25kg",precio:105,categoria:"Recubrimientos",imagen:"/productos/estuco real.jpg"},
{ id:7,nombre:"Estuco Texa 20kg",precio:95,categoria:"Recubrimientos",imagen:"/productos/estuco texa.jpg"},
{ id:8,nombre:"Pegazulejo Blanco 20kg",precio:100,categoria:"Recubrimientos",imagen:"/productos/pegazulejo blanco.jpg"},
{ id:9,nombre:"Pegazulejo Gris 20kg",precio:90,categoria:"Recubrimientos",imagen:"/productos/pegazulejo gris.jpg"},
{ id:10,nombre:"Block 15",precio:17,categoria:"Estructura",imagen:"/productos/block15.jpg"},
{ id:11,nombre:"Block 12",precio:17,categoria:"Estructura",imagen:"/productos/block12.jpg"},
{ id:12,nombre:"Block 10",precio:17,categoria:"Estructura",imagen:"/productos/block10.jpg"},
{ id:13,nombre:"Ladrillo",precio:6,categoria:"Estructura",imagen:"/productos/ladrillo.jpg"},
{ id:14,nombre:'Casetón 6" 41x48',precio:25,categoria:"Estructura",imagen:"/productos/caseton6.jpg"},
{ id:15,nombre:"Metro Arena",precio:400,categoria:"Agregados",imagen:"/productos/arena.jpg"},
{ id:16,nombre:"Metro Revuelto",precio:400,categoria:"Agregados",imagen:"/productos/revuelto.jpg"},
{ id:17,nombre:"Cucharón",precio:150,categoria:"Agregados",imagen:"/productos/cucharon.jpg"},
{ id:18,nombre:"Medio",precio:250,categoria:"Agregados",imagen:"/productos/medio.jpg"},
{ id:19,nombre:"Carrucha",precio:60,categoria:"Agregados",imagen:"/productos/carrucha.jpg"},
{ id:20,nombre:"Bote",precio:13,categoria:"Agregados",imagen:"/productos/bote.jpg"},
{ id:21,nombre:"Pala",precio:4,categoria:"Agregados",imagen:"/productos/pala.jpg"},
];

const categorias=[
"Todos",
...Array.from(new Set(productosData.map(p=>p.categoria)))
];

const productosFiltrados=productosData.filter(p=>
(categoria==="Todos"||p.categoria===categoria)&&
p.nombre.toLowerCase().includes(busqueda.toLowerCase())
);

function agregarProducto(producto:any){

addToCart(producto);

setMensaje("Producto agregado");

setTimeout(()=>setMensaje(""),1500);

}

const preguntarWhatsApp=()=>{

if(!busquedaWhats.trim()){
alert("Escribe el producto que buscas");
return;
}

const mensaje=`Hola, estoy buscando este producto:\n\n${busquedaWhats}\n\n¿Lo tienen disponible?`;

const url=`https://wa.me/${whatsapp}?text=${encodeURIComponent(mensaje)}`;

window.location.href=url;

};

return(

<main className="bg-black text-white min-h-screen">

{mensaje && (
<div className="fixed top-6 left-1/2 -translate-x-1/2 bg-green-600 px-6 py-3 rounded-xl z-50 animate-bounce">
{mensaje}
</div>
)}

<div className="bg-gray-900 text-gray-300 text-center py-2 text-sm border-b border-gray-700">
Tel: {telefonoFijo} | WhatsApp: 614-316-7360
</div>

<nav className="bg-black border-b border-gray-800 px-4 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">

<div className="flex items-center gap-3 justify-center md:justify-start">
<img src="/logo.png" className="h-10"/>
<h1 className="text-lg md:text-2xl font-bold">
Ferretería Pronto del Norte
</h1>
</div>

<div className="flex gap-3 justify-center md:justify-end flex-wrap">

<button
onClick={()=>setIsCartOpen(true)}
className="bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
>
🛒 Ver carrito ({totalItems})
</button>

<a href="#productos">Productos</a>
<a href="#contacto">Contacto</a>

</div>

</nav>

<section className="text-center py-20 px-6 bg-gray-950">

<h2 className="text-3xl md:text-4xl font-bold mb-6">
Materiales para Construcción en Chihuahua
</h2>

<a
href={`https://wa.me/${whatsapp}`}
className="bg-white text-black px-8 py-3 rounded-xl font-semibold hover:bg-gray-300 transition"
>
Cotizar por WhatsApp
</a>

</section>

<section id="productos" className="py-14 px-6 md:px-10">

<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

{productosFiltrados.map(producto=>(

<div
key={producto.id}
className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden hover:scale-105 transition"
>

<img src={producto.imagen} className="w-full h-44 object-cover"/>

<div className="p-5 space-y-3">

<h4 className="font-semibold">{producto.nombre}</h4>

<p className="font-bold text-lg">${producto.precio}</p>

<button
onClick={()=>agregarProducto(producto)}
className="w-full bg-white text-black py-2 rounded-lg font-semibold hover:bg-gray-300 transition active:scale-95"
>
➕ Agregar al carrito
</button>

</div>

</div>

))}

</div>

</section>

<section className="bg-gray-900 py-16 text-center">

<h3 className="text-2xl font-bold mb-6">
Nuestros servicios
</h3>

<div className="space-y-2 text-gray-300">

<p>🚚 Entrega a domicilio</p>
<p>📦 Materiales para construcción</p>
<p>💬 Cotizaciones por WhatsApp</p>
<p>⚡ Atención rápida</p>

</div>

</section>

<section
id="contacto"
className="bg-gray-950 py-16 text-center border-t border-gray-800"
>

<h3 className="text-2xl font-bold mb-6">
Contacto
</h3>

<p className="mb-2">Tel: 614-419-3049</p>
<p className="mb-2">WhatsApp: 614-316-7360</p>

<p className="mt-4">
📍 Periodista Ignacio Rodríguez 237
<br/>
Colonia Revolución
<br/>
Chihuahua, Chihuahua
</p>

</section>

<CartModal
isOpen={isCartOpen}
onClose={()=>setIsCartOpen(false)}
/>

</main>

);

}