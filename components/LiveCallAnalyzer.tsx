
import React, { useState, useRef, useEffect } from 'react';
import { X, Mic, StopCircle, ShieldAlert, Activity, AlertTriangle, Zap, Terminal, ShieldCheck, FileText, Loader2, ArrowLeft, Lock, Fingerprint, Ghost, BellRing, PhoneOff, Info, Smartphone, Play } from 'lucide-react';
import { GoogleGenAI, Modality } from '@google/genai';
import { summarizeLiveCall } from '../services/geminiService';
import { AnalysisResult } from '../types';
import AnalysisView from './AnalysisView';

interface Props {
  onClose: () => void;
}

const LiveCallAnalyzer: React.FC<Props> = ({ onClose }) => {
  const [isActive, setIsActive] = useState(false);
  const [transcript, setTranscript] = useState<{ text: string; role: 'user' | 'model'; tags?: string[] }[]>([]);
  const [threatScore, setThreatScore] = useState(0);
  const [behaviorTags, setBehaviorTags] = useState<string[]>([]);
  const [piiLeaks, setPiiLeaks] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'listening' | 'compiling'>('idle');
  const [finalReport, setFinalReport] = useState<AnalysisResult | null>(null);
  const [isAlerting, setIsAlerting] = useState(false);
  const [criticalAlert, setCriticalAlert] = useState<{title: string, msg: string} | null>(null);
  const [simulationMode, setSimulationMode] = useState(false);
  const [incomingCallSim, setIncomingCallSim] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcript]);

  const encode = (base64: string) => {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  const createBlob = (data: Float32Array) => {
    const int16 = new Int16Array(data.length);
    for (let i = 0; i < data.length; i++) {
      int16[i] = data[i] * 32768;
    }
    const bytes = new Uint8Array(int16.buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return {
      data: btoa(binary),
      mimeType: 'audio/pcm;rate=16000',
    };
  };

  const startAnalysis = async () => {
    setFinalReport(null);
    setTranscript([]);
    setBehaviorTags([]);
    setPiiLeaks([]);
    setThreatScore(0);
    setIsAlerting(false);
    setCriticalAlert(null);
    setStatus('connecting');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      audioContextRef.current = new AudioContext({ sampleRate: 16000 });
      const source = audioContextRef.current.createMediaStreamSource(stream);
      const processor = audioContextRef.current.createScriptProcessor(4096, 1, 1);

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          systemInstruction: `
            You are the DIAL DEFENDER NATIVE INTERCEPTOR. 
            MISSION: Monitor phone calls word-by-word for high-risk fraud and PII (Personal Identity) leaks.
            
            IMMEDIATE ACTION PROTOCOL:
            1. If "Bank", "Account Number", "PIN", or "CVV" are detected: respond with "[CRITICAL_LEAK: Bank Info Detected]"
            2. If Social Security or Personal ID mentioned: respond with "[PII_LEAK: Identity Exposure]"
            3. If Scam pressure: "[FRAUD_SIGNATURE: High Pressure Scam]"
          `
        },
        callbacks: {
          onopen: () => {
            setStatus('listening');
            setIsActive(true);
            source.connect(processor);
            processor.connect(audioContextRef.current!.destination);
          },
          onmessage: async (message) => {
            if (message.serverContent?.inputTranscription) {
              const text = message.serverContent.inputTranscription.text;
              setTranscript(prev => [...prev, { text, role: 'user' }]);
            }
            if (message.serverContent?.outputTranscription) {
              const text = message.serverContent.outputTranscription.text;
              if (text.includes('CRITICAL_LEAK') || text.includes('PII_LEAK')) {
                const leakType = text.includes('Bank') ? 'BANK ACCOUNT EXPOSURE' : 'PRIVATE IDENTITY LEAK';
                setPiiLeaks(prev => Array.from(new Set([...prev, leakType])));
                setThreatScore(s => Math.min(s + 40, 100));
                triggerCriticalAlert(leakType, "Immediate threat detected. The caller is accessing sensitive banking data.");
              }
              setTranscript(prev => [...prev, { text, role: 'model' }]);
            }
          },
          onclose: () => setIsActive(false)
        }
      });

      sessionRef.current = await sessionPromise;
      processor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        const pcmBlob = createBlob(inputData);
        sessionRef.current.sendRealtimeInput({ media: pcmBlob });
      };
    } catch (err) {
      console.error(err);
      setStatus('idle');
    }
  };

  const triggerCriticalAlert = (title: string, msg: string) => {
    setIsAlerting(true);
    setCriticalAlert({ title, msg });
    if ('vibrate' in navigator) navigator.vibrate([300, 100, 300]);
    setTimeout(() => {
      setIsAlerting(false);
      setCriticalAlert(null);
    }, 6000);
  };

  const stopAnalysis = () => {
    setIsActive(false);
    setStatus('idle');
    if (audioContextRef.current) { audioContextRef.current.close(); audioContextRef.current = null; }
    if (sessionRef.current) { sessionRef.current.close(); sessionRef.current = null; }
  };

  const simulateIncomingCall = () => {
    setIncomingCallSim(true);
    // After 3 seconds of "ringing", auto-activate the shield
    setTimeout(() => {
      setIncomingCallSim(false);
      startAnalysis();
    }, 3000);
  };

  if (incomingCallSim) {
    return (
      <div className="fixed inset-0 z-[100] bg-slate-900 flex flex-col items-center justify-center p-8 animate-in fade-in">
        <div className="w-full max-w-sm space-y-12 text-center">
          <div className="relative">
            <div className="w-32 h-32 bg-emerald-500 rounded-full flex items-center justify-center mx-auto animate-bounce shadow-[0_0_50px_rgba(16,185,129,0.5)]">
              <Smartphone size={64} className="text-white" />
            </div>
            <div className="absolute inset-0 w-32 h-32 rounded-full border-4 border-emerald-500 animate-ping opacity-30 mx-auto" />
          </div>
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Incoming Call</h2>
            <p className="text-emerald-400 font-bold tracking-[0.3em] text-xs">DIAL DEFENDER AUTO-SHIELD STARTING...</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-slate-400 text-xs italic">
            "Native Telephony Bridge detected. Auto-activating real-time word analysis."
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 z-[60] flex items-center justify-center p-4 transition-all duration-500 ${isAlerting ? 'bg-rose-950/80' : 'bg-black/90'} backdrop-blur-xl animate-in fade-in`}>
      
      {criticalAlert && (
        <div className="absolute inset-0 z-[70] flex items-center justify-center p-6 animate-in zoom-in-95 pointer-events-none">
          <div className="max-w-md w-full bg-rose-600 p-8 rounded-[2rem] shadow-[0_0_100px_rgba(225,29,72,0.8)] text-center space-y-4 border-4 border-white/40 animate-pulse">
            <BellRing size={48} className="mx-auto text-white" />
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">{criticalAlert.title}</h2>
            <p className="text-white font-bold leading-tight">{criticalAlert.msg}</p>
            <div className="p-3 bg-black/20 rounded-xl text-[10px] text-white/70 font-mono uppercase tracking-widest">
              Action: End Call Immediately
            </div>
          </div>
        </div>
      )}

      <div className={`glass max-w-5xl w-full h-[85vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all duration-500 relative ${isAlerting ? 'border-rose-500 shadow-rose-500/40' : 'border-white/10'}`}>
        
        <div className={`p-6 border-b flex items-center justify-between transition-colors duration-500 ${isAlerting ? 'bg-rose-500/30 border-rose-500/50' : 'bg-black/40 border-white/10'}`}>
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${isAlerting ? 'bg-white text-rose-600' : isActive ? 'bg-rose-500/20 text-rose-500 animate-pulse' : 'bg-emerald-500/20 text-emerald-500'}`}>
              <ShieldAlert size={28} />
            </div>
            <div>
              <h2 className="text-xl font-bold uppercase tracking-tight text-white">Native App Prototype</h2>
              <p className="text-xs text-slate-500 mono flex items-center gap-2 uppercase tracking-widest">
                {isActive ? 'Shield Active: Auto-Scanning Words' : 'Native Telephony Hook Ready'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-slate-400">
            <X size={24} />
          </button>
        </div>

        <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
          <div className="flex-grow flex flex-col p-6 space-y-6 overflow-hidden">
            
            {!isActive && (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-4 animate-in slide-in-from-top-4">
                <div className="flex items-center gap-3">
                  <Smartphone className="text-emerald-400" size={24} />
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest">Native Mobile Logic</h3>
                </div>
                <p className="text-xs text-emerald-200/60 leading-relaxed">
                  In the Native Mobile App, this screen will open <strong>automatically</strong> the moment your phone rings. It will scan for "Bank Details" or "PII" word-by-word and vibrate if a threat is found.
                </p>
                <button 
                  onClick={simulateIncomingCall}
                  className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-black uppercase text-xs tracking-widest flex items-center gap-2 hover:bg-emerald-500 transition-all"
                >
                  <Play size={14} /> Simulate Auto-Activation
                </button>
              </div>
            )}

            <div className={`h-32 rounded-2xl border flex items-center justify-center relative overflow-hidden transition-all duration-500 ${isAlerting ? 'bg-rose-500/20 border-rose-500/40' : 'bg-black/60 border-white/5'}`}>
              {isActive ? (
                <div className="flex items-center gap-1">
                  {[...Array(24)].map((_, i) => (
                    <div key={i} className={`w-1.5 rounded-full animate-bounce ${isAlerting ? 'bg-rose-400' : 'bg-emerald-500/60'}`} style={{ height: `${Math.random() * 60 + 20}%`, animationDelay: `${i * 0.05}s` }} />
                  ))}
                </div>
              ) : (
                <div className="text-center opacity-40">
                  <Activity size={32} className="mx-auto" />
                </div>
              )}
            </div>

            <div className="flex-grow glass rounded-2xl border border-white/5 p-4 flex flex-col overflow-hidden relative">
              <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Live Intercept Feed</h3>
              </div>
              <div ref={scrollRef} className="flex-grow overflow-y-auto space-y-4 scrollbar-hide">
                {transcript.map((t, i) => (
                  <div key={i} className={`flex ${t.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[85%] p-3 rounded-2xl text-xs font-medium leading-relaxed ${
                      t.role === 'user' ? 'bg-white/5 text-slate-200' : 'bg-rose-600 text-white shadow-xl'
                    }`}>
                      <span className="text-[8px] font-black uppercase tracking-widest block opacity-50 mb-1">
                        {t.role === 'user' ? 'INCOMING VOICE' : 'THREAT SHIELD'}
                      </span>
                      {t.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full md:w-80 bg-black/40 border-l border-white/10 p-6 flex flex-col gap-6">
            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Threat Index</h3>
              <div className="relative h-4 bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full transition-all duration-1000 ${threatScore > 50 ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${threatScore}%` }} />
              </div>
              <p className="text-4xl font-black text-white">{threatScore}%</p>
            </div>

            <div className={`p-4 rounded-2xl border transition-colors ${piiLeaks.length > 0 ? 'bg-rose-500/10 border-rose-500/30' : 'bg-black/40 border-white/5'}`}>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-rose-500 mb-2">Leaks Blocked</h3>
              <div className="flex flex-wrap gap-2">
                {piiLeaks.map((leak, i) => (
                  <span key={i} className="px-2 py-1 rounded bg-rose-500/20 text-rose-400 text-[10px] font-bold uppercase">{leak}</span>
                ))}
              </div>
            </div>

            <div className="mt-auto space-y-3">
              {isActive ? (
                <button onClick={stopAnalysis} className="w-full py-4 bg-rose-600 text-white font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2">
                  <PhoneOff size={18} /> End & Log
                </button>
              ) : (
                <button onClick={simulateIncomingCall} className="w-full py-4 bg-emerald-600 text-white font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2">
                  <Play size={18} /> Simulate Auto-Start
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveCallAnalyzer;