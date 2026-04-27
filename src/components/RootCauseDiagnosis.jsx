function RootCauseDiagnosis() {
  return (
    <div className="diagnosis-grid">
      <div className="diagnosis-card">
        <h3>Top Friction Categories</h3>

        <div className="bar-row">
          <span>Access & Provisioning</span>
          <div className="bar-bg">
            <div className="bar-fill" style={{ width: "80%" }}></div>
          </div>
          <strong>12</strong>
        </div>

        <div className="bar-row">
          <span>Role Clarity</span>
          <div className="bar-bg">
            <div className="bar-fill" style={{ width: "47%" }}></div>
          </div>
          <strong>7</strong>
        </div>

        <div className="bar-row">
          <span>Training & Enablement</span>
          <div className="bar-bg">
            <div className="bar-fill" style={{ width: "33%" }}></div>
          </div>
          <strong>5</strong>
        </div>
      </div>

      <div className="diagnosis-card wide">
        <h3>Onboarding Journey Funnel</h3>
        <div className="funnel-step blue">Invited <span>25 (100%)</span></div>
        <div className="funnel-step purple">Pre-boarding <span>21 (84%)</span></div>
        <div className="funnel-step yellow">Active Onboarding <span>3 (12%)</span></div>
        <div className="funnel-step red">At Risk <span>22 (88%)</span></div>
        <div className="funnel-step green">Completed <span>0 (0%)</span></div>
      </div>

      <div className="diagnosis-card">
        <h3>Risk Breakdown</h3>

        <div className="donut">
          <div className="donut-center">
            <strong>22</strong>
            <span>At Risk</span>
          </div>
        </div>

        <div className="legend">
          <p><span className="dot red-dot"></span> High Risk — 14</p>
          <p><span className="dot yellow-dot"></span> Medium Risk — 6</p>
          <p><span className="dot green-dot"></span> Low Risk — 2</p>
        </div>
      </div>
    </div>
  )
}

export default RootCauseDiagnosis