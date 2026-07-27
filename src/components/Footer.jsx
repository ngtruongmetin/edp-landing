import React from 'react'
import { CONTACT_EMAIL, CONTACT_EMAIL_HREF, CONTACT_PHONE_HREF } from '../config/contact'

export default function Footer() {
  return <footer className="site-footer"><div className="container footer-grid"><div className="footer-main"><a className="brand-lockup" href="#main" aria-label="EduDiscipline Platform, về đầu trang"><img src="/assets/logo.png" alt="" /><span><b>EduDiscipline</b> Platform</span></a><p>Số hóa công tác thi đua và nề nếp theo quy trình của từng trường THPT.</p></div><div className="footer-column"><small>Khám phá</small><a href="#benefits">Vai trò</a><a href="#workflow">Quy trình</a><a href="#implementation">Cấu hình</a><a href="#faq">Câu hỏi thường gặp</a></div><div className="footer-column"><small>Liên hệ</small><a href={CONTACT_EMAIL_HREF}>{CONTACT_EMAIL}</a><a href={CONTACT_PHONE_HREF}>+84 865 916 475</a><span>EduDiscipline Platform</span></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} EduDiscipline Platform</span><span>Bảo mật · Điều khoản</span><span>Thiết kế cho trường THPT <b>●</b></span></div></footer>
}
