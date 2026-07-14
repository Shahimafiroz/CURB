import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router";

const styles = {
  page: {
    width: "100%",
    minHeight: "100vh",
    background: "#f7f5f0",
    fontFamily: "sans-serif",
    color: "#1a1a1a",
  },
  hero: {
    background: "#171b2b",
    padding: "72px 60px 88px",
    position: "relative",
    overflow: "hidden",
  },
  heroBar: {
    width: "6px",
    height: "48px",
    background: "#c0392b",
    display: "inline-block",
    marginRight: "18px",
    verticalAlign: "middle",
  },
  heroTitle: {
    fontSize: "52px",
    fontWeight: 800,
    color: "#ffffff",
    margin: 0,
    display: "inline-block",
    verticalAlign: "middle",
  },
  heroSub: {
    fontSize: "19px",
    color: "#b7bacb",
    marginTop: "20px",
    maxWidth: "560px",
  },
  pill: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(192,57,43,0.15)",
    color: "#ff8577",
    border: "1px solid rgba(192,57,43,0.4)",
    padding: "8px 18px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: 600,
    marginTop: "28px",
  },
  section: {
    padding: "56px 60px",
  },
  sectionHeading: {
    fontSize: "26px",
    fontWeight: 800,
    margin: "0 0 8px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  sectionSub: {
    color: "#6b6b6b",
    fontSize: "15px",
    marginBottom: "32px",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
    gap: "20px",
  },
  card: {
    borderRadius: "16px",
    padding: "26px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  iconCircle: {
    width: "46px",
    height: "46px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
  },
  cardTitle: {
    fontSize: "17px",
    fontWeight: 700,
    margin: 0,
  },
  cardText: {
    fontSize: "14px",
    color: "#555",
    margin: 0,
    lineHeight: 1.5,
  },
  ctaBand: {
    background: "#171b2b",
    borderRadius: "20px",
    margin: "0 60px 60px",
    padding: "44px 48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "24px",
  },
  ctaTitle: {
    color: "#fff",
    fontSize: "24px",
    fontWeight: 800,
    margin: 0,
  },
  ctaSub: {
    color: "#b7bacb",
    fontSize: "14px",
    marginTop: "6px",
  },
  button: {
    background: "#c0392b",
    color: "#fff",
    border: "none",
    padding: "14px 28px",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: 700,
    cursor: "pointer",
  },
  footer: {
    textAlign: "center",
    paddingBottom: "48px",
    color: "#888",
    fontSize: "13px",
  },
};

const features = [
  {
    icon: "🔍",
    title: "Screen a name",
    text: "Run any individual or entity against global sanctions lists in seconds.",
    bg: "#fdecea",
    iconBg: "#f7c1c1",
  },
  {
    icon: "📋",
    title: "Sanctions list",
    text: "Browse the full, continuously updated list your screenings are checked against.",
    bg: "#eeeafc",
    iconBg: "#cecbf6",
  },
  {
    icon: "🕒",
    title: "Screening history",
    text: "Look back through every query, match, and result your team has run.",
    bg: "#e9f7f1",
    iconBg: "#9fe1cb",
  },
  {
    icon: "📦",
    title: "Batch screen",
    text: "Upload a full list of names or transfers and screen them all at once.",
    bg: "#fdf3e3",
    iconBg: "#fac775",
  },
];

function Home() {
  const navigate = useNavigate();
  const handleNavigate = (link) => {
    navigate(link);
    handleCloseNavMenu();
  };
  return (
    <div style={styles.page}>
      <div style={styles.hero}>
        <span style={styles.heroBar}></span>
        <h1 style={styles.heroTitle}>CURB</h1>
        <p style={styles.heroSub}>
          Stop blocked transfers before they happen. Screen names against global
          sanctions lists in real time, before money ever moves.
        </p>
        <div style={styles.pill}>
          ● Live sanctions data · 290+ entries tracked
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionHeading}>What you can do</h2>
        <p style={styles.sectionSub}>
          Everything you need to keep transfers clean, in one place.
        </p>
        <div style={styles.cardGrid}>
          {features.map((f) => (
            <div key={f.title} style={{ ...styles.card, background: f.bg }}>
              <div style={{ ...styles.iconCircle, background: f.iconBg }}>
                {f.icon}
              </div>
              <h3 style={styles.cardTitle}>{f.title}</h3>
              <p style={styles.cardText}>{f.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.ctaBand}>
        <div>
          <p style={styles.ctaTitle}>Ready to screen your first name?</p>
          <p style={styles.ctaSub}>
            It takes seconds to check a name against active sanctions lists.
          </p>
        </div>
        <button
          onClick={() => handleNavigate(`/screenName`)}
          style={styles.button}
        >
          Go to Screen Name →
        </button>
      </div>

      <div style={styles.footer}>
        contact@curb.market &nbsp;·&nbsp; linkedin.com/company/curb
      </div>
    </div>
  );
}

export default Home;
