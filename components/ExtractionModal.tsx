"use client";
import { X, Copy, Terminal, Loader2 } from "lucide-react";
import { useState, useRef } from "react";

export default function ExtractionModal({ video, onClose }: { video: any; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState("aida");
  const [isLoading, setIsLoading] = useState(false);
  const [resultado, setResultado] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/api/modelar", { method: "POST", body: formData });
      const data = await response.json();
      if (response.ok) setResultado(data);
      else alert("Erro na API: " + data.detail);
    } catch (error) {
      alert("ERR_CONNECTION_REFUSED: O backend Python está rodando?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-10">
      <div className="bg-black border border-white/20 w-full max-w-5xl flex flex-col h-[85vh] shadow-[0_0_50px_rgba(255,255,255,0.05)]">
        
        {/* Header do Terminal */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-zinc-950">
          <div className="flex items-center gap-3">
            <Terminal size={16} className="text-zinc-500" />
            <span className="font-mono text-xs text-zinc-400">root@jnxgrowth:~ /engine/extractor</span>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Corpo do Terminal */}
        <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
          
          {/* Painel Esquerdo: Input */}
          <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-white/10 p-6 flex flex-col bg-zinc-950/50">
            <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest mb-2">Target Payload</span>
            <h3 className="font-mono text-sm text-zinc-300 line-clamp-3 mb-6">{video.title}</h3>
            
            <div className="mt-auto space-y-4">
              <input type="file" accept=".mp3" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
              <button 
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                className="w-full bg-white text-black font-mono text-xs font-bold py-3 uppercase hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="animate-spin" size={16} /> : null}
                {isLoading ? "Processando LLM..." : "Anexar Áudio (MP3)"}
              </button>
            </div>
          </div>

          {/* Painel Direito: Output (Ouro) */}
          <div className="flex-1 flex flex-col bg-[#050505]">
            <div className="flex items-center gap-6 px-6 py-4 border-b border-white/5 font-mono text-xs">
              <button onClick={() => setActiveTab("aida")} className={`${activeTab === "aida" ? "text-white border-b border-white pb-1" : "text-zinc-600 hover:text-zinc-400"}`}>
                Output.copy
              </button>
              <button onClick={() => setActiveTab("original")} className={`${activeTab === "original" ? "text-white border-b border-white pb-1" : "text-zinc-600 hover:text-zinc-400"}`}>
                Raw_Transcript.txt
              </button>
            </div>

            <div className="flex-1 p-6 overflow-y-auto font-mono text-sm relative">
              {resultado && (
                <button className="absolute top-4 right-6 text-zinc-500 hover:text-white transition-colors flex items-center gap-2 text-xs">
                  <Copy size={14} /> [COPY]
                </button>
              )}

              {isLoading ? (
                <div className="h-full flex flex-col justify-end pb-10 text-zinc-500 space-y-2">
                  <p>&gt; Inicializando engine de engenharia reversa...</p>
                  <p>&gt; Extraindo tokens de áudio...</p>
                  <p className="text-white animate-pulse">&gt; Aplicando framework AIDA. Aguarde...</p>
                </div>
              ) : !resultado ? (
                <div className="h-full flex items-end pb-10 text-zinc-700">
                  <p>&gt; Aguardando input de dados...</p>
                </div>
              ) : (
                <div className="text-zinc-300 leading-relaxed whitespace-pre-wrap max-w-3xl">
                  {activeTab === "aida" ? resultado.copy_modelada : `"${resultado.transcricao_original}"`}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
