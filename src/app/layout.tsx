import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InkVision AR - Visualize Tatuagens em 3D e Realidade Aumentada",
  description: "Veja sua próxima tatuagem em 3D e Realidade Aumentada antes de fazer. Galeria com milhares de designs profissionais. Sua arte antes da agulha.",
  keywords: "tatuagem, 3D, realidade aumentada, AR, visualização, tattoo, design",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}