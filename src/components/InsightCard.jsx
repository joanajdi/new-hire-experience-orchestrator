function InsightCard({ icon, title, value, subtitle, trend, iconColor, trendColor }) {
  return (
    <div className="insight-card">
      <div className={`insight-icon ${iconColor}`}>{icon}</div>
      <div>
        <p>{title}</p>
        <h3>{value}</h3>
        <span>{subtitle}</span>
        <div className={`trend ${trendColor}`}>{trend}</div>
      </div>
    </div>
  )
}

export default InsightCard