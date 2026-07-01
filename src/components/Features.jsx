import React, { useEffect, useRef, useState } from 'react'

const features = [
    {
        title: 'Cấu hình theo quy chế nhà trường',
        description:
            'Tiêu chí chấm điểm, bảng lượng hóa, lịch trực và phân quyền được tùy chỉnh theo quy định của từng trường.'
    },
    {
        title: 'Xác nhận bằng PIN & khuôn mặt',
        description:
            'Giảm tình trạng ký hộ, đảm bảo phiếu trực được xác nhận đúng người.'
    },
    {
        title: 'Minh bạch và có lưu vết',
        description:
            'Mọi chỉnh sửa đều được ghi nhận với người thực hiện và thời gian, giúp quá trình quản lý rõ ràng và dễ kiểm tra.'
    },
    {
        title: 'Báo cáo trực quan',
        description:
            'Theo dõi kết quả thi đua theo ngày, tuần, tháng; xuất báo cáo và bảng xếp hạng chỉ với vài thao tác.'
    }
]

export default function Features() {
    const sectionRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const element = sectionRef.current

        if (!element) {
            return undefined
        }

        if (typeof IntersectionObserver === 'undefined') {
            setIsVisible(true)
            return undefined
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            {
                threshold: 0.2,
                rootMargin: '0px 0px -10% 0px',
            },
        )

        observer.observe(element)

        return () => observer.disconnect()
    }, [])

    return (
        <div ref={sectionRef} className={`features-grid ${isVisible ? 'is-visible' : ''}`}>
            {features.map((feature, index) => (
                <article
                    className="feature"
                    key={feature.title}
                    style={{ '--feature-delay': `${index * 120}ms` }}
                >
                    <div className="feature-index">0{index + 1}</div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                </article>
            ))}
        </div>
    )
}
