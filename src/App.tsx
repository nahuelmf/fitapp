import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { RUTINAS_DATA, LOGROS_CONFIG, translations } from './data';

const App: React.FC = () => {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [activeTab, setActiveTab] = useState<'tracker' | 'cardio' | 'rutinas' | 'logros'>('tracker');
  
  // --- PERSISTENCIA DE DATOS ---
  const [stats, setStats] = useState(() => {
    const s = localStorage.getItem('stealth_stats');
    return s ? JSON.parse(s) : { 
      flexiones: 0, sentadillas: 0, pasos: 0, 
      totalFlex: 0, totalSent: 0, totalPasos: 0, 
      racha: 0 
    };
  });

  const [historial, setHistorial] = useState<any[]>(() => {
    const h = localStorage.getItem('stealth_historial');
    return h ? JSON.parse(h) : [];
  });

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<any>(null);
  const t: any = translations[lang];

  // Guardado automático en cada cambio
  useEffect(() => { localStorage.setItem('stealth_stats', JSON.stringify(stats)); }, [stats]);
  useEffect(() => { localStorage.setItem('stealth_historial', JSON.stringify(historial)); }, [historial]);

  // --- LÓGICA DE MISIONES ---
  const lanzarConfeti = () => {
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#FF0055', '#00F2FF', '#00FF66'] });
  };

  const handleGuardarMision = () => {
    if (stats.flexiones === 0 && stats.sentadillas === 0 && stats.pasos === 0) return;
    
    lanzarConfeti();
    const nuevaEntrada = {
      fecha: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
      flex: stats.flexiones,
      sent: stats.sentadillas,
      pas: stats.pasos
    };

    setHistorial([nuevaEntrada, ...historial].slice(0, 7));
    setStats({ 
      ...stats, 
      totalFlex: stats.totalFlex + stats.flexiones,
      totalSent: stats.totalSent + stats.sentadillas,
      totalPasos: stats.totalPasos + stats.pasos,
      flexiones: 0, sentadillas: 0, pasos: 0,
      racha: stats.racha + 1 
    });
  };

  // --- LÓGICA DE CARDIO (PASOS) ---
const toggleTimer = () => {
  if (isRunning) {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRunning(false);
  } else {
    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setTime(prev => prev + 1);
      // Aquí el fix: Definimos 's' como any o usamos el spread directo
      setStats((s: any) => ({ ...s, pasos: s.pasos + 2 }));
    }, 1000);
  }
};

  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans pb-32 overflow-x-hidden">
      
      {/* HEADER DINÁMICO */}
      <header className="p-4 flex justify-between items-center sticky top-0 bg-black/90 backdrop-blur-xl border-b border-white/5 z-50">
        <div className="flex items-center gap-2">
          <span className="text-xl animate-pulse">🔥</span>
          <span className="text-lg font-black italic tracking-tighter">{stats.racha} DÍAS</span>
        </div>
        <img src="/logo.png" alt="Logo" className="w-50 h-auto" />
        <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="text-[10px] font-black border border-white/10 px-3 py-1 rounded-full uppercase">{lang}</button>
      </header>

      <main className="max-w-md mx-auto px-5 pt-6">
        
        {/* PESTAÑA 1: TRACKER */}
        {activeTab === 'tracker' && (
          <div className="space-y-5 animate-in fade-in duration-500">
            <StatCard title={t.pushups} current={stats.flexiones} target={50} color="#FF0055" onAdd={(n:number) => setStats({...stats, flexiones: stats.flexiones+n})} />
            <StatCard title={t.squats} current={stats.sentadillas} target={100} color="#00F2FF" onAdd={(n:number) => setStats({...stats, sentadillas: stats.sentadillas+n})} />
            
            <div className="bg-[#0a0a0a] p-6 rounded-[2rem] border border-white/5 flex justify-between items-center">
                <div>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{t.steps} HOY</p>
                    <p className="text-3xl font-black text-white">{stats.pasos}</p>
                </div>
                <div className="text-right">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">TOTAL ACUM.</p>
                    <p className="text-sm font-bold text-[#00FF66]">{stats.totalPasos}</p>
                </div>
            </div>

            <button onClick={handleGuardarMision} className="w-full bg-[#FF0055] py-5 rounded-[2rem] font-black text-[11px] tracking-[0.3em] shadow-[0_10px_30px_rgba(255,0,85,0.4)] active:scale-90 transition-all">
              GUARDAR MISIÓN DIARIA
            </button>

            {/* HISTORIAL */}
            <div className="mt-8 space-y-2">
                <h3 className="text-[9px] font-black text-slate-700 tracking-[0.3em] uppercase ml-2 mb-3">Últimos Registros</h3>
                {historial.map((h, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-white/[0.02] border border-white/5 rounded-2xl text-[10px] font-bold animate-in slide-in-from-left-4" style={{animationDelay: `${i*100}ms`}}>
                        <span className="text-slate-500">{h.fecha}</span>
                        <div className="flex gap-3">
                          <span className="text-[#FF0055]">{h.flex}F</span>
                          <span className="text-[#00F2FF]">{h.sent}S</span>
                          <span className="text-slate-300">{h.pas}P</span>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        )}

        {/* PESTAÑA 2: CARDIO */}
        {activeTab === 'cardio' && (
          <div className="text-center space-y-8 animate-in zoom-in-95 duration-500">
             <div className="py-20 rounded-[3.5rem] border border-[#00F2FF]/20 bg-[#00F2FF]/5 relative">
                <div className="text-7xl font-mono font-black text-[#00F2FF]">{Math.floor(time/60)}:{String(time%60).padStart(2,'0')}</div>
                <p className="text-xl font-black text-white mt-4 uppercase tracking-widest">{stats.pasos} PASOS</p>
             </div>
             <button onClick={toggleTimer} className={`w-full py-6 rounded-2xl font-black text-[11px] border-2 transition-all ${isRunning ? 'border-red-500 text-red-500' : 'border-[#00F2FF] text-[#00F2FF] shadow-[0_0_20px_rgba(0,242,255,0.1)]'}`}>
               {isRunning ? 'DETENER ENTRENAMIENTO' : 'INICIAR CARRERA'}
             </button>
          </div>
        )}

        {/* PESTAÑA 3: RUTINAS + VIDEOS */}
        {activeTab === 'rutinas' && (
          <div className="space-y-5 animate-in slide-in-from-bottom-5">
            {RUTINAS_DATA.map(r => (
              <div key={r.id} className="p-6 rounded-[2.5rem] bg-[#0a0a0a] border border-white/5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-black italic uppercase text-white">{r.titulo}</h3>
                    <span className="text-[9px] text-[#FF0055] font-bold uppercase tracking-widest">{r.nivel}</span>
                  </div>
                  <a href={r.videoUrl} target="_blank" rel="noreferrer" className="bg-[#FF0055] w-10 h-10 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform">
                    <span className="text-white text-xs">▶</span>
                  </a>
                </div>
                <div className="space-y-2">
                  {r.ejercicios.map((ej, i) => (
                    <div key={i} className="flex justify-between text-[11px] bg-white/[0.03] p-3 rounded-xl border border-white/5">
                      <span className="text-slate-400 font-bold">{ej.nombre}</span>
                      <span className="text-[#00F2FF] font-mono font-black">{ej.series}x{ej.reps}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PESTAÑA 4: LOGROS (MEDALLAS) */}
        {activeTab === 'logros' && (
          <div className="grid grid-cols-2 gap-4 animate-in fade-in">
            {LOGROS_CONFIG.map(l => {
              const progreso = l.tipo === 'flexiones' ? stats.totalFlex : l.tipo === 'sentadillas' ? stats.totalSent : stats.totalPasos;
              const completado = progreso >= l.requisito;
              return (
                <div key={l.id} className={`p-6 rounded-[2rem] border text-center transition-all duration-700 ${completado ? 'border-[#FF0055] bg-[#FF0055]/5 shadow-[0_0_20px_rgba(255,0,85,0.1)]' : 'border-white/5 opacity-20 grayscale'}`}>
                  <span className="text-4xl block mb-2">{l.icono}</span>
                  <p className="text-[10px] font-black text-white uppercase leading-tight">{l.titulo}</p>
                  <p className="text-[8px] text-slate-500 mt-2 font-bold">{progreso} / {l.requisito}</p>
                </div>
              );
            })}
          </div>
        )}

      </main>

      {/* NAVBAR INFERIOR */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-sm bg-black/90 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-2 flex z-50 shadow-2xl">
        {(['tracker', 'cardio', 'rutinas', 'logros'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-4 rounded-full text-xl transition-all duration-300 ${activeTab === tab ? 'bg-[#FF0055] text-white scale-105 shadow-neon' : 'text-slate-700'}`}>
            {tab === 'tracker' ? '⚡' : tab === 'cardio' ? '🛰️' : tab === 'rutinas' ? '🧩' : '🎖️'}
          </button>
        ))}
      </nav>
    </div>
  );
};

// COMPONENTE TARJETA DE PROGRESO
const StatCard = ({ title, current, target, color, onAdd }: any) => {
  const percent = Math.min((current/target)*100, 100);
  return (
    <div className="bg-[#0a0a0a] p-7 rounded-[2.5rem] border border-white/5">
      <div className="flex justify-between items-end mb-4">
        <span className="text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase">{title}</span>
        <span className="text-5xl font-black italic tracking-tighter" style={{ color }}>{current}<span className="text-[10px] text-slate-800 ml-1">/{target}</span></span>
      </div>
      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mb-6">
        <div className="h-full transition-all duration-1000 ease-out shadow-[0_0_15px]" style={{ width: `${percent}%`, backgroundColor: color, boxShadow: `0 0 15px ${color}88` }} />
      </div>
      <div className="flex gap-2">
        {[10, 20, 50].map(v => (
          <button key={v} onClick={() => onAdd(v)} className="flex-1 bg-white/[0.03] py-4 rounded-2xl text-[11px] font-black border border-white/5 active:bg-white/10 active:scale-95 transition-all">+{v}</button>
        ))}
      </div>
    </div>
  );
};

export default App;