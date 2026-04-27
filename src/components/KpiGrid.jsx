import KpiCard from "./KpiCard"
import { Users, AlertTriangle, Loader, CheckCircle } from "lucide-react"

function KpiGrid({ data, setSelectedStatus }) {
  return (
    <div className="kpi-grid">
      <KpiCard
        icon={<Users size={24} />}
        title="New Hires"
        value={data.totalEmployees}
        subtitle="Filtered portfolio"
        color="blue"
        onClick={() => setSelectedStatus("All")}
      />

      <KpiCard
        icon={<AlertTriangle size={24} />}
        title="At Risk"
        value={data.atRisk}
        subtitle="Needs attention"
        color="red"
        onClick={() => setSelectedStatus("at_risk")}
      />

      <KpiCard
        icon={<Loader size={24} />}
        title="In Progress"
        value={data.inProgress}
        subtitle="Active journeys"
        color="yellow"
        onClick={() => setSelectedStatus("in_progress")}
      />

      <KpiCard
        icon={<CheckCircle size={24} />}
        title="Completed"
        value={data.completed}
        subtitle="Fully onboarded"
        color="green"
        onClick={() => setSelectedStatus("completed")}
      />
    </div>
  )
}

export default KpiGrid