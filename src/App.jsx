import React, { useEffect, useRef, useState } from 'react'
import Hero from './components/Hero'
import Features from './components/Features'
import Pricing from './components/Pricing'
import Footer from './components/Footer'
import ArrowIcon from './components/ArrowIcon'
import { CONTACT_EMAIL_HREF, CONTACT_PHONE_HREF } from './config/contact'

const workflowSteps = [
  ['01', 'Cờ đỏ ghi nhận', 'Ghi nhận nề nếp và vi phạm ngay tại lớp theo danh mục lỗi của nhà trường.', 'Đầu vào'],
  ['02', 'Lập phiếu trực', 'Phiếu trực điện tử gom minh chứng, nội dung, điểm cộng trừ và người thực hiện.', 'Chứng từ'],
  ['03', 'Ký xác nhận', 'Ban cán sự, giáo viên chủ nhiệm hoặc vai trò liên quan đối chiếu trước khi chốt.', 'Trách nhiệm'],
  ['04', 'Tổng kết theo kỳ', 'Hệ thống tổng hợp tuần, tháng, học kỳ hoặc năm học theo quy chế đã cấu hình.', 'Tính điểm'],
  ['05', 'Khóa dữ liệu', 'Kết quả sau rà soát được khóa để giữ nguyên lịch sử và tránh chỉnh sửa tùy tiện.', 'Niêm phong'],
  ['06', 'Xếp hạng minh bạch', 'Nhà trường xem kết quả, xuất báo cáo và đối chiếu được nguồn dữ liệu.', 'Kết quả'],
]

const governancePoints = [
  ['Quy chế là gốc', 'Danh mục lỗi, thang điểm, mốc thời gian và quyền xác nhận đi theo quy định của từng trường.'],
  ['Mỗi bước có người chịu trách nhiệm', 'Phiếu trực, chữ ký, trạng thái tổng kết và lịch sử chỉnh sửa đều có dấu vết.'],
  ['Kết quả chỉ đáng tin khi dữ liệu đã khóa', 'EDP đặt trọng tâm vào chốt dữ liệu theo chu kỳ trước khi hiển thị xếp hạng.'],
]

const roleCards = [
  ['Ban giám hiệu', 'Theo dõi nhịp vận hành toàn trường và đối chiếu kết quả theo tuần, tháng, học kỳ.'],
  ['Giáo viên chủ nhiệm', 'Xem tình hình lớp, kiểm tra phiếu trực và nắm lịch sử vi phạm trước khi trao đổi với học sinh.'],
  ['Cờ đỏ', 'Nhập phiếu trực nhanh, rõ tiêu chí và giảm sai sót khi ghi nhận nề nếp hằng ngày.'],
  ['Ban cán sự', 'Phối hợp xác nhận thông tin, theo dõi điểm thi đua và phản hồi khi cần đối chiếu.'],
]

const faqs = [
  ['EDP có buộc trường thay đổi quy chế không?', 'Không. Hệ thống được cấu hình theo quy chế, danh mục lỗi, thang điểm và luồng xác nhận mà trường đang vận hành.'],
  ['Khóa dữ liệu có ý nghĩa gì?', 'Khi một kỳ đã được rà soát và khóa, dữ liệu không bị chỉnh sửa tùy tiện. Lịch sử xử lý vẫn được lưu để truy vết.'],
  ['Dashboard nằm ở đâu trong sản phẩm?', 'Dashboard là lớp xem kết quả sau khi quy trình đã chạy đúng: phiếu trực đã có, xác nhận đã xong, tổng kết đã được chốt.'],
  ['Có dùng được trên điện thoại không?', 'Có. Trải nghiệm được ưu tiên cho thao tác đơn giản, rõ ràng và phù hợp với người dùng không chuyên kỹ thuật.'],
]

function Reveal({ children, className = '', variant = 'rise' }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (!ref.current || typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return undefined
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setShown(true)
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' })

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref} className={`reveal reveal-${variant} ${shown ? 'is-shown' : ''} ${className}`}>{children}</div>
}

function EvidenceBoard() {
  return (
    <div className="evidence-board" aria-label="Minh họa hồ sơ dữ liệu có xác nhận và khóa">
      <div className="evidence-header">
        <span>Hồ sơ tuần 14</span>
        <b>Đã đối chiếu</b>
      </div>
      <div className="evidence-lines">
        <div><span>Phiếu trực</span><b>36 phiếu</b><i /></div>
        <div><span>Ký xác nhận</span><b>Đủ vai trò</b><i /></div>
        <div><span>Tổng kết</span><b>Sẵn sàng khóa</b><i /></div>
      </div>
      <div className="evidence-lock">
        <span>Khóa dữ liệu</span>
        <strong>Không sửa sau khi chốt</strong>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="app-root">
      <a className="skip-link" href="#main">Bỏ qua đến nội dung</a>
      <Hero />
      <main id="main">
        <section className="trust-strip" aria-label="Các vai trò sử dụng EduDiscipline Platform">
          <div className="container trust-inner">
            <span>Xây dựng cho nhịp vận hành thật của trường THPT</span>
            <div><b>Ban giám hiệu</b><b>Giáo viên chủ nhiệm</b><b>Ban cán sự</b><b>Cờ đỏ</b><b>Quản trị viên</b></div>
          </div>
        </section>

        <section className="section intro-section">
          <div className="container intro-grid">
            <Reveal>
              <p className="section-label">01 / Tư duy sản phẩm</p>
              <h2 className="display-title">EDP bán một quy trình đáng tin, không bán một màn hình tổng quan.</h2>
            </Reveal>
            <Reveal variant="slide">
              <p className="intro-copy">
                Điểm thi đua chỉ có giá trị khi nhà trường biết nó đến từ phiếu nào, ai đã xác nhận,
                kỳ nào đã tổng kết và thời điểm nào dữ liệu được khóa. Vì vậy landing mới bắt đầu bằng
                luồng nghiệp vụ, rồi mới nói đến báo cáo.
              </p>
              <a className="text-link arrow-bearing" href="#workflow">Xem luồng nghiệp vụ <ArrowIcon /></a>
            </Reveal>
          </div>
        </section>

        <section id="benefits" className="section modules-section">
          <div className="container">
            <Reveal>
              <div className="section-topline">
                <div>
                  <p className="section-label">02 / Nền tảng vận hành</p>
                  <h2 className="section-heading-large">Các phân hệ được đặt quanh quy trình.</h2>
                </div>
                <p>Không tách rời thành các tính năng rời rạc. Mỗi phân hệ phục vụ một bước trong chuỗi ghi nhận, đối chiếu, tổng kết và khóa dữ liệu.</p>
              </div>
            </Reveal>
            <Features />
          </div>
        </section>

        <section id="workflow" className="section workflow-section">
          <div className="container">
            <Reveal>
              <div className="section-topline">
                <div>
                  <p className="section-label">03 / Quy trình chính</p>
                  <h2 className="section-heading-large">Từ Cờ đỏ đến xếp hạng, không mất dấu ở giữa.</h2>
                </div>
                <p>Luồng này là câu chuyện chính của sản phẩm. Người xem có thể hiểu EDP làm gì trong vài giây đầu tiên.</p>
              </div>
            </Reveal>
            <div className="workflow-list">
              {workflowSteps.map(([number, title, description, tag], index) => (
                <Reveal key={number} variant={index % 2 ? 'slide' : 'rise'}>
                  <article className="workflow-card">
                    <span className="workflow-number">{number}</span>
                    <span className="workflow-tag">{tag}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{description}</p>
                    </div>
                    {index < workflowSteps.length - 1 && <ArrowIcon className="workflow-arrow" />}
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section governance-section">
          <div className="container governance-grid">
            <Reveal>
              <div>
                <p className="section-label">04 / Minh bạch vận hành</p>
                <h2 className="display-title">Mỗi kết quả đều cần hồ sơ đi kèm.</h2>
                <p className="section-copy">EDP giúp nhà trường chuyển quy trình giấy tờ thành dữ liệu có cấu trúc, nhưng vẫn giữ logic quen thuộc: có phiếu, có xác nhận, có tổng kết và có khóa.</p>
              </div>
            </Reveal>
            <Reveal variant="scale">
              <EvidenceBoard />
            </Reveal>
          </div>
          <div className="container governance-points">
            {governancePoints.map(([title, description]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section roles-section">
          <div className="container">
            <Reveal>
              <div className="section-topline">
                <div>
                  <p className="section-label">05 / Theo vai trò nhà trường</p>
                  <h2 className="section-heading-large">Ai làm phần đó, thấy phần đó.</h2>
                </div>
                <p>Trang không hứa hẹn “AI magic”. Nó làm rõ trách nhiệm của từng vai trò trong một quy trình giáo dục có kiểm soát.</p>
              </div>
            </Reveal>
            <div className="role-grid">
              {roleCards.map(([title, description]) => (
                <article key={title}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="implementation" className="section implementation-section">
          <div className="container implementation-grid-new">
            <Reveal>
              <p className="section-label">06 / Cấu hình theo trường</p>
              <h2 className="section-heading-large">Tôn trọng cách trường đang vận hành.</h2>
              <p className="section-copy">EduDiscipline Platform không thay thế quy chế của nhà trường. Hệ thống đưa quy định, khung thời gian và phân quyền vào một luồng số hóa rõ ràng.</p>
              <a className="text-link arrow-bearing" href={CONTACT_EMAIL_HREF}>Trao đổi về cấu hình <ArrowIcon /></a>
            </Reveal>
            <Reveal variant="slide">
              <div className="deployment-steps">
                <div><span>01</span><b>Xác lập thời gian</b><p>Năm học, học kỳ, tháng và tuần.</p></div>
                <div><span>02</span><b>Cấu hình quy chế</b><p>Danh mục lỗi, điểm cộng trừ và quy định.</p></div>
                <div><span>03</span><b>Phân quyền vận hành</b><p>Đúng vai trò, đúng phạm vi dữ liệu.</p></div>
                <div><span>04</span><b>Chốt chu kỳ</b><p>Rà soát, tổng kết, khóa và xuất báo cáo.</p></div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section pricing-section">
          <div className="container"><Pricing /></div>
        </section>

        <section className="section faq-section" id="faq">
          <div className="container faq-layout">
            <Reveal>
              <div>
                <p className="section-label">07 / Câu hỏi thường gặp</p>
                <h2 className="section-heading-large">Rõ trước khi triển khai.</h2>
              </div>
            </Reveal>
            <div className="faq-list">
              {faqs.map(([question, answer]) => (
                <details key={question}>
                  <summary>{question}<span>+</span></summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section final-cta">
          <div className="container final-cta-inner">
            <div>
              <p className="section-label">Bắt đầu từ quy trình hiện có</p>
              <h2 className="display-title">Đưa nề nếp học đường vào một luồng có thể kiểm chứng.</h2>
            </div>
            <div>
              <p>Chia sẻ cách trường đang ghi nhận, xác nhận và tổng hợp thi đua. Chúng tôi sẽ cùng bạn phác thảo cấu hình phù hợp.</p>
              <div className="cta-actions">
                <a className="button button-primary arrow-bearing" href={CONTACT_EMAIL_HREF}>Đặt lịch tư vấn <ArrowIcon /></a>
                <a className="button button-secondary arrow-bearing" href={CONTACT_PHONE_HREF}>Gọi tư vấn <ArrowIcon /></a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default App
