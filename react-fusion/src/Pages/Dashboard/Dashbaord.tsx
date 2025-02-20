import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <div className={styles.dashboardContainer}>
      <nav className={styles.navbar}>
        <h1 className={styles.navbarTitle}>Dashboard</h1>
        <div>
          {user ? (
            <div className={styles.userSection}>
              <span className={styles.navbarUser}>
                👋 Welcome, <b>{user.name || "User"}</b>!
              </span>
              <button onClick={handleLogout} className={styles.navbarLogout}>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/" className={styles.navbarLogin}>Login</Link>
          )}
        </div>
      </nav>

      <div className={styles.contentGrid}>
        {[
          { title: "Counter", path: "/counter" },
          { title: "Rich Text Editor", path: "/texteditor" },
          { title: "User Form", path: "/UserForm" },
          { title: "More", path: "#" }
        ].map((item, index) => (
          <div key={index} className={styles.contentBox}>
            <h1>{item.title}</h1>
            <Link to={item.path}>
              <img style={{height:"60px", width:"60px"}} className={styles.arrowIcon} src="/arrow.png" alt="Go" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

