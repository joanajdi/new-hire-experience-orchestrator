import { useEffect, useRef, useState } from "react"
import { Calendar, Bell } from "lucide-react"

function Topbar() {
  const [profileOpen, setProfileOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const topbarActionsRef = useRef(null)
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

  const closeDropdowns = () => {
    setCalendarOpen(false)
    setNotificationsOpen(false)
    setProfileOpen(false)
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        topbarActionsRef.current &&
        !topbarActionsRef.current.contains(event.target)
      ) {
        setCalendarOpen(false)
        setNotificationsOpen(false)
        setProfileOpen(false)
      }
    }

    document.addEventListener("pointerdown", handleOutsideClick, true)

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick, true)
    }
  }, [])

  return (
    <div className="topbar">
      <div></div>

      {(calendarOpen || notificationsOpen || profileOpen) && (
        <button
          className="dropdown-backdrop"
          aria-label="Close dropdowns"
          onClick={closeDropdowns}
        />
      )}

      <div className="topbar-actions" ref={topbarActionsRef}>
        <div className="dropdown-wrapper">
          <button
            className="date-button"
            onClick={() => {
              setCalendarOpen(!calendarOpen)
              setNotificationsOpen(false)
              setProfileOpen(false)
            }}
          >
            <Calendar size={18} />
            <span className="date-range-label">{formattedRange}</span>
          </button>

          {calendarOpen && (
            <div className="dropdown-menu calendar-menu">
              <strong>Select date range</strong>

              <label>Start date</label>
              <input type="date" defaultValue={startDate.toISOString().split("T")[0]} />
              <label>End date</label>
              <input type="date" defaultValue={today.toISOString().split("T")[0]} />
              <button
                className="calendar-apply"
                onClick={() => setCalendarOpen(false)}
              >
                Apply
              </button>
            </div>
          )}
        </div>
        <div className="dropdown-wrapper">
          <button
            className="icon-button"
            onClick={() => {
              setNotificationsOpen(!notificationsOpen)
              setCalendarOpen(false)
              setProfileOpen(false)
            }}
          >
            <Bell size={18} />
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
              setCalendarOpen(false)
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
