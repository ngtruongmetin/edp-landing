import React, { useEffect, useRef, useState } from 'react'

function useCountTo(target, duration = 1200) {
    const [value, setValue] = useState(0)
    const frameRef = useRef(0)

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        if (prefersReducedMotion) {
            setValue(target)
            return undefined
        }

        let startTime = 0

        function animate(timestamp) {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setValue(Math.round(target * eased))

            if (progress < 1) {
                frameRef.current = window.requestAnimationFrame(animate)
            }
        }

        frameRef.current = window.requestAnimationFrame(animate)

        return () => window.cancelAnimationFrame(frameRef.current)
    }, [target, duration])

    return value
}

export default function Stats({ items = [] }) {
    return (
        <div className="stats-grid" role="list" aria-label="Thống kê nổi bật">
            {items.map((item, index) => (
                <Stat key={`${item.label}-${index}`} label={item.label} value={item.value} />
            ))}
        </div>
    )
}

function Stat({ label, value }) {
    const count = useCountTo(value, 1200 + value * 30)
    const percent = value > 0 ? Math.min(100, Math.round((count / value) * 100)) : 0

    return (
        <div className="stat-card" role="listitem" aria-label={`${label}: ${value}`}>
            <div className="stat-value">{count}</div>
            <div className="stat-label">{label}</div>
            <div className="stat-bar-wrap" aria-hidden="true">
                <div className="stat-bar" style={{ width: `${percent}%` }} />
            </div>
        </div>
    )
}
