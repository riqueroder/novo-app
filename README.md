# novo-app
Projeto criado via Lasy - novo-app
📱 Sobre o Projeto

TattoAR é um app/site que permite ao usuário visualizar tatuagens em tempo real com realidade aumentada (AR), projetando o design diretamente sobre o corpo através da câmera traseira do celular.
O app está integrado com GitHub, Vercel e Supabase.

O design é minimalista, moderno, preto e branco, com estética inspirada em tatuagens profissionais.

⚙️ Funcionalidades Principais

Acesso à câmera traseira e exibição em tempo real no app.

Projeção 3D das tatuagens sobre a pele via AR.

Upload de fotos da galeria do usuário.

Fechamento da câmera com retorno automático à tela anterior.

Galeria com imagens de fundo transparente (.png).

🧠 Problema Atual

Atualmente, quando o usuário clica em “Abrir Câmera” ou “Ver Design”, o app solicita a permissão da câmera, mas o vídeo não aparece na tela — embora o sistema reconheça que a câmera está em uso.
O objetivo é corrigir isso, garantindo que o vídeo e a tatuagem sejam exibidos corretamente.

🧱 Instruções Técnicas de Implementação
1. 🧍‍♂️ Câmera e Projeção 3D

Quando o usuário clicar em qualquer botão de visualização (ex: “Abrir Câmera”, “Testar Design”, “Ver em 3D”):

O app deve:

Solicitar permissão da câmera traseira principal (facingMode: "environment").

Exibir o vídeo da câmera ao vivo dentro do app.

Renderizar a tatuagem em projeção 3D sobre a imagem da câmera.

Incluir um botão “Fechar Câmera”, que encerra o stream e retorna à tela anterior.

🧩 Exemplo de Código React (Componente da Câmera)
import React, { useEffect, useRef, useState } from "react";

export default function ARCamera({ selectedTattoo, onClose }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          await videoRef.current.play();
          setIsCameraActive(true);
        }
      } catch (error) {
        console.error("Erro ao acessar a câmera:", error);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    const drawTattoo = () => {
      const ctx = canvasRef.current?.getContext("2d");
      const video = videoRef.current;
      if (ctx && video && selectedTattoo) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(video, 0, 0, canvasRef.current.width, canvasRef.current.height);

        const tattoo = new Image();
        tattoo.src = selectedTattoo;
        tattoo.onload = () => {
          // Projeção simples da tatuagem (pode ser substituída por modelo 3D real)
          ctx.drawImage(tattoo, canvasRef.current.width / 3, canvasRef.current.height / 2.5, 150, 150);
        };
      }
      requestAnimationFrame(drawTattoo);
    };
    drawTattoo();
  }, [selectedTattoo]);

  const handleCloseCamera = () => {
    if (stream) stream.getTracks().forEach((t) => t.stop());
    setIsCameraActive(false);
    onClose && onClose();
  };

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center">
      <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" autoPlay muted playsInline />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <button
        onClick={handleCloseCamera}
        className="absolute top-5 right-5 bg-white text-black px-4 py-2 rounded-xl font-semibold shadow-lg"
      >
        Fechar Câmera
      </button>
    </div>
  );
}

💡 Como usar:
<ARCamera
  selectedTattoo="/images/tattoos/rosa-realista.png"
  onClose={() => setShowCamera(false)}
/>


Esse código:

Abre a câmera traseira.

Exibe o vídeo em tempo real.

Renderiza a tatuagem selecionada sobre a imagem.

Possui um botão “Fechar Câmera”.

Encerra o stream corretamente e retorna à tela anterior.

2. 🧠 Aba “Tecnologia AR”

Na seção com os textos:

“Anatomia Mapeada”

“AR Calibrado”

“Pronto para Tattoo”

Exibir a câmera em tempo real dentro do quadrado, com uma tatuagem aleatória da galeria como demonstração da tecnologia AR.

3. 🖼️ Aba “Galeria”

Substituir as tatuagens atuais pelas novas imagens enviadas:

Nome Atual	Novo Nome / Imagem
Rosa Realista	Rosa Realista (nova imagem)
Geométrico Minimal	Geométrico Minimal (nova imagem)
Mandala Sagrada	Mandala Sagrada (nova imagem)
Aquarela Abstrata	Aquarela Abstrata (nova imagem)
Biomecânico	Biomecânico (nova imagem)

Todas as imagens devem ter fundo transparente (.png).
A galeria deve manter o design preto e branco, com visual minimalista.

4. 📸 Upload de Foto

Ao clicar em “Fazer Upload da Foto”:

Solicitar permissão de acesso à galeria do dispositivo.

Após o upload, exibir a imagem no feed da câmera, sobreposta à tatuagem.

Permitir ajuste de escala, rotação e posição.

Recalibrar o AR automaticamente.

5. 🎨 Estilo e Design

Tema: preto e branco, estilo minimalista.

Tipografia limpa e interface fluida.

Layout com destaque para as tatuagens, sem poluição visual.

🚀 Tecnologias Sugeridas
Componente	Tecnologia
Frontend	React / Next.js
AR	Three.js / WebXR / Model-viewer
Backend	Supabase
Deploy	Vercel
Câmera	navigator.mediaDevices.getUserMedia()
Upload	Supabase Storage ou File API
✅ Critérios de Aceitação

A câmera abre e mostra vídeo ao vivo.

A tatuagem é projetada corretamente em 3D.

O botão “Fechar Câmera” funciona e retorna à tela anterior.

As imagens da galeria estão sem fundo branco.

O upload de fotos funciona e aplica a tatuagem em tempo real.

A aba Tecnologia AR mostra uma tatuagem aleatória como preview.
