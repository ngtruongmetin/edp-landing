import React from 'react'

export default function ArrowIcon({ direction = 'right', className = '' }) {
  return (
    <span className={`brand-arrow brand-arrow-${direction} ${className}`} aria-hidden="true">
      <span className="brand-arrow-mark" />
      <span className="brand-arrow-line" />
      <span className="brand-arrow-head" />
    </span>
  )
}
