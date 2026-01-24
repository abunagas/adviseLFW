import React, { useRef, useEffect, useState } from 'react';

const ParticleBackground = ({ theme = 'default', particleCount = 50 }) => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const particlesRef = useRef([]);
    const mouseRef = useRef({ x: null, y: null });
    const [opacity, setOpacity] = useState(0);

    // Very subtle color configurations per theme
    const themeColors = {
        default: ['rgba(139, 92, 246, 0.15)', 'rgba(217, 70, 239, 0.12)'],
        classy: ['rgba(197, 160, 89, 0.12)', 'rgba(229, 193, 126, 0.1)'],
        colorful: ['rgba(244, 114, 182, 0.12)', 'rgba(251, 191, 36, 0.1)'],
        techy: ['rgba(0, 255, 65, 0.1)', 'rgba(0, 143, 17, 0.08)'],
        zen: ['rgba(125, 140, 124, 0.1)', 'rgba(163, 177, 162, 0.08)'],
        monolithic: ['rgba(100, 100, 100, 0.08)', 'rgba(150, 150, 150, 0.06)']
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width = canvas.offsetWidth;
        let height = canvas.offsetHeight;
        canvas.width = width;
        canvas.height = height;

        // Initialize particles
        const colors = themeColors[theme] || themeColors.default;
        particlesRef.current = Array.from({ length: particleCount }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 2 + 0.5, // Very small: 0.5-2.5px
            speedX: (Math.random() - 0.5) * 0.3, // Very slow
            speedY: (Math.random() - 0.5) * 0.3,
            color: colors[Math.floor(Math.random() * colors.length)],
            baseX: 0,
            baseY: 0
        }));

        // Store base positions
        particlesRef.current.forEach(p => {
            p.baseX = p.x;
            p.baseY = p.y;
        });

        // Fade in
        setOpacity(1);

        const handleResize = () => {
            width = canvas.offsetWidth;
            height = canvas.offsetHeight;
            canvas.width = width;
            canvas.height = height;
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: null, y: null };
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            particlesRef.current.forEach(particle => {
                // Base movement
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                // Wrap around edges
                if (particle.x < 0) particle.x = width;
                if (particle.x > width) particle.x = 0;
                if (particle.y < 0) particle.y = height;
                if (particle.y > height) particle.y = 0;

                // Mouse interaction - gentle push away
                if (mouseRef.current.x !== null) {
                    const dx = particle.x - mouseRef.current.x;
                    const dy = particle.y - mouseRef.current.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const maxDistance = 150;

                    if (distance < maxDistance) {
                        const force = (maxDistance - distance) / maxDistance;
                        particle.x += (dx / distance) * force * 0.5;
                        particle.y += (dy / distance) * force * 0.5;
                    }
                }

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', handleResize);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [theme, particleCount]);

    // Update colors when theme changes
    useEffect(() => {
        const colors = themeColors[theme] || themeColors.default;
        particlesRef.current.forEach(p => {
            p.color = colors[Math.floor(Math.random() * colors.length)];
        });
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            className="particle-canvas"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
                opacity: opacity,
                transition: 'opacity 1s ease-in-out'
            }}
        />
    );
};

export default ParticleBackground;
