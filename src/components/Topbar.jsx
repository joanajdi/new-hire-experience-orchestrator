import { useState } from "react"

function Topbar() {
  const [profileOpen, setProfileOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const today = new Date()

const startDate = new Date()
startDate.setDate(today.getDate() - 30)

const formatDate = (date) => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  })
}

const formattedRange = `${formatDate(startDate)} – ${formatDate(today)}, ${today.getFullYear()}`

  return (
    <div className="topbar">
      <div></div>

      <div className="topbar-actions">
<div className="dropdown-wrapper">
  <button
    className="date-button"
    onClick={() => {
      setCalendarOpen(!calendarOpen)
      setNotificationsOpen(false)
      setProfileOpen(false)
    }}
  >
📅 Last 30 days ({formattedRange})
  </button>

  {calendarOpen && (
    <div className="dropdown-menu calendar-menu">
      <strong>Select date range</strong>

      <label>Start date</label>
<input type="date" defaultValue={startDate.toISOString().split("T")[0]} />
      <label>End date</label>
<input type="date" defaultValue={today.toISOString().split("T")[0]} />
      <button className="calendar-apply">Apply</button>
    </div>
  )}
</div>
        <div className="dropdown-wrapper">
<button
  className="icon-button"
  onClick={() => {
    setNotificationsOpen(!notificationsOpen)
    setProfileOpen(false)
  }}
>
  🔔
</button>

          {notificationsOpen && (
            <div className="dropdown-menu notifications-menu">
              <strong>Notifications</strong>
              <p>3 employees require onboarding attention.</p>
              <p>Sales has the highest risk exposure.</p>
              <p>29 frictions detected this period.</p>
            </div>
          )}
        </div>

        <div className="dropdown-wrapper">
          <div
  className="user-pill"
  onClick={() => {
    setProfileOpen(!profileOpen)
    setNotificationsOpen(false)
  }}
>
  <div className="avatar">AS</div>
  <span>Ashley Scott</span>
  <span>⌄</span>
</div>

          {profileOpen && (
            <div className="dropdown-menu profile-menu">
              <strong>Ashley Scott</strong>
              <p>HR Operations Manager</p>
              <hr />
              <p>View profile</p>
              <p>Dashboard settings</p>
              <p>Sign out</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Topbar