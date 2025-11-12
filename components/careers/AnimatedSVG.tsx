"use client"

import React from "react"

export default function AnimatedSVG({ src, alt }: { src: string; alt: string }) {
  const ref = React.useRef<HTMLImageElement>(null)
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return visible ? (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className="w-full h-auto transition-opacity duration-700 ease-out opacity-100"
      loading="lazy"
      decoding="async"
    />
  ) : (
    <div ref={ref} className="w-full h-[300px] opacity-0" />
  )
}
