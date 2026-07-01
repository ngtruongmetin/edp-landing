import React, { useEffect, useRef, useState } from 'react'
import { CONTACT_EMAIL_HREF } from '../config/contact'

const highlights = [
    'Số hóa toàn bộ quy trình thi đua cờ đỏ',
    'Tự động tính điểm và xếp hạng theo quy chế',
    'Triển khai riêng theo nghiệp vụ từng trường',
]

const dashboardCards = [
    { label: 'Lớp đang quản lý', value: 41, suffix: '', tone: 'accent' },
    { label: 'Phiếu trực đã xử lý', value: 1458, suffix: '', tone: 'success' },
    { label: 'Ngày vận hành', value: 97, suffix: '', tone: 'neutral' },
]

function useCountUp(target, duration = 1500, active = false) {
    const [value, setValue] = useState(0)
    const frameRef = useRef(0)

    useEffect(
        () => () => {
            window.cancelAnimationFrame(frameRef.current)
        },
        [],
    )

    useEffect(() => {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        window.cancelAnimationFrame(frameRef.current)

        if (!active) {
            setValue(0)
            return undefined
        }

        if (reducedMotion) {
            setValue(target)
            return undefined
        }

        let startTime = 0

        const animate = (timestamp) => {
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
    }, [active, target, duration])

    return value
}

function AnimatedCard({ card, delay = 0, active = false }) {
    const count = useCountUp(card.value, 1400 + card.value * 2, active)

    return (
        <div className={`mock-card ${card.tone}`} style={{ '--card-delay': `${delay}ms` }}>
            <div className="mock-value">
                {count}
                {card.suffix}
            </div>
            <div className="mock-label">{card.label}</div>
        </div>
    )
}

export default function Hero() {
    const isMobile = window.matchMedia('(max-width: 720px)').matches
    const [isVisible, setIsVisible] = useState(() => !isMobile)

    useEffect(() => {
        if (!isMobile) {
            setIsVisible(true)
            return undefined
        }

        const markVisible = () => {
            setIsVisible(true)
            window.removeEventListener('scroll', markVisible)
        }

        window.addEventListener('scroll', markVisible, { passive: true })
        return () => window.removeEventListener('scroll', markVisible)
    }, [isMobile])

    return (
        <header className="hero" role="banner">
            <div className="hero-backdrop" aria-hidden="true" />
            <div className="container hero-inner">
                <div className="hero-copy">
                    <div className="hero-badge">EduDiscipline Platform</div>
                    <h1>Số hóa công tác thi đua và quản lý nề nếp học đường</h1>
                    <p className="lead">
                        EduDiscipline Platform được phát triển từ nhu cầu thực tế tại trường THPT. Chúng tôi khảo sát quy trình thi đua,
                        cấu hình hệ thống theo quy chế của từng trường và đồng hành trong quá trình triển khai để mọi bộ phận có thể
                        sử dụng ngay từ những tuần thi đua đầu tiên.
                    </p>

                    <ul className="hero-benefits">
                        {highlights.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>

                    <div className="hero-cta">
                        <a className="btn-primary" href={CONTACT_EMAIL_HREF}>
                            Liên hệ tư vấn
                        </a>
                        <a className="btn-ghost" href="#benefits">
                            Xem tính năng
                        </a>
                    </div>
                </div>

                <aside className="hero-visual" aria-hidden="true">
                    <div className="mock-shell">
                        <div className="mock-shell-top">
                            <span className="mock-dot" />
                            <span className="mock-dot" />
                            <span className="mock-dot" />
                        </div>
                        <div className="mock-dashboard">
                            <div className="mock-panel mock-panel-primary">
                                <div className="mock-label">Số liệu thực tế</div>
                                <div className="mock-title">Trường THPT Nguyễn Trãi - Bình Dương</div>
                            </div>
                            <div className="mock-stats">
                                {dashboardCards.map((card, index) => (
                                    <AnimatedCard key={card.label} card={card} delay={index * 140} active={isVisible} />
                                ))}
                            </div>
                            <div className="mock-panel mock-panel-secondary">
                                <div>
                                    <div className="mock-label">Thời gian bàn giao</div>
                                    <div className="mock-title">Từ thanh toán đến vận hành</div>
                                </div>
                                <div className="mock-chip">7–14 ngày làm việc</div>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </header>
    )
}
