'use client';
import React from 'react';

export function DashboardPanels() {
  return (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* 💳 WALLET & SUMMARY TILES BALANCES ROW */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '20px' }}>
        {[
          { t: '📈 Total Asset Balance Value', v: '₹4,12,850.40', s: '+12.4% Upper Delta', c: '#00E676' },
          { t: '💼 Active Portfolio Margin', v: '₹1,50,000.00', s: 'Institutional Clearing', c: '#FFFFFF' },
          { t: '📊 Floating Trade Profit', v: '+₹24,350.15', s: 'Real-time Net Returns', c: '#00E676' },
          { t: '⚡ Core Node Speed Feed', v: '0.04 ms', s: 'Microsecond Latency', c: '#00E676' }
        ].map((card, i) => (
          <div key={i} style={{ backgroundColor: '#0B0F19', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.03)' }}>
            <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px' }}>{card.t}</div>
            <div style={{ fontSize: '24px', fontWeight: 900, color: card.c }}>{card.v}</div>
            <div style={{ fontSize: '11px', color: '#64748B', marginTop: '6px' }}>{card.s}</div>
          </div>
        ))}
      </div>

    </div>
  );
}
