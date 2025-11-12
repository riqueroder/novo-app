"use client";

import { useState } from 'react';
import { Camera, Palette, Zap, Star, Play, Upload, RotateCcw, Move3D, Sparkles, Crown, Building2, Eye, Smartphone, Layers, ArrowRight, Check, Quote, Heart, ThumbsUp, Scan, Target, Brush, ChevronDown, Menu, X } from 'lucide-react';
import ARCamera from '../components/ARCamera';

export default function TattoARApp() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedTattoo, setSelectedTattoo] = useState(null);
  const [freeTrialsLeft, setFreeTrialsLeft] = useState(3);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isARCameraOpen, setIsARCameraOpen] = useState(false);

  const tattooStyles = [
    { 
      id: 1, 
      name: 'Braço de Flor', 
      style: 'Floral', 
      image: 'https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/8e2d1ae1-2df5-4b85-91e2-a8eebe69640d.png', 
      complexity: 'Alta' 
    },
    { id: 2, name: 'Rosa Realista', style: 'Realista', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop', complexity: 'Média' },
    { id: 3, name: 'Geométrico Minimal', style: 'Minimalista', image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=300&h=300&fit=crop', complexity: 'Baixa' },
    { id: 4, name: 'Mandala Sagrada', style: 'Geométrico', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop', complexity: 'Alta' },
    { id: 5, name: 'Aquarela Abstrata', style: 'Aquarela', image: 'https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?w=300&h=300&fit=crop', complexity: 'Média' },
    { id: 6, name: 'Biomecânico', style: 'Cyber', image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=300&h=300&fit=crop', complexity: 'Alta' }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Marina Silva",
      age: 28,
      location: "São Paulo, SP",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      tattoo: "Rosa Realista no Antebraço",
      rating: 5,
      text: "Cara, o TattoAR salvou minha vida! Eu estava super insegura sobre fazer minha primeira tatuagem. Testei pelo menos 15 designs diferentes no app antes de escolher a rosa realista. A visualização em AR foi PERFEITA - consegui ver exatamente como ficaria no meu antebraço. Fiz a tatuagem semana passada e ficou IDÊNTICA ao que vi no app! Meu tatuador até ficou impressionado com a precisão. Recomendo 1000%!",
      verified: true,
      tattooImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Carlos Eduardo",
      age: 35,
      location: "Rio de Janeiro, RJ",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      tattoo: "Mandala Geométrica no Braço",
      rating: 5,
      text: "Mano, que tecnologia incrível! Sou engenheiro e fiquei fascinado com a precisão do modelo 3D. Testei uma mandala gigante no braço inteiro e consegui ajustar cada detalhe - tamanho, posição, até a curvatura na musculatura. O resultado final da tatuagem ficou 100% igual ao que simulei no app. Economizei tempo e dinheiro, porque já sabia exatamente o que queria quando cheguei no estúdio. Virei cliente premium na hora!",
      verified: true,
      tattooImage: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=200&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Júlia Santos",
      age: 24,
      location: "Belo Horizonte, MG",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      tattoo: "Borboleta Aquarela no Pulso",
      rating: 5,
      text: "Gente, eu chorei de emoção quando vi minha tatuagem pronta! 😭 Usei o TattoAR pra testar uma borboleta aquarela no pulso e fiquei HORAS ajustando as cores e o tamanho. Minha mãe estava super preocupada, mas quando mostrei a simulação no app, ela ficou tranquila. A tatuagem ficou EXATAMENTE como no app - as cores, o sombreado, tudo perfeito! Agora já estou planejando a próxima usando o app. Melhor investimento da minha vida!",
      verified: true,
      tattooImage: "https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?w=200&h=200&fit=crop"
    }
  ];

  const plans = [
    {
      name: 'Básico',
      price: 'R$ 19,90',
      period: '/mês',
      icon: Eye,
      features: [
        'Visualizações ilimitadas',
        'Galeria com 500+ designs',
        'Modelo 3D básico',
        'Upload de imagens próprias',
        'Suporte por email'
      ],
      popular: false
    },
    {
      name: 'Premium',
      price: 'R$ 39,90',
      period: '/mês',
      icon: Crown,
      features: [
        'Tudo do plano Básico',
        'Realidade Aumentada (AR)',
        'Modelos 3D ultra-realistas',
        'Galeria com 2000+ designs',
        'Simulação de cicatrização',
        'Exportar em alta resolução',
        'Suporte prioritário'
      ],
      popular: true
    },
    {
      name: 'Estúdio Pro',
      price: 'R$ 99,90',
      period: '/mês',
      icon: Building2,
      features: [
        'Tudo do plano Premium',
        'Múltiplos usuários (até 5)',
        'Biblioteca personalizada',
        'API para integração',
        'Analytics avançado',
        'Marca branca',
        'Suporte dedicado 24/7'
      ],
      popular: false
    }
  ];

  // Função para abrir câmera AR
  const openARCamera = (tattoo = null) => {
    if (tattoo) {
      setSelectedTattoo(tattoo);
    }
    setIsARCameraOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden relative">
      {/* Elementos decorativos de fundo - Tatuagem minimalistas */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] overflow-hidden">
        {/* Linhas tribais minimalistas */}
        <div className="absolute top-20 left-10 w-32 h-32">
          <svg viewBox="0 0 100 100" className="w-full h-full stroke-gray-400 fill-none stroke-[0.5]">
            <path d="M20,50 Q50,20 80,50 Q50,80 20,50 Z" />
            <circle cx="50" cy="50" r="15" />
          </svg>
        </div>
        
        {/* Rosa estilizada */}
        <div className="absolute top-40 right-20 w-40 h-40">
          <svg viewBox="0 0 100 100" className="w-full h-full stroke-gray-400 fill-none stroke-[0.3]">
            <path d="M50,20 Q30,30 20,50 Q30,70 50,80 Q70,70 80,50 Q70,30 50,20 Z" />
            <path d="M50,30 Q40,35 35,45 Q40,55 50,60 Q60,55 65,45 Q60,35 50,30 Z" />
            <path d="M50,40 Q45,42 43,47 Q45,52 50,54 Q55,52 57,47 Q55,42 50,40 Z" />
          </svg>
        </div>
        
        {/* Serpente minimalista */}
        <div className="absolute bottom-32 left-32 w-48 h-24">
          <svg viewBox="0 0 120 60" className="w-full h-full stroke-gray-400 fill-none stroke-[0.4]">
            <path d="M10,30 Q30,10 50,30 Q70,50 90,30 Q110,10 120,30" />
            <circle cx="115" cy="30" r="3" />
          </svg>
        </div>
        
        {/* Caveira geométrica */}
        <div className="absolute bottom-20 right-32 w-28 h-28">
          <svg viewBox="0 0 100 100" className="w-full h-full stroke-gray-400 fill-none stroke-[0.4]">
            <path d="M30,30 Q50,20 70,30 L70,60 Q50,80 30,60 Z" />
            <circle cx="40" cy="45" r="4" />
            <circle cx="60" cy="45" r="4" />
            <path d="M45,55 L50,65 L55,55" />
          </svg>
        </div>
        
        {/* Agulha de tattoo estilizada */}
        <div className="absolute top-60 left-1/2 w-20 h-4">
          <svg viewBox="0 0 80 16" className="w-full h-full stroke-gray-400 fill-none stroke-[0.5]">
            <line x1="5" y1="8" x2="75" y2="8" />
            <polygon points="75,8 70,5 70,11" />
            <rect x="5" y="6" width="8" height="4" />
          </svg>
        </div>
      </div>

      {/* Header mobile-first */}
      <header className="relative z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo TattoAR com logo da água */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                {/* Logo da água fornecida pelo usuário */}
                <img 
                  src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/56821180-6a1c-4436-9ecf-07b8dfe7b3c5.png" 
                  alt="TattoAR Logo" 
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                  TattoAR
                </h1>
                <p className="text-xs text-gray-500 font-light -mt-1 hidden sm:block">Veja sua arte antes da agulha</p>
              </div>
            </div>
            
            {/* Navigation Desktop */}
            <nav className="hidden lg:flex items-center space-x-6">
              {[
                { id: 'home', label: 'Início' },
                { id: 'preview', label: 'Veja sua tattoo' },
                { id: 'galeria', label: 'Galeria' },
                { id: 'ar-tech', label: 'Tecnologia AR' },
                { id: 'depoimentos', label: 'Depoimentos' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`text-sm font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-gray-900 border-b-2 border-gray-900 pb-1'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              className="lg:hidden text-gray-900 p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* CTA Desktop */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="text-right">
                <p className="text-xs text-gray-500">Testes gratuitos</p>
                <p className="text-gray-900 font-bold text-sm">{freeTrialsLeft}/3</p>
              </div>
              <button 
                onClick={() => openARCamera()}
                className="bg-gray-900 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-800 transition-colors"
              >
                Começar Grátis
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-3 mt-4">
                {[
                  { id: 'home', label: 'Início' },
                  { id: 'preview', label: 'Veja sua tattoo' },
                  { id: 'galeria', label: 'Galeria' },
                  { id: 'ar-tech', label: 'Tecnologia AR' },
                  { id: 'depoimentos', label: 'Depoimentos' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`text-left text-sm font-medium transition-all duration-300 py-2 ${
                      activeSection === item.id ? 'text-gray-900 font-semibold' : 'text-gray-600'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="pt-4 border-t border-gray-200 mt-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600">Testes gratuitos:</span>
                    <span className="font-bold text-gray-900">{freeTrialsLeft}/3</span>
                  </div>
                  <button 
                    onClick={() => {
                      openARCamera();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg font-bold text-sm hover:bg-gray-800 transition-colors"
                  >
                    Começar Grátis
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Seção Home - Hero Mobile-First */}
      {activeSection === 'home' && (
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6">
          {/* Grid geométrico sutil */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div className="grid grid-cols-8 sm:grid-cols-12 gap-px h-full">
              {Array.from({ length: 96 }).map((_, i) => (
                <div key={i} className="border border-gray-300"></div>
              ))}
            </div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            {/* Logo grande central */}
            <div className="mb-8 sm:mb-12">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6">
                <img 
                  src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/56821180-6a1c-4436-9ecf-07b8dfe7b3c5.png" 
                  alt="TattoAR Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-gray-900 tracking-tighter mb-2 sm:mb-4">
                TattoAR
              </h1>
            </div>

            {/* Tagline principal */}
            <div className="mb-8 sm:mb-12">
              <p className="text-lg sm:text-2xl md:text-3xl text-gray-600 font-light mb-2 sm:mb-4">
                Visualize sua próxima tatuagem em
              </p>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                Realidade Aumentada
              </p>
              <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto"></div>
            </div>

            {/* Slogan */}
            <div className="mb-12 sm:mb-16">
              <p className="text-base sm:text-lg text-gray-500 italic font-light">
                "Veja sua arte antes da agulha"
              </p>
            </div>

            {/* CTAs principais - Mobile First */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-16 sm:mb-20">
              <button
                onClick={() => openARCamera()}
                className="group w-full sm:w-auto bg-gray-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-gray-800 transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <Camera className="w-5 h-5" />
                <span>Testar Agora</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => setActiveSection('galeria')}
                className="group w-full sm:w-auto border-2 border-gray-300 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium text-base sm:text-lg hover:border-gray-900 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <Palette className="w-5 h-5" />
                <span>Ver Galeria</span>
              </button>
            </div>

            {/* Features minimalistas - Mobile Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
              <div className="group text-center p-4 sm:p-0">
                <div className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:border-gray-400 transition-colors">
                  <Move3D className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" />
                </div>
                <h3 className="text-base sm:text-lg font-bold mb-2">Visualização 3D</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Modelos ultra-realistas com precisão milimétrica</p>
              </div>
              
              <div className="group text-center p-4 sm:p-0">
                <div className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:border-gray-400 transition-colors">
                  <Smartphone className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" />
                </div>
                <h3 className="text-base sm:text-lg font-bold mb-2">Realidade Aumentada</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Veja no seu próprio corpo em tempo real</p>
              </div>
              
              <div className="group text-center p-4 sm:p-0">
                <div className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:border-gray-400 transition-colors">
                  <Layers className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" />
                </div>
                <h3 className="text-base sm:text-lg font-bold mb-2">Galeria Premium</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Milhares de designs profissionais</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Seção "Veja sua tattoo antes de fazer" - Mobile First */}
      {activeSection === 'preview' && (
        <section className="min-h-screen py-12 sm:py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6 text-gray-900">
                Veja sua tattoo antes de fazer
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                Tecnologia de ponta para visualizar sua tatuagem com precisão fotorrealística
              </p>
            </div>

            {/* Mockup de braço com AR - Mobile First */}
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-16">
              <div className="relative order-2 lg:order-1">
                <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl border-2 border-gray-200 overflow-hidden relative">
                  {/* Simulação de braço */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-24 sm:w-32 h-60 sm:h-80 bg-gradient-to-b from-[#D4A574] to-[#C19A6B] rounded-full relative shadow-2xl">
                        {/* Tatuagem simulada - Braço de Flor */}
                        <div className="absolute top-16 sm:top-20 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 h-16 sm:h-20 opacity-80">
                          <img
                            src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/8e2d1ae1-2df5-4b85-91e2-a8eebe69640d.png"
                            alt="Braço de Flor"
                            className="w-full h-full object-contain mix-blend-multiply"
                          />
                        </div>
                        {/* Sombreamento realista */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/20 rounded-full"></div>
                      </div>
                      
                      {/* Indicadores AR */}
                      <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 border-2 border-blue-500 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      </div>
                      <div className="absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 border-2 border-blue-500 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Overlay AR */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex flex-col sm:flex-row justify-between gap-2">
                    <div className="bg-green-500/20 border border-green-500 rounded-lg px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium">
                      ✓ Braço detectado
                    </div>
                    <div className="bg-blue-500/20 border border-blue-500 rounded-lg px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium">
                      AR ativo
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Precisão Fotorrealística</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Detecção Automática</h4>
                        <p className="text-gray-600 text-sm">IA identifica automaticamente a anatomia do seu braço</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Curvatura Realista</h4>
                        <p className="text-gray-600 text-sm">Tatuagem se adapta perfeitamente à musculatura</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Iluminação Dinâmica</h4>
                        <p className="text-gray-600 text-sm">Sombreamento se ajusta à luz ambiente</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-4 sm:p-6">
                  <h4 className="font-bold text-lg mb-4">Controles Precisos</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Tamanho</label>
                      <input type="range" className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Posição</label>
                      <input type="range" className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Rotação</label>
                      <input type="range" className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer" />
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => openARCamera()}
                  className="w-full bg-gray-900 text-white py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-gray-800 transition-colors flex items-center justify-center space-x-3"
                >
                  <Camera className="w-5 h-5" />
                  <span>Começar Teste Gratuito</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Seção Galeria de designs - Mobile First */}
      {activeSection === 'galeria' && (
        <section className="min-h-screen py-12 sm:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6 text-gray-900">
                Galeria de Designs
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                Coleção curada de designs profissionais em preto e branco
              </p>
            </div>

            {/* Filtros minimalistas - Mobile First */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
              {['Todos', 'Floral', 'Realista', 'Minimalista', 'Geométrico', 'Aquarela'].map((style) => (
                <button
                  key={style}
                  className="px-3 sm:px-4 py-2 text-sm border-2 border-gray-200 rounded-lg hover:border-gray-900 hover:bg-gray-50 transition-all duration-300 font-medium"
                >
                  {style}
                </button>
              ))}
            </div>

            {/* Grid de designs - Mobile First */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12">
              {tattooStyles.map((tattoo) => (
                <div
                  key={tattoo.id}
                  className="group bg-gray-50 border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-gray-400 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedTattoo(tattoo)}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={tattoo.image}
                      alt={tattoo.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-2 sm:p-3">
                        <Play className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="font-bold text-xs sm:text-sm mb-1">{tattoo.name}</h3>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-600">{tattoo.style}</span>
                      <span className="text-gray-500">{tattoo.complexity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Upload personalizado - Mobile First */}
            <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-6 sm:p-8 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-dashed border-gray-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Design Personalizado</h3>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm">Envie sua própria arte para visualizar como tatuagem</p>
              <button className="bg-gray-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors">
                Fazer Upload
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Seção Tecnologia AR - Mobile First */}
      {activeSection === 'ar-tech' && (
        <section className="min-h-screen py-12 sm:py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6 text-gray-900">
                Tecnologia AR em Ação
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                Efeito futurista minimalista com precisão de última geração
              </p>
            </div>

            {/* Demonstração visual da tecnologia - Mobile First */}
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-16">
              <div className="relative order-2 lg:order-1">
                <div className="aspect-square bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 rounded-3xl border-2 border-gray-200 overflow-hidden relative">
                  {/* Efeito de scanner AR */}
                  <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse"></div>
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent animate-pulse"></div>
                    <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent animate-pulse"></div>
                  </div>
                  
                  {/* Grid de análise */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="grid grid-cols-8 gap-px h-full">
                      {Array.from({ length: 64 }).map((_, i) => (
                        <div key={i} className="border border-blue-500/30"></div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Pontos de detecção */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-32 sm:w-40 h-48 sm:h-60">
                      {/* Pontos de anatomia */}
                      <div className="absolute top-6 sm:top-8 left-1/2 w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                      <div className="absolute top-16 sm:top-20 left-4 sm:left-6 w-2 h-2 bg-blue-500 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                      <div className="absolute top-16 sm:top-20 right-4 sm:right-6 w-2 h-2 bg-blue-500 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                      <div className="absolute top-24 sm:top-32 left-1/2 w-2 h-2 bg-blue-500 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
                      <div className="absolute bottom-16 sm:bottom-20 left-1/2 w-2 h-2 bg-blue-500 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
                    </div>
                  </div>
                  
                  {/* Status da tecnologia */}
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                    <div className="bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-lg p-2 sm:p-3">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-0 text-xs">
                        <span className="text-green-600 font-medium">● Anatomia mapeada</span>
                        <span className="text-blue-600 font-medium">● AR calibrado</span>
                        <span className="text-purple-600 font-medium">● Pronto para tattoo</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Inovação Tecnológica</h3>
                  <div className="space-y-4 sm:space-y-6">
                    <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-4 sm:p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 border-2 border-blue-200 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Target className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-2">Mapeamento 3D</h4>
                          <p className="text-gray-600 text-sm">Algoritmos avançados criam modelo tridimensional preciso da anatomia</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-4 sm:p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 border-2 border-red-200 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-2">Processamento em Tempo Real</h4>
                          <p className="text-gray-600 text-sm">Renderização instantânea com 60fps para experiência fluida</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-4 sm:p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 border-2 border-purple-200 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-2">IA Adaptativa</h4>
                          <p className="text-gray-600 text-sm">Machine learning ajusta automaticamente para diferentes tons de pele</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-4 sm:p-6">
                  <h4 className="font-bold text-lg mb-3">Especificações Técnicas</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Precisão:</span>
                      <span className="text-gray-900 ml-2 font-medium">99.7%</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Latência:</span>
                      <span className="text-gray-900 ml-2 font-medium">&lt;16ms</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Resolução:</span>
                      <span className="text-gray-900 ml-2 font-medium">4K HDR</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Compatibilidade:</span>
                      <span className="text-gray-900 ml-2 font-medium">iOS/Android</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => openARCamera()}
                  className="w-full bg-gray-900 text-white py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-gray-800 transition-colors flex items-center justify-center space-x-3"
                >
                  <Camera className="w-5 h-5" />
                  <span>Experimentar Tecnologia AR</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Seção Depoimentos - Mobile First */}
      {activeSection === 'depoimentos' && (
        <section className="min-h-screen py-12 sm:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6 text-gray-900">
                Histórias Reais
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-4 sm:mb-6">
                Pessoas que usaram o TattoAR e realizaram o sonho da tatuagem perfeita
              </p>
              <div className="flex items-center justify-center space-x-2">
                <div className="flex space-x-1">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <span className="text-gray-600 font-medium text-sm">4.9/5 • Mais de 50.000 usuários</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-gray-50 border-2 border-gray-200 rounded-3xl p-6 sm:p-8 hover:border-gray-300 transition-all duration-300 relative"
                >
                  {/* Quote decorativo */}
                  <div className="absolute -top-3 left-6 sm:left-8">
                    <div className="bg-blue-500 w-6 h-6 rounded-full flex items-center justify-center">
                      <Quote className="w-3 h-3 text-white" />
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex space-x-1 mb-4">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>

                  {/* Texto do depoimento */}
                  <p className="text-gray-700 leading-relaxed mb-6 text-sm">
                    "{testimonial.text}"
                  </p>

                  {/* Info do usuário */}
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-bold text-gray-900 text-sm">{testimonial.name}</h4>
                        {testimonial.verified && (
                          <div className="bg-green-100 border border-green-300 rounded-full p-1">
                            <Check className="w-2 h-2 text-green-600" />
                          </div>
                        )}
                      </div>
                      <p className="text-gray-500 text-xs">{testimonial.age} anos • {testimonial.location}</p>
                    </div>
                  </div>

                  {/* Info da tatuagem */}
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-3">
                    <div className="flex items-center space-x-3">
                      <img
                        src={testimonial.tattooImage}
                        alt={testimonial.tattoo}
                        className="w-8 h-8 rounded-lg object-cover grayscale"
                      />
                      <div>
                        <p className="text-gray-900 font-medium text-xs">Tatuagem Realizada:</p>
                        <p className="text-gray-600 text-xs">{testimonial.tattoo}</p>
                      </div>
                    </div>
                  </div>

                  {/* Reações */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t-2 border-gray-200">
                    <div className="flex items-center space-x-3 text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-3 h-3 text-red-500" />
                        <span className="text-xs">127</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ThumbsUp className="w-3 h-3 text-blue-500" />
                        <span className="text-xs">89</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">Verificado • 2 semanas atrás</span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA final - Mobile First */}
            <div className="text-center bg-gray-50 border-2 border-gray-200 rounded-3xl p-8 sm:p-12">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">Sua História Pode Ser a Próxima!</h3>
              <p className="text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
                Junte-se a milhares de pessoas que já realizaram a tatuagem dos sonhos com total confiança
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button
                  onClick={() => openARCamera()}
                  className="bg-gray-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-gray-800 transition-colors"
                >
                  Começar Agora - 3 Testes Grátis
                </button>
                <button className="border-2 border-gray-300 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium text-base sm:text-lg hover:border-gray-900 hover:bg-gray-50 transition-colors">
                  Ver Planos
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Modal de tatuagem selecionada - Mobile First */}
      {selectedTattoo && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="bg-white border-2 border-gray-200 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">{selectedTattoo.name}</h3>
                  <p className="text-gray-600 text-sm">{selectedTattoo.style} • Complexidade: {selectedTattoo.complexity}</p>
                </div>
                <button
                  onClick={() => setSelectedTattoo(null)}
                  className="text-gray-400 hover:text-gray-900 text-2xl p-2"
                >
                  ×
                </button>
              </div>

              <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <img
                    src={selectedTattoo.image}
                    alt={selectedTattoo.name}
                    className="w-full h-60 sm:h-80 object-cover rounded-2xl grayscale"
                  />
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold mb-4">Visualizar em 3D</h4>
                    <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-6 text-center">
                      <Move3D className="w-10 h-10 sm:w-12 sm:h-12 text-gray-700 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4 text-sm">Modelo 3D interativo</p>
                      <button 
                        onClick={() => {
                          openARCamera(selectedTattoo);
                          setSelectedTattoo(null);
                        }}
                        className="bg-gray-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors"
                      >
                        Abrir Visualizador 3D
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold mb-4">Testar em AR</h4>
                    <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-6 text-center">
                      <Smartphone className="w-10 h-10 sm:w-12 sm:h-12 text-gray-700 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4 text-sm">Realidade Aumentada</p>
                      <button
                        onClick={() => {
                          openARCamera(selectedTattoo);
                          setSelectedTattoo(null);
                        }}
                        className="border-2 border-gray-300 px-6 py-3 rounded-lg font-medium hover:border-gray-900 hover:bg-gray-50 transition-colors"
                      >
                        Testar no Meu Braço
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Componente AR Camera */}
      <ARCamera 
        isOpen={isARCameraOpen}
        onClose={() => setIsARCameraOpen(false)}
        selectedTattoo={selectedTattoo}
      />
    </div>
  );
}