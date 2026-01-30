import React, { useState } from 'react'
import '../styles/index.css'
import { translations } from '../data/translations'
import heroImg from '../assets/hero_bg.png'

function App() {
  const [lang, setLang] = useState('lt')
  const t = translations[lang]

  return (
    <div className="app">
      {/* Navbar Island */}
      <nav>
        <div className="nav-content container">
          <div className="logo">
            <div className="logo-icon" style={{ border: 'none' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v18M6 12l6-6 6 6M6 18l6-6 6 6" />
              </svg>
            </div>
            <span style={{ letterSpacing: '-0.03em' }}>{t.brand}</span>
          </div>

          <div className="nav-links">
            <a href="#home">{t.nav.home}</a>
            <a href="#about">{t.nav.about}</a>
            <a href="#services">{t.nav.services}</a>
            <a href="#contact">{t.nav.contact}</a>
          </div>

          <div className="nav-controls">
            <button
              onClick={() => setLang(lang === 'lt' ? 'en' : 'lt')}
              className="lang-toggle"
            >
              {lang.toUpperCase()}
            </button>
            <a href="#contact" className="btn-cta">
              {t.nav.cta}
            </a>
          </div>
        </div>
      </nav>

      {/* Split Hero Section */}
      <section className="container hero-split" id="home">
        <div className="hero-left">
          <div className="hero-tag">
            <span>New</span> &nbsp; Pasirinkite savo kryptį →
          </div>
          <h1>{t.hero.title}</h1>
          <p>{t.hero.subtitle}</p>
          <div className="hero-btns">
            <a href="#contact" className="btn-cta" style={{ padding: '1.2rem 2.5rem', borderRadius: '100px', background: '#1a1a1a', color: '#fff' }}>Registruotis konsultacijai ↗</a>
            <a href="#contact" className="btn-cta" style={{ background: '#f5f5f5', color: '#1a1a1a', padding: '1.2rem 2rem', borderRadius: '100px' }}>Susisiekti ↗</a>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-img-container">
            <img src={heroImg} alt="Advise Law Firm Office" />

            {/* Small Overlapping Cards */}
            <div className="hero-cards-overlay">
              {t.hero.cards.map((card, idx) => (
                <div key={idx} className="small-card">
                  <div className="small-card-icon"></div>
                  <span>{card.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#f8f9fa', padding: '3rem 0', marginTop: '4rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="logo" style={{ justifyContent: 'center', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: '900' }}>{t.brand}</span>
          </div>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>{t.footer.rights}</p>
        </div>
      </footer>
    </div>
  )
}

export default App
