import React, { useEffect, useRef, useState } from 'react'
import Hero from './components/Hero'
import Features from './components/Features'
import Pricing from './components/Pricing'
import Footer from './components/Footer'
import { CONTACT_EMAIL_HREF, CONTACT_PHONE_HREF } from './config/contact'

const workflowSteps = [
    {
        title: 'Đầu tuần',
        description: 'Tạo lịch trực thông minh',
    },
    {
        title: 'Mỗi ngày',
        description: 'Cờ đỏ nhập phiếu trực',
    },
    {
        title: 'Xác nhận phiếu trực',
        description: 'Lớp trưởng xác nhận bằng PIN + khuôn mặt',
    },
    {
        title: 'Sổ đầu bài',
        description: 'Đồng bộ sổ đầu bài và tự động tính điểm thi đua',
    },
    {
        title: 'Cuối tuần',
        description: 'Khóa tuần, tổng hợp điểm và xếp hạng',
    },
    {
        title: 'Báo cáo',
        description: 'Xuất báo cáo và lưu trữ dữ liệu thi đua',
    },
]

export default function App() {
    const workflowRefs = useRef([])
    const [visibleWorkflowSteps, setVisibleWorkflowSteps] = useState([])
    const workflowMaxVisible = visibleWorkflowSteps.length > 0 ? Math.max(...visibleWorkflowSteps) : -1

    useEffect(() => {
        const elements = workflowRefs.current.filter(Boolean)

        if (elements.length === 0) {
            return undefined
        }

        if (typeof IntersectionObserver === 'undefined') {
            setVisibleWorkflowSteps(workflowSteps.map((_, index) => index))
            return undefined
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return
                    }

                    const index = Number(entry.target.getAttribute('data-workflow-index'))

                    if (Number.isNaN(index)) {
                        return
                    }

                    setVisibleWorkflowSteps((current) => (current.includes(index) ? current : [...current, index]))
                    observer.unobserve(entry.target)
                })
            },
            {
                threshold: 0.28,
                rootMargin: '0px 0px -8% 0px',
            },
        )

        elements.forEach((element) => observer.observe(element))

        return () => observer.disconnect()
    }, [])

    return (
        <div className="app-root">
            <Hero />

            <main className="container" id="main">
                <section aria-labelledby="overview" className="section section-overview">
                    <div className="section-heading">
                        <p className="eyebrow">Giải pháp dành riêng cho từng trường</p>
                        <h2 id="overview" className="section-title">Số hóa quy trình thi đua mà không thay đổi cách vận hành</h2>
                    </div>
                    <p className="section-copy">
                        Chúng tôi triển khai EduDiscipline Platform như một hệ thống riêng cho từng trường. Sau khi khảo sát quy trình
                        thực tế, hệ thống được cấu hình theo nghiệp vụ, dữ liệu và quy chế hiện hành để sẵn sàng đưa vào vận hành
                        trong thời gian ngắn.
                    </p>
                </section>

                <section aria-labelledby="benefits" className="section">
                    <div className="section-heading">
                        <p className="eyebrow">Điểm mạnh cốt lõi</p>
                        <h2 id="benefits" className="section-title">Những gì EduDiscipline Platform mang lại</h2>
                    </div>
                    <Features />
                </section>

                <section aria-labelledby="workflow" className="section">
                    <div className="section-heading">
                        <p className="eyebrow">Quy trình thực hiện</p>
                        <h2 id="workflow" className="section-title">Luồng vận hành từ đầu tuần đến báo cáo cuối tuần</h2>
                    </div>
                    <div className="workflow-flow" role="list" aria-label="Quy trình thực hiện">
                        <div
                            className="workflow-track"
                            aria-hidden="true"
                            style={{
                                '--workflow-progress':
                                    workflowMaxVisible >= 0
                                        ? `${(workflowMaxVisible / Math.max(workflowSteps.length - 1, 1)) * 100}%`
                                        : '0%',
                            }}
                        />
                        {workflowSteps.map((step, index) => (
                            <React.Fragment key={step.title}>
                                <article
                                    ref={(element) => {
                                        workflowRefs.current[index * 2] = element
                                    }}
                                    data-workflow-index={index}
                                    className={`workflow-step ${visibleWorkflowSteps.includes(index) ? 'is-visible' : ''}`}
                                    role="listitem"
                                    style={{
                                        '--workflow-delay': `${index * 120}ms`,
                                        '--workflow-offset': index % 2 === 0 ? '-26px' : '26px',
                                    }}
                                >
                                    <div className="workflow-step-index">0{index + 1}</div>
                                    <div className="workflow-step-copy">
                                        <h3>{step.title}</h3>
                                        <p>{step.description}</p>
                                    </div>
                                </article>
                                {index < workflowSteps.length - 1 ? (
                                    <div
                                        ref={(element) => {
                                            workflowRefs.current[index * 2 + 1] = element
                                        }}
                                        className={`workflow-arrow ${visibleWorkflowSteps.includes(index) ? 'is-visible' : ''
                                            }`}
                                        aria-hidden="true"
                                        style={{ '--workflow-delay': `${index * 120 + 70}ms` }}
                                    >
                                        ↓
                                    </div>
                                ) : null}
                            </React.Fragment>
                        ))}
                    </div>
                </section>

                <section id="pricing" aria-labelledby="pricing" className="section">
                    <Pricing />
                </section>

                <section className="section cta-compact">
                    <div className="cta-row">
                        <div className="cta-copy">
                            <p className="eyebrow">Sẵn sàng triển khai</p>

                            <h3>Cùng trao đổi giải pháp phù hợp với trường của bạn</h3>

                            <p className="section-copy">
                                Mỗi trường có quy chế và cách vận hành khác nhau. Chúng tôi sẽ khảo sát,
                                tư vấn và triển khai EduDiscipline Platform theo đúng nhu cầu thực tế của đơn vị.
                            </p>

                        </div>
                        <div className="cta-actions">
                            <a className="btn-primary" href={CONTACT_EMAIL_HREF}>
                                Liên hệ tư vấn
                            </a>
                            <a className="btn-ghost" href={CONTACT_PHONE_HREF}>
                                Gọi ngay
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
