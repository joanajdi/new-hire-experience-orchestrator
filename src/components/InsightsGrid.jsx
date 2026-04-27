import InsightCard from "./InsightCard"

function InsightsGrid({ insights }) {
  return (
    <div className="insights-grid">
      <InsightCard
        icon="⚑"
        title="Total Frictions"
        value={insights.totalFrictions}
        subtitle="Detected issues"
        trend="↑ 16% vs prev. 30d"
        iconColor="purple"
        trendColor="purple-trend"
      />

      <InsightCard
        icon="◔"
        title="Avg Completion Rate"
        value={`${insights.avgCompletion}%`}
        subtitle="Portfolio average"
        trend="↑ 8% vs prev. 30d"
        iconColor="green"
        trendColor="green-trend"
      />

      <InsightCard
        icon="⬡"
        title="At-Risk Rate"
        value={`${insights.atRiskRate}%`}
        subtitle="Risk exposure"
        trend="↑ 12% vs prev. 30d"
        iconColor="red"
        trendColor="red-trend"
      />

      <InsightCard
        icon="▥"
        title="Most At-Risk Dept"
        value={insights.topDepartment}
        subtitle="Priority area"
        trend="High exposure"
        iconColor="blue"
        trendColor="red-trend"
      />
    </div>
  )
}

export default InsightsGrid