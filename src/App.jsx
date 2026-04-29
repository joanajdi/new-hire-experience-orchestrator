import { useEffect, useRef, useState } from "react"
import { Filter, Menu, X } from "lucide-react"
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
  const [activePage, setActivePage] = useState("overview")
  const [selectedDepartment, setSelectedDepartment] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [selectedManager, setSelectedManager] = useState("All")
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [showMobileNav, setShowMobileNav] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const portfolioRef = useRef(null)

  const departments = [
    "All",
    ...new Set(onboardingData.map((emp) => emp.department.trim()))
  ]

  const managers = [
    "All",
    ...new Set(onboardingData.map((emp) => emp.manager))
  ]

  const filteredData = onboardingData.filter((emp) => {
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
    (emp) => emp.progress_summary.overall_status === "at_risk"
  ).length

  const inProgress = filteredData.filter(
    (emp) => emp.progress_summary.overall_status === "in_progress"
  ).length

  const completed = filteredData.filter(
    (emp) => emp.progress_summary.overall_status === "completed"
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

  filteredData.forEach((emp) => {
    const dept = emp.department.trim()

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

  const pageCopy = {
    overview: {
      title: "New Hire Experience Orchestrator",
      subtitle: "Company-wide onboarding KPIs, trends and portfolio health"
    },
    portfolio: {
      title: "Onboarding Portfolio",
      subtitle: "Filter employees, inspect progress and review recommended actions"
    },
    diagnosis: {
      title: "Root Cause Diagnosis",
      subtitle: "Understand the friction patterns behind onboarding risk"
    }
  }

  const resetFilters = () => {
    setSelectedDepartment("All")
    setSelectedStatus("All")
    setSelectedManager("All")
  }

  const selectEmployee = (employee) => {
    setSelectedEmployee((currentEmployee) =>
      currentEmployee?.employee_id === employee.employee_id ? null : employee
    )
  }

  useEffect(() => {
    const handleOutsidePortfolioClick = (event) => {
      if (
        selectedEmployee &&
        portfolioRef.current &&
        !portfolioRef.current.contains(event.target)
      ) {
        setSelectedEmployee(null)
      }
    }

    document.addEventListener("mousedown", handleOutsidePortfolioClick)

    return () => {
      document.removeEventListener("mousedown", handleOutsidePortfolioClick)
    }
  }, [selectedEmployee])

  return (
    <div className="app">
      <button
        className="mobile-nav-toggle"
        onClick={() => setShowMobileNav(true)}
      >
        <Menu size={18} />
        Menu
      </button>

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        showMobileNav={showMobileNav}
        setShowMobileNav={setShowMobileNav}
      />

      {showMobileNav && (
        <div
          className="sidebar-overlay"
          onClick={() => setShowMobileNav(false)}
        />
      )}

      <main className="main">
        <Topbar />

        <Header
          title={pageCopy[activePage].title}
          subtitle={pageCopy[activePage].subtitle}
          actions={
            <div className="header-filter-wrapper">
              <button
                className="filter-button"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={18} />
                Filters
              </button>

              {showFilters && (
                <div className="filter-popover">
                  <div className="filter-popover-header">
                    <strong>Filters</strong>
                    <button
                      className="close-button"
                      onClick={() => setShowFilters(false)}
                      aria-label="Close filters"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="filter-group">
                    <div className="filter-title">Department</div>

                    <select
                      className="filter-select"
                      value={selectedDepartment}
                      onChange={(event) => setSelectedDepartment(event.target.value)}
                    >
                      {departments.map((department) => (
                        <option key={department} value={department}>
                          {department}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="filter-group">
                    <div className="filter-title">Status</div>

                    <select
                      className="filter-select"
                      value={selectedStatus}
                      onChange={(event) => setSelectedStatus(event.target.value)}
                    >
                      <option value="All">All</option>
                      <option value="at_risk">At Risk</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div className="filter-group">
                    <div className="filter-title">Manager</div>

                    <select
                      className="filter-select"
                      value={selectedManager}
                      onChange={(event) => setSelectedManager(event.target.value)}
                    >
                      {managers.map((manager) => (
                        <option key={manager} value={manager}>
                          {manager}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button className="reset-button" onClick={resetFilters}>
                    Reset filters
                  </button>
                </div>
              )}
            </div>
          }
        />

        <div className="content">
          {activePage === "overview" && (
            <>
              <h2>Company-wide Onboarding Overview</h2>

              <KpiGrid
                data={{
                  totalEmployees,
                  atRisk,
                  inProgress,
                  completed
                }}
              />

              <SectionTitle title="Company Insights" />

              <InsightsGrid
                insights={{
                  totalFrictions,
                  avgCompletion: avgCompletion.toFixed(2),
                  atRiskRate,
                  topDepartment
                }}
              />

              <SectionTitle
                title="Department Risk Distribution"
              />

              <DepartmentChart data={filteredData} />
            </>
          )}

          {activePage === "portfolio" && (
            <>
              <div ref={portfolioRef}>
                {selectedEmployee && (
                  <>
                    <SectionTitle title="Employee Details" />
                    <EmployeeDetail employee={selectedEmployee} />
                  </>
                )}

                <SectionTitle title="Onboarding Portfolio" />

                <EmployeeTable
                  employees={filteredData}
                  selectedEmployee={selectedEmployee}
                  setSelectedEmployee={selectEmployee}
                />
              </div>
            </>
          )}

          {activePage === "diagnosis" && (
            <>
              <SectionTitle title="Root Cause Diagnosis" />

              <RootCauseDiagnosis />

              <SectionTitle
                title="Department Risk Distribution"
              />

              <DepartmentChart data={filteredData} />
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
