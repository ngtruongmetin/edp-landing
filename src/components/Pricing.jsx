import React from 'react'
import { CONTACT_EMAIL_HREF } from '../config/contact'

const includedFeatures = [
    'Triển khai riêng cho 01 trường THPT',
    'Cấu hình theo quy chế thi đua',
    'Phiếu trực điện tử',
    'Sổ đầu bài & bảng lượng hóa',
    'Lịch trực thông minh',
    'Tự động tính điểm & xếp hạng',
    'Dashboard thống kê & báo cáo',
    '01 năm sử dụng'
]

const addOns = [
    {
        icon: '◉',
        title: 'Xác thực khuôn mặt',
        description: 'Bổ sung xác thực bằng khuôn mặt để tăng tính minh bạch khi ký xác nhận.'
    },
    {
        icon: '◉',
        title: 'Nhận diện riêng',
        description: 'Tùy chỉnh logo, màu sắc, tên miền và giao diện riêng theo thương hiệu của nhà trường.'
    },
    {
        icon: '◉',
        title: 'Tính năng theo yêu cầu',
        description: 'Phát triển thêm các chức năng mới phù hợp với nhu cầu sử dụng thực tế.'
    }
]

export default function Pricing() {
    return (
        <div className="pricing-stack">
            <section className="pricing-featured" aria-labelledby="pricing-main">
                <div className="section-heading">
                    <p className="eyebrow">Giải pháp</p>
                    <h2 id="pricing-main" className="section-title pricing-title">Một hệ thống dành riêng cho trường của bạn</h2>
                </div>

                <div className="plan-card plan-card-featured">
                    <div className="plan-header">
                        <h4>EduDiscipline Platform</h4>
                        <div className="plan-price">Giá liên hệ</div>
                    </div>
                    <ul className="plan-perks">
                        {includedFeatures.map((feature) => (
                            <li key={feature}>{feature}</li>
                        ))}
                    </ul>
                    <a className="btn-primary" href={CONTACT_EMAIL_HREF}>Yêu cầu báo giá</a>
                </div>
            </section>

            <section className="addons-section" aria-labelledby="addons-title">
                <div className="section-heading">
                    <p className="eyebrow">Tính năng mở rộng</p>
                    <h3 id="addons-title" className="section-title pricing-title">Mở rộng chức năng theo từng mô hình triển khai</h3>
                </div>

                <div className="addons-grid">
                    {addOns.map((addon) => (
                        <article className="addon-card" key={addon.title}>
                            <div className="addon-icon" aria-hidden="true">{addon.icon}</div>
                            <h4>{addon.title}</h4>
                            <p>{addon.description}</p>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    )
}
