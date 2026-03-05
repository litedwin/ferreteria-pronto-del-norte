import "./globals.css";
import { CartProvider } from "./context/CartContext";

export const metadata = {
  title: "Ferretería Pronto del Norte",
  description: "Catálogo de productos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        />
      </head>

      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}