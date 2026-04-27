function KpiCard({ icon, title, value, subtitle, color, onClick }) {
  return (
    <div className="kpi-card" onClick={onClick}>
      <div className="kpi-top">
        <div className={`kpi-icon ${color}`}>
          {icon}
        </div>

        <div className="kpi-text">
          <p>{title}</p>
          <h3>{value}</h3>
          <span>{subtitle}</span>
        </div>
      </div>

      <div className={`sparkline ${color}-line`}></div>
    </div>
  )
}

export default KpiCard