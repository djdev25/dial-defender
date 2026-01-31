
import React, { useRef, useState } from 'react';
import { Upload, Mic, StopCircle, Info } from 'lucide-react';

interface Props {
  onAudioReady: (file: File) => void;
  isRecording: boolean;
  setAudioState: React.Dispatch<React.SetStateAction<any>>;
}

const VoiceUploader: React.FC<Props> = ({ onAudioReady, isRecording, setAudioState }) => {
  // Fix: The initial state for dragActive should be a boolean value 'false', 
  // not an arrow function that takes an argument, which is invalid as a lazy initializer.
  const [dragActive, setDragActive] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onAudioReady(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onAudioReady(e.target.files[0]);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const file = new File([audioBlob], "recording.wav", { type: 'audio/wav' });
        onAudioReady(file);
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setAudioState((prev: any) => ({ ...prev, isRecording: true }));
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Microphone access denied. Please allow microphone permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setAudioState((prev: any) => ({ ...prev, isRecording: false }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload Box */}
        <div 
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative group h-64 flex flex-col items-center justify-center border-2 border-dashed rounded-2xl transition-all ${
            dragActive 
              ? 'border-emerald-500 bg-emerald-500/5' 
              : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.07]'
          }`}
        >
          <input 
            type="file" 
            accept="audio/*" 
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-emerald-400 transition-colors mb-4">
            <Upload size={32} />
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-white">Upload Audio File</p>
            <p className="text-sm text-slate-500 mt-1">MP3, WAV, AAC (Max 10MB)</p>
          </div>
        </div>

        {/* Record Box */}
        <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-white/10 bg-white/5 rounded-2xl hover:border-white/20 hover:bg-white/[0.07] transition-all relative overflow-hidden">
          {isRecording ? (
            <div className="space-y-6 text-center z-10">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-500 animate-pulse mx-auto">
                  <StopCircle size={40} />
                </div>
                <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-rose-500 animate-ping opacity-25 mx-auto"></div>
              </div>
              <div>
                <p className="text-lg font-semibold text-rose-500">Recording In Progress</p>
                <p className="text-sm text-slate-500 mt-1">Capturing spectral DNA...</p>
              </div>
              <button 
                onClick={stopRecording}
                className="px-6 py-2 bg-rose-500 text-white rounded-lg font-bold hover:bg-rose-600 transition-colors"
              >
                Stop & Process
              </button>
            </div>
          ) : (
            <div className="space-y-4 text-center z-10">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-emerald-400 transition-colors mx-auto cursor-pointer" onClick={startRecording}>
                <Mic size={32} />
              </div>
              <div>
                <p className="text-lg font-semibold text-white">Live Voice Capture</p>
                <p className="text-sm text-slate-500 mt-1">Record a real-time sample</p>
              </div>
              <button 
                onClick={startRecording}
                className="px-6 py-2 bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 rounded-lg font-bold hover:bg-emerald-500/20 transition-all"
              >
                Start Recording
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Accuracy Tip */}
      <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
        <Info className="text-cyan-400 shrink-0 mt-0.5" size={18} />
        <p className="text-xs text-slate-400 leading-relaxed">
          <strong className="text-slate-200">Accuracy Tip:</strong> For the most precise DNA extraction, record in a quiet environment. Our AI differentiates between background hiss and synthetic artifacts, but a clear sample ensures the best forensic integrity.
        </p>
      </div>
    </div>
  );
};

export default VoiceUploader;
