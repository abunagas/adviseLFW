import React, { useState } from 'react'
import '../styles/index.css'
import { translations } from '../data/translations'
import heroImg from '../assets/hero_bg.png'

function App() {
  const [lang, setLang] = useState('lt')
  const t = translations[lang]

  return (
    <div className="app">
      {/* Navbar */}
      <nav>
        <div className="container nav-content">
          <div className="logo">
            <div className="logo-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: '800' }}>{t.brand}</span>
              <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', opacity: '0.7', fontWeight: '600' }}>ADVOKATŲ KONTORA</span>
            </div>
          </div>

          <div className="nav-links">
            <a href="#home">{t.nav.home}</a>
            <a href="#about">{t.nav.about}</a>
            <a href="#services">{t.nav.services}</a>
            <a href="#legal">{t.nav.legal}</a>
            <a href="#reviews">{t.nav.reviews}</a>
            <a href="#contact">{t.nav.contact}</a>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button
              onClick={() => setLang(lang === 'lt' ? 'en' : 'lt')}
              style={{ background: 'none', border: '1px solid #ccc', padding: '0.3rem 0.6rem', borderRadius: '4px', cursor: 'pointer' }}
            >
              {lang.toUpperCase()}
            </button>
            <a href="#contact" className="btn-cta">
              {t.nav.cta}
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <img src={heroImg} alt="Advise Law Firm Office" className="hero-bg" />
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1>{t.hero.title}</h1>
          <p>{t.hero.subtitle}</p>
        </div>
      </section>

      {/* Hero Cards */}
      <section className="container">
        <div className="hero-cards">
          {t.hero.cards.map((card, idx) => (
            <div key={idx} className={`hero-card ${idx === 1 ? 'dark' : ''}`}>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
              <a href="#contact" className="btn-more">{card.cta}</a>
            </div>
          ))}
        </div>
      </section>

      {/* Simple Practice Areas Section */}
      <section id="services" className="container" style={{ padding: '100px 0' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>{t.services.title}</h2>
        <div className="practice-areas" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div className="hero-card">
            <h3>{t.services.card1Title}</h3>
            <p>{t.services.card1Desc}</p>
          </div>
          <div className="hero-card">
            <h3>{t.services.card2Title}</h3>
            <p>{t.services.card2Desc}</p>
          </div>
          <div className="hero-card">
            <h3>{t.services.card3Title}</h3>
            <p>{t.services.card3Desc}</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#f8f9fa', padding: '3rem 0', borderTop: '1px solid #eee' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="logo" style={{ justifyContent: 'center', marginBottom: '1rem' }}>
            <div className="logo-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1', textAlign: 'left' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: '800' }}>{t.brand}</span>
              <span style={{ fontSize: '0.5rem', letterSpacing: '0.2em', opacity: '0.7', fontWeight: '600' }}>ADVOKATŲ KONTORA</span>
            </div>
          </div>
          <p style={{ color: '#636e72', fontSize: '0.9rem' }}>{t.footer.rights}</p>
        </div>
      </footer>
    </div>
  )
}

export default App
