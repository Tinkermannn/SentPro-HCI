import React from 'react';
import { ShieldAlert, Trash2, CheckSquare, X, Info } from 'lucide-react';

export default function ActionModal({ data, onClose, onAction, isServerDown }) {
  if (!data) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-glass" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: 'linear-gradient(135deg, #1e90ff, #0984e3)', padding: '0.5rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(30,144,255,0.3)' }}>
              <ShieldAlert size={24} color="white" />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', letterSpacing: '0.025em' }}>
              Multimodal Input Panel (Audit)
            </h3>
          </div>
          <button className="control-btn" onClick={onClose} style={{ padding: '0.5rem' }}>
            <X size={24} />
          </button>
        </div>
        
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: '1.5' }}>
            Lakukan perbandingan visual (teks vs gambar) untuk memvalidasi temuan AI. Keputusan Anda akan masuk ke dalam <strong>Learning Loop (Reinforcement Learning)</strong>.
          </p>

          {!isServerDown && (
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <Info size={18} color="var(--color-blue)" />
                <strong style={{ color: 'var(--color-blue)' }}>Brief Logic Explanation (AI Confidence: {data.confidenceScore}%)</strong>
              </div>
              <div style={{ fontSize: '0.9375rem', color: 'var(--text-primary)', whiteSpace: 'pre-line', lineHeight: '1.6' }}>
                {data.logicExplanation}
              </div>
            </div>
          )}
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            className="btn-premium btn-glass" 
            style={{ flex: 1, padding: '1rem' }}
            onClick={() => onAction('approve')}
          >
            <CheckSquare size={20} /> Accept (Ulasan Valid)
          </button>
          <button 
            className="btn-premium btn-danger" 
            style={{ flex: 1, padding: '1rem' }}
            onClick={() => onAction('delete')}
          >
            <Trash2 size={20} /> Takedown / Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
