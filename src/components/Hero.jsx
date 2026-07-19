import React, { useState } from 'react'
import { CONTACT_EMAIL_HREF } from '../config/contact'
import ArrowIcon from './ArrowIcon'

const navItems = [
  ['Nền tảng', '#benefits'],
  ['Quy trình', '#workflow'],
  ['Triển khai', '#implementation'],
  ['FAQ', '#faq'],
]

const heroFlow = [
  ['01', 'Cờ đỏ', 'Ghi nhận nề nếp'],
  ['02', 'Phiếu trực', 'Lập phiếu theo quy định'],
  ['03', 'Ký xác nhận', 'Đối chiếu đúng vai trò'],
  ['04', 'Tổng kết', 'Tính điểm theo kỳ'],
  ['05', 'Khóa dữ liệu', 'Niêm phong kết quả'],
  ['06', 'Xếp hạng', 'Công bố minh bạch'],
]

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <a className="brand-lockup" href="#main" aria-label="EduDiscipline Platform, về đầu trang">
          <img src="/assets/logo.png" alt="" />
          <span><b>EduDiscipline</b> Platform</span>
        </a>
        <nav id="primary-nav" className={`primary-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Điều hướng chính">
          {navItems.map(([label, href]) => (
            <a key={href} href={href} onClick={closeMenu}>{label}</a>
          ))}
          <a className="nav-mobile-action arrow-bearing" href={CONTACT_EMAIL_HREF} onClick={closeMenu}>
            Đặt lịch tư vấn <ArrowIcon />
          </a>
        </nav>
        <a className="nav-action arrow-bearing" href={CONTACT_EMAIL_HREF}>Đặt lịch tư vấn <ArrowIcon /></a>
        <button
          className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
          <b className="sr-only">{menuOpen ? 'Đóng menu' : 'Mở menu'}</b>
        </button>
      </div>

      <div className="container hero-shell">
        <div className="hero-copy-new">
          <div className="status-line"><i /> Quy trình thi đua và nề nếp cho trường THPT</div>
          <h1>Quy trình rõ. Dữ liệu có dấu vết.</h1>
          <p>
            EduDiscipline Platform số hóa toàn bộ luồng thi đua: từ Cờ đỏ ghi nhận, phiếu trực,
            ký xác nhận, tổng kết, khóa dữ liệu đến xếp hạng. Dashboard chỉ là kết quả cuối cùng
            của một quy trình được chuẩn hóa.
          </p>
          <div className="hero-actions">
            <a className="button button-primary arrow-bearing" href={CONTACT_EMAIL_HREF}>
              Đặt lịch tư vấn <ArrowIcon />
            </a>
            <a className="button button-quiet arrow-bearing" href="#workflow">
              Xem quy trình <ArrowIcon direction="down" />
            </a>
          </div>
          <div className="hero-proof">
            <span><strong>Theo quy chế</strong> cấu hình cho từng trường</span>
            <span><strong>Có xác nhận</strong> theo vai trò vận hành</span>
            <span><strong>Có khóa</strong> để bảo toàn kết quả</span>
          </div>
        </div>

        <div className="hero-art" role="img" aria-label="Luồng nghiệp vụ từ Cờ đỏ, phiếu trực, ký xác nhận, tổng kết, khóa dữ liệu đến xếp hạng">
          <div className="process-ledger">
            <div className="ledger-head">
              <span>Sổ quy trình thi đua</span>
              <b>Năm học 2026</b>
            </div>
            <ol className="hero-process">
              {heroFlow.map(([number, title, description], index) => (
                <li key={title} className={index === heroFlow.length - 1 ? 'is-final' : ''}>
                  <span className="process-number">{number}</span>
                  <span className="process-copy">
                    <b>{title}</b>
                    <small>{description}</small>
                  </span>
                  {index < heroFlow.length - 1 && <ArrowIcon direction="down" className="process-arrow" />}
                </li>
              ))}
            </ol>
            <div className="ledger-seal">
              <span>Đã khóa</span>
              <b>Truy vết được</b>
            </div>
          </div>
          <div className="ranking-slip" aria-hidden="true">
            <span>Xếp hạng tuần</span>
            <div><b>10A1</b><i /></div>
            <div><b>11A3</b><i /></div>
            <div><b>12A2</b><i /></div>
          </div>
        </div>
      </div>
    </header>
  )
}
