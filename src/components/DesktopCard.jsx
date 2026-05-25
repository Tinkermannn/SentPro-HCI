import React from 'react';
import { Search, CheckCircle, ImageOff, ShieldCheck } from 'lucide-react';

export default function DesktopCard({ data, isServerDown, isHighlighted, onOpenLogic, onOverride, onOpenAction }) {
  const isDanger = data.statusColor === 'danger';
  const isSuccess = data.statusColor === 'success';
  const isWarning = data.statusColor === 'warning';
  
  const showAI = !isServerDown && !data.isOverridden;

  return (
    <div id={`review-card-${data.id}`} className="glass-panel" style={{ 
      borderRadius: '16px', 
      padding: '1.5rem', 
      display: 'flex', 
      gap: '1.5rem', 
      marginBottom: '1.5rem',
      transition: 'all 0.3s ease',
      opacity: data.isOverridden ? 0.7 : 1,
      border: isHighlighted ? '2px solid #1e90ff' : (data.isOverridden ? '1px solid #2ed573' : (isDanger ? '2px solid #ff4757' : (isWarning ? '2px solid #ffa502' : '1px solid rgba(255,255,255,0.08)'))),
      boxShadow: isHighlighted ? '0 0 30px rgba(30, 144, 255, 0.5), 0 0 60px rgba(30, 144, 255, 0.2)' : (isDanger ? '0 0 20px rgba(255, 71, 87, 0.2)' : (isWarning ? '0 0 20px rgba(255, 165, 2, 0.2)' : 'var(--shadow-glass)')),
      animation: isHighlighted ? 'pulseHighlight 1.5s ease-in-out infinite' : 'none'
    }}>
      {/* Left Column */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
        {data.isOverridden && (
          <div style={{ 
            position: 'absolute', top: '0.5rem', right: '0.5rem', zIndex: 2,
            background: '#2ed573', borderRadius: '99px', padding: '0.25rem 0.75rem',
            display: 'flex', alignItems: 'center', gap: '0.25rem',
            fontSize: '0.75rem', fontWeight: '700', color: 'white'
          }}>
            <ShieldCheck size={14} /> Verified
          </div>
        )}
        <div style={{ background: 'var(--bg-box)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ color: '#f8fafc', fontWeight: '600', marginBottom: '0.25rem' }}>{data.productName}</div>
          <div style={{ color: '#64748b', fontSize: '0.875rem', fontFamily: 'monospace' }}>ID: {data.reviewId}</div>
        </div>
        <div style={{ background: 'var(--bg-box)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', flex: 1, color: '#e2e8f0', lineHeight: '1.6' }}>
          "{data.text}"
        </div>
      </div>

      {/* Center Image */}
      <div style={{ 
        flex: '0 0 280px', 
        height: '180px', 
        borderRadius: '12px', 
        overflow: 'hidden', 
        position: 'relative',
        background: data.isBlackScreen ? '#000' : 'rgba(0,0,0,0.5)',
        border: data.isBlackScreen ? '2px solid #1e90ff' : '1px solid rgba(255,255,255,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        {data.isBrokenData ? (
          <div style={{ textAlign: 'center', color: '#64748b' }}>
            <ImageOff size={48} style={{ margin: '0 auto 0.5rem' }} />
            <div style={{ fontSize: '0.875rem' }}>Image Not Available</div>
          </div>
        ) : data.isBlackScreen ? (
          <span style={{ color: '#1e90ff', fontSize: '0.875rem' }}>[ Black Screen Detected ]</span>
        ) : (
          <img src={data.imageUrl} alt="Review attachment" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        )}
      </div>

      {/* Right Column (AI Info) */}
      <div style={{ flex: '0 0 240px', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column' }}>
        
        {showAI ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.5rem' }}>
            <svg viewBox="0 0 36 36" className="circular-chart">
              <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className={`circle ${data.statusColor}`} strokeDasharray={`${data.confidenceScore}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" style={{ stroke: `var(--color-${data.statusColor})` }} />
              <text x="18" y="20.35" className="percentage" fill="#fff">{data.confidenceScore}%</text>
            </svg>
            <div style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '1px', color: '#94a3b8', marginTop: '0.5rem', textTransform: 'uppercase' }}>
              Confidence Score
            </div>
            <div style={{ color: `var(--color-${data.statusColor})`, fontWeight: '600', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {data.statusText}
            </div>
          </div>
        ) : (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', opacity: 0.7 }}>
            {data.isOverridden ? (
              <>
                <CheckCircle size={40} color="#2ed573" style={{ marginBottom: '0.5rem' }} />
                <div style={{ color: '#2ed573', fontWeight: '600' }}>Human Verified</div>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '0.25rem' }}>{data.statusText}</div>
              </>
            ) : (
              <>
                <Search size={40} color="#94a3b8" style={{ marginBottom: '0.5rem' }} />
                <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Manual Checking Required</div>
              </>
            )}
          </div>
        )}

        {/* Buttons - only show if card NOT yet handled */}
        {!data.isOverridden && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 'auto' }}>
            {!isServerDown && (
              <button className="btn-premium btn-glass" onClick={onOpenLogic}>
                Brief Logic Explanation
              </button>
            )}
            {isWarning && !isServerDown ? (
              <button className="btn-premium btn-primary" onClick={onOverride} style={{ background: 'linear-gradient(135deg, #ffa502, #ff7f50)' }}>
                Manual Override
              </button>
            ) : (
              <button className="btn-premium btn-primary" onClick={onOpenAction}>
                Details & Action
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
