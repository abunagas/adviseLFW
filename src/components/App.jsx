
import React, { useEffect, useState } from 'react'
import '../styles/index.css'
import logo from '../assets/logo.png'
import EstetikaSection from './EstetikaSection'
import ParticleBackground from './ParticleBackground'
import { translations } from '../data/translations'

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    package: '',
    message: ''
  })
  const [activeTheme, setActiveTheme] = useState('original')
  const [isEstetikaActive, setIsEstetikaActive] = useState(false)
  const [lang, setLang] = useState('lt')
  const [isLight, setIsLight] = useState(false)
  const [activeSectionIndex, setActiveSectionIndex] = useState(0)

  const t = translations[lang]

  const sections = [
    { id: 'pradzia', label: t.nav.home },
    { id: 'paslaugos', label: t.nav.services },
    { id: 'estetika', label: t.nav.estetika },
    { id: 'kainos', label: t.nav.pricing },
    { id: 'procesas', label: t.nav.process },
    { id: 'apie-mus', label: t.nav.about },
    { id: 'kontaktai', label: t.nav.cta }
  ]

  const handleContactSubmit = (e) => {
    e.preventDefault()
    const subject = `Užklausa dėl projekto - ${formData.name}`
    const body = `Vardas: ${formData.name}%0D%0AEl. paštas: ${formData.email}%0D%0APasirinktas paketas: ${formData.package}%0D%0A%0D%0AProjekto aprašymas:%0D%0A${formData.message}`
    window.location.href = `mailto:Lintivo@protonmail.com?subject=${encodeURIComponent(subject)}&body=${body}`
  }

  const scrollToSection = (index) => {
    const target = document.getElementById(sections[index].id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const CustomSelect = ({ value, onChange, options, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div className={`custom-select ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <div className="select-selected">
          {value || placeholder}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ transition: '0.3s', transform: isOpen ? 'rotate(180deg)' : 'none' }}>
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        {isOpen && (
          <div className="select-items glass">
            {options.map(opt => (
              <div
                key={opt}
                className={`select-item ${value === opt ? 'active' : ''}`}
                onClick={() => {
                  onChange(opt)
                  setIsOpen(false)
                }}
              >
                {opt}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const reveals = document.querySelectorAll('[data-reveal]')
      reveals.forEach(reveal => {
        const windowHeight = window.innerHeight
        const revealTop = reveal.getBoundingClientRect().top
        const revealPoint = 150
        if (revealTop < windowHeight - revealPoint) {
          reveal.classList.add('active')
        }
      })
    }

    const handleAnchorClick = (e) => {
      const href = e.currentTarget.getAttribute('href')
      if (href && href.startsWith('#')) {
        e.preventDefault()
        const targetId = href.substring(1)
        const targetElement = document.getElementById(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }

    const links = document.querySelectorAll('a[href^="#"]')
    links.forEach(link => link.addEventListener('click', handleAnchorClick))

    const handleMouseMove = (e) => {
      // Use requestAnimationFrame for smoother cursor tracking
      requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`)
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`)
      })
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.45) {
          const index = sections.findIndex(s => s.id === entry.target.id)
          if (index !== -1) {
            setActiveSectionIndex(index)
            setIsEstetikaActive(sections[index].id === 'estetika')
          }
        }
      })
    }, {
      threshold: [0.1, 0.5, 0.8],
      rootMargin: '-5% 0px -5% 0px'
    })

    sections.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      links.forEach(link => link.removeEventListener('click', handleAnchorClick))
      sections.forEach(s => {
        const el = document.getElementById(s.id)
        if (el) observer.unobserve(el)
      })
    }
  }, [lang]) // Re-run effect when lang changes to re-observe with correct metadata

  return (
    <div className={`app ${isEstetikaActive ? `theme-${activeTheme}` : ''} ${isLight ? 'theme-light' : ''}`}>

      <nav className={scrolled ? 'scrolled' : ''}>
        <div className="container nav-content">
          <div className="logo">
            <img src={logo} alt="LV" style={{ width: '40px', height: '40px', filter: 'drop-shadow(0 0 5px var(--accent-primary))' }} />
            <span>LINTIVO</span>
          </div>
          <div className="nav-links">
            <a href="#pradzia">{t.nav.home}</a>
            <a href="#paslaugos">{t.nav.services}</a>
            <a href="#estetika">{t.nav.estetika}</a>
            <a href="#procesas">{t.nav.process}</a>
            <a href="#kainos">{t.nav.pricing}</a>
            <a href="#apie-mus">{t.nav.about}</a>
          </div>

          <div className="nav-actions" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div className="nav-controls" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <button onClick={() => setLang(lang === 'lt' ? 'en' : 'lt')} className="control-btn glass" title="Change Language">
                {lang.toUpperCase()}
              </button>
              <button onClick={() => setIsLight(!isLight)} className="control-btn glass" title="Toggle Theme">
                {isLight ? '🌙' : '☀️'}
              </button>
            </div>

            <a href="#kontaktai" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>
              {t.nav.cta}
            </a>
          </div>
        </div>
      </nav>

      <div className="side-nav">
        <button
          className="nav-arrow"
          onClick={() => scrollToSection(activeSectionIndex - 1)}
          disabled={activeSectionIndex === 0}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
        </button>

        <div className="nav-dot-container">
          {sections.map((section, idx) => (
            <div
              key={section.id}
              className={`nav-dot-wrapper ${activeSectionIndex === idx ? 'active' : ''}`}
              onClick={() => scrollToSection(idx)}
            >
              <span className="nav-label">{section.label}</span>
              <div className="nav-dot"></div>
            </div>
          ))}
        </div>

        <button
          className="nav-arrow"
          onClick={() => scrollToSection(activeSectionIndex + 1)}
          disabled={activeSectionIndex === sections.length - 1}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>
      </div>

      <main>
        <section id="pradzia" className="hero container section fade-in">
          <ParticleBackground theme="default" particleCount={40} />
          <div className="hero-content">
            <h1>{t.hero.title1} <br /><span>{t.hero.title2}</span></h1>
            <p>{t.hero.subtitle}</p>
            <div className="hero-btns">
              <a href="#kainos" className="btn btn-primary">
                {t.hero.btnPrimary}
              </a>
              <a href="#apie-mus" className="btn btn-outline" style={{ marginLeft: '1rem' }}>{t.hero.btnSecondary}</a>
            </div>
          </div>
        </section>

        <section id="paslaugos" className="section container">
          <ParticleBackground theme="default" particleCount={30} />
          <div className="container" data-reveal>
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{t.services.title}</h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>{t.services.subtitle}</p>
            </div>

            <div className="features-grid">
              <div
                className="feature-card glass glass-premium"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  e.currentTarget.style.setProperty('--card-x', `${e.clientX - rect.left}px`)
                  e.currentTarget.style.setProperty('--card-y', `${e.clientY - rect.top}px`)
                }}
              >
                <div className="icon-container">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                </div>
                <div className="feature-info">
                  <h3>{t.services.card1Title}</h3>
                  <p>{t.services.card1Desc}</p>
                </div>
              </div>

              <div
                className="feature-card glass glass-premium"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  e.currentTarget.style.setProperty('--card-x', `${e.clientX - rect.left}px`)
                  e.currentTarget.style.setProperty('--card-y', `${e.clientY - rect.top}px`)
                }}
              >
                <div className="icon-container">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
                </div>
                <div className="feature-info">
                  <h3>{t.services.card2Title}</h3>
                  <p>{t.services.card2Desc}</p>
                </div>
              </div>

              <div
                className="feature-card glass glass-premium"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  e.currentTarget.style.setProperty('--card-x', `${e.clientX - rect.left}px`)
                  e.currentTarget.style.setProperty('--card-y', `${e.clientY - rect.top}px`)
                }}
              >
                <div className="icon-container">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                </div>
                <div className="feature-info">
                  <h3>{t.services.card3Title}</h3>
                  <p>{t.services.card3Desc}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <EstetikaSection onThemeChange={setActiveTheme} t={t} />

        <section id="kainos" className="section container">
          <ParticleBackground theme="default" particleCount={30} />
          <div className="container" data-reveal>
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{t.pricing.title}</h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>{t.pricing.subtitle}</p>
            </div>

            <div className="pricing-grid">
              {t.pricing.plans.map((plan, idx) => (
                <div
                  key={idx}
                  className={`price-card glass glass-premium ${idx === 1 ? 'popular' : ''}`}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    e.currentTarget.style.setProperty('--card-x', `${e.clientX - rect.left}px`)
                    e.currentTarget.style.setProperty('--card-y', `${e.clientY - rect.top}px`)
                  }}
                >
                  {idx === 1 && <div className="popular-badge">{t.pricing.popular}</div>}
                  <div className="price-header">
                    <h3>{plan.name}</h3>
                    <div className="price-amount">{plan.price} <span>€</span></div>
                  </div>
                  <ul className="price-features">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx}>{feature}</li>
                    ))}
                  </ul>
                  <a href="#kontaktai" className={`btn ${idx === 1 ? 'btn-primary' : 'btn-outline'}`}>{t.pricing.order}</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="procesas" className="section container">
          <ParticleBackground theme="default" particleCount={25} />
          <div className="container" data-reveal>
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{t.process.title}</h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>{t.process.subtitle}</p>
            </div>

            <div className="process-grid">
              {t.process.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="process-step glass"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    e.currentTarget.style.setProperty('--card-x', `${e.clientX - rect.left}px`)
                    e.currentTarget.style.setProperty('--card-y', `${e.clientY - rect.top}px`)
                  }}
                >
                  <div className="step-number">0{idx + 1}</div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="apie-mus" className="section container">
          <ParticleBackground theme="default" particleCount={25} />
          <div className="container" data-reveal>
            <div className="glass" style={{ padding: '5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>{t.about.title}</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem' }}>{t.about.text}</p>
                <div style={{ display: 'flex', gap: '3rem' }}>
                  <div>
                    <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--accent-primary)' }}>100%</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t.about.quality}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--accent-primary)' }}>24/7</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t.about.support}</div>
                  </div>
                </div>
              </div>
              <div style={{ position: 'relative', height: '350px' }}>
                <div className="glass" style={{ position: 'absolute', top: '10%', left: '10%', right: '10%', bottom: '10%', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', opacity: 0.1, zIndex: 1 }}></div>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: '2px solid var(--accent-primary)', borderRadius: '24px', opacity: 0.2 }}></div>
                <div style={{ position: 'absolute', top: '20px', left: '20px', width: '100%', height: '100%', border: '2px solid var(--accent-secondary)', borderRadius: '24px', opacity: 0.1 }}></div>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', zIndex: 2 }}>
                  <div style={{ fontSize: '5rem', fontWeight: '900', opacity: 0.05 }}>{t.estetika.label}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="kontaktai" className="section container">
          <ParticleBackground theme="default" particleCount={20} />
          <div className="container" data-reveal>
            <div className="contact-grid">
              <div className="contact-info">
                <h2 style={{ fontSize: '3.5rem', marginBottom: '2rem', lineHeight: '1.1' }}>{t.contact.title}</h2>

                <div className="info-item">
                  <div className="info-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </div>
                  <div className="info-text">
                    <h4>{t.contact.email}</h4>
                    <p>Lintivo@protonmail.com</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  </div>
                  <div className="info-text">
                    <h4>{t.contact.reply}</h4>
                    <p>{t.contact.replyTime}</p>
                  </div>
                </div>
              </div>

              <form className="contact-form glass glass-premium" onSubmit={handleContactSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>{t.contact.nameLabel}</label>
                    <input
                      type="text"
                      placeholder={t.contact.namePlaceholder}
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>{t.contact.emailLabel}</label>
                    <input
                      type="email"
                      placeholder={t.contact.emailPlaceholder}
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>{t.contact.packageLabel}</label>
                  <CustomSelect
                    value={formData.package}
                    onChange={(val) => setFormData({ ...formData, package: val })}
                    placeholder={t.contact.packagePlaceholder}
                    options={t.pricing.plans.map(p => `${p.name} (${p.price}€)`)}
                  />
                </div>

                <div className="form-group">
                  <label>{t.contact.messageLabel}</label>
                  <textarea
                    rows="5"
                    placeholder={t.contact.messagePlaceholder}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  {t.contact.submit}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="section container" style={{ textAlign: 'center', borderTop: '1px solid var(--glass-border)' }}>
        <div className="logo" style={{ justifyContent: 'center', marginBottom: '2rem' }}>
          <img src={logo} alt="LV" style={{ width: '32px', height: '32px' }} />
          <span>LINTIVO</span>
        </div>
        <p style={{ color: 'var(--text-muted)' }}>&copy; {new Date().getFullYear()} LINTIVO. {t.footer.rights}</p>
      </footer>
      <div className={`cursor-glow ${activeSectionIndex !== 0 ? 'hidden' : ''}`}></div>
    </div>
  )
}

export default App
