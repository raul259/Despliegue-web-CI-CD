"use client";

import { useEffect, useState } from "react";

export default function IntroLoader({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Generar valores fijos para evitar hydration error
  const [squareAnimations] = useState(() => 
    Array.from({ length: 20 }, () => ({
      delay: Math.random() * 2,
      duration: 1 + Math.random(),
      opacity: Math.random() > 0.5 ? 1 : 0.3,
    }))
  );

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsFading(true);
          setTimeout(onFinish, 800);
          return 100;
        }
        const increment = Math.random() * 15; 
        return Math.min(prev + increment, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onFinish]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#0a0a0a] transition-opacity duration-700 ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Grid de cuadrados que ocupa toda la pantalla */}
      <div className="absolute inset-0 grid grid-cols-5 gap-3 p-8">
        {squareAnimations.map((anim, i) => (
          <div
            key={i}
            className="bg-cyan-500/20 rounded-lg animate-pulse border border-cyan-500/10"
            style={{
              animationDelay: `${anim.delay}s`,
              animationDuration: `${anim.duration}s`,
              opacity: anim.opacity,
            }}
          />
        ))}
      </div>

      {/* Contenido centrado sobre los cuadrados */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 tracking-tighter drop-shadow-[0_0_30px_rgba(6,182,212,0.8)] animate-pulse mb-8">
          {Math.floor(progress)}%
        </h1>

        {/* Barra de progreso visual */}
        <div className="w-96 h-2 bg-gray-800 rounded-full overflow-hidden mb-6">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-300 ease-out shadow-lg shadow-cyan-500/50"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-cyan-500/60 text-base font-mono animate-pulse tracking-widest uppercase">
          Iniciando Sistemas...
        </p>
      </div>
    </div>
  );
}