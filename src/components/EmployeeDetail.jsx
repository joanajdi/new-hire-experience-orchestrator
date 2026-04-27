function formatStatus(status) {
  if (status === "at_risk") return "At Risk"
  if (status === "in_progress") return "In Progress"
  if (status === "completed") return "Completed"
  return status
}

function EmployeeDetail({ employee }) {
  if (!employee) {
    return null
  }

  return (
    <div className="employee-detail-card">
      <div className="employee-detail-header">
        <div>
          <h3>{employee.name}</h3>
          <p>{employee.role} · {employee.department.trim()}</p>
        </div>

        <span className={`status-badge ${employee.progress_summary.overall_status}`}>
          {formatStatus(employee.progress_summary.overall_status)}
        </span>
      </div>

      <div className="employee-detail-grid">
        <div>
          <span>Manager</span>
          <strong>{employee.manager}</strong>
        </div>

        <div>
          <span>Completion</span>
          <strong>{employee.progress_summary.completion_rate}%</strong>
        </div>

        <div>
          <span>Pending Tasks</span>
          <strong>{employee.progress_summary.pending_tasks}</strong>
        </div>

        <div>
          <span>Frictions</span>
          <strong>{employee.friction_report.friction_count}</strong>
        </div>
      </div>

      <div className="next-action-box">
        <span>Recommended next action</span>
        <p>{employee.progress_summary.recommended_next_action}</p>
      </div>

      <div className="employee-frictions">
        <h4>Detected Frictions</h4>

        {employee.friction_report.frictions.map((friction, index) => (
          <div key={index} className={`friction-item ${friction.severity}`}>
            <strong>{friction.severity.toUpperCase()}</strong>
            <span>{friction.message}</span>
          </div>
        ))}
      </div>

<div className="employee-tasks">
  <h4>Onboarding Tasks</h4>

  <div className="employee-tasks-scroll">
    {employee.onboarding_tasks.map((task, index) => (
          <div key={index} className={`task-item ${task.status}`}>
            <span>{task.task}</span>
            <strong>{task.status.replace("_", " ")}</strong>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default EmployeeDetail