import { BarChart3, ClipboardList, SearchCheck, Users, X } from "lucide-react"

const navigationItems = [
  {
    id: "overview",
    label: "Dashboard",
    description: "KPIs and company stats",
    icon: <BarChart3 size={18} />
  },
  {
    id: "portfolio",
    label: "Onboarding Portfolio",
    description: "Employees, filters and tasks",
    icon: <ClipboardList size={18} />
  },
  {
    id: "diagnosis",
    label: "Diagnosis",
    description: "Root causes and risks",
    icon: <SearchCheck size={18} />
  }
]

function Sidebar({ activePage, setActivePage, showMobileNav, setShowMobileNav }) {
  return (
    <aside className={`sidebar ${showMobileNav ? "open" : ""}`}>
      <div className="brand">
        <div className="brand-icon">
          <Users size={22} />
        </div>
        <strong>OnboardingIQ</strong>
        <button
          className="sidebar-close"
          onClick={() => setShowMobileNav(false)}
          aria-label="Close menu"
        >
          <X size={18} />
        </button>
      </div>

      <div className="sidebar-content">
        <div className="nav-section">
          <h3>Workspace</h3>
          <p>Navigate the onboarding command center</p>
        </div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activePage === item.id ? "active" : ""}`}
              onClick={() => {
                setActivePage(item.id)
                setShowMobileNav(false)
              }}
            >
              <span className="nav-item-icon">{item.icon}</span>
              <span>
                <strong>{item.label}</strong>
                <small>{item.description}</small>
              </span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
