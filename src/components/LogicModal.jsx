import React from 'react';
import { X, Cpu, Heart } from 'lucide-react';

export default function LogicModal({ data, onClose, persona }) {
  if (!data) return null;

  const isMobile = persona === 'mobile';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-glass" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: isMobile ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: isMobile ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #1e90ff, #0984e3)', padding: '0.5rem', borderRadius: '12px', boxShadow: isMobile ? '0 4px 15px rgba(16,185,129,0.3)' : '0 4px 15px rgba(30,144,255,0.3)' }}>
              {isMobile ? <Heart size={24} color="white" /> : <Cpu size={24} color="white" />}
            </div>
            <h3 style={{ fontSize: isMobile ? '1.25rem' : '1.5rem', fontWeight: '700', letterSpacing: '0.025em' }}>
              {isMobile ? 'Penjelasan Sistem' : 'AI Logic Explanation'}
            </h3>
          </div>
          <button className="control-btn" onClick={onClose} style={{ padding: '0.5rem' }}>
            <X size={24} />
          </button>
        </div>
        
        <div style={{ 
          background: isMobile ? '#f8fafc' : 'rgba(0,0,0,0.2)', 
          padding: '1.5rem', 
          borderRadius: '12px',
          border: isMobile ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.05)',
          fontSize: '1rem',
          lineHeight: '1.7',
          whiteSpace: 'pre-line',
          color: isMobile ? '#334155' : 'var(--text-primary)'
        }}>
          {isMobile ? data.mobileExplanation : data.logicExplanation}
        </div>
        
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn-premium btn-primary" onClick={onClose} style={{ background: isMobile ? 'linear-gradient(135deg, #10b981, #059669)' : '' }}>
            {isMobile ? 'Oke, Mengerti' : 'Understood'}
          </button>
        </div>
      </div>
    </div>
  );
}
