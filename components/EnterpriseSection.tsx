
import React, { useState } from 'react';
import { X, Building2, ShieldCheck, BarChart3, Users, Zap, Briefcase, Mail, User, Globe, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';

interface Props {
  onClose: () => void;
}

const EnterpriseSection: React.FC<Props> = ({ onClose }) => {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    useCase: 'banking'
  });

  const tiers = [
    {
      icon: <Users className="text-emerald-400" />,
      title: "Call Centers",
      features: ["Real-time agent protection", "Voice biometric MFA", "Spam pattern detection"]
    },
    {
      icon: <Building2 className="text-purple-400" />,
      title: "Banking & FinTech",
      features: ["Transaction authorization", "Anti-fraud voice KYC", "Deepfake screening"]
    },
    {
      icon: <Zap className="text-cyan-400" />,
      title: "Telecom Providers",
      features: ["Network-level firewall", "Automated call flagging", "White-label API"]
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="glass max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative animate-in zoom-in-95 duration-300 scrollbar-hide">
        <button 
          onClick={onClose}
          className="sticky top-6 float-right mr-6 p-2 rounded-full bg-black/40 hover:bg-white/10 transition-colors text-slate-400 hover:text-white z-10"
        >
          <X size={24} />
        </button>

        <div className="p-8 md:p-12 space-y-12">
          {!showForm ? (
            <>
              <div className="text-center space-y-4 max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/20 tracking-wider uppercase">
                  <Briefcase size={14} />
                  Enterprise Solutions
                </div>
                <h2 className="text-4xl font-bold text-white tracking-tight">Scale Your Security</h2>
                <p className="text-slate-400 text-lg">
                  Dial Defender provides enterprise-grade infrastructure to stop AI-driven fraud across your entire organization.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tiers.map((tier, idx) => (
                  <div key={idx} className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-all space-y-6 flex flex-col">
                    <div className="w-14 h-14 rounded-2xl bg-black/40 flex items-center justify-center">
                      {tier.icon}
                    </div>
                    <div className="space-y-2 flex-grow">
                      <h3 className="text-xl font-bold text-white">{tier.title}</h3>
                      <ul className="space-y-3">
                        {tier.features.map((f, i) => (
                          <li key={i} className="text-sm text-slate-500 flex items-center gap-2">
                            <ShieldCheck size={14} className="text-emerald-500/60" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button 
                      onClick={() => setShowForm(true)}
                      className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold text-white transition-all"
                    >
                      Contact Sales
                    </button>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-black/40 p-10 rounded-3xl border border-white/5">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <BarChart3 className="text-emerald-400" />
                    Global Threat Dashboard
                  </h3>
                  <p className="text-slate-400">
                    Gain real-time insights into voice attack vectors targeting your business. Track detection accuracy, geographic hotspots, and evolving deepfake trends.
                  </p>
                  <div className="flex gap-4">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-2xl font-black text-emerald-400">99.9%</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Uptime SLA</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-2xl font-black text-cyan-400">&lt;200ms</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Latency</p>
                    </div>
                  </div>
                </div>
                <div className="relative group overflow-hidden rounded-2xl border border-white/10 aspect-video flex items-center justify-center bg-emerald-500/5">
                   <ShieldCheck size={80} className="text-emerald-500/20 group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute inset-0 scanner-line"></div>
                </div>
              </div>

              <div className="text-center">
                <button 
                  onClick={() => setShowForm(true)}
                  className="px-10 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-bold rounded-2xl shadow-xl shadow-emerald-900/40 hover:scale-105 transition-all"
                >
                  Schedule an Enterprise Demo
                </button>
              </div>
            </>
          ) : isSuccess ? (
            <div className="text-center py-20 space-y-6 animate-in fade-in zoom-in-95 duration-500">
              <div className="w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 mx-auto shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <CheckCircle2 size={48} />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-white">Request Transmitted</h3>
                <p className="text-slate-400 max-w-sm mx-auto">
                  Your forensic integration request has been received. Our solutions architect will contact you within 4 business hours.
                </p>
              </div>
              <div className="pt-4 flex justify-center gap-4">
                <button 
                  onClick={onClose}
                  className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-emerald-400 transition-all"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-xl mx-auto space-y-8 animate-in slide-in-from-bottom-8 duration-500">
              <div className="space-y-2 text-center">
                <h3 className="text-3xl font-bold text-white">Forensic Demo Request</h3>
                <p className="text-slate-400">Secure your organization's voice integrity today.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" size={18} />
                    <input 
                      required
                      type="text"
                      placeholder="Jane Doe"
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Corporate Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" size={18} />
                    <input 
                      required
                      type="email"
                      placeholder="jane@company.com"
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Organization</label>
                  <div className="relative group">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" size={18} />
                    <input 
                      required
                      type="text"
                      placeholder="Acme FinTech"
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Primary Vector Area</label>
                  <select 
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                    value={formData.useCase}
                    onChange={(e) => setFormData({...formData, useCase: e.target.value})}
                  >
                    <option value="banking">Banking Authorization</option>
                    <option value="callcenter">Call Center Verification</option>
                    <option value="kyc">KYC & Identity Screening</option>
                    <option value="telco">Network Level Protection</option>
                  </select>
                </div>

                <div className="pt-4 flex flex-col gap-3">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-black font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        Establishing Link...
                      </>
                    ) : (
                      <>
                        Request Forensic Demo
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="w-full py-3 text-slate-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
                  >
                    Back to Overview
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnterpriseSection;