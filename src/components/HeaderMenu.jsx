import React from 'react';

const HeaderMenu = () => {
  return (
    <header className="sticky top-0 z-20 w-full">
      <div className="mx-auto max-w-5xl px-4 pt-4">
        <nav className="backdrop-blur-md bg-zinc-100/10 text-zinc-200 border border-zinc-700 rounded-2xl shadow-lg">
          <ul className="flex items-center justify-between px-4 py-3">
            <li className="font-semibold tracking-wide">ChatGlass</li>
            <li className="flex items-center gap-4 text-sm">
              <button className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition">Главная</button>
              <button className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition">Чат</button>
              <button className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition">Настройки</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default HeaderMenu;
