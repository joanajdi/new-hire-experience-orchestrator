import streamlit as st
import pandas as pd

st.title("Onboarding Data Analysis")

st.write(
    "This Streamlit section represents the data exploration layer behind the React dashboard."
)

data = {
    "Department": ["Sales", "Production"],
    "At Risk Employees": [20, 2]
}

df = pd.DataFrame(data)

st.subheader("At Risk Employees by Department")
st.bar_chart(df.set_index("Department"))
