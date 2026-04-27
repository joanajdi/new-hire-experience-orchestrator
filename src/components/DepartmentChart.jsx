function DepartmentChart({ data }) {
  const departmentCounts = {}

  data.forEach(emp => {
    if (emp.progress_summary.overall_status === "at_risk") {
      const dept = emp.department.trim()

      if (!departmentCounts[dept]) {
        departmentCounts[dept] = 0
      }

      departmentCounts[dept]++
    }
  })

  const entries = Object.entries(departmentCounts).sort(
    (a, b) => b[1] - a[1]
  )

  const maxValue = entries.length > 0
    ? Math.max(...entries.map(([, count]) => count))
    : 1

  return (
    <div className="chart-card">
      <h3>At Risk by Department</h3>

      {entries.map(([dept, count]) => {
        const width = (count / maxValue) * 100

        return (
          <div key={dept} className="bar-row">
            <span>{dept}</span>

            <div className="bar">
              <div
                className="bar-fill"
                style={{ width: `${width}%` }}
              ></div>
            </div>

            <strong>{count}</strong>
          </div>
        )
      })}
    </div>
  )
}

export default DepartmentChart