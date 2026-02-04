import React, { useState, useEffect, useRef } from 'react';
import { RUTINAS_DATA, LOGROS_CONFIG, translations } from './data';

type Language = 'es' | 'en' | 'pt';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('es');
  const [activeTab, setActiveTab] = useState<'tracker' | 'cardio' | 'rutinas' | 'logros'>('tracker');
  const [stats, setStats] = useState({ flexiones: 0, sentadillas: 0 });
  const [pasos, setPasos] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [tipoCardio, setTipoCardio] = useState<'Bici' | 'Running'>('Running');
  const [completadas, setCompletadas] = useState<string[]>([]); // Modo Misión
  const timerRef = useRef<any>(null);

  const t: any = translations[lang];

  // Agrupación de categorías
  const categoriasUnicas = Array.from(new Set(RUTINAS_DATA.map(r => r.categoria)));

  useEffect(() => {
    if (isRunning && tipoCardio === 'Running' && 'DeviceMotionEvent' in window) {
      const handleMotion = (e: DeviceMotionEvent) => {
        const acc = e.accelerationIncludingGravity;
        if (acc && acc.y && acc.y > 12) setPasos(prev => prev + 1);
      };
      window.addEventListener('devicemotion', handleMotion);
      return () => window.removeEventListener('devicemotion', handleMotion);
    }
  }, [isRunning, tipoCardio]);

  const toggleTimer = () => {
    if (isRunning) {
      if (timerRef.current) clearInterval(timerRef.current);
      setIsRunning(false);
    } else {
      setIsRunning(true);
      timerRef.current = setInterval(() => setTime(prev => prev + 1), 1000);
    }
  };

  const toggleMision = (id: string) => {
    setCompletadas(prev => 
      prev.includes(id) ? prev.filter(rid => rid !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans pb-32 select-none">
      
      {/* HEADER */}
      <header className="p-4 grid grid-cols-3 items-center sticky top-0 bg-black/90 backdrop-blur-xl border-b border-[#FF0055]/30 z-40">
        <div />
        <div className="flex justify-center">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="w-32 h-auto object-contain animate-neon-pulse" 
          />
        </div>
        <div className="flex justify-end">
          <div className="flex gap-2 bg-white/5 p-1 rounded-full border border-white/10">
            {(['es', 'en', 'pt'] as Language[]).map(l => (
              <button key={l} onClick={() => setLang(l)} className={`w-8 h-8 rounded-full text-[10px] font-bold transition-all ${lang === l ? 'bg-[#FF0055] text-white' : 'text-slate-600'}`}>{l.toUpperCase()}</button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 pt-6">
        
        {/* RUTINAS CATEGORIZADAS + MODO MISIÓN */}
        {activeTab === 'rutinas' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {categoriasUnicas.map(cat => (
              <section key={cat} className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-6 w-1 bg-[#FF0055] shadow-[0_0_10px_#FF0055]"></div>
                  <h2 className="text-lg font-black italic tracking-[0.3em] text-white uppercase">{cat}</h2>
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-[#FF0055]/40 to-transparent"></div>
                </div>

                <div className="grid gap-5">
                  {RUTINAS_DATA.filter(r => r.categoria === cat).map(r => {
                    const esMisionCumplida = completadas.includes(r.id);
                    return (
                      <div key={r.id} className={`relative bg-[#0a0a0a] border p-6 rounded-[2rem] overflow-hidden transition-all active:scale-[0.98] ${esMisionCumplida ? 'border-[#00FF66]/50 shadow-[0_0_20px_rgba(0,255,102,0.1)]' : 'border-white/5'}`}>
                        <div className="relative z-10">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className={`text-xl font-black italic uppercase transition-colors ${esMisionCumplida ? 'text-[#00FF66] line-through opacity-50' : 'text-white'}`}>{r.titulo}</h3>
                              <span className="inline-block mt-2 text-[8px] font-bold bg-white/5 border border-white/10 px-3 py-1 rounded-full text-slate-400 uppercase">{r.nivel}</span>
                            </div>
                            <button 
                              onClick={() => toggleMision(r.id)}
                              className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${esMisionCumplida ? 'bg-[#00FF66] border-[#00FF66] text-black shadow-[0_0_15px_#00FF66]' : 'bg-white/5 border-white/10 text-white/20'}`}
                            >
                              {esMisionCumplida ? '✓' : '○'}
                            </button>
                          </div>

                          <div className="space-y-3 mb-6 bg-black/40 p-4 rounded-2xl border border-white/5">
                            {r.ejercicios.map((ej: any, idx: number) => (
                              <div key={idx} className="flex justify-between items-center text-[11px]">
                                <span className="text-slate-300">{ej.nombre}</span>
                                <div className="flex-1 border-b border-dotted border-white/10 mx-2 mb-1"></div>
                                <span className="font-mono text-[#00F2FF] font-bold">{ej.series}x{ej.reps}</span>
                              </div>
                            ))}
                          </div>

                          <a href={r.videoUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full bg-[#FF0055]/10 hover:bg-[#FF0055] py-4 rounded-2xl text-[10px] font-black tracking-widest text-[#FF0055] hover:text-white border border-[#FF0055]/20 transition-all">
                            <span>▶</span> {t.technique}
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* TRACKER */}
        {activeTab === 'tracker' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <StatCard title={t.pushups} current={stats.flexiones} target={50} color="#FF0055" onAdd={(n:number) => setStats({...stats, flexiones: stats.flexiones+n})} />
            <StatCard title={t.squats} current={stats.sentadillas} target={100} color="#00F2FF" onAdd={(n:number) => setStats({...stats, sentadillas: stats.sentadillas+n})} />
            <button className="w-full bg-[#FF0055] py-5 rounded-2xl font-black text-[10px] tracking-[0.2em] shadow-[0_0_20px_rgba(255,0,85,0.3)]">{t.finish}</button>
          </div>
        )}

        {/* CARDIO */}
        {activeTab === 'cardio' && (
          <div className="space-y-8 text-center animate-in fade-in duration-500">
            <div className="flex bg-white/5 p-1 rounded-full w-fit mx-auto border border-white/10">
              <button onClick={() => setTipoCardio('Running')} className={`px-8 py-2 rounded-full text-[10px] font-black transition-all ${tipoCardio === 'Running' ? 'bg-[#00F2FF] text-black' : 'text-slate-500'}`}>{t.running}</button>
              <button onClick={() => setTipoCardio('Bici')} className={`px-8 py-2 rounded-full text-[10px] font-black transition-all ${tipoCardio === 'Bici' ? 'bg-[#00F2FF] text-black' : 'text-slate-500'}`}>{t.bike}</button>
            </div>
            <div className="py-20 rounded-[3rem] border border-[#00F2FF]/30 bg-[#00F2FF]/5 relative">
              <p className="text-7xl font-mono font-black text-[#00F2FF]">{Math.floor(time/60)}:{String(time%60).padStart(2,'0')}</p>
              {tipoCardio === 'Running' && <p className="text-2xl font-black text-white mt-4">{pasos} <span className="text-[10px] text-slate-500 uppercase">{t.steps}</span></p>}
            </div>
            <button onClick={toggleTimer} className={`w-full py-6 rounded-3xl font-black text-[10px] border transition-all ${isRunning ? 'border-red-500 text-red-500' : 'border-[#00F2FF] text-[#00F2FF]'}`}>{isRunning ? t.stop : t.start}</button>
          </div>
        )}

        {/* LOGROS */}
        {activeTab === 'logros' && (
          <div className="grid grid-cols-2 gap-4 animate-in fade-in duration-500">
            {LOGROS_CONFIG.map(l => (
              <div key={l.id} className="p-8 rounded-[2rem] text-center border border-white/5 bg-[#0a0a0a]">
                <span className="text-4xl block mb-4">{l.icono}</span>
                <h4 className="text-[9px] font-black uppercase tracking-widest text-white leading-tight">{l.titulo}</h4>
                <p className="text-[8px] text-slate-500 mt-2">{l.requisito}+ {l.tipo}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* NAV */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-sm bg-black/80 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-2 flex shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50">
        <button onClick={() => setActiveTab('tracker')} className={`flex-1 py-4 rounded-full text-lg transition-all ${activeTab === 'tracker' ? 'bg-[#FF0055] text-white' : 'text-slate-700'}`}>⚡</button>
        <button onClick={() => setActiveTab('cardio')} className={`flex-1 py-4 rounded-full text-lg transition-all ${activeTab === 'cardio' ? 'bg-[#FF0055] text-white' : 'text-slate-700'}`}>🛰️</button>
        <button onClick={() => setActiveTab('rutinas')} className={`flex-1 py-4 rounded-full text-lg transition-all ${activeTab === 'rutinas' ? 'bg-[#FF0055] text-white' : 'text-slate-700'}`}>🧩</button>
        <button onClick={() => setActiveTab('logros')} className={`flex-1 py-4 rounded-full text-lg transition-all ${activeTab === 'logros' ? 'bg-[#FF0055] text-white' : 'text-slate-700'}`}>🎖️</button>
      </nav>
    </div>
  );
};

const StatCard = ({ title, current, target, color, onAdd }: any) => {
  const percent = Math.min((current/target)*100, 100);
  return (
    <div className="bg-[#0a0a0a] p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: color }}></div>
      <div className="flex justify-between items-end mb-6">
        <h3 className="text-slate-500 text-[10px] font-black tracking-[0.2em]">{title}</h3>
        <p className="text-5xl font-black italic" style={{ color }}>{current}<span className="text-slate-800 text-sm not-italic ml-1">/{target}</span></p>
      </div>
      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mb-8">
        <div className="h-full transition-all duration-700" style={{ width: `${percent}%`, backgroundColor: color, boxShadow: `0 0 15px ${color}` }} />
      </div>
      <div className="flex gap-2">
        {[5, 10, 20].map(v => (
          <button key={v} onClick={() => onAdd(v)} className="flex-1 bg-white/[0.03] py-4 rounded-2xl text-[10px] font-black transition-all border border-white/5 active:scale-90">+{v}</button>
        ))}
      </div>
    </div>
  );
};

export default App;