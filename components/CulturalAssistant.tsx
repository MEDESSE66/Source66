
import React, { useState, useRef, useEffect } from 'react';
import { getCulturalInfo } from '../geminiService';
import { ChatMessage } from '../types';

export const CulturalAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "Bonjour ! Je suis l'assistant BeninSource. Quel nom de famille, proverbe ou aspect de notre beau Bénin souhaitez-vous explorer aujourd'hui ?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const aiResponse = await getCulturalInfo(userMessage);
    setMessages(prev => [...prev, { role: 'assistant', content: aiResponse || "Une erreur est survenue." }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[500px] bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-emerald-600 p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white text-xl">
          🌍
        </div>
        <div>
          <h3 className="text-white font-bold leading-tight">Assistant Culturel</h3>
          <p className="text-emerald-100 text-xs">Expert en patrimoine béninois</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
              m.role === 'user' 
                ? 'bg-emerald-600 text-white rounded-br-none' 
                : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-none'
            }`}>
              <p className="whitespace-pre-wrap">{m.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 rounded-bl-none flex gap-1">
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-75"></span>
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-150"></span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-100 bg-white">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ex: Signification du nom Dossou ?"
            className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="bg-emerald-600 text-white p-2 rounded-full hover:bg-emerald-700 transition-colors disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
