"use client";

import { useState, useRef, useEffect } from 'react';
import { Camera, X, RotateCcw, Move, ZoomIn, ZoomOut, Download, RefreshCw, AlertCircle, Upload } from 'lucide-react';

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Tatuagem padrão "Braço de Flor" com nova imagem
  const defaultTattoo = {
    id: 1,
    name: 'Braço de Flor',
    image: 'https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/8e2d1ae1-2df5-4b85-91e2-a8eebe69640d.png'
  };

  const currentTattoo = uploadedImage 
    ? { ...defaultTattoo, image: uploadedImage, name: 'Sua Tatuagem' }
    : (selectedTattoo || defaultTattoo);

  // Solicitar permissão e ativar câmera traseira
  const requestCameraPermission = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // Verificar se navegador suporta getUserMedia
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Seu navegador não suporta acesso à câmera. Use Chrome, Safari ou Firefox atualizado.');
      }

      // Solicitar câmera traseira (environment) com alta resolução
      const constraints = {
        video: {
          facingMode: { ideal: 'environment' }, // Câmera traseira
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          aspectRatio: { ideal: 16/9 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        
        // Aguardar vídeo carregar e reproduzir
        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) {
            videoRef.current.play().catch(err => {
              console.error('Erro ao reproduzir vídeo:', err);
            });
          }
        };

        setCameraPermission('granted');
        setIsARActive(true);
        
        console.log('✅ Câmera traseira ativada com sucesso');
        console.log('📹 Resolução:', stream.getVideoTracks()[0].getSettings());
        
        // Simular detecção de superfície (em produção, usar ARCore/ARKit via WebXR)
        setTimeout(() => {
          setSkinDetected(true);
          console.log('✅ Superfície detectada - Tatuagem projetada');
        }, 2000);
      }
    } catch (error: any) {
      console.error('❌ Erro ao acessar câmera:', error);
      
      let errorMsg = 'Erro ao acessar câmera. ';
      
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        errorMsg += 'Permissão negada. Permita o acesso à câmera nas configurações do navegador.';
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        errorMsg += 'Nenhuma câmera encontrada no dispositivo.';
      } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
        errorMsg += 'Câmera está sendo usada por outro aplicativo.';
      } else if (error.name === 'OverconstrainedError') {
        errorMsg += 'Câmera traseira não disponível. Tentando câmera frontal...';
        // Tentar câmera frontal como fallback
        tryFrontCamera();
        return;
      } else {
        errorMsg += error.message || 'Erro desconhecido.';
      }
      
      setErrorMessage(errorMsg);
      setCameraPermission('denied');
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback: tentar câmera frontal
  const tryFrontCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user', // Câmera frontal
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        
        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) {
            videoRef.current.play();
          }
        };
        
        setCameraPermission('granted');
        setIsARActive(true);
        setErrorMessage('⚠️ Usando câmera frontal (traseira não disponível)');
        
        setTimeout(() => {
          setSkinDetected(true);
        }, 2000);
      }
    } catch (error) {
      console.error('❌ Erro ao acessar câmera frontal:', error);
      setErrorMessage('Não foi possível acessar nenhuma câmera.');
      setCameraPermission('denied');
    }
  };

  // Upload de foto da galeria
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Verificar se é imagem
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Por favor, selecione uma imagem válida.');
      return;
    }

    // Ler arquivo e converter para base64
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setUploadedImage(result);
      console.log('✅ Imagem carregada da galeria');
    };
    reader.onerror = () => {
      setErrorMessage('Erro ao carregar imagem. Tente novamente.');
    };
    reader.readAsDataURL(file);
  };

  // Capturar foto com tatuagem projetada
  const capturePhoto = () => {
    if (!canvasRef.current || !videoRef.current) {
      setErrorMessage('Erro ao capturar foto. Tente novamente.');
      return;
    }
    
    setIsCapturing(true);
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      try {
        // Configurar canvas com dimensões do vídeo
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Desenhar frame do vídeo
        ctx.drawImage(video, 0, 0);
        
        // Desenhar tatuagem sobre o frame
        const tattooImg = new Image();
        tattooImg.crossOrigin = 'anonymous';
        tattooImg.src = currentTattoo.image;
        
        tattooImg.onload = () => {
          // Calcular posição e tamanho da tatuagem
          const tattooWidth = (canvas.width * tattooSize) / 100;
          const tattooHeight = tattooWidth; // Manter proporção
          const x = (canvas.width * tattooPosition.x) / 100 - tattooWidth / 2;
          const y = (canvas.height * tattooPosition.y) / 100 - tattooHeight / 2;
          
          // Aplicar transformações
          ctx.save();
          ctx.translate(x + tattooWidth / 2, y + tattooHeight / 2);
          ctx.rotate((tattooRotation * Math.PI) / 180);
          ctx.globalAlpha = 0.8;
          ctx.drawImage(tattooImg, -tattooWidth / 2, -tattooHeight / 2, tattooWidth, tattooHeight);
          ctx.restore();
          
          // Download da imagem
          setTimeout(() => {
            const link = document.createElement('a');
            link.download = `tattoar-preview-${currentTattoo.name.toLowerCase().replace(/\s/g, '-')}-${Date.now()}.jpg`;
            link.href = canvas.toDataURL('image/jpeg', 0.95);
            link.click();
            
            setIsCapturing(false);
            console.log('✅ Foto capturada com sucesso');
          }, 500);
        };
        
        tattooImg.onerror = () => {
          setErrorMessage('Erro ao carregar imagem da tatuagem.');
          setIsCapturing(false);
        };
      } catch (error) {
        console.error('❌ Erro ao capturar foto:', error);
        setErrorMessage('Falha ao capturar foto. Tente novamente.');
        setIsCapturing(false);
      }
    }
  };

  // Resetar posição da tatuagem
  const resetTattoo = () => {
    setTattooSize(50);
    setTattooPosition({ x: 50, y: 50 });
    setTattooRotation(0);
  };

  // Limpar recursos ao fechar ou desmontar
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => {
          track.stop();
          console.log('🛑 Câmera desativada');
        });
        streamRef.current = null;
      }
    };
  }, []);

  // Iniciar câmera automaticamente ao abrir
  useEffect(() => {
    if (isOpen && cameraPermission === 'pending') {
      requestCameraPermission();
    }
  }, [isOpen]);

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
            <p className="text-white/70 text-sm">{currentTattoo.name}</p>
          </div>
          
          <div className="flex items-center space-x-2">
            {skinDetected && (
              <button
                onClick={resetTattoo}
                className="text-white p-2 hover:bg-white/20 rounded-full transition-colors"
                title="Resetar posição"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Área principal da câmera */}
      <div className="flex-1 relative overflow-hidden">
        {/* Estado: Aguardando permissão */}
        {cameraPermission === 'pending' && !isLoading && (
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

        {/* Estado: Carregando */}
        {isLoading && (
          <div className="absolute inset-0 bg-black flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>
            <h3 className="text-white text-xl font-bold mb-4">Iniciando Câmera...</h3>
            <p className="text-white/70 max-w-sm">
              Aguarde enquanto ativamos a câmera traseira e iniciamos a sessão AR.
            </p>
          </div>
        )}

        {/* Estado: Permissão negada */}
        {cameraPermission === 'denied' && !isLoading && (
          <div className="absolute inset-0 bg-black flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 border-4 border-red-500/50 rounded-full flex items-center justify-center mb-6">
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-white text-xl font-bold mb-4">Erro ao Acessar Câmera</h3>
            <p className="text-white/70 mb-8 max-w-sm">
              {errorMessage || 'Permita o acesso à câmera para visualizar a tatuagem em 3D.'}
            </p>
            <button
              onClick={requestCameraPermission}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        )}

        {/* Estado: Câmera ativa */}
        {cameraPermission === 'granted' && (
          <>
            {/* Video da câmera - AGORA VISÍVEL */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
              style={{ display: 'block' }}
            />
            
            {/* Canvas para captura */}
            <canvas ref={canvasRef} className="hidden" />

            {/* Overlay AR */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Grid de detecção sutil */}
              <div className="absolute inset-0 opacity-10">
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
                  {skinDetected ? '✓ Superfície detectada' : '⟳ Detectando...'}
                </div>
              </div>

              {/* Mensagem de erro (se houver) */}
              {errorMessage && errorMessage.startsWith('⚠️') && (
                <div className="absolute top-16 left-4 right-4">
                  <div className="bg-yellow-500/20 border border-yellow-500 rounded-lg px-3 py-2 text-sm text-yellow-400">
                    {errorMessage}
                  </div>
                </div>
              )}

              {/* Pontos de detecção de superfície */}
              {skinDetected && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-40 h-60">
                    {/* Pontos de rastreamento AR */}
                    <div className="absolute top-8 left-1/2 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <div className="absolute top-20 left-6 w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    <div className="absolute top-20 right-6 w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                    <div className="absolute top-32 left-1/2 w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
                    <div className="absolute bottom-20 left-1/2 w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
                  </div>
                </div>
              )}

              {/* Tatuagem projetada sobre a superfície */}
              {skinDetected && (
                <div 
                  className="absolute pointer-events-none"
                  style={{
                    left: `${tattooPosition.x}%`,
                    top: `${tattooPosition.y}%`,
                    transform: `translate(-50%, -50%) rotate(${tattooRotation}deg) scale(${tattooSize / 50})`,
                    width: '150px',
                    height: '150px',
                  }}
                >
                  <img
                    src={currentTattoo.image}
                    alt={currentTattoo.name}
                    className="w-full h-full object-contain opacity-85"
                    style={{
                      filter: 'contrast(1.1) brightness(0.95) drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
                      mixBlendMode: 'multiply',
                    }}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Controles AR - Bottom */}
      {cameraPermission === 'granted' && skinDetected && (
        <div className="bg-black/90 backdrop-blur-sm border-t border-white/20 p-4">
          {/* Botão de Upload */}
          <div className="mb-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Upload className="w-5 h-5" />
              <span>Fazer Upload da Foto</span>
            </button>
          </div>

          {/* Controles de ajuste */}
          <div className="space-y-3 mb-4">
            {/* Tamanho */}
            <div className="flex items-center space-x-3">
              <ZoomOut className="w-4 h-4 text-white flex-shrink-0" />
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-white text-xs">Tamanho</span>
                  <span className="text-white/70 text-xs">{tattooSize}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={tattooSize}
                  onChange={(e) => setTattooSize(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <ZoomIn className="w-4 h-4 text-white flex-shrink-0" />
            </div>

            {/* Posição Horizontal */}
            <div className="flex items-center space-x-3">
              <Move className="w-4 h-4 text-white flex-shrink-0" />
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-white text-xs">Posição Horizontal</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={tattooPosition.x}
                  onChange={(e) => setTattooPosition(prev => ({ ...prev, x: Number(e.target.value) }))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Posição Vertical */}
            <div className="flex items-center space-x-3">
              <Move className="w-4 h-4 text-white flex-shrink-0" />
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-white text-xs">Posição Vertical</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="80"
                  value={tattooPosition.y}
                  onChange={(e) => setTattooPosition(prev => ({ ...prev, y: Number(e.target.value) }))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Rotação */}
            <div className="flex items-center space-x-3">
              <RotateCcw className="w-4 h-4 text-white flex-shrink-0" />
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-white text-xs">Rotação</span>
                  <span className="text-white/70 text-xs">{tattooRotation}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={tattooRotation}
                  onChange={(e) => setTattooRotation(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex items-center justify-center space-x-3">
            <button
              onClick={capturePhoto}
              disabled={isCapturing}
              className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-5 h-5" />
              <span>{isCapturing ? 'Capturando...' : 'Capturar Foto'}</span>
            </button>
          </div>

          {/* Instruções */}
          <div className="text-center mt-3">
            <p className="text-white/60 text-xs">
              Mova o celular para ver a tatuagem de diferentes ângulos
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
