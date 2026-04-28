import { Users } from "lucide-react"

function Sidebar({
  departments,
  selectedDepartment,
  setSelectedDepartment,
  selectedStatus,
  setSelectedStatus,
  managers,
  selectedManager,
  setSelectedManager,
  showMobileFilters,
  setShowMobileFilters
}) {
  return (
    <aside className={`sidebar ${showMobileFilters ? "open" : ""}`}>
      <div className="brand">
        <div className="brand-icon">
          <Users size={22} />
        </div>
        <strong>NHEO</strong>
      </div>

      <div className="sidebar-content">
        <div className="filter-section">
          <h3>Filters</h3>
          <p>Refine onboarding data</p>
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

        <div className="sidebar-actions">
          <button
            onClick={() => {
              setSelectedDepartment("All")
              setSelectedStatus("All")
              setSelectedManager("All")
              setShowMobileFilters(false)
            }}
          >
            Reset filters
          </button>

          <button className="primary">Save view</button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar