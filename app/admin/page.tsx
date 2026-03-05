"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

// 🔐 CONTRASEÑA
const PASSWORD = "prontos9685";

interface Pedido {
  id: string;
  nombre: string;
  direccion: string;
  total: number;
  productos: any[];
  fecha: any;
  estado?: "pendiente" | "entregado";
}

export default function AdminPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [cargando, setCargando] = useState(true);
  const [autorizado, setAutorizado] = useState(false);

  // =========================
  // LOGIN
  // =========================
  useEffect(() => {
    const pass = prompt("🔐 Contraseña admin:");

    if (pass === PASSWORD) {
      setAutorizado(true);
    } else {
      alert("❌ Incorrecta");
      window.location.href = "/";
    }
  }, []);

  // =========================
  // CARGAR PEDIDOS
  // =========================
  useEffect(() => {
    if (!autorizado) return;

    const cargar = async () => {
      try {
        const q = query(
          collection(db, "pedidos"),
          orderBy("fecha", "desc")
        );

        const snap = await getDocs(q);

        const data = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        })) as Pedido[];

        setPedidos(data);
      } catch (e) {
        console.error(e);
      } finally {
        setCargando(false);
      }
    };

    cargar();
  }, [autorizado]);

  // =========================
  // CAMBIAR ESTADO
  // =========================
  const cambiarEstado = async (
    id: string,
    estado: "pendiente" | "entregado"
  ) => {
    try {
      const ref = doc(db, "pedidos", id);

      await updateDoc(ref, {
        estado,
      });

      setPedidos((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, estado } : p
        )
      );
    } catch (e) {
      alert("Error al actualizar");
      console.error(e);
    }
  };

  if (!autorizado) {
    return <p className="p-6">Verificando...</p>;
  }

  if (cargando) {
    return <p className="p-6">Cargando...</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">
        📋 Panel de Pedidos
      </h1>

      {pedidos.length === 0 && (
        <p>No hay pedidos</p>
      )}

      <div className="space-y-4">

        {pedidos.map((p) => (

          <div
            key={p.id}
            className="bg-white border rounded-xl p-4 shadow"
          >

            {/* INFO */}
            <div className="space-y-1">

              <p>
                <b>Cliente:</b> {p.nombre || "Sin nombre"}
              </p>

              <p>
                <b>Dirección:</b>{" "}
                {p.direccion || "No indicada"}
              </p>

              <p>
                <b>Total:</b> ${p.total}
              </p>

              <p>
                <b>Estado:</b>{" "}
                <span
                  className={
                    p.estado === "entregado"
                      ? "text-green-600 font-bold"
                      : "text-orange-600 font-bold"
                  }
                >
                  {p.estado || "pendiente"}
                </span>
              </p>

            </div>

            {/* PRODUCTOS */}
            <div className="mt-3">

              <p className="font-semibold">
                Productos:
              </p>

              <ul className="list-disc ml-6">
                {p.productos?.map(
                  (prod: any, i: number) => (
                    <li key={i}>
                      {prod.nombre} x {prod.cantidad}
                    </li>
                  )
                )}
              </ul>

            </div>

            {/* BOTONES */}
            <div className="flex gap-3 mt-4">

              <button
                onClick={() =>
                  cambiarEstado(p.id, "pendiente")
                }
                className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600"
              >
                ⏳ Pendiente
              </button>

              <button
                onClick={() =>
                  cambiarEstado(p.id, "entregado")
                }
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                ✅ Entregado
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}