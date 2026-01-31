
import React from 'react';
import { X, Mic, Cpu, Search, ShieldCheck, Zap } from 'lucide-react';

interface Props {
  onClose: () => void;
}

const HowItWorks: React.FC<Props> = ({ onClose }) => {
  const steps = [
    {
      icon: <Mic className="text-emerald-400" />,
      title: "Audio Capture",
      description: "Upload an existing file or record live speech directly. We support various formats and multi-language environments."
    },
    {
      icon: <Zap className="text-cyan-400" />,
      title: "DNA Extraction",
      description: "Our AI extracts unique biometric markers like micro-pitch variations, breath intervals, and frequency stability."
    },
    {
      icon: <Cpu className="text-purple-400" />,
      title: "Neural Analysis",
      description: "Advanced models compare extracted traits against typical synthetic artifacts found in deepfake voice clones."
    },
    {
      icon: <ShieldCheck className="text-emerald-500" />,
      title: "Integrity Score",
      description: "You receive a clear classification, a confidence percentage, and a visual fingerprint of the voice DNA."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="glass max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative animate-in zoom-in-95 duration-300 scrollbar-hide">
        <button 
          onClick={onClose}
          className="sticky top-6 float-right mr-6 p-2 rounded-full bg-black/40 hover:bg-white/10 transition-colors text-slate-400 hover:text-white z-10"
        >
          <X size={24} />
        </button>

        <div className="p-8 md:p-12 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                <Search size={24} />
              </span>
              How Dial Defender Works
            </h2>
            <p className="text-slate-400">
              Fighting AI with AI. Our platform uses forensic-grade audio analysis to protect you from voice-based identity theft.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-black/40 flex items-center justify-center">
                  {step.icon}
                </div>
                <h3 className="font-bold text-white">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
            <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-2">The Innovation: Voice DNA</h4>
            <p className="text-sm text-slate-300">
              Unlike traditional filters, Dial Defender looks for the <strong>hidden biological signatures</strong> of human speech that synthetic models struggle to replicate: organic jitter, irregular sibilance, and unique spectral noise floors.
            </p>
          </div>
          
          <button 
            onClick={onClose}
            className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-emerald-400 transition-colors"
          >
            Got it, Let's Protect!
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;