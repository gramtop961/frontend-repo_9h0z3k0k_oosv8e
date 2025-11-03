import React from 'react';
import HeaderMenu from './components/HeaderMenu';
import HeroSection from './components/HeroSection';
import ChatWindow from './components/ChatWindow';

function App() {
  return (
    <div className="min-h-screen w-full bg-black text-white">
      <HeaderMenu />
      <HeroSection />
      <ChatWindow />
      <footer className="mx-auto max-w-5xl px-4 py-10 text-center text-sm text-zinc-500">
        Сделано для демонстрации: тёмная тема, стекло, анимации печати, размытое редактирование и падающие буквы при удалении.
      </footer>
    </div>
  );
}

export default App;
