
export enum VoiceClassification {
  HUMAN = 'HUMAN',
  AI = 'AI',
  UNCERTAIN = 'UNCERTAIN'
}

export enum ThreatLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export interface DNAMark {
  attribute: string;
  value: number; // 0 to 100
  humanAvg: number;
}

export interface AnalysisResult {
  classification: VoiceClassification;
  confidence: number;
  threatLevel: ThreatLevel;
  explanation: string;
  signalIntegrity: number;
  dnaData: DNAMark[];
  technicalDetails: {
    spectralGating: string;
    prosodyNaturalness: string;
    breathPatterns: string;
    noiseFloor: string;
  };
}

export interface AudioState {
  file: File | null;
  url: string | null;
  isRecording: boolean;
}
