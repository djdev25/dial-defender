
import React, { useState, useEffect } from 'react';
import { 
  X, Shield, Activity, Globe, Terminal, Lock, LogOut, 
  ChevronRight, BarChart, HardDrive, Cpu, Zap, Radio
} from 'lucide-react';

interface Props {
  onClose: () => void;
  onLogoClick: () => void;
}

const ForensicPortal: React.FC<Props> = ({ onClose, onLogoClick }) => {
  const [threatLogs, setThreatLogs] = useState<{ id: string; time: string; location: string; type: string; status: string; risk: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const locations = ['London HQ', 'Silicon Valley', 'Tokyo Node', 'Berlin Server', 'Mumbai Hub'];
    const types = ['Voice Injection', 'Social Engineering (AI)', 'KYC Spoofing'];
    
    const initialLogs = Array.from({ length: 8 }).map((_, i) => ({
      id: `TR-${Math.floor(Math.random() * 10000)}`,
      time: new Date(Date.now() - (i * 450000)).toLocaleTimeString(),
      location: locations[i % locations.length],
      type: types[i % types.length],
      status: 'BLOCKED',
      risk: Math.floor(Math.random() * 40) + 60
    }));
    setThreatLogs(initialLogs);
    
    const timer = setTimeout(() => setLoading(false), 1500);

    const interval = setInterval(() => {
      setThreatLogs(prev => [
        {
          id: `TR-${Math.floor(Math.random() * 10000)}`,
          time: new Date().toLocaleTimeString(),
          location: locations[Math.floor(Math.random() * locations.length)],
          type: types[Math.floor(Math.random() * types.length)],
          status: 'BLOCKED',
          risk: Math.floor(Math.random() * 40) + 60
        },
        ...prev.slice(0, 7)
      ]);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#020617] flex items-center justify-center z-[100]">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 animate-pulse mx-auto">
              <Lock size={40} />
            </div>
            <div className="absolute inset-0 w-24 h-24 rounded-3xl border-2 border-emerald-500 animate-ping opacity-20 mx-auto"></div>
          </div>
          <div className="space-y-2">
            <p className="text-emerald-400 font-bold mono tracking-[0.3em] text-sm">ENCRYPTING SESSION</p>
            <div className="w-48 h-1 bg-white/5 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-emerald-500 animate-[loading_1.5s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#020617] text-slate-300 z-[100] flex flex-col overflow-hidden font-sans select-none">
      {/* Top Navigation Bar */}
      <div className="h-14 border-b border-white/5 bg-black/40 flex items-center justify-between px-6 shrink-0 backdrop-blur-xl">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={onLogoClick}>
            <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-black shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Shield size={16} strokeWidth={3} />
            </div>
            <span className="font-black text-white tracking-tighter text-sm uppercase">Dial Defender <span className="text-emerald-400">SOC</span></span>
          </div>
          <div className="hidden lg:flex items-center gap-6 ml-4">
            {['Global Monitor', 'Neural Sandbox', 'Threat Intelligence', 'Network Health'].map((item, i) => (
              <span key={i} className={`text-[10px] font-bold tracking-widest uppercase cursor-pointer transition-colors ${i === 0 ? 'text-emerald-400 border-b border-emerald-500' : 'text-slate-500 hover:text-white'}`}>
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4 px-4 h-8 bg-white/5 rounded-full border border-white/5">
            <span className="text-[10px] mono text-emerald-500/60 uppercase font-bold tracking-widest">System Latency: 42ms</span>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <button 
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 transition-all text-[10px] font-black uppercase tracking-widest"
          >
            <LogOut size={14} />
            Terminate
          </button>
        </div>
      </div>

      <div className="flex-grow flex p-4 gap-4 overflow-hidden">
        
        {/* Sidebar: System Telemetry */}
        <div className="w-72 flex flex-col gap-4 shrink-0">
          <div className="flex-grow glass rounded-2xl border border-white/5 p-5 space-y-8 flex flex-col">
            <div className="space-y-4">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                <Cpu size={14} className="text-emerald-500" />
                Neural Processor
              </h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] mono">
                    <span className="text-slate-400">Load</span>
                    <span className="text-white">24.2%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-1/4 bg-emerald-500" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] mono">
                    <span className="text-slate-400">Verdicts/sec</span>
                    <span className="text-white">1,402</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-cyan-500" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 flex-grow">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                <Zap size={14} className="text-amber-500" />
                Immune Clusters
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="p-3 bg-black/40 rounded-xl border border-white/5 flex flex-col gap-1">
                    <span className="text-[8px] font-bold text-slate-500">NODE-{i}0{i}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                      <span className="text-[10px] font-black text-white">ONLINE</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/5">
               <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-black font-black text-[10px] uppercase tracking-widest rounded-xl transition-all">
                Download Threat Audit
              </button>
            </div>
          </div>
        </div>

        {/* Main Feed: Threat Activity */}
        <div className="flex-grow flex flex-col gap-4 overflow-hidden">
          <div className="flex-grow glass rounded-2xl border border-white/5 flex flex-col overflow-hidden bg-black/20">
            <div className="p-5 border-b border-white/5 flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                  <Radio size={16} className="text-emerald-500 animate-pulse" />
                  Live Attack Telemetry
                </h3>
                <p className="text-[10px] text-slate-500">Cross-border voice clone detection events</p>
              </div>
              <div className="flex gap-2">
                <span className="px-2 py-1 rounded bg-white/5 border border-white/5 text-[9px] font-bold text-slate-400 uppercase tracking-widest cursor-pointer hover:text-white transition-colors">Filters</span>
                <span className="px-2 py-1 rounded bg-white/5 border border-white/5 text-[9px] font-bold text-slate-400 uppercase tracking-widest cursor-pointer hover:text-white transition-colors">Export JSON</span>
              </div>
            </div>
            
            <div className="flex-grow overflow-y-auto scrollbar-hide">
              <table className="w-full border-collapse">
                <thead className="sticky top-0 bg-[#020617] text-left text-[9px] text-slate-500 uppercase font-black tracking-[0.2em] border-b border-white/5">
                  <tr>
                    <th className="px-6 py-4">Threat Signature</th>
                    <th className="px-6 py-4">Origin Hub</th>
                    <th className="px-6 py-4">Vector Method</th>
                    <th className="px-6 py-4">AI Confidence</th>
                    <th className="px-6 py-4 text-right">Protection</th>
                  </tr>
                </thead>
                <tbody className="text-[10px] mono">
                  {threatLogs.map((log) => (
                    <tr key={log.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors group animate-in slide-in-from-right-4">
                      <td className="px-6 py-4">
                        <span className="text-emerald-400 font-bold">{log.id}</span>
                      </td>
                      <td className="px-6 py-4 text-slate-400 flex items-center gap-2">
                        <Globe size={10} className="text-slate-600" />
                        {log.location}
                      </td>
                      <td className="px-6 py-4 text-slate-300 font-medium">{log.type}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                           <span className="text-white font-bold">{log.risk}%</span>
                           <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                             <div className="h-full bg-rose-500" style={{ width: `${log.risk}%` }} />
                           </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-black text-[8px] tracking-tighter">
                          MITIGATED
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="h-48 grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
            <div className="glass rounded-2xl border border-white/5 p-5 flex flex-col justify-between hover:bg-white/[0.03] transition-colors cursor-pointer group">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Heatmap</span>
                <Globe size={18} className="text-slate-700 group-hover:text-emerald-500 transition-colors" />
              </div>
              <p className="text-[10px] text-slate-400">View density of deepfake campaigns by region.</p>
              <div className="flex items-center gap-2 text-[9px] font-bold text-emerald-400">
                EXPLORE <ChevronRight size={12} />
              </div>
            </div>
            <div className="glass rounded-2xl border border-white/5 p-5 flex flex-col justify-between hover:bg-white/[0.03] transition-colors cursor-pointer group">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Neural Weights</span>
                <Cpu size={18} className="text-slate-700 group-hover:text-cyan-500 transition-colors" />
              </div>
              <p className="text-[10px] text-slate-400">Audit the internal decision layers of the detector.</p>
              <div className="flex items-center gap-2 text-[9px] font-bold text-cyan-400">
                AUDIT <ChevronRight size={12} />
              </div>
            </div>
            <div className="glass rounded-2xl border border-rose-500/20 p-5 flex flex-col justify-between bg-rose-500/5 hover:bg-rose-500/10 transition-colors cursor-pointer group">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Security Alert</span>
                <Lock size={18} className="text-rose-700" />
              </div>
              <p className="text-[10px] text-rose-300/60 font-medium">New 'Vocal Wave' vector detected in APAC region. Update recommended.</p>
              <div className="flex items-center gap-2 text-[9px] font-bold text-rose-500">
                PATCH NOW <ChevronRight size={12} />
              </div>
            </div>
          </div>
        </div>

      </div>
      
      {/* Bottom Ticker bar */}
      <div className="h-6 bg-emerald-500/10 border-t border-emerald-500/20 flex items-center px-4 overflow-hidden whitespace-nowrap shrink-0">
        <div className="flex gap-8 animate-scroll mono text-[8px] font-bold text-emerald-400/80 uppercase tracking-widest">
          <span>// THREAT FEED: DD-1049 REJECTED (BERLIN)</span>
          <span>// THREAT FEED: DD-8822 BLOCKED (SAN FRANCISCO)</span>
          <span>// SYSTEM: NEURAL SYNC COMPLETE</span>
          <span>// SECURITY: FIREWALL ACTIVE ON ALL NODES</span>
          <span>// THREAT FEED: CLONE INJECTION ATTEMPT IN LONDON HQ BLOCKED</span>
          <span>// STATUS: VOICE DNA INTEGRITY 100% SECURE</span>
        </div>
      </div>
      
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};

export default ForensicPortal;