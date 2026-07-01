import React from 'react'
import { CONTACT_EMAIL, CONTACT_EMAIL_HREF, CONTACT_PHONE_HREF } from '../config/contact'

const solutionLinks = [
    { label: 'Giới thiệu', href: '#overview' },
    { label: 'Tính năng', href: '#benefits' },
    { label: 'Quy trình', href: '#workflow' },
    { label: 'Giải pháp', href: '#pricing' }
]



export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="container footer-inner">
                <div className="footer-brand">
                    <p className="eyebrow">EduDiscipline Platform</p>
                    <h3>Số hóa công tác thi đua cờ đỏ cho trường THPT.</h3>
                </div>

                <div className="footer-column">
                    <h4>Giải pháp</h4>
                    {solutionLinks.map((item) => (
                        <a key={item.label} href={item.href}>
                            {item.label}
                        </a>
                    ))}
                </div>


                <div className="footer-column">
                    <h4>Liên hệ</h4>
                    <span className="muted">Đường Nguyễn Văn Tiết, Phường Lái Thiêu, Thành phố Hồ Chí Minh, Việt Nam</span>
                    <a href={CONTACT_EMAIL_HREF}>{CONTACT_EMAIL}</a>
                    <a href={CONTACT_PHONE_HREF}>+84 865 916 475</a>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container footer-bottom-inner">
                    <span className="muted">© {new Date().getFullYear()} EduDiscipline Platform. All rights reserved.</span>
                    <span className="muted">Nền tảng số hóa công tác thi đua và quản lý nề nếp học đường</span>
                </div>
            </div>
        </footer>
    )
}
