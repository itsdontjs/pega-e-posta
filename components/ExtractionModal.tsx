"use client";
import { X, Copy, CheckCircle2, UploadCloud, Loader2 } from "lucide-react";
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
      const response = await fetch("http://localhost:8000/api/modelar", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setResultado(data);
      } else {
        alert("Erro na API: " + data.detail);
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor. O Python está ligado?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-5xl flex overflow-hidden shadow-2xl h-[80vh]">

        {/* Esquerda: Preview do Vídeo */}
        <div className="w-1/3 bg-slate-950 border-r border-slate-800 p-6 flex flex-col relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white lg:hidden">
            <X size={24} />
          </button>
          <h3 className="font-bold text-lg mb-4 text-slate-200 truncate">{video.title}</h3>
          <div className="flex-1 bg-slate-800 rounded-xl overflow-hidden relative group">
            <img src={video.thumbnail} alt="Preview" className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[12px] border-l-slate-950 border-b-8 border-b-transparent ml-1"></div>
               </div>
            </div>
          </div>

          {/* Botão de Upload Real */}
          <div className="mt-4">
            <input type="file" accept=".mp3" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              className="w-full bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30 font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : <UploadCloud size={20} />}
              {isLoading ? "Processando IA..." : "Fazer Upload do MP3"}
            </button>
            <p className="text-[10px] text-center text-slate-500 mt-2">Para testar, suba um áudio da pasta "2_audios_extraidos"</p>
          </div>
        </div>

        {/* Direita: A Fábrica */}
        <div className="flex-1 flex flex-col relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white hidden lg:block">
            <X size={24} />
          </button>

          <div className="p-6 border-b border-slate-800">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              {resultado ? <CheckCircle2 className="text-emerald-400" /> : <Loader2 className="text-slate-500" />}
              {resultado ? "Modelagem Concluída" : "Aguardando Áudio..."}
            </h2>
            <p className="text-slate-400 text-sm mt-1">
               {resultado ? "Copy gerada com base no framework AIDA e prompts otimizados para o Veo3." : "Faça o upload do áudio na barra lateral para iniciar a engenharia reversa."}
            </p>
          </div>

          <div className="px-6 pt-4 flex gap-4 border-b border-slate-800">
            {["aida", "original"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-semibold capitalize border-b-2 transition-colors ${
                  activeTab === tab ? "border-emerald-400 text-emerald-400" : "border-transparent text-slate-500 hover:text-slate-300"
                }`}
              >
                {tab === "aida" ? "Copy & Prompts Gerados" : "Transcrição Original"}
              </button>
            ))}
          </div>

          <div className="flex-1 p-6 overflow-y-auto bg-slate-900/50 relative">
             {resultado && (
               <button className="absolute top-6 right-6 flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border border-slate-700">
                  <Copy size={16} /> Copiar
               </button>
             )}

             {activeTab === "aida" && resultado && (
                <div className="space-y-4 text-slate-300 text-sm leading-relaxed pr-24 whitespace-pre-wrap">
                   {resultado.copy_modelada}
                </div>
             )}

            {activeTab === "original" && resultado && (
                <div className="space-y-4 text-slate-400 text-sm leading-relaxed pr-24 italic whitespace-pre-wrap">
                   "{resultado.transcricao_original}"
                </div>
             )}

             {!resultado && !isLoading && (
                 <div className="h-full flex items-center justify-center text-slate-600 italic">
                     Nenhum dado gerado ainda. Envie um arquivo MP3.
                 </div>
             )}

             {isLoading && (
                 <div className="h-full flex flex-col items-center justify-center text-emerald-500 space-y-4">
                     <Loader2 className="animate-spin w-12 h-12" />
                     <p className="font-bold animate-pulse">Hackeando o funil do concorrente...</p>
                 </div>
             )}
          </div>
        </div>

      </div>
    </div>
  );
}
