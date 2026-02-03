"use client";

import { motion } from "framer-motion";
import { MorphingText } from "@/components/ui/morphing-text";
import { LightRays } from "@/components/ui/light-rays";
import Image from "next/image";

const categories = [
    {
        titleTexts: ["Project Templates", "Boilerplates", "Starters", "Scaffolds"],
        category: "Scaffold",
        description: "Production-ready boilerplates for Next.js, React Native, and full-stack apps.",
        coverImage: "/templates-cover.png",
    },
    {
        titleTexts: ["Source Codes", "Algorithms", "Logic", "Implementations"],
        category: "Repository",
        description: "Open source implementations of complex logic and algorithms.",
        coverImage: "/source-codes-cover.png",
    },
    {
        titleTexts: ["Base Links", "Dev Tools", "Libraries", "Assets"],
        category: "Resources",
        description: "Curated collection of essential developer tools, libraries, and assets.",
        coverImage: "/base-links-cover.png",
    },
    {
        titleTexts: ["Development Guidance", "Best Practices", "Patterns", "Architecture"],
        category: "Learning",
        description: "Deep dives into architecture, patterns, and best practices.",
        coverImage: "/guidance-cover.png",
    }
];

// Rotating text for the main heading
const vaultTexts = [
    "The Vault",
    "Source Codes",
    "Templates",
    "Resources",
    "Dev Tools",
];

export default function Projects() {
    return (
        <>
            {/* Gradient transition from dark canvas to themed section */}
            <div className="relative h-32 bg-gradient-to-b from-[#121212] to-background z-10" />

            <section className="relative min-h-screen bg-background py-24 px-6 md:px-12 z-20">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16">
                        {/* Morphing text for the section title */}
                        <MorphingText
                            texts={vaultTexts}
                            className="text-foreground text-left !text-4xl md:!text-5xl !h-14 md:!h-16 !max-w-none !mx-0 uppercase tracking-tight"
                        />
                        <div className="h-1 w-24 bg-foreground/20 rounded-full mt-4" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {categories.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group relative h-96 rounded-2xl border border-foreground/10 overflow-hidden hover:border-foreground/20 transition-colors duration-300 bg-foreground/5"
                            >
                                {/* Light Rays Effect - higher visibility */}
                                <LightRays className="opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                                {/* Cover Image Background - more transparent */}
                                <div className="absolute inset-0 z-[1]">
                                    <Image
                                        src={item.coverImage}
                                        alt={item.titleTexts[0]}
                                        fill
                                        className="object-cover opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500 mix-blend-lighten"
                                    />
                                </div>

                                {/* Dark overlay gradient for text readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-[2]" />

                                {/* Content */}
                                <div className="relative z-10 h-full flex flex-col justify-end p-8">
                                    <span className="text-sm font-light text-white/60 mb-2 uppercase tracking-widest">
                                        {item.category}
                                    </span>
                                    {/* Morphing text for each card title */}
                                    <MorphingText
                                        texts={item.titleTexts}
                                        className="text-white text-left !text-2xl md:!text-3xl !h-10 md:!h-12 !max-w-none !mx-0 mb-2"
                                    />
                                    <p className="text-white/80 mt-2">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
