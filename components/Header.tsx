
import React from 'react';
import { Shield, Lock, Menu, Globe, Code, Building2 } from 'lucide-react';

interface HeaderProps {
  onLogoClick: () => void;
  onShowHow: () => void;
  onShowApi: () => void;
  onShowEnterprise: () => void;
  onShowPortal: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick, onShowHow, onShowApi, onShowEnterprise, onShowPortal }) => {
  return (
    <header className="sticky top-0 z-40 w-full glass border-b border-white/5">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer" onClick={onLogoClick}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Shield size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white leading-none">DIAL <span className="text-emerald-400">DEFENDER</span></h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Digital Immune System</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <button 
            onClick={onShowHow} 
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
          >
            <Globe size={14} className="group-hover:text-emerald-400" />
            How it Works
          </button>
          <button 
            onClick={onShowApi} 
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
          >
            <Code size={14} className="group-hover:text-cyan-400" />
            API Docs
          </button>
          <button 
            onClick={onShowEnterprise} 
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
          >
            <Building2 size={14} className="group-hover:text-purple-400" />
            Enterprise
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={onShowPortal}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-400 hover:bg-emerald-500/20 transition-all font-bold group"
          >
            <Lock size={14} className="group-hover:scale-110 transition-transform" />
            Secure Portal
          </button>
          <button className="md:hidden text-slate-400 p-2 hover:bg-white/5 rounded-lg" onClick={onShowHow}>
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;