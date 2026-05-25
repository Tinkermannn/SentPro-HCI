import React from 'react';
import { Trash2, HelpCircle, ShieldCheck } from 'lucide-react';

export default function MobileCard({ data, isServerDown, onDelete, onIgnore, onRequestCheck, onOpenLogic }) {
  if (data.isDeleted) return null;

  const showAI = !isServerDown && !data.isOverridden;
  const isDanger = data.statusColor === 'danger';
  const isWarning = data.statusColor === 'warning';
  const isSuccess = data.statusColor === 'success';

  return (
    <div style={{ 
      background: '#ffffff', 
      borderRadius: '20px', 
      padding: '1.25rem',
      marginBottom: '1.5rem',
      boxShadow: 'var(--shadow-heavy)',
      border: '1px solid #e2e8f0',
      position: 'relative',
      overflow: 'hidden',
      opacity: data.isOverridden ? 0.65 : 1,
    }}>
      {/* Verified overlay badge */}
      {data.isOverridden && (
        <div style={{
          position: 'absolute', top: '0.75rem', right: '0.75rem', zIndex: 2,
          background: '#2ed573', borderRadius: '99px', padding: '0.35rem 0.75rem',
          display: 'flex', alignItems: 'center', gap: '0.25rem',
          fontSize: '0.8rem', fontWeight: '800', color: 'white'
        }}>
          <ShieldCheck size={16} /> Sudah Dicek
        </div>
      )}

      {/* Top Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
        <div>
          <div style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: '600', marginBottom: '0.25rem' }}>{data.reviewId}</div>
          <div style={{ fontWeight: '800', color: '#0f172a', fontSize: '1.125rem' }}>{data.productName}</div>
        </div>
        {showAI && isDanger && (
          <div style={{ 
            background: 'rgba(255,71,87,0.1)', color: '#ff4757', 
            padding: '0.25rem 0.75rem', borderRadius: '99px', 
            fontWeight: '800', fontSize: '0.875rem', border: '1px solid rgba(255,71,87,0.3)'
          }}>
            High Risk
          </div>
        )}
        {showAI && isWarning && (
          <div style={{ 
            background: 'rgba(255,165,2,0.1)', color: '#ffa502', 
            padding: '0.25rem 0.75rem', borderRadius: '99px', 
            fontWeight: '800', fontSize: '0.875rem', border: '1px solid rgba(255,165,2,0.3)'
          }}>
            Ambigu
          </div>
        )}
      </div>

      {/* Middle Section */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
        <div style={{ 
          flex: '1', 
          height: '140px', 
          borderRadius: '12px', 
          background: data.isBlackScreen ? '#111827' : '#f1f5f9',
          overflow: 'hidden',
          border: '1px solid #e2e8f0'
        }}>
          {!data.isBlackScreen && !data.isBrokenData && <img src={data.imageUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
          {data.isBlackScreen && <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1e90ff', fontSize: '0.875rem', fontWeight: 'bold' }}>Layar Hitam</div>}
          {data.isBrokenData && <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '0.875rem' }}>Foto Rusak</div>}
        </div>
        <div style={{ 
          flex: '1', 
          background: '#f8fafc', 
          borderRadius: '12px', 
          padding: '1rem', 
          fontSize: '1rem', 
          color: '#334155',
          border: '1px solid #e2e8f0',
          lineHeight: '1.5'
        }}>
          "{data.text}"
        </div>
      </div>

      {/* Friendly Reason Box */}
      {showAI && (
        <div 
          onClick={onOpenLogic}
          style={{ 
            background: `rgba(${isDanger ? '255,71,87' : (isWarning ? '255,165,2' : '46,213,115')}, 0.05)`, 
            border: `1px solid rgba(${isDanger ? '255,71,87' : (isWarning ? '255,165,2' : '46,213,115')}, 0.2)`,
            borderRadius: '12px', 
            padding: '1rem', 
            marginBottom: '1.25rem',
            display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
            cursor: 'pointer'
          }}
        >
          <HelpCircle color={`var(--color-${data.statusColor})`} size={24} style={{ marginTop: '0.125rem', flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: '800', color: `var(--color-${data.statusColor})`, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Saran Sistem (Tap selengkapnya)</div>
            <div style={{ fontSize: '1rem', color: '#475569', lineHeight: '1.4' }}>
              {data.mobileExplanation.split('.')[0]}.
            </div>
          </div>
        </div>
      )}

      {/* Thumb-Zone Actions - hide if already handled */}
      {!data.isOverridden && (
        <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
          {/* "Hapus" only for danger (confirmed fake), NOT for broken data or safe */}
          {isDanger && !data.isBrokenData && (
            <button 
              className="btn-premium btn-danger" 
              style={{ width: '100%', padding: '1rem', fontSize: '1.125rem', height: '54px' }}
              onClick={onDelete}
            >
              <Trash2 size={24} /> Hapus Ulasan Palsu
            </button>
          )}
          
          {isWarning ? (
            <button 
              className="btn-premium btn-glass" 
              style={{ width: '100%', padding: '1rem', color: '#ffa502', fontSize: '1.125rem', height: '54px', fontWeight: '700', border: '1px solid rgba(255,165,2,0.3)' }}
              onClick={onRequestCheck}
            >
              Minta Cek Manual ke Moderator
            </button>
          ) : (
            <button 
              className="btn-premium btn-glass" 
              style={{ width: '100%', padding: '1rem', color: '#475569', fontSize: '1.125rem', height: '54px', fontWeight: '700' }}
              onClick={onIgnore}
            >
              {isSuccess ? 'Oke, Mengerti' : 'Abaikan (Ulasan Asli)'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
