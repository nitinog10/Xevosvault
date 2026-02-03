"use client";

import { useState, useCallback } from "react";
import LoadingScreen from "@/components/LoadingScreen";

interface AppWrapperProps {
    children: React.ReactNode;
}

export default function AppWrapper({ children }: AppWrapperProps) {
    const [isLoading, setIsLoading] = useState(true);

    const handleLoadingComplete = useCallback(() => {
        setIsLoading(false);
    }, []);

    return (
        <>
            {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
            <div style={{ opacity: isLoading ? 0 : 1, transition: "opacity 0.3s ease" }}>
                {children}
            </div>
        </>
    );
}
