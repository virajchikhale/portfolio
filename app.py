import streamlit as st
st.set_page_config(layout="wide")


hide_st_style = """
            <style>
            #MainMenu {visibility: hidden;}
            footer {visibility: hidden;}
            header {visibility: hidden;}
            </style>
            """
# st.markdown(hide_st_style, unsafe_allow_html=True)

# --- PAGE SETUP ---
about_page = st.Page(
    "views/about_me.py",
    title="About Me",
    icon=":material/account_circle:",
    default=True,
)
internship = st.Page(
    "views/internships.py",
    title="Internships",
    icon=":material/apartment:",
)
project = st.Page(
    "views/projects.py",
    title="Projects",
    icon=":material/smart_toy:",
)

contact = st.Page(
    "views/contact.py",
    title="Contact",
    icon=":material/perm_phone_msg:",
)


# --- NAVIGATION SETUP [WITHOUT SECTIONS] ---
# pg = st.navigation(pages=[about_page, project_1_page, project_2_page])

# --- NAVIGATION SETUP [WITH SECTIONS]---
pg = st.navigation(
    {
        "Info": [about_page],
        "Experience": [internship, project],
        "Contact":[contact]
    }
)



# --- SHARED ON ALL PAGES ---
st.logo("assets/test.png")
st.sidebar.markdown("Made with ❤️ by Viraj")
# st.sidebar.markdown("Made with ❤️ by [Viraj](https://youtube.com/@codingisfun)")



# --- RUN NAVIGATION ---
pg.run()