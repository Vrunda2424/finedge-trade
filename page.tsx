'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [livePrice, setLivePrice] = useState(128367.0);

  // 📡 Simulated real-time volatility tracking for the central hero chart metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setLivePrice(prev => parseFloat((prev + (Math.random() - 0.5) * 45).toFixed(2)));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const tickerData = [
    { name: 'S&P Futures', val: '3,345.00', delta: '+18.7 (0.57%)', up: true },
    { name: 'Nasdaq', val: '11,788.80', delta: '+24.7 (0.28%)', up: true },
    { name: 'EUR/USD', val: '1.186956', delta: '-0.00045 (0.04%)', up: false },
    { name: 'Bitcoin', val: '5,835.048', delta: '+78.24 (0.28%)', up: true },
    { name: 'AUD', val: '2.45632', delta: '-0.0075 (0.07%)', up: false }
  ];

  return (
    <div style={{ 
      backgroundColor: '#040711', 
      minHeight: '100vh', 
      color: '#F8FAFC', 
      position: 'relative',
      fontFamily: 'Inter, system-ui, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>

      {/* 👑 1. STICKY ARCHITECTURAL NAVIGATION GRID HEADER */}
      <nav style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 100, 
        backgroundColor: 'rgba(4, 7, 17, 0.8)', 
        backdropFilter: 'blur(16px)', 
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)', 
        padding: '16px 64px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Left Monogram Branding Box */}
          <div style={{ 
            width: '36px', 
            height: '36px', 
            backgroundColor: 'rgba(5, 255, 135, 0.04)', 
            color: '#05FF87', 
            borderRadius: '10px', 
            fontWeight: 800, 
            fontSize: '12px',
            letterSpacing: '0.1em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(5, 255, 135, 0.12)',
            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)'
          }}>MX</div>
          {/* App Identity Title */}
          <span style={{ fontWeight: 800, fontSize: '15px', color: '#F8FAFC', letterSpacing: '0.1em', fontFamily: 'monospace' }}>MYTRIXIA</span>
        </div>
        
        {/* Navigation Item Alignments */}
        <div style={{ display: 'flex', gap: '32px', fontSize: '13px', fontWeight: 500, marginRight: 'auto', marginLeft: '48px' }}>
            
          {/* Menu Item 1: Market Activity */}
          <div style={{ position: 'relative', padding: '10px 0', cursor: 'pointer' }} onMouseEnter={() => setActiveMenu('market')} onMouseLeave={() => setActiveMenu(null)}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: activeMenu === 'market' ? '#05FF87' : '#64748B', transition: 'color 0.2s' }}>
              Market Activity <span style={{ fontSize: '8px', opacity: 0.4, transform: activeMenu === 'market' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
            </span>
            <div style={{
              position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
              backgroundColor: '#121724', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px',
              width: '540px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)', opacity: activeMenu === 'market' ? 1 : 0,
              visibility: activeMenu === 'market' ? 'visible' : 'hidden', transition: 'all 0.2s ease'
            }}>
              <div>
                <h5 style={{ fontSize: '11px', color: '#05FF87', textTransform: 'uppercase', margin: '0 0 10px 0', letterSpacing: '0.5px' }}>Indices</h5>
                <Link href="/markets" style={{ display: 'block', fontSize: '12px', color: '#64748B', textDecoration: 'none', marginBottom: '8px' }}>Nifty 50</Link>
                <Link href="/markets" style={{ display: 'block', fontSize: '12px', color: '#64748B', textDecoration: 'none', marginBottom: '8px' }}>Sensex</Link>
                <Link href="/markets" style={{ display: 'block', fontSize: '12px', color: '#64748B', textDecoration: 'none' }}>Nasdaq 100</Link>
              </div>
              <div>
                <h5 style={{ fontSize: '11px', color: '#05FF87', textTransform: 'uppercase', margin: '0 0 10px 0', letterSpacing: '0.5px' }}>Movers</h5>
                <Link href="/watch" style={{ display: 'block', fontSize: '12px', color: '#64748B', textDecoration: 'none', marginBottom: '8px' }}>Top Gainers</Link>
                <Link href="/watch" style={{ display: 'block', fontSize: '12px', color: '#64748B', textDecoration: 'none', marginBottom: '8px' }}>Top Losers</Link>
                <Link href="/watch" style={{ display: 'block', fontSize: '12px', color: '#64748B', textDecoration: 'none' }}>Volume Breakouts</Link>
              </div>
              <div>
                <h5 style={{ fontSize: '11px', color: '#05FF87', textTransform: 'uppercase', margin: '0 0 10px 0', letterSpacing: '0.5px' }}>Assets</h5>
                <Link href="/markets" style={{ display: 'block', fontSize: '12px', color: '#64748B', textDecoration: 'none', marginBottom: '8px' }}>Stocks</Link>
                <Link href="/markets" style={{ display: 'block', fontSize: '12px', color: '#64748B', textDecoration: 'none', marginBottom: '8px' }}>Crypto</Link>
                <Link href="/markets" style={{ display: 'block', fontSize: '12px', color: '#64748B', textDecoration: 'none' }}>Commodities</Link>
              </div>
            </div>
          </div>

          {/* Menu Item 2: Core Solutions */}
          <div style={{ position: 'relative', padding: '10px 0', cursor: 'pointer' }} onMouseEnter={() => setActiveMenu('solutions')} onMouseLeave={() => setActiveMenu(null)}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: activeMenu === 'solutions' ? '#05FF87' : '#64748B', transition: 'color 0.2s' }}>
              Core Solutions <span style={{ fontSize: '8px', opacity: 0.4, transform: activeMenu === 'solutions' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
            </span>
            <div style={{
              position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
              backgroundColor: '#121724', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px',
              width: '540px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)', opacity: activeMenu === 'solutions' ? 1 : 0,
              visibility: activeMenu === 'solutions' ? 'visible' : 'hidden', transition: 'all 0.2s ease'
            }}>
              <div>
                <h5 style={{ fontSize: '11px', color: '#05FF87', textTransform: 'uppercase', margin: '0 0 10px 0', letterSpacing: '0.5px' }}>Analytics</h5>
                <Link href="/charts" style={{ display: 'block', fontSize: '12px', color: '#64748B', textDecoration: 'none', marginBottom: '8px' }}>Candlestick Charts</Link>
                <Link href="/charts" style={{ display: 'block', fontSize: '12px', color: '#64748B', textDecoration: 'none', marginBottom: '8px' }}>RSI / MACD Indicators</Link>
                <Link href="/charts" style={{ display: 'block', fontSize: '12px', color: '#64748B', textDecoration: 'none' }}>Multi-Timeframes</Link>
              </div>
              <div>
                <h5 style={{ fontSize: '11px', color: '#05FF87', textTransform: 'uppercase', margin: '0 0 10px 0', letterSpacing: '0.5px' }}>Execution</h5>
                <Link href="/merchant" style={{ display: 'block', fontSize: '12px', color: '#64748B', textDecoration: 'none', marginBottom: '8px' }}>Scanner Engine</Link>
                <Link href="/dashboard" style={{ display: 'block', fontSize: '12px', color: '#64748B', textDecoration: 'none', marginBottom: '8px' }}>Instant Liquidity</Link>
                <Link href="/dashboard" style={{ display: 'block', fontSize: '12px', color: '#64748B', textDecoration: 'none' }}>High-Speed Routing</Link>
              </div>
              <div>
                <h5 style={{ fontSize: '11px', color: '#05FF87', textTransform: 'uppercase', margin: '0 0 10px 0', letterSpacing: '0.5px' }}>Automation</h5>
                <Link href="/strategies" style={{ display: 'block', fontSize: '12px', color: '#64748B', textDecoration: 'none', marginBottom: '8px' }}>Quant Strategies</Link>
                <Link href="/strategies" style={{ display: 'block', fontSize: '12px', color: '#64748B', textDecoration: 'none', marginBottom: '8px' }}>Bracket Orders</Link>
                <Link href="/strategies" style={{ display: 'block', fontSize: '12px', color: '#64748B', textDecoration: 'none' }}>Trailing Stops</Link>
              </div>
            </div>
          </div>

          {/* Menu Item 3: Security */}
          <div style={{ position: 'relative', padding: '10px 0', cursor: 'pointer' }} onMouseEnter={() => setActiveMenu('security')} onMouseLeave={() => setActiveMenu(null)}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: activeMenu === 'security' ? '#05FF87' : '#64748B', transition: 'color 0.2s' }}>
              Security <span style={{ fontSize: '8px', opacity: 0.4, transform: activeMenu === 'security' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
            </span>
            <div style={{
              position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
              backgroundColor: '#121724', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px',
              width: '540px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)', opacity: activeMenu === 'security' ? 1 : 0,
              visibility: activeMenu === 'security' ? 'visible' : 'hidden', transition: 'all 0.2s ease'
            }}>
              <div>
                <h5 style={{ fontSize: '11px', color: '#05FF87', textTransform: 'uppercase', margin: '0 0 10px 0', letterSpacing: '0.5px' }}>Protection</h5>
                <Link href="/demat" style={{ display: 'block', fontSize: '12px', color: '#64748B', textDecoration: 'none', marginBottom: '8px' }}>Institutional Clearing</Link>
                <Link href="/demat" style={{ display: 'block', fontSize: '12px', color: '#64748B', textDecoration: 'none', marginBottom: '8px' }}>Bank-Grade Backing</Link>
                <Link href="/demat" style={{ display: 'block', fontSize: '12px', color: '#64748B', textDecoration: 'none' }}>Asset Safeguards</Link>
              </div>
              <div>
                <h5 style={{ fontSize: '11px', color: '#05FF87', textTransform: 'uppercase', margin: '0 0 10px 0', letterSpacing: '0.5px' }}>Access</h5>
                <Link href="/login" style={{ display: 'block', fontSize: '12px', color: '#64748B', textDecoration: 'none', marginBottom: '8px' }}>2-Factor Auth (2FA)</Link>
                <Link href="/login" style={{ display: 'block', fontSize: '12px', color: '#64748B', textDecoration: 'none', marginBottom: '8px' }}>Biometric Login</Link>
                <Link href="/login" style={{ display: 'block', fontSize: '12px', color: '#64748B', textDecoration: 'none' }}>Session Management</Link>
              </div>
              <div>
                <h5 style={{ fontSize: '11px', color: '#05FF87', textTransform: 'uppercase', margin: '0 0 10px 0', letterSpacing: '0.5px' }}>Privacy</h5>
                <Link href="/demat" style={{ display: 'block', fontSize: '12px', color: '#64748B', textDecoration: 'none', marginBottom: '8px' }}>256-Bit Encryption</Link>
                <Link href="/demat" style={{ display: 'block', fontSize: '12px', color: '#64748B', textDecoration: 'none', marginBottom: '8px' }}>Secure Data Vault</Link>
                <Link href="/demat" style={{ display: 'block', fontSize: '12px', color: '#64748B', textDecoration: 'none' }}>Identity Hashing</Link>
              </div>
            </div>
          </div>

          {/* Menu Item 4: About Us */}
          <div style={{ position: 'relative', padding: '10px 0', cursor: 'pointer' }} onMouseEnter={() => setActiveMenu('about')} onMouseLeave={() => setActiveMenu(null)}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: activeMenu === 'about' ? '#05FF87' : '#64748B', transition: 'color 0.2s' }}>
              About Us <span style={{ fontSize: '8px', opacity: 0.4, transform: activeMenu === 'about' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
            </span>
            <div style={{
              position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
              backgroundColor: '#121724', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px',
              width: '540px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)', opacity: activeMenu === 'about' ? 1 : 0,
              visibility: activeMenu === 'about' ? 'visible' : 'hidden', transition: 'all 0.2s ease'
            }}>
              <div>
                <h5 style={{ fontSize: '11px', color: '#05FF87', textTransform: 'uppercase', margin: '0 0 10px 0', letterSpacing: '0.5px' }}>Company</h5>
                <Link href="/learn" style={{ display: 'block', fontSize: '12px', color: '#64748B', textDecoration: 'none', marginBottom: '8px' }}>Our Mission</Link>
                <Link href="/learn" style={{ display: 'block', fontSize: '12px', color: '#64748B', textDecoration: 'none', marginBottom: '8px' }}>Core Infrastructure</Link>
                <Link href="/learn" style={{ display: 'block', fontSize: '12px', color: '#64748B', textDecoration: 'none' }}>Press Relations</Link>
              </div>
              <div>
                <h5 style={{ fontSize: '11px', color: '#05FF87', textTransform: 'uppercase', margin: '0 0 10px 0', letterSpacing: '0.5px' }}>Partners</h5>
                <Link href="/demat" style={{ display: 'block', fontSize: '12px', color: '#64748B', textDecoration: 'none', marginBottom: '8px' }}>SEBI Brokers</Link>
                <Link href="/demat" style={{ display: 'block', fontSize: '12px', color: '#64748B', textDecoration: 'none', marginBottom: '8px' }}>Clearing Houses</Link>
                <Link href="/demat" style={{ display: 'block', fontSize: '12px', color: '#64748B', textDecoration: 'none' }}>Liquidity Hubs</Link>
              </div>
              <div>
                <h5 style={{ fontSize: '11px', color: '#05FF87', textTransform: 'uppercase', margin: '0 0 10px 0', letterSpacing: '0.5px' }}>Legal</h5>
                <Link href="/demat" style={{ display: 'block', fontSize: '12px', color: '#64748B', textDecoration: 'none', marginBottom: '8px' }}>Terms of Service</Link>
                <Link href="/demat" style={{ display: 'block', fontSize: '12px', color: '#64748B', textDecoration: 'none', marginBottom: '8px' }}>Privacy Policy</Link>
                <Link href="/demat" style={{ display: 'block', fontSize: '12px', color: '#64748B', textDecoration: 'none' }}>Software Licensing</Link>
              </div>
            </div>
          </div>

        </div>

        {/* Right Action Utility Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '12px', fontWeight: 700, fontFamily: 'monospace' }}>
          <Link href="/login" style={{ color: '#64748B', textDecoration: 'none', transition: 'color 0.2s' }}>SIGN IN</Link>
          <Link href="/dashboard" style={{ 
            backgroundColor: '#05FF87', 
            color: '#02040A', 
            fontSize: '12px', 
            fontWeight: 800, 
            letterSpacing: '0.05em', 
            padding: '10px 20px', 
            borderRadius: '10px', 
            textDecoration: 'none',
            boxShadow: '0 4px 20px rgba(5, 255, 135, 0.15)'
          }}>GET STARTED</Link>
        </div>
      </nav>

      {/* 🚀 2. CENTRAL HERO VISUAL PRESENTATION CORE SECTION */}
      <main style={{ maxWidth: '1200px', margin: '40px auto 0 auto', padding: '0 64px', display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'space-between', gap: '48px', width: '100%' }}>
        <div style={{ flex: 1, textAlign: 'left' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.04em', lineHeight: '1.1', marginBottom: '16px' }}>
            Stock Market <br />
            <span style={{ color: '#05FF87' }}>is the Best Way to</span> <br />
            Invest your Money
          </h1>
          <p style={{ fontSize: '12px', fontFamily: 'monospace', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
            Institutional Speed Trading Software Platform • Version 2.0.0 Stable Rollout
          </p>
        </div>

        {/* Dynamic Vector Line Visual Mock Module Box */}
        <div style={{ flex: 1, width: '100%', maxWidth: '480px', backgroundColor: '#070B14', border: '1px solid rgba(255,255,255,0.06)', padding: '24px', borderRadius: '24px', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '9px', color: '#64748B', fontWeight: 'bold' }}>📊 ACCELERATED INDEX VISUALIZER</span>
            <span style={{ backgroundColor: 'rgba(5,255,135,0.1)', border: '1px solid rgba(5,255,135,0.2)', color: '#05FF87', fontFamily: 'monospace', fontSize: '10px', fontWeight: 'bold', padding: '2px 8px', borderRadius: '6px' }}>+3.78 (1.78%)</span>
          </div>

          <div style={{ width: '100%', height: '180px', backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.02)', borderRadius: '16px', position: 'relative', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: '40px', height: '80px', opacity: 0.35 }}>
              <svg style={{ width: '100%', height: '100%' }} viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,70 Q25,20 50,50 T100,30" fill="none" stroke="#05FF87" strokeWidth="2.5" />
              </svg>
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'end', position: 'relative', zIndex: 10 }}>
              <div style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#EF4444', fontFamily: 'monospace', fontSize: '11px', fontWeight: 'bold', padding: '4px 10px', borderRadius: '6px',  }}>
                Rs {livePrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </div>
              <span style={{ fontFamily: 'monospace', fontSize: '9px', color: '#475569' }}>[ Stream Active ]</span>
            </div>
          </div>
        </div>
      </main>

      {/* 📊 3. HORIZONTAL DATA TICKER RIBBON LEDGER FOOTER */}
      <footer style={{ backgroundColor: '#070B14', borderTop: '1px solid rgba(255, 255, 255, 0.06)', padding: '16px 64px', width: '100%', marginTop: '40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
          {tickerData.map((asset, idx) => (
            <div key={idx} style={{ backgroundColor: '#04060B', border: '1px solid rgba(255,255,255,0.04)', padding: '12px', borderRadius: '12px', textAlign: 'left', fontFamily: 'monospace', fontSize: '11px' }}>
              <div style={{ color: '#64748B', fontWeight: 'bold', textTransform: 'uppercase', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {asset.name}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: '4px' }}>
                <span style={{ color: '#FFFFFF', fontWeight: 900, fontSize: '12px' }}>{asset.val}</span>
                <span style={{ color: asset.up ? '#05FF87' : '#EF4444', fontWeight: 'bold', fontSize: '10px' }}>{asset.delta}</span>
              </div>
            </div>
          ))}
        </div>
      </footer>

    </div>
  );
}
