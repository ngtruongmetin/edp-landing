import React from 'react'
import ArrowIcon from './ArrowIcon'

const features = [
  ['01', 'Phiếu trực điện tử', 'Ghi nhận nề nếp, vi phạm, minh chứng và điểm cộng trừ theo đúng danh mục lỗi.', 'PT'],
  ['02', 'Quy chế và thang điểm', 'Thiết lập năm học, học kỳ, tuần, lớp, lỗi vi phạm và cách tính điểm riêng của trường.', 'QC'],
  ['03', 'Ký xác nhận và khóa', 'Mỗi bước đối chiếu có trạng thái, người thực hiện và lịch sử trước khi khóa dữ liệu.', 'KX'],
  ['04', 'Tổng kết và báo cáo', 'Tự động tổng hợp, xếp hạng và xuất báo cáo theo tuần, tháng, học kỳ hoặc năm học.', 'TK'],
]

export default function Features() {
  return (
    <div className="module-grid">
      {features.map(([number, title, description, code], index) => (
        <article className={`module-card module-${index + 1}`} key={title}>
          <div className="module-top">
            <span>{number}</span>
            <i>{code}</i>
          </div>
          <div>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
          <a className="arrow-bearing" href="#workflow" aria-label={`Tìm hiểu ${title}`}>
            Xem trong quy trình <ArrowIcon />
          </a>
        </article>
      ))}
    </div>
  )
}
