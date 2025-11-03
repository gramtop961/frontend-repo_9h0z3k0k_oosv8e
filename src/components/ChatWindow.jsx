import React, { useCallback, useMemo, useRef, useState } from 'react';
import MessageBubble from './MessageBubble';
import { Send } from 'lucide-react';

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    { id: 'm1', text: 'Привет! Это демо-чат в тёмной теме.', isMine: false, isEditing: false, isDeleting: false, isNew: false },
    { id: 'm2', text: 'Попробуй отредактировать или удалить сообщение.', isMine: true, isEditing: false, isDeleting: false, isNew: false },
  ]);
  const [input, setInput] = useState('');
  const listRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      if (listRef.current) {
        listRef.current.scrollTop = listRef.current.scrollHeight;
      }
    });
  }, []);

  const handleSend = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const id = Math.random().toString(36).slice(2);
    const newMsg = { id, text: trimmed, isMine: true, isEditing: false, isDeleting: false, isNew: true };
    setMessages((prev) => [...prev, newMsg]);
    setInput('');
    setTimeout(scrollToBottom, 0);
  }, [input, scrollToBottom]);

  const requestEdit = useCallback((id) => {
    setMessages((prev) => prev.map(m => m.id === id ? { ...m, isEditing: true } : m));
  }, []);

  const cancelEdit = useCallback((id) => {
    setMessages((prev) => prev.map(m => m.id === id ? { ...m, isEditing: false } : m));
  }, []);

  const saveEdit = useCallback((id, newText) => {
    setMessages((prev) => prev.map(m => m.id === id ? { ...m, text: newText, isEditing: false, isNew: false } : m));
  }, []);

  const deleteMsg = useCallback((id) => {
    // Trigger falling letters animation, then remove
    setMessages((prev) => prev.map(m => m.id === id ? { ...m, isDeleting: true } : m));
    setTimeout(() => {
      setMessages((prev) => prev.filter(m => m.id !== id));
    }, 950);
  }, []);

  const DeleteStyles = useMemo(() => (
    <style>{`
      @keyframes fall { to { transform: translateY(120%) rotate(10deg); opacity: 0; } }
      @keyframes glowIn { from { opacity: 0; filter: blur(6px); } to { opacity: 1; filter: blur(0); } }
      .chat-container { animation: glowIn .6s ease-out both; }
    `}</style>
  ), []);

  return (
    <section className="w-full">
      {DeleteStyles}
      <div className="mx-auto max-w-3xl px-4 pb-24">
        <div className="rounded-3xl border border-zinc-800 bg-black/50 backdrop-blur-md shadow-2xl overflow-hidden">
          <div className="chat-container h-[460px] overflow-y-auto p-4 space-y-4" ref={listRef}>
            {messages.map((m) => (
              <MessageBubble
                key={m.id}
                message={m}
                onRequestEdit={requestEdit}
                onSaveEdit={saveEdit}
                onCancelEdit={cancelEdit}
                onDelete={deleteMsg}
              />
            ))}
          </div>
          <div className="border-t border-zinc-800 p-3">
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                rows={2}
                placeholder="Напишите сообщение..."
                className="flex-1 rounded-2xl bg-zinc-900/70 border border-zinc-800 text-zinc-200 placeholder-zinc-500 p-3 outline-none focus:ring-2 focus:ring-zinc-600/60"
              />
              <button
                onClick={handleSend}
                className="shrink-0 h-11 px-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white/90 border border-white/10 backdrop-blur flex items-center gap-2"
                aria-label="Отправить"
              >
                <Send size={18} />
                <span className="hidden sm:inline">Отправить</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatWindow;
