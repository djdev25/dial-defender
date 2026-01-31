
import React, { useState } from 'react';
import { AnalysisResult, VoiceClassification, ThreatLevel } from '../types';
import VoiceDNAChart from './VoiceDNAChart';
import { 
  ShieldCheck, ShieldAlert, AlertTriangle, RefreshCw, 
  ChevronRight, Info, FileText, Download, Check, Cpu, Eye, Activity
} from 'lucide-react';

interface Props {
  result: AnalysisResult;
  onReset: () => void;
}

const AnalysisView: React.FC<Props> = ({ result, onReset }) => {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [showTechnical, setShowTechnical] = useState(false);

  const isHuman = result.classification === VoiceClassification.HUMAN;
  const colorClass = isHuman ? 'text-emerald-400' : 'text-rose-400';
  const bgClass = isHuman ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-rose-500/5 border-rose-500/10';

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-700">
      
      {/* Top Banner Result - 'SOC STYLE' */}
      <div className={`rounded-2xl p-6 md:p-8 border flex flex-col md:flex-row items-center gap-8 ${bgClass} relative overflow-hidden`}>
        <div className="absolute top-0 right-0 p-4 flex gap-4">
           <div className="flex flex-col items-end">
             <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Signal Integrity</span>
             <div className="flex gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`w-1.5 h-3 rounded-full ${i < (result.signalIntegrity / 20) ? 'bg-emerald-500' : 'bg-white/5'}`} />
                ))}
             </div>
           </div>
           <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Case ID: VG-{Math.floor(Math.random()*9000+1000)}</span>
        </div>
        
        <div className={`w-28 h-28 rounded-2xl flex items-center justify-center shrink-0 border-2 border-current/20 ${colorClass} bg-black/40 shadow-2xl`}>
          {isHuman ? <ShieldCheck size={56} strokeWidth={1} /> : <ShieldAlert size={56} strokeWidth={1} />}
        </div>
        
        <div className="flex-grow space-y-3 text-center md:text-left">
          <div className="space-y-1">
            <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-tighter ${colorClass}`}>
              {result.classification} DETECTED
            </h2>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <span className="mono text-[10px] px-2 py-1 rounded bg-black/50 border border-white/5 uppercase tracking-widest font-bold">
                Match Confidence: <span className="text-white">{result.confidence}%</span>
              </span>
              <span className={`mono text-[10px] px-2 py-1 rounded bg-black/50 border border-white/5 flex items-center gap-2 uppercase tracking-widest font-bold`}>
                Threat Index: <span className={result.threatLevel === ThreatLevel.LOW ? 'text-emerald-400' : 'text-rose-500'}>{result.threatLevel}</span>
              </span>
            </div>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-2xl font-medium">
            "{result.explanation}"
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* DNA Fingerprint Chart */}
        <div className="lg:col-span-7 glass rounded-2xl p-6 border border-white/5 space-y-6 flex flex-col">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h3 className="text-xs font-black flex items-center gap-2 text-white uppercase tracking-widest">
              <span className="text-emerald-400">🧬</span> Forensic Voice DNA
            </h3>
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[9px] text-slate-500 mono uppercase tracking-widest">Spectral Integrity Synced</span>
            </div>
          </div>
          
          <div className="flex-grow flex items-center justify-center py-4">
            <VoiceDNAChart data={result.dnaData} />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            {result.dnaData.map((dna, idx) => (
              <div key={idx} className="p-3 bg-black/40 rounded-xl border border-white/5 hover:border-emerald-500/20 transition-all flex flex-col justify-between group">
                <p className="text-[8px] text-slate-500 uppercase font-black tracking-widest mb-1 group-hover:text-emerald-400 transition-colors">{dna.attribute}</p>
                <div className="flex items-end justify-between">
                   <p className="text-lg font-black text-white mono leading-none">{dna.value}%</p>
                   <p className="text-[8px] text-emerald-500/40 mono">Avg: {dna.humanAvg}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Audit Log */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass rounded-2xl p-6 border border-white/5 space-y-6 flex flex-col h-full">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
               <h3 className="text-xs font-black flex items-center gap-2 text-white uppercase tracking-widest">
                <Cpu size={16} className="text-emerald-400" />
                Neural Reasoning Chain
              </h3>
              <button 
                onClick={() => setShowTechnical(!showTechnical)}
                className="text-emerald-500 hover:text-emerald-400 transition-colors flex items-center gap-1 text-[9px] font-bold uppercase"
              >
                <Eye size={14} /> Full Log
              </button>
            </div>
            
            <div className="space-y-4 flex-grow">
              {Object.entries(result.technicalDetails).map(([key, val], idx) => (
                <div key={idx} className="space-y-1">
                  <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest">{key.replace(/([A-Z])/g, ' $1')}</p>
                  <div className="p-3 bg-black/60 rounded-xl border border-white/5 text-[11px] text-slate-400 leading-relaxed font-mono flex items-start gap-2 group hover:bg-black/80 transition-colors">
                    <ChevronRight size={12} className="mt-0.5 shrink-0 text-emerald-500 group-hover:translate-x-1 transition-transform" />
                    {val}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-6 space-y-3">
              <button 
                onClick={handleDownload}
                disabled={downloading}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg ${
                  downloaded 
                    ? 'bg-emerald-500 text-black' 
                    : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                }`}
              >
                {downloading ? (
                  <RefreshCw size={16} className="animate-spin" />
                ) : downloaded ? (
                  <Check size={16} />
                ) : (
                  <Download size={16} />
                )}
                {downloading ? 'Compiling Forensic PDF...' : downloaded ? 'Vault Ready' : 'Download Forensic Report'}
              </button>
              
              <button 
                onClick={onReset}
                className="w-full flex items-center justify-center gap-2 py-3 text-slate-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-[0.2em]"
              >
                <RefreshCw size={14} />
                Start New Forensic Scan
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Warnings / Contextual Actions */}
      {!isHuman && (
        <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-4 text-rose-200 animate-in slide-in-from-bottom-4 duration-500">
          <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-500 shrink-0 shadow-[0_0_15px_rgba(244,63,94,0.3)]">
             <AlertTriangle size={24} />
          </div>
          <div>
            <p className="font-black text-sm uppercase tracking-widest">Protocol Warning: Neural Signature Detected</p>
            <p className="text-[11px] opacity-70 leading-relaxed mt-1">This voice contains mathematical sibilance patterns consistent with generative synthesis. Verification via secondary biometric factor (Visual/Face) is mandatory.</p>
          </div>
        </div>
      )}
      
      {result.signalIntegrity < 50 && (
         <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3 text-amber-200/80 text-[10px] font-medium animate-pulse">
            <Info size={14} className="text-amber-500" />
            Signal Quality Alert: Low audio fidelity detected. Analysis may be compromised by background interference.
         </div>
      )}
    </div>
  );
};

export default AnalysisView;
