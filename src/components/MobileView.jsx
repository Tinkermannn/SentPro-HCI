import React from 'react';
import ReviewCard from './ReviewCard';
import { Menu, Bell, ShieldCheck, ServerCrash } from 'lucide-react';

export default function MobileView({ data }) {
  return (
    <div className="mobile-container animate-fade-in">
      {/* Mobile Header */}
      <header style={{ 
        padding: '1rem', 
        backgroundColor: 'var(--bg-header)',
        boxShadow: 'var(--shadow-header)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Menu size={24} color="var(--text-secondary)" />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck color="var(--color-success)" size={20} />
            <span style={{ fontWeight: '800', fontSize: '1.125rem' }}>Toko Ratna</span>
          </div>
        </div>
        <Bell size={24} color="var(--text-secondary)" />
      </header>

      {/* AI Down Banner */}
      {data.isAiDown && (
        <div style={{ 
          backgroundColor: 'var(--color-warning)', 
          color: 'white', 
          padding: '0.75rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontWeight: '600',
          fontSize: '0.875rem'
        }}>
          <ServerCrash size={18} />
          <span>Layanan AI Sedang Offline</span>
        </div>
      )}

      {/* Instruction text customized for Ibu Ratna (larger text, clear instruction) */}
      <div style={{ padding: '1.25rem 1rem 0.5rem 1rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.25rem' }}>
          Halo Ibu Ratna,
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.4' }}>
          Ada ulasan baru yang perlu perhatian Anda. Silakan cek apakah teks dan gambar sesuai.
        </p>
      </div>

      <main style={{ paddingBottom: '2rem' }}>
        <ReviewCard data={data} view="mobile" />
      </main>
    </div>
  );
}
