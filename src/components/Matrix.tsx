import { useEffect, useRef } from "react";

const CHARS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ{}<>[]()#@$%&';
const FONT_SIZE = 13;
const INTERVAL_MS = 45;
const RESET_PROBABILITY = 0.975;

interface MatrixBgProps {
    color?: string;
    opacity?: number;
    className?: string;
}

export default function MatrixBg({ color = '#00ff41', opacity = 0.12, className }: MatrixBgProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return; // Null check to fix TypeScript error

        const ctx = canvas.getContext('2d');
        if (!ctx) return; // Additional safety for context

        const setSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = document.body.scrollHeight; 
        };
        setSize();

        const columns = Math.floor(canvas.width / FONT_SIZE);
        let drops = Array(columns).fill(1); // Use let for reassignment

        const draw = () => {
            ctx.fillStyle = `rgba(5, 10, 14, 0.03)`; // Fixed typo: fillStle -> fillStyle
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = color;
            ctx.font = `${FONT_SIZE}px monospace`;

            drops.forEach((y, i) => {
                const text = CHARS[Math.floor(Math.random() * CHARS.length)];
                ctx.fillText(text, i * FONT_SIZE, y * FONT_SIZE);
                if (y * FONT_SIZE > canvas.height && Math.random() > RESET_PROBABILITY) {
                    drops[i] = 0;
                }
                drops[i]++;
            });
        };

        const intervalId = setInterval(draw, INTERVAL_MS);
        
        const handleResize = () => {
            setSize();
            const newColumns = Math.floor(canvas.width / FONT_SIZE);
            drops = Array(newColumns).fill(1); // Properly reinitialize drops
        };
        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(intervalId);
            window.removeEventListener('resize', handleResize);
        };
    }, [color]); // Add dependencies if needed

    return <canvas ref={canvasRef} className={className} style={{ opacity }} />;
}