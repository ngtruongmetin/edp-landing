import React from 'react'
import { CONTACT_EMAIL_HREF } from '../config/contact'
import ArrowIcon from './ArrowIcon'

export default function Pricing() {
  return (
    <section className="pricing-stack" aria-labelledby="pricing-main">
      <div className="plan-card">
        <div>
          <p className="section-label">Cấu hình theo nhà trường</p>
          <h2 id="pricing-main">Không áp một mẫu chung lên mọi trường.</h2>
          <p>EDP được cấu hình theo năm học, học kỳ, lớp, quy chế, danh mục lỗi, vai trò xác nhận và chu kỳ khóa dữ liệu của từng trường.</p>
        </div>
        <div className="plan-details">
          <span><i /> Thiết lập thời gian năm học</span>
          <span><i /> Cấu hình quy chế và thang điểm</span>
          <span><i /> Phân quyền theo từng vai trò</span>
          <span><i /> Khóa dữ liệu theo chu kỳ</span>
          <a className="button button-primary arrow-bearing" href={CONTACT_EMAIL_HREF}>Trao đổi về cấu hình <ArrowIcon /></a>
        </div>
      </div>
    </section>
  )
}
