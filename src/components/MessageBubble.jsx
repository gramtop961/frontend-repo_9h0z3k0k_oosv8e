import React, { useEffect, useMemo, useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';

const MessageBubble = ({ message, onRequestEdit, onSaveEdit, onCancelEdit, onDelete }) => {
  const { id, text, isMine, isEditing, isDeleting, isNew } = message;

  const [typedText, setTypedText] = useState(isNew ? '' : text);
  const [draft, setDraft] = useState(text);

  useEffect(() => {
    if (!isNew) return;
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setTypedText(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [isNew, text]);

  useEffect(() => {
    if (!isEditing) setDraft(text);
  }, [isEditing, text]);

  // Prepare letters for delete falling animation
  const deleteLetters = useMemo(() =>
    text.split('').map((ch, idx) => ({
      ch,
      delay: Math.random() * 0.25 + idx * 0.01,
      x: (Math.random() - 0.5) * 20,
      rot: (Math.random() - 0.5) * 40,
    })), [text]
  );

  const bubbleBase = 'relative max-w-[75%] rounded-2xl px-4 py-2 text-sm md:text-base transition-all';
  const mine = isMine ? 'bg-white/10 text-white/90 backdrop-blur border border-white/10 ml-auto' : 'bg-zinc-900/60 text-zinc-200 border border-zinc-800';
  const editing = isEditing ? 'blur-[2px] opacity-70' : '';

  return (
    <div className={`flex ${isMine ? 'justify-end' : 'justify-start'} w-full`}>
      <div className="flex flex-col gap-1">
        <div className={`${bubbleBase} ${mine} ${editing}`}>
          {!isDeleting && !isEditing && (
            <p className="whitespace-pre-wrap leading-relaxed">{isNew ? typedText : text}</p>
          )}
          {isDeleting && (
            <div className="relative">
              <div className="flex flex-wrap gap-[1px] leading-relaxed">
                {deleteLetters.map((l, i) => (
                  <span
                    key={i}
                    style={{
                      display: 'inline-block',
                      transform: `translateZ(0)`,
                      animation: `fall 0.8s ${l.delay}s ease-in forwards`,
                    }}
                  >
                    {l.ch === ' ' ? '\u00A0' : l.ch}
                  </span>
                ))}
              </div>
            </div>
          )}
          {isEditing && (
            <></>
          )}
        </div>

        {!isDeleting && !isEditing && (
          <div className={`flex items-center gap-2 ${isMine ? 'justify-end' : 'justify-start'}`}>
            <button
              onClick={() => onRequestEdit(id)}
              className="text-zinc-400 hover:text-zinc-200 transition flex items-center gap-1 text-xs"
              aria-label="Редактировать"
            >
              <Edit size={14} /> Редактировать
            </button>
            <button
              onClick={() => onDelete(id)}
              className="text-zinc-400 hover:text-rose-300 transition flex items-center gap-1 text-xs"
              aria-label="Удалить"
            >
              <Trash2 size={14} /> Удалить
            </button>
          </div>
        )}

        {isEditing && (
          <div className={`mt-2 ${isMine ? 'ml-auto' : ''} max-w-[75%]`}>
            <div className="rounded-xl border border-zinc-700 bg-black/60 backdrop-blur p-2">
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                className="w-full bg-transparent outline-none text-zinc-200 placeholder-zinc-500 text-sm resize-none"
                rows={3}
                placeholder="Измените сообщение..."
              />
              <div className="mt-2 flex justify-end gap-2 text-sm">
                <button
                  onClick={() => onCancelEdit(id)}
                  className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300"
                >
                  Отмена
                </button>
                <button
                  onClick={() => onSaveEdit(id, draft)}
                  className="px-3 py-1 rounded-lg bg-emerald-500/80 hover:bg-emerald-500 text-white"
                >
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
