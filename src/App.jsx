import React, { useState, useEffect } from 'react';
import { initialReviewData } from './data';
import DesktopCard from './components/DesktopCard';
import MobileCard from './components/MobileCard';
import LogicModal from './components/LogicModal';
import ActionModal from './components/ActionModal';
import FeedbackModal from './components/FeedbackModal';
import { Monitor, Smartphone, ServerCrash, LayoutDashboard, Settings, LogOut, Bell, AlertTriangle, Filter, Wrench, X, Users, ClipboardList, Link as LinkIcon, FileText, AlertCircle, RotateCcw } from 'lucide-react';

export default function App() {
  const [persona, setPersona] = useState('desktop');
  const [isServerDown, setIsServerDown] = useState(false);
  const [reviews, setReviews] = useState(initialReviewData);
  const [modalData, setModalData] = useState(null);
  const [actionModalData, setActionModalData] = useState(null);
  const [toast, setToast] = useState(null);
  
  const [feedbackModalData, setFeedbackModalData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sortOrder, setSortOrder] = useState('default');

  const [showPushNotification, setShowPushNotification] = useState(false);
  const [wizardOpen, setWizardOpen] = useState(false);

  useEffect(() => {
    document.body.className = `theme-${persona}`;
  }, [persona]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 5000);
  };

  const triggerPushNotification = () => {
    setShowPushNotification(true);
    setPersona('mobile');
  };

  const riskRank = (r) => {
    if (r.statusColor === 'danger') return 0;
    if (r.statusColor === 'warning') return 1;
    return 2; // success
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortOrder === 'highToLow') return riskRank(a) - riskRank(b); // danger first
    if (sortOrder === 'lowToHigh') return riskRank(b) - riskRank(a); // success first
    return a.id - b.id;
  });

  const handleSortToggle = () => {
    if (sortOrder === 'default') setSortOrder('highToLow');
    else if (sortOrder === 'highToLow') setSortOrder('lowToHigh');
    else setSortOrder('default');
  };

  const handleActionRequest = (type, data) => {
    setActionModalData(null); // Close action modal if open
    if (type === 'ignore' || type === 'approve') {
      // Immediately process without asking for text feedback
      handleFeedbackSubmit(type, data.id, '');
    } else {
      setFeedbackModalData({ type, data });
    }
  };

  const handleFeedbackSubmit = (type, id, feedbackText) => {
    setIsProcessing(true);
    
    // Simulate API loading
    setTimeout(() => {
      setIsProcessing(false);
      setFeedbackModalData(null);
      
      const snippet = feedbackText.length > 20 ? feedbackText.substring(0, 20) + "..." : feedbackText;
      const feedbackMsg = feedbackText ? ` Feedback: "${snippet}"` : "";

      if (type === 'delete') {
        setReviews(prev => prev.filter(r => r.id !== id));
        showToast(`✅ Review Deleted. RLHF updated.${feedbackMsg}`);
      } else if (type === 'ignore' || type === 'approve') {
        // We can just mark it as verified instead of deleting it to show it stays in system but handled
        setReviews(prev => prev.map(r => r.id === id ? { ...r, isOverridden: true, confidenceScore: 100, statusColor: 'success', statusText: 'Verified Safe' } : r));
        showToast(`✅ Review Kept.${feedbackMsg}`);
      } else if (type === 'override') {
        setReviews(prev => prev.map(r => r.id === id ? { ...r, isOverridden: true, confidenceScore: 100, statusColor: 'success', statusText: 'Human Corrected' } : r));
        showToast(`✅ Manual Override applied! RLHF Model retrained.${feedbackMsg}`);
      }
    }, 1500); // 1.5s simulated loading
  };

  return (
    <>
      {/* Wizard Toggle Button */}
      <button
        onClick={() => setWizardOpen(!wizardOpen)}
        style={{
          position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 100001,
          width: '56px', height: '56px', borderRadius: '50%',
          background: wizardOpen ? '#ff4757' : 'linear-gradient(135deg, #1e90ff, #0984e3)',
          color: 'white', border: 'none', cursor: 'pointer',
          boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s'
        }}
      >
        {wizardOpen ? <X size={24} /> : <Wrench size={24} />}
      </button>

      {/* Wizard Control Panel */}
      {wizardOpen && (
        <div style={{
          position: 'fixed', bottom: '5rem', right: '1.5rem', zIndex: 100000,
          background: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(16px)',
          borderRadius: '16px', padding: '1rem', width: '280px',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          animation: 'slideInUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: '700', color: '#64748b', letterSpacing: '1px', marginBottom: '0.75rem' }}>Wizard Control Panel</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button className={`control-btn ${persona === 'desktop' ? 'active' : ''}`} onClick={() => { setPersona('desktop'); setWizardOpen(false); }} style={{ width: '100%', justifyContent: 'flex-start' }}>
              <Monitor size={18} /> Desktop (Pak Baskara)
            </button>
            <button className={`control-btn ${persona === 'mobile' ? 'active' : ''}`} onClick={() => { setPersona('mobile'); setWizardOpen(false); }} style={{ width: '100%', justifyContent: 'flex-start' }}>
              <Smartphone size={18} /> Mobile (Ibu Ratna)
            </button>
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '0.25rem 0' }}></div>
            <button className="control-btn" onClick={() => { triggerPushNotification(); setWizardOpen(false); }} style={{ width: '100%', justifyContent: 'flex-start', color: '#2ed573' }}>
              <Bell size={18} /> Simulasi Notifikasi
            </button>
            <button className={`control-btn ${isServerDown ? 'active' : ''}`} onClick={() => setIsServerDown(!isServerDown)} style={{ width: '100%', justifyContent: 'flex-start', color: isServerDown ? '#ff4757' : '' }}>
              <ServerCrash size={18} /> {isServerDown ? 'Nyalakan AI' : 'Matikan AI (Skenario 4)'}
            </button>
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '0.25rem 0' }}></div>
            <button className="control-btn" onClick={() => { setReviews(initialReviewData); setWizardOpen(false); showToast('🔄 Demo data telah direset.'); }} style={{ width: '100%', justifyContent: 'flex-start', color: '#ffa502' }}>
              <RotateCcw size={18} /> Reset Demo (Kembalikan Data)
            </button>
          </div>
        </div>
      )}

      {toast && (
        <div style={{
          position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          background: 'linear-gradient(135deg, #2ed573, #26de81)', color: 'white',
          padding: '1rem 2rem', borderRadius: '99px', fontWeight: '600',
          boxShadow: '0 10px 25px rgba(46, 213, 115, 0.4)', zIndex: 10000,
          animation: 'slideInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          {toast}
        </div>
      )}

      {/* Global Loading Overlay for instant actions (Accept/Abaikan) */}
      {isProcessing && !feedbackModalData && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          zIndex: 99999, color: 'white'
        }}>
          <div className="animate-spin" style={{ 
            width: '40px', height: '40px', border: '4px solid rgba(255,255,255,0.3)', 
            borderTop: '4px solid #1e90ff', borderRadius: '50%', marginBottom: '1rem' 
          }}></div>
          <div style={{ fontWeight: '600', fontSize: '1.125rem' }}>Memproses sistem...</div>
        </div>
      )}

      {/* 💻 Desktop View (Pak Baskara) */}
      {persona === 'desktop' && (
        <div className="app-container animate-in" style={{ paddingTop: '2rem', paddingLeft: '2rem', paddingRight: '2rem', paddingBottom: '2rem' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', borderRadius: '24px', display: 'flex', overflow: 'hidden', height: 'calc(100vh - 4rem)' }}>
            
            <div style={{ width: '80px', borderRight: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.5rem 0' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #1e90ff, #0ea5e9)', marginBottom: '2rem' }}></div>
              <LayoutDashboard size={22} color="#1e90ff" style={{ marginBottom: '1.5rem', cursor: 'pointer' }} />
              <Users size={22} color="#94a3b8" style={{ marginBottom: '1.5rem', cursor: 'pointer' }} />
              <ClipboardList size={22} color="#94a3b8" style={{ marginBottom: '1.5rem', cursor: 'pointer' }} />
              <LinkIcon size={22} color="#94a3b8" style={{ marginBottom: '1.5rem', cursor: 'pointer' }} />
              <FileText size={22} color="#94a3b8" style={{ marginBottom: '1.5rem', cursor: 'pointer' }} />
              <Settings size={22} color="#94a3b8" style={{ marginBottom: '1.5rem', cursor: 'pointer' }} />
              <div style={{ flex: 1 }}></div>
              <LogOut size={22} color="#94a3b8" style={{ cursor: 'pointer' }} />
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <header style={{ padding: '1.5rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h1 style={{ fontSize: '1.5rem', fontWeight: '700', letterSpacing: '0.05em' }}>MULTIMODAL SENTIMENT DASHBOARD</h1>
                  <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.25rem' }}>Priority Review Queue</p>
                </div>
                
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <button 
                    className="btn-premium btn-glass" 
                    onClick={handleSortToggle}
                    style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                  >
                    <Filter size={16} /> 
                    Filter: {sortOrder === 'highToLow' ? 'High Risk First' : (sortOrder === 'lowToHigh' ? 'Low Risk First' : 'Default')}
                  </button>

                  <Bell size={22} color="#94a3b8" style={{ cursor: 'pointer' }} />
                  <AlertCircle size={22} color="#ff4757" style={{ cursor: 'pointer' }} />

                  {isServerDown && (
                    <div className="badge-premium" style={{ background: 'rgba(255, 71, 87, 0.2)', color: '#ff4757', border: '1px solid rgba(255, 71, 87, 0.4)' }}>
                      <ServerCrash size={14} /> AI SERVICE UNAVAILABLE - MANUAL MODE
                    </div>
                  )}
                </div>
              </header>

              <div style={{ padding: '2rem', overflowY: 'auto', flex: 1 }}>
                {sortedReviews.map(review => (
                  <DesktopCard 
                    key={review.id} 
                    data={review} 
                    isServerDown={isServerDown}
                    onOpenLogic={() => setModalData(review)}
                    onOverride={() => handleActionRequest('override', review)}
                    onOpenAction={() => setActionModalData(review)}
                  />
                ))}
                {sortedReviews.length === 0 && (
                  <div style={{ textAlign: 'center', color: '#94a3b8', marginTop: '3rem' }}>All reviews have been processed.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 📱 Mobile View (Ibu Ratna) */}
      {persona === 'mobile' && (
        <div className="mobile-wrapper animate-in" style={{ paddingTop: '0' }}>
          {showPushNotification && (
            <div 
              style={{
                position: 'fixed', top: '1rem', width: 'calc(100% - 2rem)', maxWidth: '448px', left: '50%', transform: 'translateX(-50%)',
                background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)',
                borderRadius: '16px', padding: '1rem', boxShadow: '0 15px 35px rgba(0,0,0,0.25)',
                display: 'flex', gap: '1rem', alignItems: 'center', zIndex: 100000,
                border: '1px solid #e2e8f0', animation: 'slideInUp 0.3s', cursor: 'pointer'
              }}
              onClick={() => setShowPushNotification(false)}
            >
              <div style={{ background: '#ff4757', padding: '0.5rem', borderRadius: '50%' }}>
                <AlertTriangle size={24} color="white" />
              </div>
              <div>
                <div style={{ fontWeight: '800', color: '#0f172a', fontSize: '1rem' }}>Peringatan Toko!</div>
                <div style={{ color: '#475569', fontSize: '0.875rem' }}>Ulasan baru mencurigakan terdeteksi! (Tap untuk cek)</div>
              </div>
            </div>
          )}

          <header style={{ padding: '1.5rem', background: '#fff', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #059669)' }}></div>
              <h1 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a' }}>Monitor Ulasan</h1>
            </div>
            <button onClick={handleSortToggle} style={{ background: 'none', border: 'none', color: '#1e90ff', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <Filter size={18} /> Filter
            </button>
          </header>

          {isServerDown && (
            <div style={{ padding: '0.75rem 1.5rem', background: '#ff4757', color: 'white', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
              <AlertTriangle size={18} /> Layanan AI Sedang Offline
            </div>
          )}

          <div style={{ padding: '1.5rem', flex: 1, background: '#f1f5f9' }}>
            <p style={{ color: '#64748b', marginBottom: '1.5rem', lineHeight: '1.5' }}>
              Halo Ibu Ratna, urutan: <strong>{sortOrder === 'highToLow' ? 'Skor Tertinggi' : (sortOrder === 'lowToHigh' ? 'Skor Terendah' : 'Standar')}</strong>.
            </p>
            
            {sortedReviews.map(review => (
              <MobileCard 
                key={review.id} 
                data={review} 
                isServerDown={isServerDown}
                onDelete={() => handleActionRequest('delete', review)}
                onIgnore={() => handleActionRequest('ignore', review)}
                onOpenLogic={() => setModalData(review)}
              />
            ))}
            {sortedReviews.length === 0 && (
              <div style={{ textAlign: 'center', color: '#94a3b8', marginTop: '3rem' }}>Semua ulasan sudah diperiksa.</div>
            )}
          </div>
        </div>
      )}

      {modalData && <LogicModal data={modalData} persona={persona} onClose={() => setModalData(null)} />}
      {actionModalData && <ActionModal data={actionModalData} isServerDown={isServerDown} onClose={() => setActionModalData(null)} onAction={(action) => handleActionRequest(action, actionModalData)} />}
      
      {feedbackModalData && (
        <FeedbackModal 
          data={feedbackModalData.data} 
          actionType={feedbackModalData.type} 
          onClose={() => setFeedbackModalData(null)} 
          onSubmit={handleFeedbackSubmit}
          isProcessing={isProcessing}
        />
      )}
    </>
  );
}
