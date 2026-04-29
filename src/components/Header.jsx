function Header({ title, subtitle, actions }) {
  return (
    <div className="header">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      {actions && <div className="header-actions">{actions}</div>}
    </div>
  )
}

export default Header
