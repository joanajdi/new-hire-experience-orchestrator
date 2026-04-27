import { useState } from "react"
import "./App.css"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import SectionTitle from "./components/SectionTitle"
import RootCauseDiagnosis from "./components/RootCauseDiagnosis"
import Topbar from "./components/Topbar"
import KpiGrid from "./components/KpiGrid"
import InsightsGrid from "./components/InsightsGrid"
import onboardingData from "./data/onboardingData.json"
import EmployeeTable from "./components/EmployeeTable"
import EmployeeDetail from "./components/EmployeeDetail"
import DepartmentChart from "./components/DepartmentChart"

function App() {

const [selectedDepartment, setSelectedDepartment] = useState("All")
const [selectedStatus, setSelectedStatus] = useState("All")
const [selectedManager, setSelectedManager] = useState("All")
const [selectedEmployee, setSelectedEmployee] = useState(null)

const departments = [
  "All",
  ...new Set(onboardingData.map(emp => emp.department.trim()))
]

const managers = [
  "All",
  ...new Set(onboardingData.map(emp => emp.manager))
]

const filteredData = onboardingData.filter(emp => {
  const departmentMatch =
  selectedDepartment === "All" || emp.department.trim() === selectedDepartment

  const statusMatch =
    selectedStatus === "All" ||
    emp.progress_summary.overall_status === selectedStatus

  const managerMatch =
    selectedManager === "All" || emp.manager === selectedManager

  return departmentMatch && statusMatch && managerMatch
})

const totalEmployees = filteredData.length

const atRisk = filteredData.filter(
  emp => emp.progress_summary.overall_status === "at_risk"
).length

const inProgress = filteredData.filter(
  emp => emp.progress_summary.overall_status === "in_progress"
).length

const completed = filteredData.filter(
  emp => emp.progress_summary.overall_status === "completed"
).length

const totalFrictions = filteredData.reduce(
  (sum, emp) => sum + emp.friction_report.friction_count,
  0
)

const avgCompletion =
  filteredData.length > 0
    ? filteredData.reduce(
        (sum, emp) => sum + emp.progress_summary.completion_rate,
        0
      ) / filteredData.length
    : 0

const atRiskRate =
  totalEmployees > 0 ? Math.round((atRisk / totalEmployees) * 100) : 0

const departmentRiskMap = {}

filteredData.forEach(emp => {
  const dept = emp.department
  if (!departmentRiskMap[dept]) departmentRiskMap[dept] = 0
  if (emp.progress_summary.overall_status === "at_risk") {
    departmentRiskMap[dept]++
  }
})

const topDepartment =
  Object.keys(departmentRiskMap).length > 0
    ? Object.keys(departmentRiskMap).reduce((a, b) =>
        departmentRiskMap[a] > departmentRiskMap[b] ? a : b
      )
    : "N/A"

  return (
    <div className="app">

<Sidebar
  departments={departments}
  selectedDepartment={selectedDepartment}
  setSelectedDepartment={setSelectedDepartment}
  selectedStatus={selectedStatus}
  setSelectedStatus={setSelectedStatus}
  managers={managers}
  selectedManager={selectedManager}
  setSelectedManager={setSelectedManager}
/>

      <main className="main">
        <Topbar />

        <Header />

        <div className="content">
          <h2>Company-wide Onboarding Overview</h2>

<KpiGrid
  data={{
    totalEmployees,
    atRisk,
    inProgress,
    completed
  }}
  setSelectedStatus={setSelectedStatus}
  selectedStatus={selectedStatus}
/>

          <SectionTitle title="Company Insights" linkText="View all insights" />

<InsightsGrid
  insights={{
    totalFrictions,
    avgCompletion: avgCompletion.toFixed(2),
    atRiskRate,
    topDepartment
  }}
/>

<SectionTitle title="Department Risk Distribution" linkText="View department analysis" />

<DepartmentChart data={filteredData} />

          <SectionTitle title="Root Cause Diagnosis" linkText="View full analysis" />

          <RootCauseDiagnosis />
          <SectionTitle title="Onboarding Portfolio" linkText="View employee details" />

<EmployeeDetail employee={selectedEmployee} />

<EmployeeTable
  employees={filteredData}
  selectedEmployee={selectedEmployee}
  setSelectedEmployee={setSelectedEmployee}
/>
        </div>
      </main>
    </div>
  )
}

export default App