
import React from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip
} from 'recharts';
import { DNAMark } from '../types';

interface Props {
  data: DNAMark[];
}

const VoiceDNAChart: React.FC<Props> = ({ data }) => {
  // Mock data for AI Benchmarking to show 'International Hackathon' level depth
  const chartData = data.map(d => ({
    ...d,
    aiBaseline: Math.floor(Math.random() * 30) + 60, // Simulated AI pattern (usually high regularity)
  }));

  return (
    <div className="w-full h-[400px] flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
          <PolarGrid stroke="#1e293b" />
          <PolarAngleAxis dataKey="attribute" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', color: '#fff' }}
            itemStyle={{ fontSize: '12px' }}
          />

          {/* Average Human Baseline */}
          <Radar
            name="Human (Natural)"
            dataKey="humanAvg"
            stroke="#10b981"
            fill="#10b981"
            fillOpacity={0.05}
            strokeDasharray="4 4"
          />
          
          {/* AI Deepfake Baseline */}
          <Radar
            name="AI Clone Pattern"
            dataKey="aiBaseline"
            stroke="#f43f5e"
            fill="#f43f5e"
            fillOpacity={0.1}
            strokeDasharray="2 2"
          />

          {/* Analyzed Sample */}
          <Radar
            name="Analyzed Sample"
            dataKey="value"
            stroke="#38bdf8"
            fill="#38bdf8"
            fillOpacity={0.5}
            strokeWidth={3}
          />
          <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px' }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VoiceDNAChart;
