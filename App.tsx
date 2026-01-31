
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import VoiceUploader from './components/VoiceUploader';
import AnalysisView from './components/AnalysisView';
import HowItWorks from './components/HowItWorks';
import ApiDocs from './components/ApiDocs';
import EnterpriseSection from './components/EnterpriseSection';
import ForensicPortal from './components/ForensicPortal';
import LiveCallAnalyzer from './components/LiveCallAnalyzer';
import { analyzeVoice } from './services/geminiService';
import { AnalysisResult, AudioState } from './types';
import { AlertCircle, ShieldCheck, Activity, Radio, Lock } from 'lucide-react';

const App: React.FC = () => {
  const [audioState, setAudioState] = useState<AudioState>({
    file: null,
    url: null,
    isRecording: false
  });
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Navigation States
  const [activeModal, setActiveModal] = useState<'how' | 'api' | 'enterprise' | 'portal' | 'live' | null>(null);

  const handleAudioReady = useCallback((file: File) => {
    setAudioState({
      file,
      url: URL.createObjectURL(file),
      isRecording: false
    });
    setResult(null);
    setError(null);
  }, []);

  const startAnalysis = async () => {
    if (!audioState.file) return;

    setAnalyzing(true);
    setError(null);
    try {
      const analysis = await analyzeVoice(audioState.file);
      setResult(analysis);
    } catch (err: any) {
      console.error(err);
      setError("Failed to analyze voice DNA. Please try again with a clearer sample.");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleLogoClick = () => {
    setAudioState({ file: null, url: null, isRecording: false });
    setResult(null);
    setError(null);
    setActiveModal(null);
  };

  const reset = () => {
    setAudioState({ file: null, url: null, isRecording: false });
    setResult(null);
    setError(null);
  };

  if (activeModal === 'portal') {
    return <ForensicPortal onClose={() => setActiveModal(null)} onLogoClick={handleLogoClick} />;
  }

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden transition-colors duration-500">
      <Header 
        onLogoClick={handleLogoClick}
        onShowHow={() => setActiveModal('how')}
        onShowApi={() => setActiveModal('api')}
        onShowEnterprise={() => setActiveModal('enterprise')}
        onShowPortal={() => setActiveModal('portal')}
      />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Hero Section */}
          {!result && !analyzing && (
            <div className="text-center space-y-4 mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20 tracking-wider uppercase mb-2">
                <ShieldCheck size={14} />
                Real-Time Defense
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-emerald-100 to-rose-400 uppercase tracking-tighter">
                Dial Defender
              </h1>
              <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
                Automatic protection for bank calls, PII detection, and word-by-word fraud analysis.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                 <button 
                  onClick={() => setActiveModal('live')}
                  className="px-8 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-rose-900/20 flex items-center gap-3 group"
                >
                  <Radio size={18} className="animate-pulse" />
                  Activate Auto-Guard
                </button>
              </div>
            </div>
          )}

          {/* Core UI */}
          {!result ? (
            <div className={`glass rounded-2xl p-6 md:p-10 transition-all duration-500 ${analyzing ? 'scale-95 opacity-50 pointer-events-none' : 'scale-100'}`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                  <Lock size={14} className="text-emerald-500" /> Forensic Scan Unit
                </h2>
              </div>
              <VoiceUploader onAudioReady={handleAudioReady} isRecording={audioState.isRecording} setAudioState={setAudioState} />
              
              {audioState.url && (
                <div className="mt-8 p-6 bg-black/40 rounded-xl border border-white/5 space-y-4 animate-in fade-in slide-in-from-bottom-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                        <Activity size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Capture Integrity Confirmed</p>
                        <p className="text-xs text-slate-500 mono">{(audioState.file?.size ? (audioState.file.size / 1024).toFixed(1) : "0")} KB • Secure Buffer</p>
                      </div>
                    </div>
                    <button 
                      onClick={reset}
                      className="text-xs text-slate-500 hover:text-white transition-colors"
                    >
                      Purge
                    </button>
                  </div>
                  <audio src={audioState.url} controls className="w-full h-10 opacity-80" />
                  <button
                    onClick={startAnalysis}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 group"
                  >
                    Deep DNA Scan
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <AnalysisView result={result} onReset={reset} />
          )}

          {/* Loading State */}
          {analyzing && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
              <div className="max-w-md w-full glass rounded-3xl p-8 text-center space-y-6 relative overflow-hidden">
                <div className="scanner-line"></div>
                <div className="relative z-10 space-y-6">
                  <div className="w-24 h-24 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin mx-auto"></div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">Extracting Voice DNA</h3>
                    <p className="text-emerald-400 mono text-sm animate-pulse">Analyzing micro-pitch variations...</p>
                    <p className="text-slate-500 text-sm">Our AI is examining the spectral noise floor and prosody patterns to detect synthetic artifacts.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-start gap-4 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400">
              <AlertCircle className="shrink-0" />
              <div>
                <p className="font-semibold">Detection Error</p>
                <p className="text-sm opacity-80">{error}</p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      {activeModal === 'how' && <HowItWorks onClose={() => setActiveModal(null)} />}
      {activeModal === 'api' && <ApiDocs onClose={() => setActiveModal(null)} />}
      {activeModal === 'enterprise' && <EnterpriseSection onClose={() => setActiveModal(null)} />}
      {activeModal === 'live' && <LiveCallAnalyzer onClose={() => setActiveModal(null)} />}

      <footer className="py-8 border-t border-white/5 bg-black/20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">© 2024 DIAL DEFENDER • Secure Voice Cybersecurity • Auto-Guard Technology Enabled</p>
        </div>
      </footer>
    </div>
  );
};

export default App;