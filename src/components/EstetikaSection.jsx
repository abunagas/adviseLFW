import React, { useState, useEffect } from 'react';
import './EstetikaSection.css';
import ParticleBackground from './ParticleBackground';

const Icons = {
    Classy: () => (
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 20h16M7 20V8m10 12V8M5 8h14M3 4h18M12 4v16" strokeLinecap="round" />
        </svg>
    ),
    Colorful: () => (
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" strokeLinecap="round" />
        </svg>
    ),
    Techy: () => (
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M7 8l-4 4 4 4M17 8l4 4-4 4M13 5l-2 14" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    Zen: () => (
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zM12 8v8M8 12h8" strokeLinecap="round" />
            <path d="M12 3c0 9 9 9 9 0" strokeLinecap="round" />
        </svg>
    ),
    Monolithic: () => (
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="5" y="5" width="14" height="14" rx="1" />
        </svg>
    )
};

const themes = [
    { id: 'classy', Icon: Icons.Classy },
    { id: 'colorful', Icon: Icons.Colorful },
    { id: 'techy', Icon: Icons.Techy },
    { id: 'zen', Icon: Icons.Zen },
    { id: 'monolithic', Icon: Icons.Monolithic }
];

const EstetikaSection = ({ onThemeChange, t }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTheme = () => {
        setCurrentIndex((prev) => (prev + 1) % themes.length);
    };

    const prevTheme = () => {
        setCurrentIndex((prev) => (prev - 1 + themes.length) % themes.length);
    };

    useEffect(() => {
        onThemeChange(themes[currentIndex].id);
    }, [currentIndex, onThemeChange]);

    const currentThemeData = t.estetika.themes[currentIndex];
    const ActiveIcon = themes[currentIndex].Icon;

    return (
        <section id="estetika" className="section estetika-section">
            <ParticleBackground theme={themes[currentIndex].id} particleCount={35} />
            <div className="estetika-container">
                <div className="estetika-content">
                    <div className="estetika-label">{t.estetika.label}</div>
                    <h2 className="estetika-title">{currentThemeData.name}</h2>
                    <p className="estetika-description">{currentThemeData.description}</p>

                    <div className="estetika-nav">
                        <button onClick={prevTheme} className="nav-arrow prev">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                        </button>
                        <div
                            className="estetika-preview-card glass glass-premium"
                            onMouseMove={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                e.currentTarget.style.setProperty('--card-x', `${e.clientX - rect.left}px`);
                                e.currentTarget.style.setProperty('--card-y', `${e.clientY - rect.top}px`);
                            }}
                        >
                            <div className="preview-icon">
                                <ActiveIcon />
                            </div>
                            <div className="preview-indicator">{t.estetika.current}</div>
                        </div>
                        <button onClick={nextTheme} className="nav-arrow next">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </button>
                    </div>

                    <div className="estetika-dots">
                        {themes.map((_, index) => (
                            <div
                                key={index}
                                className={`dot ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => setCurrentIndex(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EstetikaSection;
