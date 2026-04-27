import KpiCard from "./KpiCard"

function KpiGrid({ data, setSelectedStatus, selectedStatus }) {
  return (
    <div className="kpi-grid">
      <KpiCard
  icon="👥"
  title="New Hires"
  value={data.totalEmployees}
  subtitle="Filtered portfolio"
  color="blue"
  onClick={() => setSelectedStatus("All")}
  active={selectedStatus === "All"}
/>

<KpiCard
  icon="⚠️"
  title="At Risk"
  value={data.atRisk}
  subtitle="Needs attention"
  color="red"
  onClick={() => setSelectedStatus("at_risk")}
  active={selectedStatus === "at_risk"}
/>

<KpiCard
  icon="⏱️"
  title="In Progress"
  value={data.inProgress}
  subtitle="Active journeys"
  color="yellow"
  onClick={() => setSelectedStatus("in_progress")}
  active={selectedStatus === "in_progress"}
/>

<KpiCard
  icon="✅"
  title="Completed"
  value={data.completed}
  subtitle="Fully onboarded"
  color="green"
  onClick={() => setSelectedStatus("completed")}
  active={selectedStatus === "completed"}
/>
    </div>
  )
}

export default KpiGrid