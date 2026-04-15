import { BarChart2, Database, LayoutDashboard, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const router = useRouter();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoSection}>
        <div className={styles.logoIcon}>
          <div className={styles.innerCircle}></div>
        </div>
        <div>
          <h1 className={styles.logoTitle}>TOLL GATE</h1>
          <p className={styles.logoSubtitle}>KELOMPOK 5</p>
        </div>
      </div>

      <nav className={styles.nav}>
        <Link
          href="/"
          className={`${styles.navItem} ${router.pathname === "/" ? styles.active : ""}`}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>
        <Link
          href="/analytics"
          className={`${styles.navItem} ${router.pathname === "/analytics" ? styles.active : ""}`}
        >
          <BarChart2 size={20} />
          <span>Analytics</span>
        </Link>
        <Link
          href="/management"
          className={`${styles.navItem} ${router.pathname === "/management" ? styles.active : ""}`}
        >
          <Database
            size={20}
            fill={router.pathname === "/management" ? "currentColor" : "none"}
          />
          <span>Management</span>
        </Link>
      </nav>

      <div className={styles.sidebarFooter}>
        <div className={styles.statusSection}>
          <span className={styles.statusLabel}>SYSTEM STATUS</span>
          <span className={styles.statusText}>ONLINE</span>
        </div>
        <div className={styles.footerIcon}>
          <Settings size={18} />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
