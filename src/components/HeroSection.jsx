import React from 'react';
import Spline from '@splinetool/react-spline';

const HeroSection = () => {
  return (
    <section className="relative w-full h-[420px] overflow-hidden bg-black">
      <Spline
        scene="https://prod.spline.design/4Zh-Q6DWWp5yPnQf/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl md:text-5xl font-semibold text-white/90 drop-shadow-lg">
          Общайся красиво в тёмной теме
        </h1>
        <p className="mt-3 text-zinc-300 max-w-2xl">
          Светло‑серая менюшка, стеклянные облачка и живые анимации: печать по буквам,
          редактирование с размытием и эффект падающих букв при удалении.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
