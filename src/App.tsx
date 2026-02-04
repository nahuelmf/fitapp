import React, { useState, useEffect, useRef } from 'react';
import { RUTINAS_DATA, LOGROS_CONFIG, translations } from './data';

type Language = 'es' | 'en' | 'pt';

const App: React.FC = () => {
  // --- ESTADOS CON PERSISTENCIA ---
  const [lang, setLang] = useState<Language>('es');
  const [activeTab, setActiveTab] = useState<'tracker' | 'cardio' | 'rutinas' | 'logros'>('tracker');
  
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('stealth_stats');
    return saved ? JSON.parse(saved) : { flexiones: 0, sentadillas: 0 };
  });

  const [completadas, setCompletadas] = useState<string[]>(() => {
    const saved = localStorage.getItem('stealth_misiones');
    return saved ? JSON.parse(saved) : [];
  });

  const [pasos, setPasos] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [tipoCardio, setTipoCardio] = useState<'Bici' | 'Running'>('Running');
  const timerRef = useRef<any>(null);

  const t: any = translations[lang];
  const categoriasUnicas = Array.from(new Set(RUTINAS_DATA.map(r => r.categoria)));

  // --- EFECTOS DE GUARDADO AUTOMÁTICO ---
  useEffect(() => {
    localStorage.setItem('stealth_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('stealth_misiones', JSON.stringify(completadas));
  }, [completadas]);

  // --- LÓGICA DE CARDIO ---
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
      
      <header className="p-4 grid grid-cols-3 items-center sticky top-0 bg-black/90 backdrop-blur-xl border-b border-[#FF0055]/30 z-40">
        <div />
        <div className="flex justify-center">
          <img src="/logo.png" alt="Logo" className="w-32 h-auto object-contain animate-neon-pulse" />
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
        
        {/* RUTINAS CON MODO MISIÓN */}
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
                    const esHecho = completadas.includes(r.id);
                    return (
                      <div key={r.id} className={`relative bg-[#0a0a0a] border p-6 rounded-[2rem] transition-all ${esHecho ? 'border-[#00FF66]/50 shadow-[0_0_15px_rgba(0,255,102,0.1)]' : 'border-white/5'}`}>
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className={`text-xl font-black italic uppercase ${esHecho ? 'text-[#00FF66] line-through opacity-50' : 'text-white'}`}>{r.titulo}</h3>
                            <span className="text-[8px] font-bold bg-white/5 border border-white/10 px-3 py-1 rounded-full text-slate-400 uppercase mt-2 inline-block">{r.nivel}</span>
                          </div>
                          <button onClick={() => toggleMision(r.id)} className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${esHecho ? 'bg-[#00FF66] border-[#00FF66] text-black shadow-[0_0_10px_#00FF66]' : 'bg-white/5 border-white/10 text-white/20'}`}>
                            {esHecho ? '✓' : '○'}
                          </button>
                        </div>
                        <div className="space-y-2 mb-6 bg-black/40 p-4 rounded-2xl border border-white/5">
                          {r.ejercicios.map((ej: any, idx: number) => (
                            <div key={idx} className="flex justify-between text-[11px]">
                              <span className="text-slate-300">{ej.nombre}</span>
                              <span className="font-mono text-[#00F2FF] font-bold">{ej.series}x{ej.reps}</span>
                            </div>
                          ))}
                        </div>
                        <a href={r.videoUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full bg-[#FF0055]/10 py-4 rounded-2xl text-[10px] font-black tracking-widest text-[#FF0055] hover:bg-[#FF0055] hover:text-white transition-all">
                          ▶ {t.technique}
                        </a>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
            <button onClick={() => setCompletadas([])} className="w-full py-4 text-[10px] font-black text-slate-600 hover:text-white uppercase tracking-widest border border-dashed border-white/10 rounded-2xl">Reiniciar Todas las Misiones</button>
          </div>
        )}

        {/* TRACKER */}
        {activeTab === 'tracker' && (
          <div className="space-y-6">
            <StatCard title={t.pushups} current={stats.flexiones} target={50} color="#FF0055" onAdd={(n:number) => setStats({...stats, flexiones: stats.flexiones+n})} />
            <StatCard title={t.squats} current={stats.sentadillas} target={100} color="#00F2FF" onAdd={(n:number) => setStats({...stats, sentadillas: stats.sentadillas+n})} />
            <button onClick={() => setStats({flexiones:0, sentadillas:0})} className="w-full text-slate-600 text-[9px] font-bold uppercase tracking-widest py-4">Reiniciar Stats Diarios</button>
          </div>
        )}

        {/* CARDIO */}
        {activeTab === 'cardio' && (
          <div className="space-y-8 text-center">
            <div className="flex bg-white/5 p-1 rounded-full w-fit mx-auto border border-white/10">
              <button onClick={() => setTipoCardio('Running')} className={`px-8 py-2 rounded-full text-[10px] font-black transition-all ${tipoCardio === 'Running' ? 'bg-[#00F2FF] text-black' : 'text-slate-500'}`}>{t.running}</button>
              <button onClick={() => setTipoCardio('Bici')} className={`px-8 py-2 rounded-full text-[10px] font-black transition-all ${tipoCardio === 'Bici' ? 'bg-[#00F2FF] text-black' : 'text-slate-500'}`}>{t.bike}</button>
            </div>
            <div className="py-20 rounded-[3rem] border border-[#00F2FF]/30 bg-[#00F2FF]/5">
              <p className="text-7xl font-mono font-black text-[#00F2FF]">{Math.floor(time/60)}:{String(time%60).padStart(2,'0')}</p>
              {tipoCardio === 'Running' && <p className="text-2xl font-black text-white mt-4">{pasos} <span className="text-[10px] text-slate-500 uppercase">{t.steps}</span></p>}
            </div>
            <button onClick={toggleTimer} className={`w-full py-6 rounded-3xl font-black text-[10px] border transition-all ${isRunning ? 'border-red-500 text-red-500' : 'border-[#00F2FF] text-[#00F2FF]'}`}>{isRunning ? t.stop : t.start}</button>
          </div>
        )}

        {/* LOGROS */}
        {activeTab === 'logros' && (
          <div className="grid grid-cols-2 gap-4">
            {LOGROS_CONFIG.map(l => (
              <div key={l.id} className="p-8 rounded-[2rem] text-center border border-white/5 bg-[#0a0a0a]">
                <span className="text-4xl block mb-4">{l.icono}</span>
                <h4 className="text-[9px] font-black uppercase tracking-widest text-white">{l.titulo}</h4>
                <p className="text-[8px] text-slate-500 mt-2">{l.requisito}+ {l.tipo}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-sm bg-black/80 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-2 flex shadow-2xl z-50">
        <button onClick={() => setActiveTab('tracker')} className={`flex-1 py-4 rounded-full text-lg ${activeTab === 'tracker' ? 'bg-[#FF0055] text-white' : 'text-slate-700'}`}>⚡</button>
        <button onClick={() => setActiveTab('cardio')} className={`flex-1 py-4 rounded-full text-lg ${activeTab === 'cardio' ? 'bg-[#FF0055] text-white' : 'text-slate-700'}`}>🛰️</button>
        <button onClick={() => setActiveTab('rutinas')} className={`flex-1 py-4 rounded-full text-lg ${activeTab === 'rutinas' ? 'bg-[#FF0055] text-white' : 'text-slate-700'}`}>🧩</button>
        <button onClick={() => setActiveTab('logros')} className={`flex-1 py-4 rounded-full text-lg ${activeTab === 'logros' ? 'bg-[#FF0055] text-white' : 'text-slate-700'}`}>🎖️</button>
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
        <h3 className="text-slate-500 text-[10px] font-black tracking-widest">{title}</h3>
        <p className="text-5xl font-black italic" style={{ color }}>{current}<span className="text-slate-800 text-sm not-italic ml-1">/{target}</span></p>
      </div>
      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mb-8">
        <div className="h-full transition-all duration-700 shadow-[0_0_10px]" style={{ width: `${percent}%`, backgroundColor: color }} />
      </div>
      <div className="flex gap-2">
        {[5, 10, 20].map(v => (
          <button key={v} onClick={() => onAdd(v)} className="flex-1 bg-white/[0.03] py-4 rounded-2xl text-[10px] font-black border border-white/5">+{v}</button>
        ))}
      </div>
    </div>
  );
};

export default App;
