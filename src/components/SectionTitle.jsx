function SectionTitle({ title, linkText }) {
  return (
    <div className="section-title">
      <h2>{title}</h2>
      {linkText && <a href="#">{linkText} →</a>}
    </div>
  )
}

export default SectionTitle