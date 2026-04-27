import json
import pandas as pd
import streamlit as st
try:
    from openai import OpenAI
except ImportError:
    OpenAI = None

st.set_page_config(
    page_title="New Hire Experience Orchestrator",
    layout="wide"
)

try:
    api_key = st.secrets.get("OPENAI_API_KEY", None)
except Exception:
    api_key = None

client = None
if api_key and OpenAI is not None:
    client = OpenAI(api_key=api_key)

st.markdown("""
<style>
/* Main page */
.stApp {
    background-color: #F7F8FA;
}

/* Main container */
.block-container {
    padding-top: 3rem;
    padding-bottom: 3rem;
    max-width: 1200px;
}

/* Headings */
h1 {
    font-size: 2.8rem !important;
    font-weight: 800 !important;
    color: #111827 !important;
    letter-spacing: -0.04em;
}

h2, h3 {
    color: #1F2937 !important;
    font-weight: 750 !important;
    letter-spacing: -0.02em;
}

[data-baseweb="select"] {
    border-radius: 12px;
}

/* Divider */
hr {
    margin-top: 2rem;
    margin-bottom: 2rem;
}
            
/* Sidebar - clean corporate */
[data-testid="stSidebar"] {
    background-color: #FFFFFF;
    border-right: 1px solid #E5E7EB;
    padding-top: 2rem;
}

/* Sidebar text */
[data-testid="stSidebar"] * {
    color: #111827 !important;
}

/* Sidebar section titles */
[data-testid="stSidebar"] h2 {
    font-size: 1.2rem !important;
    font-weight: 700 !important;
}

/* Sidebar labels */
[data-testid="stSidebar"] label {
    font-size: 0.85rem !important;
    font-weight: 600 !important;
    color: #6B7280 !important;
}

/* Multiselect tags (chips) */
[data-testid="stSidebar"] [data-baseweb="tag"] {
    background-color: #EEF2FF !important;
    color: #3730A3 !important;
    border-radius: 999px !important;
}

/* Inputs */
[data-testid="stSidebar"] [data-baseweb="select"] {
    border-radius: 12px !important;
}

 .kpi-card {
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 20px;
    padding: 1.4rem 1.5rem;
    box-shadow: 0 10px 25px rgba(15, 23, 42, 0.05);
    min-height: 130px;
}

.kpi-label {
    color: #64748B;
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 0.7rem;
}

.kpi-value {
    color: #0F172A;
    font-size: 2.2rem;
    font-weight: 800;
    line-height: 1;
}

.kpi-helper {
    color: #94A3B8;
    font-size: 0.8rem;
    margin-top: 0.8rem;
}           

.diagnosis-card {
    background: linear-gradient(135deg, #FFF7ED 0%, #FFFBEB 100%);
    border: 1px solid #FED7AA;
    border-radius: 20px;
    padding: 1.4rem 1.6rem;
    margin-top: 1rem;
    margin-bottom: 2rem;
    box-shadow: 0 10px 25px rgba(17, 24, 39, 0.05);
}

.diagnosis-label {
    color: #9A3412;
    font-size: 0.78rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 0.4rem;
}

.diagnosis-title {
    color: #111827;
    font-size: 1.35rem;
    font-weight: 850;
    margin-bottom: 0.35rem;
}

.diagnosis-message {
    color: #374151;
    font-size: 1rem;
    margin-bottom: 0.7rem;
}

.diagnosis-action {
    color: #92400E;
    font-size: 0.95rem;
}            

.insight-card {
    background: white;
    border: 1px solid #E5E7EB;
    border-left: 5px solid #F59E0B;
    border-radius: 16px;
    padding: 1rem 1.2rem;
    margin-bottom: 0.8rem;
    display: flex;
    gap: 0.8rem;
    align-items: flex-start;
    box-shadow: 0 6px 18px rgba(17, 24, 39, 0.04);
}

.insight-icon {
    color: #F59E0B;
    font-size: 0.9rem;
    margin-top: 0.25rem;
}

.insight-text {
    color: #374151;
    font-size: 0.98rem;
    line-height: 1.5;
}            

.action-card {
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 18px;
    padding: 1.2rem 1.4rem;
    margin-bottom: 1rem;
    box-shadow: 0 8px 24px rgba(17, 24, 39, 0.05);
}

.action-card.high {
    border-left: 5px solid #DC2626;
}

.action-card.medium {
    border-left: 5px solid #F59E0B;
}

.action-card.low {
    border-left: 5px solid #16A34A;
}

.action-header {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    color: #111827;
    font-size: 1rem;
}

.priority-pill {
    padding: 0.25rem 0.6rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 800;
}

.priority-pill.high {
    background: #FEE2E2;
    color: #991B1B;
}

.priority-pill.medium {
    background: #FEF3C7;
    color: #92400E;
}

.priority-pill.low {
    background: #DCFCE7;
    color: #166534;
}

.action-meta {
    margin-top: 0.7rem;
    color: #64748B;
    font-size: 0.9rem;
}

.action-reason {
    margin-top: 0.4rem;
    color: #374151;
}

.action-addresses {
    margin-top: 0.5rem;
    color: #64748B;
    font-size: 0.85rem;
}            

 .section-header {
    margin-top: 2.5rem;
    margin-bottom: 1rem;
}

.section-header h2 {
    margin-bottom: 0.2rem;
}

.section-header p {
    color: #64748B;
    font-size: 0.95rem;
    margin-top: 0;
}           

.profile-card {
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 20px;
    padding: 1.4rem 1.5rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.2rem;
    box-shadow: 0 8px 24px rgba(17, 24, 39, 0.04);
    margin-bottom: 1.5rem;
}

.profile-label {
    color: #64748B;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 0.35rem;
}

.profile-value {
    color: #111827;
    font-size: 1rem;
    font-weight: 700;
}                     

.employee-status-card {
    background: #EFF6FF;
    border: 1px solid #BFDBFE;
    border-radius: 18px;
    padding: 1.2rem 1.4rem;
    margin-top: 1rem;
    margin-bottom: 1.8rem;
    display: grid;
    grid-template-columns: 220px 1fr;
    gap: 1rem;
    align-items: center;
}

.status-label {
    color: #1E40AF;
    font-size: 0.78rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 0.4rem;
}

.status-pill {
    display: inline-block;
    background: #DBEAFE;
    color: #1E3A8A;
    padding: 0.3rem 0.7rem;
    border-radius: 999px;
    font-weight: 800;
    font-size: 0.85rem;
}

.next-action {
    color: #1E3A8A;
    font-size: 1rem;
    font-weight: 600;
}           

.friction-card {
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 16px;
    padding: 1rem 1.2rem;
    margin-bottom: 0.8rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    box-shadow: 0 6px 18px rgba(17, 24, 39, 0.04);
}

.friction-card.high {
    border-left: 5px solid #DC2626;
}

.friction-card.medium {
    border-left: 5px solid #F59E0B;
}

.friction-card.low {
    border-left: 5px solid #16A34A;
}

.friction-severity {
    min-width: 82px;
    text-align: center;
    padding: 0.25rem 0.55rem;
    border-radius: 999px;
    font-size: 0.72rem;
    font-weight: 800;
}

.friction-severity.high {
    background: #FEE2E2;
    color: #991B1B;
}

.friction-severity.medium {
    background: #FEF3C7;
    color: #92400E;
}

.friction-severity.low {
    background: #DCFCE7;
    color: #166534;
}

.friction-message {
    color: #374151;
    font-size: 0.98rem;
    font-weight: 600;
}           
            
.task-card {
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 16px;
    padding: 1rem 1.2rem;
    margin-bottom: 0.8rem;
    box-shadow: 0 6px 18px rgba(17, 24, 39, 0.04);
}

.task-card.high {
    border-left: 5px solid #DC2626;
}

.task-card.medium {
    border-left: 5px solid #F59E0B;
}

.task-card.low {
    border-left: 5px solid #16A34A;
}

.task-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.4rem;
}

.task-phase {
    font-size: 0.75rem;
    font-weight: 800;
    color: #64748B;
}

.task-priority {
    font-size: 0.7rem;
    font-weight: 800;
    padding: 0.2rem 0.5rem;
    border-radius: 999px;
}

.task-priority.high {
    background: #FEE2E2;
    color: #991B1B;
}

.task-priority.medium {
    background: #FEF3C7;
    color: #92400E;
}

.task-priority.low {
    background: #DCFCE7;
    color: #166534;
}

.task-title {
    font-size: 1rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 0.3rem;
}

.task-meta {
    font-size: 0.85rem;
    color: #64748B;
}

.workload-card {
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 16px;
    padding: 1rem 1.2rem;
    margin-bottom: 0.8rem;
    box-shadow: 0 6px 18px rgba(17, 24, 39, 0.04);
}

.workload-header {
    display: flex;
    justify-content: space-between;
    color: #111827;
    margin-bottom: 0.7rem;
}

.workload-header span {
    color: #64748B;
    font-size: 0.9rem;
}

.workload-bar-bg {
    background: #E5E7EB;
    height: 10px;
    border-radius: 999px;
    overflow: hidden;
}

.workload-bar {
    background: #2563EB;
    height: 10px;
    border-radius: 999px;
}            

</style>
""", unsafe_allow_html=True)

with open("streamlit-analysis/data/bulk_onboarding_output.json", "r", encoding="utf-8") as file:
    bulk_data = json.load(file)

st.title("New Hire Experience Orchestrator")
st.caption("Multi-agent onboarding orchestration dashboard")

summary_rows = []

for employee in bulk_data:
    summary = employee["progress_summary"]

    summary_rows.append({
        "employee_id": employee["employee_id"],
        "name": employee["name"],
        "role": employee["role"],
        "department": employee["department"],
        "manager": employee["manager"],
        "seniority": employee["seniority"],
        "work_mode": employee["work_mode"],
        "status": summary["overall_status"],
        "completion_rate": summary["completion_rate"],
        "total_tasks": summary["total_tasks"],
        "pending_tasks": summary["pending_tasks"],
        "completed_tasks": summary["completed_tasks"],
        "friction_count": employee["friction_report"]["friction_count"]
    })


summary_df = pd.DataFrame(summary_rows)

st.sidebar.markdown("### Filters")
st.sidebar.caption("Refine onboarding data")

department_filter = st.sidebar.multiselect(
    "Department",
    options=sorted(summary_df["department"].unique())
)

status_options = sorted(summary_df["status"].unique())

status_label_map = {
    "at_risk": "At Risk",
    "in_progress": "In Progress",
    "completed": "Completed"
}

status_display_options = [
    status_label_map.get(status, status) for status in status_options
]

status_filter_display = st.sidebar.multiselect(
    "Status",
    options=status_display_options
)

status_reverse_map = {
    display: raw for raw, display in status_label_map.items()
}

status_filter = [
    status_reverse_map.get(status, status) for status in status_filter_display
]

manager_filter = st.sidebar.multiselect(
    "Manager",
    options=sorted(summary_df["manager"].unique())
)

filtered_summary_df = summary_df.copy()

if department_filter:
    filtered_summary_df = filtered_summary_df[
        filtered_summary_df["department"].isin(department_filter)
    ]

if status_filter:
    filtered_summary_df = filtered_summary_df[
        filtered_summary_df["status"].isin(status_filter)
    ]

if manager_filter:
    filtered_summary_df = filtered_summary_df[
        filtered_summary_df["manager"].isin(manager_filter)
    ]

filtered_employee_ids = filtered_summary_df["employee_id"].tolist()

filtered_bulk_data = [
    employee for employee in bulk_data
    if employee["employee_id"] in filtered_employee_ids
]

if filtered_summary_df.empty:
    st.warning("No employees match the selected filters. Please adjust the sidebar filters.")
    st.stop()

total_frictions = sum(
    employee["friction_report"]["friction_count"]
    for employee in filtered_bulk_data
)

avg_completion = round(filtered_summary_df["completion_rate"].mean(), 2)

risk_by_department = filtered_summary_df.groupby("department")["status"].apply(
    lambda statuses: (statuses == "at_risk").sum()
).sort_values(ascending=False)

top_risk_department = risk_by_department.index[0]

tasks_by_manager = filtered_summary_df["manager"].value_counts().sort_values(ascending=False)
most_loaded_manager = tasks_by_manager.index[0]

at_risk_count = len(filtered_summary_df[filtered_summary_df["status"] == "at_risk"])
at_risk_rate = round((at_risk_count / len(filtered_summary_df)) * 100, 2)


st.subheader("Company-wide Onboarding Overview")

col1, col2, col3, col4 = st.columns(4)

def kpi_card(label, value, helper=None):
    st.markdown(
        f"""
        <div class="kpi-card">
            <div class="kpi-label">{label}</div>
            <div class="kpi-value">{value}</div>
            {f'<div class="kpi-helper">{helper}</div>' if helper else ''}
        </div>
        """,
        unsafe_allow_html=True
    )

def generate_ai_insights(filtered_summary_df, total_frictions, avg_completion, at_risk_rate, top_risk_department, most_loaded_manager):
    if client is None:
        raise RuntimeError("OpenAI client is not configured.")
    prompt = f"""
You are an HR operations analyst. Generate 5 concise, executive-level operational insights for an onboarding dashboard.

Use these metrics:
- New hires: {len(filtered_summary_df)}
- At-risk rate: {at_risk_rate}%
- Average completion rate: {avg_completion}%
- Total frictions: {total_frictions}
- Most at-risk department: {top_risk_department}
- Manager with highest onboarding ownership: {most_loaded_manager}

Each insight should be:
- specific
- business-oriented
- useful for decision-making
- one sentence only
- no bullet points
- no generic wording
"""

    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[
            {"role": "system", "content": "You generate concise HR operations insights for executive dashboards."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.4
    )

    text = response.choices[0].message.content

    insights = [
        line.strip("-•1234567890. ").strip()
        for line in text.split("\n")
        if line.strip()
    ]

    return insights[:5]

col1, col2, col3, col4 = st.columns(4)

with col1:
    kpi_card("New Hires", len(filtered_summary_df), "Filtered portfolio")

with col2:
    kpi_card("At Risk", len(filtered_summary_df[filtered_summary_df["status"] == "at_risk"]), "Needs attention")

with col3:
    kpi_card("In Progress", len(filtered_summary_df[filtered_summary_df["status"] == "in_progress"]), "Active journeys")

with col4:
    kpi_card("Completed", len(filtered_summary_df[filtered_summary_df["status"] == "completed"]), "Fully onboarded")

st.subheader("Company Insights")

insight_col1, insight_col2, insight_col3, insight_col4 = st.columns(4)

with insight_col1:
    kpi_card("Total Frictions", total_frictions, "Detected issues")

with insight_col2:
    kpi_card("Avg Completion Rate", f"{avg_completion}%", "Portfolio average")

with insight_col3:
    kpi_card("At-Risk Rate", f"{at_risk_rate}%", "Risk exposure")

with insight_col4:
    kpi_card("Most At-Risk Dept", top_risk_department, "Priority area")

st.subheader("Root Cause Diagnosis")

total_design_risks = sum(
    employee["progress_summary"].get("design_risk_count", 0)
    for employee in filtered_bulk_data
)

total_execution_risks = sum(
    employee["progress_summary"].get("execution_risk_count", 0)
    for employee in filtered_bulk_data
)

root_col1, root_col2 = st.columns(2)

with root_col1:
    kpi_card("Design Risks", total_design_risks, "Missing structure")

with root_col2:
    kpi_card("Execution Risks", total_execution_risks, "Delayed progress")
    
if total_design_risks > total_execution_risks:
    root_title = "Design gap detected"
    root_message = "Onboarding risk is mainly driven by missing structure, not individual execution."
    root_action = "Fix Day 1 plans, buddy support and IT access flows before evaluating progress."
elif total_execution_risks > total_design_risks:
    root_title = "Execution bottleneck detected"
    root_message = "Onboarding risk is mainly driven by delayed task completion and follow-through."
    root_action = "Prioritize pending Day 1 tasks and unblock overloaded owners."
else:
    root_title = "Mixed risk pattern detected"
    root_message = "Risk is balanced between design gaps and execution delays."
    root_action = "Review both journey structure and task completion ownership."

st.markdown(f"""
<div class="diagnosis-card">
    <div class="diagnosis-label">Executive diagnosis</div>
    <div class="diagnosis-title">{root_title}</div>
    <div class="diagnosis-message">{root_message}</div>
    <div class="diagnosis-action"><strong>Recommended focus:</strong> {root_action}</div>
</div>
""", unsafe_allow_html=True)

st.subheader("Intelligent Operational Insights")
st.caption("Insights currently generated through rule-based operational logic. AI layer prepared for future deployment.")

fallback = [
    f"Systemic onboarding risk detected: {at_risk_rate}% of new hires are at risk.",
    f"Average completion is {avg_completion}%, indicating delayed onboarding progress.",
    f"{total_frictions} onboarding frictions were detected across the filtered portfolio.",
    f"{top_risk_department} is the highest-risk department.",
    f"{most_loaded_manager} may require support due to high onboarding ownership."
]

ai_enabled = False  # toggle

if ai_enabled:
    try:
        insights = generate_ai_insights(
            filtered_summary_df,
            total_frictions,
            avg_completion,
            at_risk_rate,
            top_risk_department,
            most_loaded_manager
        )
    except Exception:
        insights = fallback
else:
    insights = fallback

for insight in insights:
    st.markdown(f"""
    <div class="insight-card">
        <div class="insight-icon">●</div>
        <div class="insight-text">{insight}</div>
    </div>
    """, unsafe_allow_html=True)

st.subheader("Recommended Actions (Impact-Based Prioritization)")


def calculate_base_impact_score(at_risk_rate, avg_completion, total_frictions):
    """
    Calcula um score normalizado de impacto entre 0 e 100.
    """

    risk_component = at_risk_rate / 100
    completion_component = (100 - avg_completion) / 100
    friction_component = min(total_frictions / 30, 1)

    score = (
        risk_component * 0.5 +
        completion_component * 0.3 +
        friction_component * 0.2
    ) * 100

    return round(score, 2)


def assign_priority(score):
    if score >= 70:
        return "HIGH"
    elif score >= 40:
        return "MEDIUM"
    return "LOW"


base_impact_score = calculate_base_impact_score(
    at_risk_rate,
    avg_completion,
    total_frictions
)

recommendations = []

if at_risk_rate > 50:
    score = round(base_impact_score * 1.2, 2)
    recommendations.append({
        "action": "Increase onboarding support capacity by assigning additional buddies or reducing manager onboarding load.",
        "reason": "More than half of new hires are currently at risk.",
        "score": score,
        "priority": assign_priority(score),
        "addresses": ["missing_buddy_support", "critical_tasks_pending", "new_hire_overload"]
    })

if avg_completion < 50:
    score = round(base_impact_score * 1.1, 2)
    recommendations.append({
        "action": "Break onboarding journeys into smaller milestones to improve early completion rates.",
        "reason": "Average completion rate is below 50%.",
        "score": score,
        "priority": assign_priority(score),
        "addresses": ["critical_tasks_pending", "new_hire_overload"]
    })

if total_frictions > 20:
    score = round(base_impact_score * 0.9, 2)
    recommendations.append({
        "action": "Audit onboarding workflows to identify repeated bottlenecks across departments.",
        "reason": "The system detected a high number of frictions.",
        "score": score,
        "priority": assign_priority(score),
        "addresses": ["missing_day_1_plan", "missing_system_access", "missing_buddy_support", "critical_tasks_pending"]
    })

if top_risk_department:
    score = round(base_impact_score * 1.15, 2)
    recommendations.append({
        "action": f"Review the onboarding process for the {top_risk_department} department.",
        "reason": f"{top_risk_department} has the highest concentration of at-risk onboardings.",
        "score": score,
        "priority": assign_priority(score),
        "addresses": ["critical_tasks_pending", "missing_system_access"]
    })

if most_loaded_manager:
    score = round(base_impact_score * 0.75, 2)
    recommendations.append({
        "action": f"Redistribute onboarding responsibilities from {most_loaded_manager}.",
        "reason": f"{most_loaded_manager} appears frequently as manager across the onboarding portfolio.",
        "score": score,
        "priority": assign_priority(score),
        "addresses": ["manager_overload", "critical_tasks_pending"]
    })

recommendations = sorted(
    recommendations,
    key=lambda recommendation: recommendation["score"],
    reverse=True
)

if len(recommendations) == 0:
    st.success("No major intervention recommended at this stage.")
else:
    for recommendation in recommendations:
        priority_class = recommendation["priority"].lower()

        st.markdown(
    f"""
<div class="action-card {priority_class}">
    <div class="action-header">
        <span class="priority-pill {priority_class}">{recommendation['priority']}</span>
        <strong>{recommendation['action']}</strong>
    </div>
    <div class="action-meta">Impact Score: {recommendation['score']}</div>
    <div class="action-reason">{recommendation['reason']}</div>
    <div class="action-addresses">Addresses: {', '.join(recommendation['addresses'])}</div>
</div>
""",
    unsafe_allow_html=True
)


st.subheader("Onboarding Portfolio")
st.caption("Browse all filtered onboarding journeys and identify high-risk employees.")

portfolio_view = filtered_summary_df[
    [
        "employee_id",
        "name",
        "department",
        "manager",
        "status",
        "completion_rate",
        "pending_tasks",
        "friction_count"
    ]
].copy()

# ordenar para mostrar primeiro os casos mais críticos
status_order = {
    "at_risk": 0,
    "in_progress": 1,
    "completed": 2
}

portfolio_view["status_order"] = portfolio_view["status"].map(status_order)

portfolio_view = portfolio_view.sort_values(
    by=["status_order", "completion_rate", "pending_tasks"],
    ascending=[True, True, False]
).drop(columns=["status_order"])

# formatar percentagem
portfolio_view["completion_rate"] = portfolio_view["completion_rate"].map(
    lambda x: f"{x}%"
)

portfolio_view["status"] = portfolio_view["status"].map(
    lambda status: status_label_map.get(status, status)
)

# mostrar tabela com colunas mais bonitas
st.dataframe(
    portfolio_view,
    use_container_width=True,
    hide_index=True,
    column_config={
        "employee_id": "Employee ID",
        "name": "Name",
        "department": "Department",
        "manager": "Manager",
        "status": "Status",
        "completion_rate": "Completion",
        "pending_tasks": "Pending Tasks",
        "friction_count": "Frictions"
    }
)

st.caption(f"{len(portfolio_view)} employees displayed")

st.divider()


st.subheader("Select Employee")

employee_names = filtered_summary_df["name"].tolist()

selected_name = st.selectbox(
    "Choose a new hire",
    employee_names
)

selected_employee = next(
    emp for emp in filtered_bulk_data if emp["name"] == selected_name
)

profile = selected_employee["profile_analysis"]
tasks = selected_employee["onboarding_tasks"]
friction_report = selected_employee["friction_report"]
progress_summary = selected_employee["progress_summary"]

tasks_df = pd.DataFrame(tasks)


st.subheader("Employee Profile")

st.markdown(f"""
<div class="profile-card">
    <div>
        <div class="profile-label">Name</div>
        <div class="profile-value">{selected_employee['name']}</div>
    </div>
    <div>
        <div class="profile-label">Role</div>
        <div class="profile-value">{selected_employee['role']}</div>
    </div>
    <div>
        <div class="profile-label">Department</div>
        <div class="profile-value">{selected_employee['department']}</div>
    </div>
    <div>
        <div class="profile-label">Manager</div>
        <div class="profile-value">{selected_employee['manager']}</div>
    </div>
</div>
""", unsafe_allow_html=True)

st.subheader("Individual Onboarding Progress")

col5, col6, col7, col8 = st.columns(4)

with col5:
    kpi_card("Total Tasks", progress_summary["total_tasks"], "Assigned scope")

with col6:
    kpi_card("Completed", progress_summary["completed_tasks"], "Finished tasks")

with col7:
    kpi_card("Pending", progress_summary["pending_tasks"], "Still open")

with col8:
    kpi_card("Completion Rate", f"{progress_summary['completion_rate']}%", "Journey progress")

status_class = progress_summary["overall_status"].replace("_", "-")

st.markdown(f"""
<div class="employee-status-card">
    <div>
        <div class="status-label">Overall status</div>
        <div class="status-pill">{status_label_map.get(progress_summary['overall_status'], progress_summary['overall_status'])}</div>
    </div>
    <div class="next-action">
        {progress_summary["recommended_next_action"]}
    </div>
</div>
""", unsafe_allow_html=True)

st.subheader("Detected Frictions")

if friction_report["friction_count"] == 0:
    st.markdown("""
    <div class="friction-card low">
        <div class="friction-severity low">CLEAR</div>
        <div class="friction-message">No onboarding friction detected.</div>
    </div>
    """, unsafe_allow_html=True)
else:
    for friction in friction_report["frictions"]:
        severity = friction["severity"].lower()

        st.markdown(f"""
        <div class="friction-card {severity}">
            <div class="friction-severity {severity}">
                {friction['severity'].upper()}
            </div>
            <div class="friction-message">
                {friction['message']}
            </div>
        </div>
        """, unsafe_allow_html=True)

st.subheader("Employee Onboarding Tasks")

for _, task in tasks_df.iterrows():
    priority = str(task["priority"]).lower()
    status = str(task["status"])
    phase = str(task["phase"]).upper()
    title = str(task["task"])
    owner = str(task["owner"])

    st.markdown(
        f"""
        <div class='task-card {priority}'>
            <div class='task-header'>
                <span class='task-phase'>{phase}</span>
                <span class='task-priority {priority}'>{priority.upper()}</span>
            </div>
            <div class='task-title'>{title}</div>
            <div class='task-meta'>Owner: {owner} • Status: {status}</div>
        </div>
        """,
        unsafe_allow_html=True
    )

st.subheader("Ownership & Workload Balance")

owner_counts = tasks_df["owner"].value_counts()
owner_share = round((owner_counts / len(tasks_df)) * 100, 2)

workload_df = pd.DataFrame({
    "owner": owner_counts.index,
    "task_count": owner_counts.values,
    "workload_share": owner_share.values
})

top_owner = workload_df.iloc[0]["owner"]
top_owner_share = workload_df.iloc[0]["workload_share"]

st.markdown("#### Workload concentration")

for _, row in workload_df.iterrows():
    share = row["workload_share"]
    owner = row["owner"]
    count = row["task_count"]

    st.markdown(f"""
    <div class="workload-card">
        <div class="workload-header">
            <strong>{owner}</strong>
            <span>{count} tasks · {share}%</span>
        </div>
        <div class="workload-bar-bg">
            <div class="workload-bar" style="width: {share}%;"></div>
        </div>
    </div>
    """, unsafe_allow_html=True)

if top_owner_share >= 50:
    st.warning(
    f"Ownership concentration detected: {top_owner} is responsible for {top_owner_share}% of this onboarding journey. This may create bottlenecks if task volume increases."
)
elif top_owner_share >= 40:
    st.info(
    f"Ownership concentration detected: {top_owner} is responsible for {top_owner_share}% of this onboarding journey. Consider redistributing tasks if delays emerge."
)
else:
    st.success("Workload appears balanced across onboarding owners.")
