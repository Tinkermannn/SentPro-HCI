import React, { useState } from 'react';
import { Send, X, Loader2 } from 'lucide-react';

export default function FeedbackModal({ data, actionType, onClose, onSubmit, isProcessing }) {
  const [feedback, setFeedback] = useState('');

  let title = "Berikan Feedback (RLHF)";
  let desc = "Bantu AI belajar dari keputusan Anda.";

  if (actionType === 'delete') {
    title = "Hapus Ulasan Palsu";
    desc = "Mengapa ulasan ini dihapus? Beri masukan agar AI lebih akurat.";
  } else if (actionType === 'override') {
    title = "Manual Override";
    desc = "Koreksi deteksi AI. Jelaskan konteks sebenarnya (misal: Sarkasme).";
  } else if (actionType === 'ignore') {
    title = "Abaikan (Ulasan Valid)";
    desc = "Mengapa AI salah mendeteksi? Beri masukan untuk mencegah False Positive.";
  }

  const handleSubmit = () => {
    onSubmit(actionType, data.id, feedback);
  };

  return (
    <div className="modal-overlay" onClick={!isProcessing ? onClose : undefined}>
      <div className="modal-content-glass" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>{title}</h3>
          {!isProcessing && (
            <button className="control-btn" onClick={onClose} style={{ padding: '0.25rem' }}>
              <X size={20} />
            </button>
          )}
        </div>
        
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
          {desc}
        </p>

        <textarea 
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Ketik alasan Anda di sini..."
          disabled={isProcessing}
          style={{
            width: '100%',
            height: '100px',
            background: 'rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '8px',
            padding: '0.75rem',
            color: 'var(--text-primary)',
            fontFamily: 'inherit',
            fontSize: '0.875rem',
            resize: 'none',
            marginBottom: '1.5rem'
          }}
        />
        
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button 
            className="btn-premium btn-primary" 
            onClick={handleSubmit}
            disabled={isProcessing}
            style={{ width: '100%' }}
          >
            {isProcessing ? (
              <><Loader2 className="animate-spin" size={18} /> Memproses Learning Loop...</>
            ) : (
              <><Send size={18} /> Kirim Feedback & Latih Ulang AI</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
