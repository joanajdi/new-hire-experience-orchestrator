function formatStatus(status) {
  if (status === "at_risk") return "At Risk"
  if (status === "in_progress") return "In Progress"
  if (status === "completed") return "Completed"
  return status
}

function EmployeeTable({ employees, selectedEmployee, setSelectedEmployee }) {  return (
    <div className="employee-table-card">
  <div className="employee-table-scroll">
    <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Manager</th>
            <th>Status</th>
            <th>Completion</th>
            <th>Frictions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
<tr
  key={employee.employee_id}
  onClick={() => setSelectedEmployee(employee)}
  className={
    selectedEmployee?.employee_id === employee.employee_id
      ? "selected-row"
      : ""
  }
>
              <td>{employee.name}</td>
              <td>{employee.department.trim()}</td>
              <td>{employee.manager}</td>
              <td>
                <span className={`status-badge ${employee.progress_summary.overall_status}`}>
                  {formatStatus(employee.progress_summary.overall_status)}
                </span>
              </td>
              <td>{employee.progress_summary.completion_rate}%</td>
              <td>{employee.friction_report.friction_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default EmployeeTable