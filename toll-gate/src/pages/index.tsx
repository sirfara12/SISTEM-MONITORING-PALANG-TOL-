import Sidebar from "@/components/sidebar/sidebar";
import { Dashboard } from "@/components/dashboard/dashboard";
import Head from "next/head";
import styles from "@/styles/dashboard.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Dashboard | Smart Toll Gate</title>
      </Head>

      <Sidebar />
      <Dashboard />
    </div>
  );
}
