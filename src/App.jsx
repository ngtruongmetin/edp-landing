import React, { useEffect, useRef, useState } from 'react'
import { CONTACT_EMAIL, CONTACT_EMAIL_HREF, CONTACT_PHONE_HREF } from './config/contact'

const productCards = [
  {
    eyebrow: 'Ghi nhận hằng ngày',
    title: 'Phiếu trực điện tử',
    copy: 'Cờ đỏ ghi nhận vi phạm theo danh mục của trường, đính kèm ảnh minh chứng khi cần và ký xác nhận phiếu trực.',
    kind: 'duty',
  },
  {
    eyebrow: 'Theo quy chế riêng',
    title: 'Quy định và thang điểm',
    copy: 'Thiết lập quy định, điểm cộng trừ, thời gian và lịch phân công trực theo cách trường đang vận hành.',
    kind: 'rules',
  },
  {
    eyebrow: 'Chốt đúng kỳ',
    title: 'Tổng kết theo kỳ',
    copy: 'Tổng hợp điểm và xếp hạng theo tuần, tháng, học kỳ, năm học trước khi chốt dữ liệu.',
    kind: 'summary',
  },
  {
    eyebrow: 'Hỗ trợ thao tác hằng ngày',
    title: 'AI hỗ trợ ghi nhận',
    copy: 'Cờ đỏ có thể nhập mô tả tự nhiên để nhận gợi ý vi phạm; kết quả luôn được kiểm tra trước khi lưu.',
    kind: 'history',
  },
]

const workflow = [
  {
    title: 'Thiết lập năm học và quy định',
    copy: 'Khai báo học kỳ, tháng, tuần, lớp, quy định và lịch phân công trực.',
  },
  {
    title: 'Ghi nhận và xác nhận',
    copy: 'Cờ đỏ lập phiếu trực, ghi nhận vi phạm theo quy định, thêm minh chứng khi cần và ký xác nhận.',
  },
  {
    title: 'Tổng kết đúng kỳ',
    copy: 'Quản trị viên rà soát, tổng hợp, xếp hạng và chốt dữ liệu theo tuần, tháng, học kỳ hoặc năm học.',
  },
]

const roles = [
  ['Quản trị viên', 'Theo dõi toàn trường, quản lý quy định, lịch trực và các kỳ tổng kết.'],
  ['Giáo viên chủ nhiệm', 'Theo dõi phiếu trực, điểm thi đua và xếp hạng của lớp theo từng kỳ.'],
  ['Cờ đỏ', 'Lập phiếu trực, ghi nhận vi phạm và ký xác nhận theo lịch được phân công.'],
  ['Ban cán sự', 'Theo dõi tình hình lớp, phiếu trực và kết quả tổng kết để phối hợp xử lý.'],
]

const faqs = [
  ['EDP có buộc trường thay đổi quy chế không?', 'Không. Hệ thống được cấu hình theo quy chế, danh mục lỗi, thang điểm và luồng xác nhận mà trường đang vận hành.'],
  ['Dữ liệu đã khóa có ý nghĩa gì?', 'Sau khi một kỳ được rà soát và khóa, dữ liệu không bị chỉnh sửa tùy tiện. Lịch sử xử lý vẫn được lưu để đối chiếu.'],
  ['EDP có hỗ trợ sử dụng trên điện thoại không?', 'Có. Những thao tác hằng ngày như lập phiếu trực và kiểm tra thông tin được ưu tiên cho màn hình nhỏ.'],
  ['Nhà trường có thể xuất báo cáo không?', 'Có. EDP hỗ trợ xuất báo cáo tổng kết và dữ liệu đối chiếu ra Excel theo từng kỳ đánh giá.'],
]

function Arrow() {
  return <span className="button-arrow" aria-hidden="true">&#8594;</span>
}

function ProductPreview() {
  return (
    <div className="preview-rail" aria-label="Minh họa giao diện EduDiscipline Platform">
      <section className="preview-card preview-card--duty">
        <div className="preview-topbar">
          <span className="preview-chip">Phiếu trực</span>
          <span className="preview-state">Đã ký</span>
        </div>
        <h3>Ca trực hôm nay</h3>
        <p>Lớp được phân công trực</p>
        <div className="preview-checklist">
          <div><span className="check-mark">&#10003;</span><b>Ghi nhận vi phạm</b></div>
          <div><span className="check-mark">&#10003;</span><b>Áp dụng quy định</b></div>
          <div><span className="check-mark check-mark--muted">&#10003;</span><b>Ảnh minh chứng khi cần</b></div>
        </div>
        <div className="preview-person">
          <span className="person-initials">CD</span>
          <span>Cờ đỏ đã ký xác nhận</span>
        </div>
      </section>

      <section className="preview-card preview-card--summary">
        <div className="preview-topbar">
          <span className="preview-chip">Tổng kết tuần</span>
          <span className="more-mark">...</span>
        </div>
        <h3>Bảng xếp hạng</h3>
        <div className="ranking-list">
          <div><span>1</span><b>10A1</b><i className="rank-bar rank-bar--wide" /></div>
          <div><span>2</span><b>11A3</b><i className="rank-bar rank-bar--medium" /></div>
          <div><span>3</span><b>12A2</b><i className="rank-bar rank-bar--short" /></div>
        </div>
        <div className="preview-alert">Dữ liệu tổng kết tuần</div>
      </section>

      <section className="preview-card preview-card--governance">
        <div className="preview-topbar">
          <span className="preview-chip">Kiểm soát dữ liệu</span>
          <span className="lock-text">Khóa</span>
        </div>
        <h3>Chu kỳ tháng</h3>
        <div className="cycle-path" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="governance-list">
          <span><b>Phiếu trực</b><em>Đã ký xác nhận</em></span>
          <span><b>Tổng kết</b><em>Đã rà soát</em></span>
          <span><b>Chốt dữ liệu</b><em>Theo từng kỳ</em></span>
        </div>
      </section>
    </div>
  )
}

function FeatureVisual({ kind }) {
  if (kind === 'duty') {
    return <div className="feature-visual feature-visual--duty" aria-hidden="true"><span>Phiếu trực</span><i /><i /><i /></div>
  }

  if (kind === 'rules') {
    return <div className="feature-visual feature-visual--rules" aria-hidden="true"><b>Quy định</b><span>Điểm cộng trừ</span><span>Lịch phân công trực</span></div>
  }

  if (kind === 'summary') {
    return <div className="feature-visual feature-visual--summary" aria-hidden="true"><div><b>Tuần</b><i /></div><div><b>Tháng</b><i /></div><div><b>Học kỳ</b><i /></div></div>
  }

  return <div className="feature-visual feature-visual--history" aria-hidden="true"><span /><span /><span /><span /></div>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const heroArtRef = useRef(null)
  const parallaxFrame = useRef(null)
  const scrollFrame = useRef(null)
  const closeMenu = () => setMenuOpen(false)

  const setHeroParallax = (x = 0, y = 0) => {
    if (!heroArtRef.current) return

    cancelAnimationFrame(parallaxFrame.current)
    parallaxFrame.current = requestAnimationFrame(() => {
      heroArtRef.current.style.setProperty('--parallax-x', `${x.toFixed(2)}px`)
      heroArtRef.current.style.setProperty('--parallax-y', `${y.toFixed(2)}px`)
    })
  }

  const handleHeroPointerMove = (event) => {
    if (!window.matchMedia('(min-width: 821px)').matches) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 12
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 10
    setHeroParallax(x, y)
  }

  useEffect(() => {
    const media = window.matchMedia('(max-width: 820px)')
    const sync = () => {
      if (!media.matches) setMenuOpen(false)
    }

    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-is-open', menuOpen)
    return () => document.body.classList.remove('menu-is-open')
  }, [menuOpen])

  useEffect(() => () => cancelAnimationFrame(parallaxFrame.current), [])

  useEffect(() => {
    const targets = document.querySelectorAll('[data-scroll-parallax]')
    const update = () => {
      const viewportCenter = window.innerHeight / 2
      targets.forEach((target) => {
        const bounds = target.getBoundingClientRect()
        const distance = (viewportCenter - (bounds.top + bounds.height / 2)) / window.innerHeight
        target.style.setProperty('--scroll-shift', `${Math.max(-14, Math.min(14, distance * 20)).toFixed(2)}px`)
      })
    }
    const onScroll = () => {
      cancelAnimationFrame(scrollFrame.current)
      scrollFrame.current = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(scrollFrame.current)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    const targets = document.querySelectorAll('.role-strip, .section, .site-footer')
    const root = document.documentElement
    root.classList.add('motion-ready')

    if (typeof IntersectionObserver === 'undefined') {
      targets.forEach((target) => target.classList.add('is-visible'))
      return () => root.classList.remove('motion-ready')
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('is-visible', entry.isIntersecting)
      })
    }, { threshold: 0.05, rootMargin: '0px 0px -32% 0px' })

    targets.forEach((target) => observer.observe(target))
    return () => {
      observer.disconnect()
      root.classList.remove('motion-ready')
    }
  }, [])

  return (
    <div className="app-root">
      <a className="skip-link" href="#main">Bỏ qua đến nội dung</a>
      <header className="site-header">
        <div className="container nav-shell">
          <a className="brand-lockup" href="#main" aria-label="EduDiscipline Platform, về đầu trang">
            <img src="/assets/logo.png" alt="" />
            <span><b>EduDiscipline</b> Platform</span>
          </a>

          <nav id="primary-navigation" className={`primary-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Điều hướng chính">
            <a href="#san-pham" onClick={closeMenu}>Sản phẩm</a>
            <a href="#quy-trinh" onClick={closeMenu}>Quy trình</a>
            <a href="#loi-ich" onClick={closeMenu}>Vai trò</a>
            <a href="/demo-ai" onClick={closeMenu}>Xem minh họa AI</a>
            <a href="#faq" onClick={closeMenu}>Hỗ trợ</a>
            <a className="nav-mobile-cta" href={CONTACT_EMAIL_HREF} onClick={closeMenu}>Đặt lịch tư vấn <Arrow /></a>
          </nav>

          <div className="nav-actions">
            <a className="nav-login" href={CONTACT_EMAIL_HREF}>Liên hệ</a>
            <a className="button button-primary button-small" href={CONTACT_EMAIL_HREF}>Đặt lịch tư vấn <Arrow /></a>
          </div>

          <button
            className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
          >
            <span className="menu-bar" aria-hidden="true" />
            <span className="menu-bar" aria-hidden="true" />
            <span className="menu-bar" aria-hidden="true" />
            <b className="sr-only">{menuOpen ? 'Đóng menu' : 'Mở menu'}</b>
          </button>
        </div>
      </header>
      <button className={`menu-backdrop ${menuOpen ? 'is-open' : ''}`} type="button" aria-label="Đóng menu" onClick={closeMenu} />

      <main id="main">
        <section className="hero-section" onPointerMove={handleHeroPointerMove} onPointerLeave={() => setHeroParallax()}>
          <div className="hero-halo hero-halo--one" aria-hidden="true" />
          <div className="hero-halo hero-halo--two" aria-hidden="true" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="hero-kicker">Nền tảng số hóa thi đua và nề nếp cho trường THPT</p>
              <h1>
                <span className="hero-title-phrase">Chuẩn hóa nề nếp.</span>{' '}
                <span className="hero-title-phrase hero-title-phrase--accent">Minh bạch thi đua.</span>{' '}
              </h1>
              <p className="hero-lead">EDP kết nối phiếu trực, điểm thi đua, tổng kết và xếp hạng trong một quy trình có thể rà soát theo quy định của từng trường.</p>
              <div className="hero-actions">
                <a className="button button-primary" href={CONTACT_EMAIL_HREF}>Đặt lịch tư vấn <Arrow /></a>
                <a className="button button-secondary" href="#san-pham">Khám phá nền tảng <Arrow /></a>
              </div>
            </div>
            <div className="hero-art-parallax" ref={heroArtRef}><ProductPreview /></div>
          </div>
        </section>

        <section className="role-strip motion-role" aria-label="Các vai trò sử dụng EduDiscipline Platform">
          <div className="container role-strip-inner">
            <p>Phù hợp với quy trình phối hợp hằng ngày của trường THPT</p>
            <div><b>Quản trị viên</b><b>Giáo viên chủ nhiệm</b><b>Ban cán sự</b><b>Cờ đỏ</b></div>
          </div>
        </section>

        <section id="san-pham" className="section product-section motion-product">
          <div className="container">
            <div className="section-heading section-heading--product">
              <p className="eyebrow">Một nền tảng, một nguồn dữ liệu</p>
              <h2>Từ phiếu trực đến tổng kết theo kỳ.</h2>
              <p>EDP liên kết các bước ghi nhận, đối chiếu, chấm điểm và tổng kết trong cùng một nguồn dữ liệu.</p>
            </div>
            <div className="product-grid">
              {productCards.map((item) => (
                <article className={`product-card product-card--${item.kind}`} key={item.title}>
                  <FeatureVisual kind={item.kind} />
                  <div className="product-card-copy">
                    <p>{item.eyebrow}</p>
                    <h3>{item.title}</h3>
                    <span>{item.copy}</span>
                  </div>
                  <a className="text-link" href={item.kind === 'duty' ? '/demo-ai' : '#quy-trinh'}>
                    {item.kind === 'duty' ? 'Xem minh họa AI' : 'Xem quy trình'} <Arrow />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="quy-trinh" className="section process-section motion-process">
          <div className="container process-layout">
            <div className="section-heading section-heading--compact">
              <h2>Một quy trình rõ ràng cho từng vai trò.</h2>
              <p>EDP số hóa các bước trường đang vận hành, để dữ liệu được ghi nhận và tổng kết theo cùng một quy định.</p>
              <a className="button button-primary" href={CONTACT_EMAIL_HREF}>Trao đổi về cấu hình <Arrow /></a>
            </div>
            <ol className="process-list">
              {workflow.map((item, index) => (
                <li key={item.title}>
                  <span>{`0${index + 1}`}</span>
                  <div><h3>{item.title}</h3><p>{item.copy}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="loi-ich" className="section benefits-section motion-benefits" data-scroll-parallax>
          <div className="container benefits-layout">
            <div className="evidence-panel" aria-label="Minh họa thông tin được đối chiếu và khóa dữ liệu">
              <div className="evidence-panel-head"><span>Hồ sơ tổng kết</span><b>Đã rà soát</b></div>
              <div className="evidence-rows">
                <div><span>Phiếu trực</span><b>Có thể xem chi tiết</b><i>&#10003;</i></div>
                <div><span>Ký xác nhận</span><b>Đã lưu trạng thái</b><i>&#10003;</i></div>
                <div><span>Tổng kết</span><b>Rà soát trước khi chốt</b><i>&#10003;</i></div>
              </div>
              <div className="evidence-lock"><span className="lock-label">Khóa</span><div><b>Khóa dữ liệu theo kỳ</b><p>Giữ nguyên lịch sử sau khi chốt.</p></div></div>
            </div>
            <div className="benefits-copy">
              <p className="eyebrow">Mọi người nhìn cùng một dữ liệu</p>
              <h2>Dễ đối chiếu hơn trong từng kỳ tổng kết.</h2>
              <p>Nhà trường có thể xem phiếu trực, thay đổi và trạng thái xác nhận trước khi chốt dữ liệu theo kỳ.</p>
              <div className="role-grid">
                {roles.map(([role, copy]) => <article key={role}><h3>{role}</h3><p>{copy}</p></article>)}
              </div>
            </div>
          </div>
        </section>

        <section className="section callout-section motion-callout">
          <div className="container callout-inner">
            <div><h2>Triển khai theo quy định của trường.</h2></div>
            <div><p>Cùng xác định quy định, thang điểm, lịch trực và các mốc tổng kết phù hợp với cách trường đang vận hành.</p><a className="button button-primary" href={CONTACT_EMAIL_HREF}>Trao đổi về cấu hình <Arrow /></a></div>
          </div>
        </section>

        <section id="faq" className="section faq-section motion-faq">
          <div className="container faq-layout">
            <div className="section-heading section-heading--compact"><h2>Những điều nhà trường thường hỏi.</h2></div>
            <div className="faq-list">
              {faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer motion-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <a className="brand-lockup" href="#main" aria-label="EduDiscipline Platform, về đầu trang"><img src="/assets/logo.png" alt="" /><span><b>EduDiscipline</b> Platform</span></a>
            <p>Số hóa công tác thi đua và nề nếp học đường theo quy trình của từng trường THPT.</p>
          </div>
          <div className="footer-column"><h3>Khám phá</h3><a href="#san-pham">Sản phẩm</a><a href="/demo-ai">Minh họa AI</a><a href="#quy-trinh">Quy trình</a><a href="#loi-ich">Vai trò</a><a href="#faq">Hỗ trợ</a></div>
          <div className="footer-column"><h3>Liên hệ</h3><a href={CONTACT_EMAIL_HREF}>{CONTACT_EMAIL}</a><a href={CONTACT_PHONE_HREF}>+84 865 916 475</a><span>EduDiscipline Platform</span></div>
        </div>
        <div className="container footer-bottom"><span>Copyright {new Date().getFullYear()} EduDiscipline Platform</span><span>Bảo mật và điều khoản</span></div>
      </footer>
    </div>
  )
}

export default App
