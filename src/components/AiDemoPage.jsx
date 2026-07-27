import React, { useEffect, useRef, useState } from 'react'
import { CONTACT_EMAIL_HREF } from '../config/contact'
import '../ai-demo.css'

const sampleRules = [
  { id: 'late', name: 'Trễ', score: -15, keywords: ['đi trễ', 'đi học muộn', 'trễ'] },
  { id: 'badge', name: 'Không bảng tên', score: -5, keywords: ['không bảng tên', 'không đeo thẻ', 'quên thẻ'] },
  { id: 'uniform', name: 'Không đồng phục', score: -5, keywords: ['không đồng phục', 'sai đồng phục'] },
]

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="edp-demo-icon" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m15 18-6-6 6-6" />
      <path d="M9 12h10" />
    </svg>
  )
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="edp-demo-icon" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l1.8 4.7L18.5 9l-4.7 1.3L12 15l-1.8-4.7L5.5 9l4.7-1.3L12 3Z" />
      <path d="m18 15 .9 2.1L21 18l-2.1.9L18 21l-.9-2.1L15 18l2.1-.9L18 15Z" />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="edp-demo-icon" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 3 10 14" />
      <path d="m21 3-7 18-4-7-7-4 18-7Z" />
    </svg>
  )
}

function DashboardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="edp-demo-icon" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 10.5 12 4l8 6.5" />
      <path d="M6.5 9.5V20h11V9.5" />
    </svg>
  )
}

function ScheduleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="edp-demo-icon" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="5" width="16" height="15" rx="3" />
      <path d="M7 3.5v4M17 3.5v4M4 10h16M8 14h3" />
    </svg>
  )
}

function SupportIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="edp-demo-icon" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5.5 18.5 4 21l3.5-1.2A8.5 8.5 0 1 0 3.5 12c0 1.65.47 3.19 1.28 4.5" />
      <path d="M8 11.5h.01M12 11.5h.01M16 11.5h.01" strokeWidth="2.4" />
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="edp-demo-icon" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.12 2.12-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V20.3h-3v-.08A1.7 1.7 0 0 0 10.68 18.66a1.7 1.7 0 0 0-1.88.34l-.06.06-2.12-2.12.06-.06A1.7 1.7 0 0 0 7.02 15a1.7 1.7 0 0 0-1.56-1.03h-.08v-3h.08A1.7 1.7 0 0 0 7.02 9.94a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.12-2.12.06.06a1.7 1.7 0 0 0 1.88.34 1.7 1.7 0 0 0 1.03-1.56V4.64h3v.08a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06L19.8 8l-.06.06a1.7 1.7 0 0 0-.34 1.88 1.7 1.7 0 0 0 1.56 1.03h.08v3h-.08A1.7 1.7 0 0 0 19.4 15Z" />
    </svg>
  )
}

function LogoutIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="edp-demo-icon" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 17l5-5-5-5M15 12H4M20 4v16" />
    </svg>
  )
}

function Brand({ compact = false }) {
  return (
    <a className={`demo-brand ${compact ? 'demo-brand--compact' : ''}`} href="/" aria-label="EduDiscipline Platform, về trang chủ">
      <img src="/assets/logo.png" alt="" />
      <span><b>EduDiscipline</b> Platform</span>
    </a>
  )
}

function DemoHeader() {
  return (
    <header className="demo-header">
      <div className="demo-container demo-header__inner">
        <Brand />
        <div className="demo-header__actions">
          <a className="demo-link" href="/">Về trang giới thiệu</a>
          <a className="demo-button demo-button--primary demo-button--small" href={CONTACT_EMAIL_HREF}>Đặt lịch tư vấn</a>
        </div>
      </div>
    </header>
  )
}

function parseDutyText(value) {
  const normalized = value.trim().toLocaleLowerCase('vi-VN')
  const quantityMatch = normalized.match(/\d+/)
  const quantity = Math.max(1, Math.min(20, Number(quantityMatch?.[0] || 1)))

  return sampleRules.flatMap((rule) => rule.keywords.some((keyword) => normalized.includes(keyword))
    ? [{ id: `${rule.id}-${Date.now()}`, ruleId: rule.id, className: '11A12', quantity, studentName: 'Không', confidence: 0.96 }]
    : [])
}

function CodoBottomNavigation() {
  const items = [
    ['Tổng quan', <DashboardIcon />],
    ['Lịch trực', <ScheduleIcon />],
    ['Hỗ trợ', <SupportIcon />],
    ['Cài đặt', <SettingsIcon />],
    ['Đăng xuất', <LogoutIcon />],
  ]

  return (
    <nav className="edp-codo-bottom-nav" aria-label="Điều hướng chính trong bản demo">
      {items.map(([label, icon], index) => (
        <button type="button" className={index === 0 ? 'is-active' : ''} key={label} tabIndex={-1}>
          <span>{icon}</span>{label}
        </button>
      ))}
    </nav>
  )
}

function EvidencePanel() {
  const [files, setFiles] = useState([])

  return (
    <section className="edp-evidence-panel">
      <div>
        <b>Ảnh minh chứng</b>
        <span>{files.length} ảnh</span>
      </div>
      <label className="edp-evidence-button">
        Thêm ảnh
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(event) => setFiles(Array.from(event.target.files || []).slice(0, 10))}
        />
      </label>
      {files.length ? (
        <p>{files.length} ảnh đã được chọn trong bản minh họa.</p>
      ) : <p>Có thể thêm ảnh minh chứng khi cần.</p>}
    </section>
  )
}

function AssistantIntro() {
  return (
    <div className="edp-chat-row">
      <span className="edp-ai-avatar"><SparkleIcon /></span>
      <div className="edp-chat-bubble edp-chat-bubble--assistant">
        <div className="edp-chat-meta"><b>AI Assistant</b><span>09:12</span></div>
        <p>Xin chào.</p>
        <p>Đây là phiếu trực minh họa của lớp 11A12 trong tuần 2.</p>
        <p>AI có thể gợi ý vi phạm từ mô tả tự nhiên. Ví dụ:</p>
        <ul><li>Đi trễ 2 bạn</li><li>Không bảng tên</li><li>Không đồng phục 3</li></ul>
        <p>Lưu ý:</p>
        <ul>
          <li>Nếu không có số lượng, kết quả gợi ý mặc định là 1.</li>
          <li>Bạn luôn kiểm tra và chỉnh sửa kết quả trước khi lưu vào phiếu trực.</li>
        </ul>
      </div>
    </div>
  )
}

function DutyResultCard({ items, editing, saved, onEdit, onConfirm, onCancel, onChange, onAdd, onDelete }) {
  return (
    <div className="edp-result-card">
      <div className="edp-result-heading">
        <span className="edp-ai-avatar"><SparkleIcon /></span>
        <div><b>AI Assistant</b><span>09:13</span></div>
      </div>
      <div className="edp-result-title">
        <p>Gợi ý ghi nhận.</p>
        {saved ? <span>Đã lưu</span> : null}
      </div>
      <div className="edp-result-divider" />

      {editing ? (
        <div className="edp-result-edit-list">
          {items.map((item) => {
            const rule = sampleRules.find((candidate) => candidate.id === item.ruleId) || sampleRules[0]
            return (
              <div className="edp-result-editor" key={item.id}>
                <button type="button" className="edp-result-delete" onClick={() => onDelete(item.id)} aria-label="Xóa vi phạm">×</button>
                <label><span>Lớp</span><select value={item.className} onChange={(event) => onChange(item.id, { className: event.target.value })}><option>11A2</option><option>11A12</option></select></label>
                <label><span>Vi phạm</span><select value={item.ruleId} onChange={(event) => onChange(item.id, { ruleId: event.target.value })}>{sampleRules.map((candidate) => <option value={candidate.id} key={candidate.id}>{candidate.name}</option>)}</select></label>
                <label><span>Học sinh vi phạm</span><input value={item.studentName} onChange={(event) => onChange(item.id, { studentName: event.target.value })} /></label>
                <div className="edp-result-stepper">
                  <div><span>Số lượng</span><b>{item.quantity}</b></div>
                  <div><button type="button" onClick={() => onChange(item.id, { quantity: Math.max(1, item.quantity - 1) })}>-</button><button type="button" onClick={() => onChange(item.id, { quantity: Math.min(20, item.quantity + 1) })}>+</button></div>
                </div>
                <div className="edp-result-points"><span>Điểm</span><b>{rule.score * item.quantity}</b></div>
                <div className="edp-result-confidence"><span>Trạng thái</span><b>Cần kiểm tra</b></div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="edp-result-summary-list">
          {items.length ? items.map((item) => {
            const rule = sampleRules.find((candidate) => candidate.id === item.ruleId) || sampleRules[0]
            return (
              <React.Fragment key={item.id}>
                <div className="edp-result-summary">
                  <div><b>✓ {rule.name} ×{item.quantity}</b><span>{item.className} • Điểm {rule.score * item.quantity}</span><span>Học sinh: {item.studentName}</span></div>
                  <strong>{rule.score * item.quantity}</strong>
                </div>
                <div className="edp-result-confidence"><span>Trạng thái</span><b>Cần kiểm tra</b></div>
              </React.Fragment>
            )
          }) : <p className="edp-result-empty">Chưa xác định được lỗi phù hợp. Bạn có thể chỉnh sửa hoặc thử lại.</p>}
        </div>
      )}

      <div className={`edp-result-actions ${saved ? 'is-saved' : ''}`}>
        <button type="button" className="edp-result-confirm" onClick={onConfirm} disabled={saved || !items.length}>{saved ? 'Đã lưu' : 'Lưu vào phiếu trực'}</button>
        <button type="button" onClick={onEdit}>{editing ? 'Ẩn' : 'Chỉnh sửa'}</button>
        {!saved ? <button type="button" className="edp-result-cancel" onClick={onCancel}>Hủy</button> : null}
      </div>
      {editing ? <button type="button" className="edp-result-add" onClick={onAdd}>Thêm lỗi</button> : null}
    </div>
  )
}

function CodoDemo({ onSaved }) {
  const [draft, setDraft] = useState('Đi trễ 2 bạn')
  const [messages, setMessages] = useState([])
  const [sending, setSending] = useState(false)
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)
  const scrollRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  useEffect(() => {
    if (!scrollRef.current) return
    scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, sending, editing, saved])

  const send = () => {
    const content = draft.trim()
    if (!content || sending) return
    const parsed = parseDutyText(content)
    setMessages((current) => [...current, { id: `user-${Date.now()}`, type: 'user', content }])
    setDraft('')
    setSending(true)
    setSaved(false)
    timerRef.current = window.setTimeout(() => {
      setMessages((current) => [...current, parsed.length
        ? { id: `result-${Date.now()}`, type: 'result', items: parsed }
        : { id: `assistant-${Date.now()}`, type: 'assistant', content: 'Chưa có gợi ý phù hợp. Bạn có thể nhập lại hoặc kiểm tra thủ công theo quy định của trường.' }])
      setSending(false)
    }, 760)
  }

  const updateResult = (messageId, itemId, patch) => setMessages((current) => current.map((message) => message.id !== messageId
    ? message
    : { ...message, items: message.items.map((item) => item.id === itemId ? { ...item, ...patch } : item) }))

  const addViolation = (messageId) => setMessages((current) => current.map((message) => message.id !== messageId
    ? message
    : { ...message, items: [...message.items, { id: `badge-${Date.now()}`, ruleId: 'badge', className: '11A12', quantity: 1, studentName: 'Không', confidence: 0.96 }] }))

  const deleteViolation = (messageId, itemId) => setMessages((current) => current.map((message) => message.id !== messageId
    ? message
    : { ...message, items: message.items.filter((item) => item.id !== itemId) }))

  const cancelResult = (messageId) => {
    setMessages((current) => current.filter((message) => message.id !== messageId))
    setEditing(false)
    setSaved(false)
    setDraft('Đi trễ 2 bạn')
  }

  return (
    <div className="edp-codo-shell" aria-label="Giao diện AI Assistant dành cho Cờ đỏ">
      <div className="edp-codo-header">
        <div className="edp-glass-panel">
          <button type="button" aria-label="Quay lại phiếu trực"><BackIcon /></button>
          <b>AI Assistant</b>
        </div>
      </div>

      <div className="edp-codo-scroll" ref={scrollRef}>
        <EvidencePanel />
        <AssistantIntro />
        {messages.map((message) => message.type === 'user' ? (
          <div className="edp-chat-row edp-chat-row--user" key={message.id}>
            <div className="edp-chat-bubble edp-chat-bubble--user"><span>09:13</span><p>{message.content}</p></div>
          </div>
        ) : message.type === 'assistant' ? (
          <div className="edp-chat-row" key={message.id}>
            <span className="edp-ai-avatar"><SparkleIcon /></span>
            <div className="edp-chat-bubble edp-chat-bubble--assistant"><div className="edp-chat-meta"><b>Assistant</b><span>09:13</span></div><p>{message.content}</p></div>
          </div>
        ) : (
          <DutyResultCard
            key={message.id}
            items={message.items}
            editing={editing}
            saved={saved}
            onEdit={() => setEditing((value) => !value)}
            onConfirm={() => { setSaved(true); setEditing(false); onSaved(message.items.map((item) => ({ ...item }))) }}
            onCancel={() => cancelResult(message.id)}
            onChange={(itemId, patch) => updateResult(message.id, itemId, patch)}
            onAdd={() => addViolation(message.id)}
            onDelete={(itemId) => deleteViolation(message.id, itemId)}
          />
        ))}
        {sending ? (
          <div className="edp-thinking"><span className="edp-ai-avatar"><SparkleIcon /></span><div><i /><i /><i /></div></div>
        ) : null}
      </div>

      <div className="edp-codo-composer">
        <div className="edp-glass-panel">
          <label><span className="sr-only">Nhập nội dung vi phạm</span><textarea rows="1" value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); send() } }} placeholder="Ví dụ: Đi trễ 2 bạn" /></label>
          <button type="button" onClick={send} disabled={!draft.trim() || sending} aria-label="Gửi tin nhắn"><SendIcon /></button>
        </div>
      </div>
      <CodoBottomNavigation />
    </div>
  )
}

function GvcnNavbar() {
  return (
    <header className="edp-gvcn-navbar">
      <div><Brand compact /><nav><b>Tổng quan</b><span>Cài đặt</span><span>Lịch trực</span><span>Hỗ trợ</span></nav><button type="button">Đăng xuất</button></div>
    </header>
  )
}

function getGvcnMetrics(savedItems) {
  const addedCount = savedItems.reduce((sum, item) => sum + item.quantity, 0)
  const addedDeduction = Math.abs(savedItems.reduce((sum, item) => {
    const rule = sampleRules.find((candidate) => candidate.id === item.ruleId)
    return sum + (rule?.score || 0) * item.quantity
  }, 0))
  const deduction = 20 + addedDeduction

  return { addedCount, addedDeduction, deduction, total: 120 - deduction, violationCount: 4 + addedCount }
}

function GvcnDashboardSample({ onOpenReport, savedItems }) {
  const metrics = getGvcnMetrics(savedItems)

  return (
    <div className="edp-gvcn-dashboard">
      <section className="edp-gvcn-welcome">
        <span>Xin chào thầy/cô</span><h3>Lớp 11A12</h3>
        <div><p><span>Điểm cơ sở</span><b>120</b></p><p><span>Điểm trừ</span><b>-{metrics.deduction}</b></p><p><span>Tổng điểm tuần</span><b>{metrics.total >= 0 ? '+' : ''}{metrics.total}</b></p></div>
      </section>
      <section className="edp-period-selector">
        <b>Chọn thời gian</b><span>Năm học 2026-2027</span>
        <label>Học kỳ<select defaultValue="1"><option value="1">Học kỳ I</option></select></label>
        <label>Tháng<select defaultValue="09"><option value="09">09/2026</option></select></label>
        <label>Tuần<select defaultValue="2"><option value="2">Tuần 2 (25/07/2026 - 31/07/2026)</option></select></label>
      </section>
      <button className="edp-absence-button" type="button">Minh chứng nghỉ học</button>
      <section className="edp-week-ticket">
        <div><b>Phiếu trong tuần</b><span>1 phiếu</span></div>
        <button type="button"><div><b>CN 26/07/2026: 11A2 trực</b><span>Tổng điểm: <em>-{metrics.deduction}</em> | Vi phạm: -{metrics.deduction} | Điểm cộng: <strong>+0</strong></span></div><i>Nháp</i></button>
      </section>
      <section className="edp-week-summary-card">
        <div><b>Tổng kết tuần</b><i>Dữ liệu minh họa</i></div><span>Kết quả được tính từ dữ liệu minh họa hiện tại.</span>
        <div className="edp-week-score-row"><p><span>Điểm cơ sở</span><b>120</b></p><p><span>Điểm trừ</span><b>-{metrics.deduction}</b></p><p><span>Tổng điểm tuần</span><b>{metrics.total >= 0 ? '+' : ''}{metrics.total}</b></p></div>
      </section>
      <button className="edp-gvcn-ai-fab" type="button" onClick={onOpenReport} aria-label="Mở phân tích nề nếp bằng AI"><SparkleIcon /><span>AI</span></button>
    </div>
  )
}

function GvcnReportContent({ savedItems }) {
  const metrics = getGvcnMetrics(savedItems)
  const savedSummary = savedItems.map((item) => {
    const rule = sampleRules.find((candidate) => candidate.id === item.ruleId) || sampleRules[0]
    return `${rule.name}: ${item.quantity} lượt, ${rule.score * item.quantity} điểm`
  }).join('; ')

  return (
    <div className="edp-report-markdown">
      <h3>Tổng kết tuần</h3>
      <p>Trong dữ liệu minh họa của tuần 2, lớp 11A12 có {metrics.violationCount} lượt vi phạm với tổng điểm trừ {metrics.deduction}. Phiếu trực minh họa vẫn ở trạng thái nháp và chưa ký xác nhận.</p>
      <h3>Tổng quan</h3>
      <ul><li><b>Điểm số:</b> {metrics.total}/120 (điểm cơ sở 120, trừ {metrics.deduction} điểm vi phạm).</li><li><b>Xếp hạng:</b> Chỉ là thông tin minh họa, không phải kết quả xếp hạng thực tế.</li><li><b>Trạng thái phiếu:</b> 1 phiếu nháp, 0 phiếu đã ký.</li><li><b>Số lượng vi phạm:</b> {metrics.violationCount} lượt trong dữ liệu minh họa.</li><li><b>Loại vi phạm:</b> Ghi nhận nề nếp{savedItems.length ? ' và gợi ý mới từ AI' : ''}.</li></ul>
      <h3>Các vi phạm nổi bật</h3>
      <ul><li><b>Ghi nhận theo quy định:</b> 4 lượt, tác động -20 điểm.</li>{savedItems.length ? <li><b>Gợi ý mới:</b> {savedSummary}.</li> : null}<li>Ghi chú: Cần đối chiếu thông tin học sinh trước khi lưu.</li></ul>
      <h3>Học sinh cần quan tâm</h3>
      <p>Dữ liệu minh họa chưa đủ để xác định trường hợp cần theo dõi. Trong thực tế, thông tin cần được đối chiếu trên phiếu trực.</p>
      <h3>Xu hướng</h3>
      <p>Không sử dụng dữ liệu tuần trước trong bản minh họa này. Phiếu trực vẫn là bản nháp nên kết quả chưa được chốt.</p>
      <h3>Đề xuất</h3>
      <ul><li>Kiểm tra và ký xác nhận phiếu trực khi dữ liệu đã đầy đủ.</li><li>Đối chiếu thông tin học sinh và quy định trước khi lưu.</li><li>Rà soát kết quả trước kỳ tổng kết.</li></ul>
      <h3>Nhận xét dành cho GVCN</h3>
      <p>GVCN có thể dùng phần tổng hợp để xem phiếu trực, theo dõi điểm thi đua và trao đổi với lớp khi cần.</p>
    </div>
  )
}

function GvcnReportModal({ loading, onClose, onRegenerate, savedItems }) {
  return (
    <div className="edp-report-overlay">
      <section className="edp-report-modal" role="dialog" aria-modal="true" aria-labelledby="gvcn-report-title">
        <button className="edp-report-close" type="button" onClick={onClose} aria-label="Đóng">×</button>
        <header><span><SparkleIcon /></span><div><h2 id="gvcn-report-title">AI hỗ trợ tổng hợp nề nếp</h2><p>Báo cáo minh họa tuần 2</p></div></header>
        <div className="edp-report-body">
          {loading ? <div className="edp-report-loading" role="status"><i /><b>AI đang tổng hợp dữ liệu nề nếp</b><p>Kết quả cần được người dùng kiểm tra trước khi sử dụng.</p></div> : <GvcnReportContent savedItems={savedItems} />}
        </div>
        {!loading ? <footer><p>Dữ liệu mô phỏng phục vụ minh họa</p><button type="button" onClick={onRegenerate}>Phân tích lại</button></footer> : null}
      </section>
    </div>
  )
}

function GvcnDemo({ savedItems }) {
  const [reportOpen, setReportOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  const openReport = () => {
    setReportOpen(true)
    setLoading(true)
    timerRef.current = window.setTimeout(() => setLoading(false), 780)
  }

  return (
    <div className="edp-gvcn-app" aria-label="Giao diện phân tích nề nếp dành cho Giáo viên chủ nhiệm">
      <GvcnNavbar />
      <GvcnDashboardSample onOpenReport={openReport} savedItems={savedItems} />
      {reportOpen ? <GvcnReportModal loading={loading} onClose={() => setReportOpen(false)} onRegenerate={openReport} savedItems={savedItems} /> : null}
    </div>
  )
}

export default function AiDemoPage() {
  const [activeRole, setActiveRole] = useState('codo')
  const [savedItems, setSavedItems] = useState([])
  const savedCount = savedItems.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Minh họa AI | EduDiscipline Platform'
    return () => { document.title = previousTitle }
  }, [])

  return (
    <div className="ai-demo-page">
      <a className="demo-skip-link" href="#demo-workspace">Bỏ qua đến trải nghiệm</a>
      <DemoHeader />
      <main>
        <section className="demo-hero">
          <div className="demo-container demo-hero__inner">
            <span className="demo-kicker">Minh họa tương tác từ EDP</span>
            <h1>Khám phá cách AI hỗ trợ quy trình nề nếp.</h1>
            <p>Hai tình huống dùng dữ liệu mô phỏng: gợi ý ghi nhận cho Cờ đỏ và tổng hợp tuần cho giáo viên chủ nhiệm.</p>
          </div>
        </section>

        <section className="demo-experience" id="demo-workspace">
          <div className="demo-container">
            <div className="demo-role-switcher" role="tablist" aria-label="Chọn vai trò trải nghiệm">
              <button type="button" role="tab" aria-selected={activeRole === 'codo'} className={activeRole === 'codo' ? 'is-active' : ''} onClick={() => setActiveRole('codo')}><b>Cờ đỏ</b><span>AI Assistant</span></button>
              <button type="button" role="tab" aria-selected={activeRole === 'gvcn'} className={activeRole === 'gvcn' ? 'is-active' : ''} onClick={() => setActiveRole('gvcn')}><b>Giáo viên chủ nhiệm</b><span>Phân tích nề nếp</span>{savedCount ? <i>{savedCount}</i> : null}</button>
            </div>

            <div className="demo-disclosure"><b>Dữ liệu mô phỏng</b><span>Bản minh họa thể hiện cách AI hỗ trợ ghi nhận và tổng hợp; kết quả thực tế luôn cần được người dùng kiểm tra.</span></div>

            <div className={`demo-product-stage demo-product-stage--${activeRole}`}>
              {activeRole === 'codo' ? <CodoDemo onSaved={setSavedItems} /> : <GvcnDemo savedItems={savedItems} />}
            </div>
          </div>
        </section>

        <section className="demo-closing">
          <div className="demo-container demo-closing__inner"><div><h2>Muốn thử với quy chế của trường?</h2><p>EDP có thể cấu hình danh mục lỗi, điểm và luồng xác nhận theo quy chế đang áp dụng.</p></div><a className="demo-button demo-button--primary" href={CONTACT_EMAIL_HREF}>Đặt lịch tư vấn</a></div>
        </section>
      </main>
      <footer className="demo-footer"><div className="demo-container"><Brand compact /><span>© {new Date().getFullYear()} EduDiscipline Platform</span></div></footer>
    </div>
  )
}
