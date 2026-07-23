import React, { useEffect, useRef, useState } from 'react'
import { CONTACT_EMAIL, CONTACT_EMAIL_HREF, CONTACT_PHONE_HREF } from './config/contact'

const productCards = [
  {
    eyebrow: 'Ghi nhận hằng ngày',
    title: 'Phiếu trực điện tử',
    copy: 'Ghi nhận nề nếp, vi phạm và minh chứng ngay tại lớp, theo đúng danh mục của trường.',
    kind: 'duty',
  },
  {
    eyebrow: 'Theo quy chế riêng',
    title: 'Điểm thi đua rõ ràng',
    copy: 'Cấu hình lỗi, điểm cộng trừ và vai trò xác nhận theo cách nhà trường đang vận hành.',
    kind: 'rules',
  },
  {
    eyebrow: 'Chốt đúng kỳ',
    title: 'Tổng kết tự động',
    copy: 'Theo dõi tuần, tháng, học kỳ và năm học từ cùng một nguồn dữ liệu.',
    kind: 'summary',
  },
  {
    eyebrow: 'Khi cần đối chiếu',
    title: 'Lịch sử có thể truy vết',
    copy: 'Mỗi thay đổi, xác nhận và thời điểm khóa dữ liệu đều được lưu lại rõ ràng.',
    kind: 'history',
  },
]

const workflow = [
  {
    title: 'Thiết lập năm học',
    copy: 'Khai báo lớp, thời gian, quy chế và các vai trò cùng tham gia.',
  },
  {
    title: 'Ghi nhận và xác nhận',
    copy: 'Cờ đỏ lập phiếu trực. Các vai trò liên quan kiểm tra và ký xác nhận.',
  },
  {
    title: 'Tổng kết đúng kỳ',
    copy: 'Hệ thống tổng hợp, xếp hạng và khóa dữ liệu sau khi nhà trường rà soát.',
  },
]

const roles = [
  ['Ban giám hiệu', 'Nắm tình hình toàn trường và đối chiếu kết quả theo từng kỳ.'],
  ['Giáo viên chủ nhiệm', 'Theo dõi lớp, phiếu trực và lịch sử vi phạm trước khi trao đổi.'],
  ['Cờ đỏ', 'Lập phiếu nhanh, đủ tiêu chí và có minh chứng khi cần.'],
  ['Ban cán sự', 'Phối hợp xác nhận, theo dõi điểm thi đua và phản hồi kịp thời.'],
]

const faqs = [
  ['EDP có buộc trường thay đổi quy chế không?', 'Không. Hệ thống được cấu hình theo quy chế, danh mục lỗi, thang điểm và luồng xác nhận mà trường đang vận hành.'],
  ['Dữ liệu đã khóa có ý nghĩa gì?', 'Sau khi một kỳ được rà soát và khóa, dữ liệu không bị chỉnh sửa tùy tiện. Lịch sử xử lý vẫn được lưu để đối chiếu.'],
  ['EDP có hỗ trợ sử dụng trên điện thoại không?', 'Có. Những thao tác hằng ngày như lập phiếu trực và kiểm tra thông tin được ưu tiên cho màn hình nhỏ.'],
  ['Nhà trường có thể xuất báo cáo không?', 'Có. Kết quả tổng kết và thông tin cần đối chiếu có thể được xuất theo nhu cầu vận hành của trường.'],
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
          <span className="preview-state">Đã gửi</span>
        </div>
        <h3>Ca trực hôm nay</h3>
        <p>Khối 10, buổi sáng</p>
        <div className="preview-checklist">
          <div><span className="check-mark">&#10003;</span><b>Nề nếp đầu giờ</b></div>
          <div><span className="check-mark">&#10003;</span><b>Vệ sinh lớp học</b></div>
          <div><span className="check-mark check-mark--muted">&#10003;</span><b>Minh chứng đính kèm</b></div>
        </div>
        <div className="preview-person">
          <span className="person-initials">CD</span>
          <span>Cờ đỏ đã xác nhận</span>
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
        <div className="preview-alert">Đủ điều kiện tổng kết</div>
      </section>

      <section className="preview-card preview-card--governance">
        <div className="preview-topbar">
          <span className="preview-chip">Kiểm soát dữ liệu</span>
          <span className="lock-text">Khóa</span>
        </div>
        <h3>Chu kỳ tháng</h3>
        <div className="cycle-path" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="governance-list">
          <span><b>Phiếu trực</b><em>Đã đối chiếu</em></span>
          <span><b>Ký xác nhận</b><em>Đủ vai trò</em></span>
          <span><b>Khóa dữ liệu</b><em>Sẵn sàng</em></span>
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
    return <div className="feature-visual feature-visual--rules" aria-hidden="true"><b>Quy chế</b><span>Điểm cộng trừ</span><span>Vai trò xác nhận</span></div>
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

    if (typeof IntersectionObserver === 'undefined') {
      targets.forEach((target) => target.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' })

    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
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
            <a href="#quy-trinh" onClick={closeMenu}>Giải pháp</a>
            <a href="#loi-ich" onClick={closeMenu}>Đối tượng</a>
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
      <button className={`menu-backdrop ${menuOpen ? 'is-open' : ''}`} type="button" aria-label="Close menu" onClick={closeMenu} />

      <main id="main">
        <section className="hero-section" onPointerMove={handleHeroPointerMove} onPointerLeave={() => setHeroParallax()}>
          <div className="hero-halo hero-halo--one" aria-hidden="true" />
          <div className="hero-halo hero-halo--two" aria-hidden="true" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="hero-kicker">Nền tảng quản lý nề nếp cho trường THPT</p>
              <h1>
                <span className="hero-title-phrase">Quản lý nề nếp.</span>{' '}
                <span className="hero-title-phrase hero-title-phrase--accent">Đồng bộ.</span>{' '}
                <span className="hero-title-phrase">Minh bạch.</span>
              </h1>
              <p className="hero-lead">EDP số hóa phiếu trực, tổng kết và xếp hạng để nhà trường theo dõi mọi thay đổi đúng quy trình.</p>
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
            <p>Được thiết kế cho nhịp vận hành thực tế của trường THPT</p>
            <div><b>Ban giám hiệu</b><b>Giáo viên chủ nhiệm</b><b>Ban cán sự</b><b>Cờ đỏ</b></div>
          </div>
        </section>

        <section id="san-pham" className="section product-section motion-product">
          <div className="container">
            <div className="section-heading section-heading--product">
              <p className="eyebrow">Một nền tảng, một nguồn dữ liệu</p>
              <h2>Từ việc ghi nhận đến lúc tổng kết.</h2>
              <p>EDP đặt các phần việc theo đúng thứ tự nhà trường cần dùng mỗi ngày.</p>
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
                  <a className="text-link" href="#quy-trinh">Tìm hiểu thêm <Arrow /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="quy-trinh" className="section process-section motion-process">
          <div className="container process-layout">
            <div className="section-heading section-heading--compact">
              <h2>Quy trình rõ ràng cho từng vai trò.</h2>
              <p>Không thay đổi cách trường đang làm. EDP đưa các bước vào cùng một luồng có thể theo dõi.</p>
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
              <div className="evidence-panel-head"><span>Hồ sơ tổng kết</span><b>Đã đối chiếu</b></div>
              <div className="evidence-rows">
                <div><span>Phiếu trực</span><b>Đầy đủ minh chứng</b><i>&#10003;</i></div>
                <div><span>Ký xác nhận</span><b>Đúng vai trò</b><i>&#10003;</i></div>
                <div><span>Tổng kết</span><b>Sẵn sàng khóa</b><i>&#10003;</i></div>
              </div>
              <div className="evidence-lock"><span className="lock-label">Khóa</span><div><b>Khóa dữ liệu theo kỳ</b><p>Giữ nguyên lịch sử sau khi chốt.</p></div></div>
            </div>
            <div className="benefits-copy">
              <p className="eyebrow">Mọi người nhìn cùng một dữ liệu</p>
              <h2>Đối chiếu dễ hơn, ra quyết định chắc hơn.</h2>
              <p>Nhà trường biết kết quả đến từ đâu, ai đã xác nhận và thời điểm nào dữ liệu được khóa.</p>
              <div className="role-grid">
                {roles.map(([role, copy]) => <article key={role}><h3>{role}</h3><p>{copy}</p></article>)}
              </div>
            </div>
          </div>
        </section>

        <section className="section callout-section motion-callout">
          <div className="container callout-inner">
            <div><h2>Đưa quy trình về đúng một nơi.</h2></div>
            <div><p>Chúng tôi cùng nhà trường xác định quy chế, luồng xác nhận và cách triển khai phù hợp.</p><a className="button button-primary" href={CONTACT_EMAIL_HREF}>Đặt lịch tư vấn <Arrow /></a></div>
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
          <div className="footer-column"><h3>Khám phá</h3><a href="#san-pham">Sản phẩm</a><a href="#quy-trinh">Giải pháp</a><a href="#loi-ich">Đối tượng</a><a href="#faq">Hỗ trợ</a></div>
          <div className="footer-column"><h3>Liên hệ</h3><a href={CONTACT_EMAIL_HREF}>{CONTACT_EMAIL}</a><a href={CONTACT_PHONE_HREF}>+84 865 916 475</a><span>EduDiscipline Platform</span></div>
        </div>
        <div className="container footer-bottom"><span>Copyright {new Date().getFullYear()} EduDiscipline Platform</span><span>Bảo mật và điều khoản</span></div>
      </footer>
    </div>
  )
}

export default App
