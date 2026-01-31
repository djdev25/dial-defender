
import React from 'react';
import { X, Code2, Terminal, Shield, Key, ArrowRight, Info } from 'lucide-react';

interface Props {
  onClose: () => void;
}

const ApiDocs: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="glass max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative animate-in zoom-in-95 duration-300 scrollbar-hide">
        <button 
          onClick={onClose}
          className="sticky top-6 float-right mr-6 p-2 rounded-full bg-black/40 hover:bg-white/10 transition-colors text-slate-400 hover:text-white z-10"
        >
          <X size={24} />
        </button>

        <div className="p-8 md:p-12 space-y-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-400">
                <Code2 size={28} />
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight">Dial Defender API</h2>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed">
              Integrate forensic-grade voice detection into your banking, call center, or social platform with our secure REST API.
            </p>
          </div>

          {/* Developer Note */}
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-start gap-3">
            <Info className="text-blue-400 shrink-0 mt-0.5" size={18} />
            <p className="text-xs text-blue-200/70 leading-relaxed">
              <strong>Integrator Note:</strong> The API keys documented below are <span className="text-blue-300">Service Tokens</span> issued to your organization. They allow your servers to communicate with the Dial Defender Cloud. Do not share these keys in client-side code.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Key size={20} className="text-cyan-400" />
              Authentication
            </h3>
            <p className="text-sm text-slate-500">All requests must include your service token in the Authorization header.</p>
            <div className="bg-black/60 rounded-xl p-4 border border-white/5 mono text-sm text-cyan-400 flex justify-between items-center group">
              <span>Authorization: Bearer <span className="text-white">dd_live_sk_xxxxxxxxxxxxxxxx</span></span>
              <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Example Key</span>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Terminal size={20} className="text-emerald-400" />
              Analyze Endpoint
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 rounded bg-emerald-500 text-black font-bold text-xs uppercase">POST</span>
                <span className="mono text-slate-300">/v1/analyze/voice</span>
              </div>
              <p className="text-sm text-slate-500">Send a multipart/form-data request with the voice sample to receive a forensic verdict.</p>
              
              <div className="bg-black/60 rounded-xl p-6 border border-white/5 space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-2">
                  <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">cURL Implementation</span>
                  <span className="text-xs text-slate-600">bash</span>
                </div>
                <pre className="mono text-xs text-slate-300 leading-relaxed overflow-x-auto">
{`curl -X POST https://api.dialdefender.ai/v1/analyze \\
  -H "Authorization: Bearer dd_live_sk_74eC39HqLy" \\
  -F "audio=@sample_recording.wav" \\
  -F "metadata={'user_id': 'bank_customer_901'}"`}
                </pre>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-2 hover:bg-white/[0.07] transition-colors cursor-pointer group">
              <h4 className="font-bold text-white flex items-center justify-between">
                Webhooks
                <ArrowRight size={16} className="text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
              </h4>
              <p className="text-sm text-slate-500">Subscribe to real-time events for automated fraud mitigation.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-2 hover:bg-white/[0.07] transition-colors cursor-pointer group">
              <h4 className="font-bold text-white flex items-center justify-between">
                Global SDKs
                <ArrowRight size={16} className="text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
              </h4>
              <p className="text-sm text-slate-500">Native libraries for Go, Rust, Java, and Python.</p>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 text-center">
            <button className="text-cyan-400 hover:text-cyan-300 transition-colors font-bold flex items-center gap-2 mx-auto group">
              Get Production API Credentials
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDocs;