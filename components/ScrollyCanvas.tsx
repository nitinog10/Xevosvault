"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useMotionValueEvent, useTransform, motion } from "framer-motion";
import Overlay from "./Overlay";

const FRAME_COUNT = 192;

export default function ScrollyCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Fade out canvas in the last 15% of scroll
    const canvasOpacity = useTransform(scrollYProgress, [0.85, 1], [1, 0]);

    useEffect(() => {
        let loadedCount = 0;
        const imgs: HTMLImageElement[] = [];

        for (let i = 0; i < FRAME_COUNT; i++) {
            const img = new Image();
            const src = `/sequence/${String(i).padStart(3, '0')}.webp`;
            img.src = src;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === FRAME_COUNT) {
                    setIsLoaded(true);
                }
            };
            img.onerror = () => {
                console.error(`Failed to load image: ${src}`);
            };
            imgs.push(img);
        }
        setImages(imgs);
    }, []);

    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext("2d");
        const img = images[index];

        if (context && img) {
            const cw = canvas.width;
            const ch = canvas.height;
            const iw = img.width;
            const ih = img.height;

            const scale = Math.max(cw / iw, ch / ih);
            const x = (cw - iw * scale) / 2;
            const y = (ch - ih * scale) / 2;

            context.clearRect(0, 0, cw, ch);
            context.drawImage(img, x, y, iw * scale, ih * scale);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                if (isLoaded && images.length > 0) {
                    const progress = scrollYProgress.get();
                    const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(progress * FRAME_COUNT));
                    renderFrame(frameIndex);
                }
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isLoaded, scrollYProgress, images]);


    const requestRef = useRef<number>(0);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!isLoaded || images.length === 0) return;

        const frameIndex = Math.min(
            FRAME_COUNT - 1,
            Math.floor(latest * FRAME_COUNT)
        );

        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        requestRef.current = requestAnimationFrame(() => renderFrame(frameIndex));
    });

    return (
        <div ref={containerRef} className="h-[500vh] relative bg-[#121212]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* Canvas wrapped in motion.div for opacity fade */}
                <motion.div style={{ opacity: canvasOpacity }} className="absolute inset-0 pointer-events-none">
                    <canvas ref={canvasRef} className="block w-full h-full" />
                </motion.div>

                <Overlay scrollYProgress={scrollYProgress} />

                {/* Fixed Logo */}
                <div className="absolute top-8 left-8 z-50 mix-blend-difference pointer-events-none">
                    <span className="font-bold text-3xl tracking-tighter text-white">XV</span>
                </div>

                {/* Bottom Fade Gradient */}
                <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-[#121212] via-[#121212]/80 to-transparent pointer-events-none z-20" />

                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#121212] z-50 text-white font-mono text-sm tracking-widest">
                        LOADING EXPERIENCE...
                    </div>
                )}
            </div>
        </div>
    );
}
