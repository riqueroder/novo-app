"use client";

import { useState, useRef, useEffect } from 'react';
import { Camera, X, RotateCcw, Move, ZoomIn, ZoomOut, Download, RefreshCw } from 'lucide-react';

interface ARCameraProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTattoo?: {
    id: number;
    name: string;
    image: string;
  };
}

export default function ARCamera({ isOpen, onClose, selectedTattoo }: ARCameraProps) {
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'pending'>('pending');
  const [isARActive, setIsARActive] = useState(false);
  const [skinDetected, setSkinDetected] = useState(false);
  const [tattooSize, setTattooSize] = useState(50);
  const [tattooPosition, setTattooPosition] = useState({ x: 50, y: 50 });
  const [tattooRotation, setTattooRotation] = useState(0);
  const [isCapturing, setIsCapturing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simular solicitação de permissão da câmera
  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment', // Câmera traseira
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraPermission('granted');
        setIsARActive(true);
        
        // Simular detecção de pele após 2 segundos
        setTimeout(() => {
          setSkinDetected(true);
        }, 2000);
      }
    } catch (error) {
      console.error('Erro ao acessar câmera:', error);
      setCameraPermission('denied');
    }
  };

  // Capturar foto com tatuagem
  const capturePhoto = () => {
    if (!canvasRef.current || !videoRef.current) return;
    
    setIsCapturing(true);
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);
      
      // Simular salvamento da foto
      setTimeout(() => {
        setIsCapturing(false);
        // Aqui seria o download da imagem
        const link = document.createElement('a');
        link.download = `tattoo-preview-${Date.now()}.jpg`;
        link.href = canvas.toDataURL();
        link.click();
      }, 1000);
    }
  };

  // Limpar recursos ao fechar
  useEffect(() => {
    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header da câmera AR */}
      <div className="relative z-10 bg-black/80 backdrop-blur-sm border-b border-white/20">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onClose}
            className="text-white p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="text-center">
            <h3 className="text-white font-bold text-lg">TattoAR</h3>
            <p className="text-white/70 text-sm">Visualização 3D</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.location.reload()}
              className="text-white p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Área principal da câmera */}
      <div className="flex-1 relative overflow-hidden">
        {cameraPermission === 'pending' && (
          <div className="absolute inset-0 bg-black flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 border-4 border-white/30 rounded-full flex items-center justify-center mb-6">
              <Camera className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-white text-xl font-bold mb-4">Acesso à Câmera</h3>
            <p className="text-white/70 mb-8 max-w-sm">
              Para visualizar sua tatuagem em realidade aumentada, precisamos acessar sua câmera traseira.
            </p>
            <button
              onClick={requestCameraPermission}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors"
            >
              Permitir Câmera
            </button>
          </div>
        )}

        {cameraPermission === 'denied' && (
          <div className="absolute inset-0 bg-black flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 border-4 border-red-500/50 rounded-full flex items-center justify-center mb-6">
              <X className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-white text-xl font-bold mb-4">Permissão Negada</h3>
            <p className="text-white/70 mb-8 max-w-sm">
              Permita o acesso à câmera para visualizar a tatuagem em 3D.
            </p>
            <button
              onClick={requestCameraPermission}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        )}

        {cameraPermission === 'granted' && (
          <>
            {/* Video da câmera */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            
            {/* Canvas para captura */}
            <canvas ref={canvasRef} className="hidden" />

            {/* Overlay AR */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Grid de detecção */}
              <div className="absolute inset-0 opacity-20">
                <div className="grid grid-cols-8 gap-px h-full">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div key={i} className="border border-blue-500/30"></div>
                  ))}
                </div>
              </div>

              {/* Indicadores de status */}
              <div className="absolute top-4 left-4 right-4 flex justify-between">
                <div className={`px-3 py-1 rounded-lg text-sm font-medium border ${
                  isARActive 
                    ? 'bg-green-500/20 border-green-500 text-green-400' 
                    : 'bg-red-500/20 border-red-500 text-red-400'
                }`}>
                  {isARActive ? '● AR Ativo' : '● AR Inativo'}
                </div>
                
                <div className={`px-3 py-1 rounded-lg text-sm font-medium border ${
                  skinDetected 
                    ? 'bg-green-500/20 border-green-500 text-green-400' 
                    : 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
                }`}>
                  {skinDetected ? '✓ Pele detectada' : '⟳ Detectando...'}
                </div>
              </div>

              {/* Pontos de detecção de superfície */}
              {skinDetected && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-40 h-60">
                    {/* Pontos de rastreamento */}
                    <div className="absolute top-8 left-1/2 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <div className="absolute top-20 left-6 w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    <div className="absolute top-20 right-6 w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                    <div className="absolute top-32 left-1/2 w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
                    <div className="absolute bottom-20 left-1/2 w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
                  </div>
                </div>
              )}

              {/* Tatuagem projetada */}
              {skinDetected && selectedTattoo && (
                <div 
                  className="absolute pointer-events-none"
                  style={{
                    left: `${tattooPosition.x}%`,
                    top: `${tattooPosition.y}%`,
                    transform: `translate(-50%, -50%) rotate(${tattooRotation}deg) scale(${tattooSize / 50})`,
                    width: '120px',
                    height: '120px',
                  }}
                >
                  <img
                    src={selectedTattoo.image}
                    alt={selectedTattoo.name}
                    className="w-full h-full object-contain opacity-80 mix-blend-multiply"
                    style={{
                      filter: 'contrast(1.2) brightness(0.9)',
                    }}
                  />
                  {/* Sombra realista */}
                  <div 
                    className="absolute inset-0 bg-black/20 blur-sm"
                    style={{ transform: 'translate(2px, 2px)' }}
                  ></div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Controles AR - Bottom */}
      {cameraPermission === 'granted' && skinDetected && (
        <div className="bg-black/80 backdrop-blur-sm border-t border-white/20 p-4">
          {/* Controles de ajuste */}
          <div className="space-y-4 mb-4">
            {/* Tamanho */}
            <div className="flex items-center space-x-4">
              <ZoomOut className="w-5 h-5 text-white" />
              <input
                type="range"
                min="20"
                max="100"
                value={tattooSize}
                onChange={(e) => setTattooSize(Number(e.target.value))}
                className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
              />
              <ZoomIn className="w-5 h-5 text-white" />
            </div>

            {/* Posição X */}
            <div className="flex items-center space-x-4">
              <Move className="w-5 h-5 text-white" />
              <input
                type="range"
                min="10"
                max="90"
                value={tattooPosition.x}
                onChange={(e) => setTattooPosition(prev => ({ ...prev, x: Number(e.target.value) }))}
                className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-white text-sm w-8">X</span>
            </div>

            {/* Posição Y */}
            <div className="flex items-center space-x-4">
              <Move className="w-5 h-5 text-white" />
              <input
                type="range"
                min="20"
                max="80"
                value={tattooPosition.y}
                onChange={(e) => setTattooPosition(prev => ({ ...prev, y: Number(e.target.value) }))}
                className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-white text-sm w-8">Y</span>
            </div>

            {/* Rotação */}
            <div className="flex items-center space-x-4">
              <RotateCcw className="w-5 h-5 text-white" />
              <input
                type="range"
                min="0"
                max="360"
                value={tattooRotation}
                onChange={(e) => setTattooRotation(Number(e.target.value))}
                className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-white text-sm w-12">{tattooRotation}°</span>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={capturePhoto}
              disabled={isCapturing}
              className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
            >
              <Download className="w-5 h-5" />
              <span>{isCapturing ? 'Capturando...' : 'Capturar Foto'}</span>
            </button>
          </div>

          {/* Instruções */}
          <div className="text-center mt-4">
            <p className="text-white/70 text-sm">
              Mova o celular para ver a tatuagem de diferentes ângulos
            </p>
          </div>
        </div>
      )}
    </div>
  );
}