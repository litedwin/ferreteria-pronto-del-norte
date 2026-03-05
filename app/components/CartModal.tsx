"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface Location {
  lat: number;
  lng: number;
}

export default function CartModal({ isOpen, onClose }: Props) {
  const { cart, clearCart, getTotal, updateQuantity, removeFromCart } =
    useCart();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [reference, setReference] = useState("");
  const [loading, setLoading] = useState(false);

  const STORE_LOCATION: Location = {
    lat: 28.698815,
    lng: -106.116455,
  };

  if (!isOpen) return null;

  function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371;

    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;

    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  }

  function calculateShipping(km: number) {
    if (km <= 1) return 50;
    if (km <= 2) return 100;
    if (km <= 3) return 150;
    return Math.round(km * 50);
  }

  function getUserLocation(): Promise<Location> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Sin GPS");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        () => reject("Error GPS")
      );
    });
  }

  async function enviarWhatsApp() {
    if (!name.trim() || !address.trim()) {
      alert("Llena todos los campos");
      return;
    }

    if (cart.length === 0) {
      alert("Carrito vacío");
      return;
    }

    setLoading(true);

    try {
      const userLocation = await getUserLocation();

      const distance = getDistance(
        STORE_LOCATION.lat,
        STORE_LOCATION.lng,
        userLocation.lat,
        userLocation.lng
      );

      const shipping = calculateShipping(distance);
      const subtotal = getTotal();
      const total = subtotal + shipping;

      const mapsLink = `https://www.google.com/maps?q=${userLocation.lat},${userLocation.lng}`;

      let message = `🧱 Pedido Ferretería Prontos del Norte\n\n`;

      message += `👤 Nombre: ${name}\n`;
      message += `📍 Dirección: ${address}\n`;
      message += `🏠 Referencias: ${reference}\n\n`;
      message += `📍 Ubicación:\n${mapsLink}\n\n`;

      message += `📦 Productos:\n`;

      cart.forEach((item) => {
        message += `- ${item.nombre} x${item.cantidad} = $${item.precio *
          item.cantidad}\n`;
      });

      message += `\nSubtotal: $${subtotal}`;
      message += `\nEnvío: $${shipping}`;
      message += `\nTotal: $${total}`;

      await addDoc(collection(db, "orders"), {
        name,
        address,
        reference,
        cart,
        subtotal,
        shipping,
        total,
        mapsLink,
        status: "pendiente",
        createdAt: serverTimestamp(),
      });

      const phone = "5216143167360";

      const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

      window.location.href = url;

      clearCart();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error al enviar");
    }

    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4">

      <div className="bg-white text-black w-full max-w-lg rounded-2xl shadow-xl flex flex-col max-h-[90vh]">

        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">🛒 Tu carrito</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">

          {cart.map((item) => (
            <div key={item.id} className="border rounded-lg p-3">

              <div className="flex justify-between font-semibold">
                <span>{item.nombre}</span>
                <button onClick={() => removeFromCart(item.id)}>❌</button>
              </div>

              <div className="flex justify-between mt-2">

                <div className="flex gap-2">
                  <button onClick={() => updateQuantity(item.id, item.cantidad - 1)}>-</button>
                  <span>{item.cantidad}</span>
                  <button onClick={() => updateQuantity(item.id, item.cantidad + 1)}>+</button>
                </div>

                <span>${item.precio * item.cantidad}</span>

              </div>

            </div>
          ))}

        </div>

        <div className="p-4 space-y-3">

          <input
            placeholder="Nombre"
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Dirección"
            className="w-full border p-2 rounded"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <input
            placeholder="Referencias"
            className="w-full border p-2 rounded"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
          />

          <p className="font-bold text-center">
            Subtotal: ${getTotal()}
          </p>

        </div>

        <div className="p-4 flex gap-2">

          <button
            onClick={onClose}
            className="flex-1 bg-gray-400 text-white py-2 rounded"
          >
            Cancelar
          </button>

          <button
            onClick={enviarWhatsApp}
            disabled={loading}
            className="flex-1 bg-green-600 text-white py-2 rounded"
          >
            {loading ? "Enviando..." : "Enviar pedido"}
          </button>

        </div>

      </div>

    </div>
  );
}