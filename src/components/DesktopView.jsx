import React from 'react';
import ReviewCard from './ReviewCard';
import { ShieldCheck, ServerCrash } from 'lucide-react';

export default function DesktopView({ data }) {
  return (
    <div className="desktop-container animate-fade-in">
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        paddingBottom: '1.5rem',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.025em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck color="var(--color-success)" />
            TrustGuard AI Dashboard
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', fontSize: '0.875rem' }}>
            Pak Baskara (Moderator Massal) - Mode Desktop
          </p>
        </div>
        
        {data.isAiDown && (
          <div className="badge warning" style={{ padding: '0.5rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <ServerCrash size={16} />
            AI Service Unavailable - Manual Mode Active
          </div>
        )}
      </header>

      <main style={{ marginTop: '1rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
          Review Antrean Prioritas
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* We only render the active scenario card to simulate the wizard changing it */}
          <ReviewCard data={data} view="desktop" />
        </div>
      </main>
    </div>
  );
}
