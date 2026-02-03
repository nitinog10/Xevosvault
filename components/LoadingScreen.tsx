"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

interface LoadingScreenProps {
    onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
    const [phase, setPhase] = useState<"logo" | "shutter" | "complete">("logo");

    useEffect(() => {
        // Logo animation phase - 3 seconds
        const logoTimer = setTimeout(() => {
            setPhase("shutter");
        }, 3000);

        // Shutter animation phase - 1 second after logo
        const shutterTimer = setTimeout(() => {
            setPhase("complete");
            onLoadingComplete();
        }, 4000);

        return () => {
            clearTimeout(logoTimer);
            clearTimeout(shutterTimer);
        };
    }, [onLoadingComplete]);

    return (
        <AnimatePresence>
            {phase !== "complete" && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a] overflow-hidden"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Animated background particles/lines */}
                    <div className="absolute inset-0 overflow-hidden">
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"
                                style={{
                                    top: `${20 + i * 15}%`,
                                    left: "-100%",
                                    right: "-100%",
                                }}
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{
                                    duration: 2,
                                    delay: i * 0.15,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}
                    </div>

                    {/* Logo Animation Container */}
                    <motion.div
                        className="relative flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={phase === "logo" ? { opacity: 1 } : { opacity: 0, scale: 1.3 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Outer glow pulse */}
                        <motion.div
                            className="absolute w-[400px] h-[400px] rounded-full"
                            style={{
                                background: "radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, transparent 60%)"
                            }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: [0, 2, 1.5],
                                opacity: [0, 0.8, 0.4]
                            }}
                            transition={{
                                duration: 2.5,
                                ease: "easeOut"
                            }}
                        />

                        {/* Logo with dramatic line-drawing reveal effect */}
                        <div className="relative w-[300px] h-[180px]">
                            {/* Base layer - very faint outline */}
                            <motion.div
                                className="absolute inset-0"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Image
                                    src="/bat-logo.png"
                                    alt="XV Logo"
                                    fill
                                    className="object-contain"
                                    style={{ filter: "brightness(0.3)" }}
                                    priority
                                />
                            </motion.div>

                            {/* Drawing effect - left wing */}
                            <motion.div
                                className="absolute inset-0 overflow-hidden"
                                initial={{ clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)" }}
                                animate={{ clipPath: "polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)" }}
                                transition={{
                                    duration: 1.2,
                                    delay: 0.3,
                                    ease: [0.25, 0.46, 0.45, 0.94]
                                }}
                            >
                                <Image
                                    src="/bat-logo.png"
                                    alt=""
                                    fill
                                    className="object-contain drop-shadow-[0_0_20px_rgba(147,51,234,0.6)]"
                                    priority
                                />
                            </motion.div>

                            {/* Drawing effect - right wing */}
                            <motion.div
                                className="absolute inset-0 overflow-hidden"
                                initial={{ clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)" }}
                                animate={{ clipPath: "polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)" }}
                                transition={{
                                    duration: 1.2,
                                    delay: 0.5,
                                    ease: [0.25, 0.46, 0.45, 0.94]
                                }}
                            >
                                <Image
                                    src="/bat-logo.png"
                                    alt=""
                                    fill
                                    className="object-contain drop-shadow-[0_0_20px_rgba(147,51,234,0.6)]"
                                    priority
                                />
                            </motion.div>

                            {/* Center head reveal */}
                            <motion.div
                                className="absolute inset-0 overflow-hidden"
                                initial={{ clipPath: "circle(0% at 50% 40%)" }}
                                animate={{ clipPath: "circle(30% at 50% 40%)" }}
                                transition={{
                                    duration: 0.8,
                                    delay: 1.0,
                                    ease: [0.25, 0.46, 0.45, 0.94]
                                }}
                            >
                                <Image
                                    src="/bat-logo.png"
                                    alt=""
                                    fill
                                    className="object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                                    priority
                                />
                            </motion.div>

                            {/* Final full reveal with glow */}
                            <motion.div
                                className="absolute inset-0"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    duration: 0.6,
                                    delay: 1.8,
                                    ease: "easeOut"
                                }}
                            >
                                <Image
                                    src="/bat-logo.png"
                                    alt=""
                                    fill
                                    className="object-contain drop-shadow-[0_0_40px_rgba(147,51,234,0.8)]"
                                    priority
                                />
                            </motion.div>

                            {/* Shine sweep effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                initial={{ x: "-100%", opacity: 0 }}
                                animate={{ x: "100%", opacity: [0, 1, 0] }}
                                transition={{
                                    duration: 0.8,
                                    delay: 2.0,
                                    ease: "easeInOut"
                                }}
                            />
                        </div>

                        {/* Subtitle text */}
                        <motion.p
                            className="absolute -bottom-12 text-white/60 text-sm tracking-[0.3em] uppercase font-light"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2.2, duration: 0.5 }}
                        >
                            xeVosVault
                        </motion.p>
                    </motion.div>

                    {/* Shutter Animation - slides up to reveal */}
                    {phase === "shutter" && (
                        <motion.div
                            className="absolute inset-0 bg-[#0a0a0a]"
                            initial={{ y: 0 }}
                            animate={{ y: "-100%" }}
                            transition={{
                                duration: 0.8,
                                ease: [0.76, 0, 0.24, 1]
                            }}
                        >
                            {/* Purple gradient edge on shutter */}
                            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-purple-600/20 to-transparent" />
                        </motion.div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
