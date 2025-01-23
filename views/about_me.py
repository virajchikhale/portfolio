import streamlit as st
st.balloons()
# from st_radial import st_radial


# from forms.contact import contact_form


# @st.experimental_dialog("Contact Me")
# def show_contact_form():
#     contact_form()




# --- HERO SECTION ---
col1, col2, col3, col4 = st.columns([1,3,3,1], gap="large", vertical_alignment="center")
with col1:
    st.write()
with col2:
    st.image("./assets/test.png", width=230)

with col3:
    st.title("Hello, Viraj here!", anchor=False)
    st.write(
        "Senior Data Analyst, assisting enterprises by supporting data-driven decision-making."
    )
    # if st.button("✉️ Contact Me"):
    #     show_contact_form()
with col4:
    st.write()




st.markdown(
    """
    <style>
    .title {
        text-align: center;
    }
    </style>
    """, unsafe_allow_html=True
)



# --- EXPERIENCE & QUALIFICATIONS ---
st.write("\n")
col1, col2, col3, col4, col5 = st.columns([1,2,4,2,1], gap="large", vertical_alignment="top")
with col1:
    st.write()
with col2:
    st.subheader("Languages", anchor=False)
    st.progress(85, text="English")
    st.progress(80, text="Hindi")
    st.progress(90, text="Marathi")
with col3:
    st.markdown('<h3 class="title">Expertiese</h3>', unsafe_allow_html=True)
    col1, col2 = st.columns([1,1], gap="large", vertical_alignment="top")
    with col1:
        st.progress(85, text="Python")
        st.progress(80, text="SQL")
        st.progress(90, text="JavaScript")
        st.progress(70, text="PHP")
        st.progress(70, text="C++")
    with col2:
        st.progress(85, text="Pandas")
        st.progress(80, text="NumPy")
        st.progress(90, text="Matplotlib")
        st.progress(70, text="Seaborn")
        st.progress(70, text="Scikit-learn")
with col4:
    st.subheader("Tools", anchor=False)
    st.progress(70, text="GIT")
    st.progress(70, text="VS Code")
    st.progress(70, text="Tableau")
    st.progress(70, text="PowerBI")
with col5:
    st.write()


# --- SKILLS ---
st.write("\n")
st.subheader("Hard Skills", anchor=False)
st.write(
    """
    - Programming: Python (Scikit-learn, Pandas), SQL, VBA
    - Data Visualization: PowerBi, MS Excel, Plotly
    - Modeling: Logistic regression, linear regression, decision trees
    - Databases: Postgres, MongoDB, MySQL
    """
)