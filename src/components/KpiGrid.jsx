import KpiCard from "./KpiCard"
import { Users, AlertTriangle, Loader, CheckCircle } from "lucide-react"

function KpiGrid({ data }) {
  return (
    <div className="kpi-grid">
      <KpiCard
        icon={<Users size={24} />}
        title="New Hires"
        value={data.totalEmployees}
        subtitle="Filtered portfolio"
        color="blue"
      />

      <KpiCard
        icon={<AlertTriangle size={24} />}
        title="At Risk"
        value={data.atRisk}
        subtitle="Needs attention"
        color="red"
      />

      <KpiCard
        icon={<Loader size={24} />}
        title="In Progress"
        value={data.inProgress}
        subtitle="Active journeys"
        color="yellow"
      />

      <KpiCard
        icon={<CheckCircle size={24} />}
        title="Completed"
        value={data.completed}
        subtitle="Fully onboarded"
        color="green"
      />
    </div>
  )
}

export default KpiGrid
