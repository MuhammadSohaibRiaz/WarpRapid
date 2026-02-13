"use client"

export function MeshGradient({ className = "" }: { className?: string }) {
    return (
        <div className={`absolute inset-0 overflow-hidden ${className}`}>
            {/* Pure CSS animated gradient — zero JS, fully GPU-composited */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    background: `
                        radial-gradient(ellipse 80% 50% at 20% 40%, hsla(215, 40%, 65%, 0.25), transparent),
                        radial-gradient(ellipse 60% 60% at 80% 20%, hsla(256, 40%, 70%, 0.2), transparent),
                        radial-gradient(ellipse 70% 50% at 50% 90%, hsla(354, 35%, 65%, 0.15), transparent)
                    `,
                }}
            />

            {/* Soft animated orb — CSS only, GPU composited via will-change: transform */}
            <div
                className="absolute w-[500px] h-[500px] rounded-full opacity-15 animate-drift-slow"
                style={{
                    background: "radial-gradient(circle, hsla(256, 50%, 60%, 0.4), transparent 70%)",
                    top: "10%",
                    left: "15%",
                    willChange: "transform",
                }}
            />
            <div
                className="absolute w-[400px] h-[400px] rounded-full opacity-10 animate-drift-reverse"
                style={{
                    background: "radial-gradient(circle, hsla(200, 50%, 60%, 0.3), transparent 70%)",
                    bottom: "10%",
                    right: "10%",
                    willChange: "transform",
                }}
            />
        </div>
    )
}
