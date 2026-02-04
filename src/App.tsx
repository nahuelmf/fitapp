import React, { useState, useEffect, useRef } from 'react';
import { RUTINAS_DATA, LOGROS_CONFIG, translations } from './data';

type Language = 'es' | 'en' | 'pt';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('es');
  const [activeTab, setActiveTab] = useState<'tracker' | 'cardio' | 'rutinas' | 'logros'>('tracker');
  
  // Persistencia
  const [stats, setStats] = useState(() => {
    const s = localStorage.getItem('stealth_stats');
    return s ? JSON.parse(s) : { flexiones: 0, sentadillas: 0 };
  });

  const [completadas, setCompletadas] = useState<string[]>(() => {
    const c = localStorage.getItem('stealth_misiones');
    return c ? JSON.parse(c) : [];
  });

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<any>(null);

  const t: any = translations[lang];
  const categorias = Array.from(new Set(RUTINAS_DATA.map(r => r.categoria)));

  // Sincronizar con LocalStorage
  useEffect(() => { localStorage.setItem('stealth_stats', JSON.stringify(stats)); }, [stats]);
  useEffect(() => { localStorage.setItem('stealth_misiones', JSON.stringify(completadas)); }, [completadas]);

  const handleGuardarMision = () => {
    if (stats.flexiones === 0 && stats.sentadillas === 0) return;
    if ("vibrate" in navigator) navigator.vibrate([50, 30, 50]);
    
    alert(`Misión Finalizada: ${stats.flexiones} Flexiones y ${stats.sentadillas} Sentadillas.`);
    setStats({ flexiones: 0, sentadillas: 0 });
  };

  const toggleTimer = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    } else {
      setIsRunning(true);
      timerRef.current = setInterval(() => setTime(prev => prev + 1), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans pb-32 select-none">
      
      {/* HEADER */}
      <header className="p-4 grid grid-cols-3 items-center sticky top-0 bg-black/95 backdrop-blur-xl border-b border-[#FF0055]/30 z-40">
        <div />
        <div className="flex justify-center">
          <img src="/logo.png" alt="Logo" className="w-24 h-auto" />
        </div>
        <div className="flex justify-end gap-1">
          {(['es', 'en', 'pt'] as Language[]).map(l => (
            <button key={l} onClick={() => setLang(l)} className={`w-7 h-7 rounded-full text-[9px] font-bold ${lang === l ? 'bg-[#FF0055] text-white' : 'bg-white/5 text-slate-500'}`}>{l.toUpperCase()}</button>
          ))}
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 pt-6">
        
        {/* PESTAÑA TRACKER (BOTÓN AQUÍ) */}
        {activeTab === 'tracker' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <StatCard 
              title={t.pushups} 
              current={stats.flexiones} 
              target={50} 
              color="#FF0055" 
              onAdd={(n:number) => setStats({...stats, flexiones: stats.flexiones+n})} 
            />
            <StatCard 
              title={t.squats} 
              current={stats.sentadillas} 
              target={100} 
              color="#00F2FF" 
              onAdd={(n:number) => setStats({...stats, sentadillas: stats.sentadillas+n})} 
            />
            
            <div className="pt-4">
              <button 
                onClick={handleGuardarMision}
                className="w-full bg-[#FF0055] py-6 rounded-[2rem] font-black text-[11px] tracking-[0.2em] text-white shadow-[0_10px_30px_rgba(255,0,85,0.4)] active:scale-95 transition-all uppercase border border-[#FF0055]/50"
              >
                {t.finish}
              </button>
            </div>
          </div>
        )}

        {/* PESTAÑA RUTINAS */}
        {activeTab === 'rutinas' && (
          <div className="space-y-10 animate-in slide-in-from-bottom-4">
            {categorias.map(cat => (
              <section key={cat} className="space-y-4">
                <h2 className="text-[10px] font-black tracking-[0.3em] text-[#FF0055] uppercase border-l-2 border-[#FF0055] pl-3">{cat}</h2>
                <div className="grid gap-4">
                  {RUTINAS_DATA.filter(r => r.categoria === cat).map(r => {
                    const done = completadas.includes(r.id);
                    return (
                      <div key={r.id} className={`p-6 rounded-[2rem] bg-[#0a0a0a] border ${done ? 'border-[#00FF66]/40' : 'border-white/5'}`}>
                        <div className="flex justify-between items-start mb-4">
                          <h3 className={`font-black italic uppercase ${done ? 'text-[#00FF66] line-through opacity-40' : ''}`}>{r.titulo}</h3>
                          <button 
                            onClick={() => setCompletadas(prev => prev.includes(r.id) ? prev.filter(i => i !== r.id) : [...prev, r.id])}
                            className={`w-9 h-9 rounded-xl border flex items-center justify-center ${done ? 'bg-[#00FF66] border-[#00FF66] text-black' : 'border-white/10 text-white/10'}`}
                          >
                            {done ? '✓' : '○'}
                          </button>
                        </div>
                        <a href={r.videoUrl} target="_blank" className="text-[9px] font-black text-[#FF0055] tracking-widest bg-[#FF0055]/10 px-4 py-2 rounded-xl inline-block">▶ {t.technique}</a>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* PESTAÑA CARDIO */}
        {activeTab === 'cardio' && (
          <div className="text-center space-y-8 animate-in fade-in">
             <div className="py-20 rounded-[3rem] border border-[#00F2FF]/20 bg-[#00F2FF]/5">
                <div className="text-7xl font-mono font-black text-[#00F2FF]">
                  {Math.floor(time/60)}:{String(time%60).padStart(2,'0')}
                </div>
             </div>
             <button onClick={toggleTimer} className={`w-full py-6 rounded-2xl font-black text-[10px] border ${isRunning ? 'border-red-500 text-red-500' : 'border-[#00F2FF] text-[#00F2FF]'}`}>
               {isRunning ? t.stop : t.start}
             </button>
          </div>
        )}

        {/* PESTAÑA LOGROS */}
        {activeTab === 'logros' && (
          <div className="grid grid-cols-2 gap-4 animate-in fade-in">
            {LOGROS_CONFIG.map(l => (
              <div key={l.id} className="p-8 rounded-[2.5rem] bg-[#0a0a0a] border border-white/5 text-center">
                <span className="text-4xl block mb-3">{l.icono}</span>
                <span className="text-[9px] font-black text-white uppercase tracking-tighter leading-tight">{l.titulo}</span>
              </div>
            ))}
          </div>
        )}

      </main>

      {/* NAVEGACIÓN */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-sm bg-black/90 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-2 flex z-50 shadow-2xl">
        {(['tracker', 'cardio', 'rutinas', 'logros'] as const).map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)} 
            className={`flex-1 py-4 rounded-full text-xl transition-all ${activeTab === tab ? 'bg-[#FF0055] text-white' : 'text-slate-700'}`}
          >
            {tab === 'tracker' ? '⚡' : tab === 'cardio' ? '🛰️' : tab === 'rutinas' ? '🧩' : '🎖️'}
          </button>
        ))}
      </nav>
    </div>
  );
};

const StatCard = ({ title, current, target, color, onAdd }: any) => {
  const percent = Math.min((current/target)*100, 100);
  return (
    <div className="bg-[#0a0a0a] p-8 rounded-[2.5rem] border border-white/5 relative">
      <div className="flex justify-between items-end mb-4">
        <span className="text-[10px] font-black text-slate-500 tracking-widest uppercase">{title}</span>
        <span className="text-5xl font-black italic" style={{ color }}>{current}<span className="text-sm text-slate-800 ml-1">/{target}</span></span>
      </div>
      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mb-8">
        <div className="h-full transition-all duration-700 shadow-[0_0_10px]" style={{ width: `${percent}%`, backgroundColor: color }} />
      </div>
      <div className="flex gap-2">
        {[5, 10, 20].map(v => (
          <button key={v} onClick={() => onAdd(v)} className="flex-1 bg-white/[0.03] py-4 rounded-2xl text-[11px] font-bold border border-white/5 active:bg-white/10">+{v}</button>
        ))}
      </div>
    </div>
  );
};

export default App;