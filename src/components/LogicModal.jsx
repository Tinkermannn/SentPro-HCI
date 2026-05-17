import React from 'react';
import { X, Cpu } from 'lucide-react';

export default function LogicModal({ data, onClose, persona }) {
  if (!data) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-glass" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: 'linear-gradient(135deg, #1e90ff, #0984e3)', padding: '0.5rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(30,144,255,0.3)' }}>
              <Cpu size={24} color="white" />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', letterSpacing: '0.025em' }}>
              AI Logic Explanation
            </h3>
          </div>
          <button className="control-btn" onClick={onClose} style={{ padding: '0.5rem' }}>
            <X size={24} />
          </button>
        </div>
        
        <div style={{ 
          background: persona === 'mobile' ? '#f8fafc' : 'rgba(0,0,0,0.2)', 
          padding: '1.5rem', 
          borderRadius: '12px',
          border: persona === 'mobile' ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.05)',
          fontSize: '1rem',
          lineHeight: '1.7',
          whiteSpace: 'pre-line',
          color: persona === 'mobile' ? '#334155' : 'var(--text-primary)'
        }}>
          {persona === 'mobile' ? data.mobileExplanation : data.logicExplanation}
        </div>
        
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn-premium btn-primary" onClick={onClose}>
            Understood
          </button>
        </div>
      </div>
    </div>
  );
}
