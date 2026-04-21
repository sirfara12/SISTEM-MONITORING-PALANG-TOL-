import Sidebar from "@/components/sidebar/sidebar";
import styles from "@/styles/analytics.module.css";
import { Activity, Clock, Target, TrendingUp } from "lucide-react";
import dynamic from "next/dynamic";
import Head from "next/head";

// Fix for "The width(-1) and height(-1) of chart should be greater than 0"
// Recharts needs to be rendered on the client side only
const ResponsiveContainer = dynamic(
  () => import("recharts").then((mod) => mod.ResponsiveContainer),
  { ssr: false },
);
const AreaChart = dynamic(
  () => import("recharts").then((mod) => mod.AreaChart),
  { ssr: false },
);
const Area = dynamic(() => import("recharts").then((mod) => mod.Area), {
  ssr: false,
});
const BarChart = dynamic(() => import("recharts").then((mod) => mod.BarChart), {
  ssr: false,
});
const Bar = dynamic(() => import("recharts").then((mod) => mod.Bar), {
  ssr: false,
});
const LineChart = dynamic(
  () => import("recharts").then((mod) => mod.LineChart),
  { ssr: false },
);
const Line = dynamic(() => import("recharts").then((mod) => mod.Line), {
  ssr: false,
});
const PieChart = dynamic(() => import("recharts").then((mod) => mod.PieChart), {
  ssr: false,
});
const Pie = dynamic(() => import("recharts").then((mod) => mod.Pie), {
  ssr: false,
});
const Cell = dynamic(() => import("recharts").then((mod) => mod.Cell), {
  ssr: false,
});
const XAxis = dynamic(() => import("recharts").then((mod) => mod.XAxis), {
  ssr: false,
});
const YAxis = dynamic(() => import("recharts").then((mod) => mod.YAxis), {
  ssr: false,
});
const CartesianGrid = dynamic(
  () => import("recharts").then((mod) => mod.CartesianGrid),
  { ssr: false },
);
const Tooltip = dynamic(() => import("recharts").then((mod) => mod.Tooltip), {
  ssr: false,
});
const Legend = dynamic(() => import("recharts").then((mod) => mod.Legend), {
  ssr: false,
});

const volumeData = [
  { name: "00:00", entry: 12, exit: 10 },
  { name: "02:00", entry: 8, exit: 6 },
  { name: "04:00", entry: 5, exit: 4 },
  { name: "06:00", entry: 25, exit: 20 },
  { name: "08:00", entry: 45, exit: 40 },
  { name: "10:00", entry: 38, exit: 35 },
  { name: "12:00", entry: 42, exit: 38 },
  { name: "14:00", entry: 48, exit: 45 },
  { name: "16:00", entry: 55, exit: 50 },
  { name: "18:00", entry: 45, exit: 42 },
  { name: "20:00", entry: 32, exit: 30 },
  { name: "22:00", entry: 22, exit: 20 },
];

const validationData = [
  { name: "Accepted", value: 1847, color: "#10b981" },
  { name: "Rejected", value: 153, color: "#ef4444" },
];

const latencyData = [
  { name: "00:00", seconds: 145 },
  { name: "04:00", seconds: 132 },
  { name: "08:00", seconds: 158 },
  { name: "12:00", seconds: 172 },
  { name: "16:00", seconds: 165 },
  { name: "20:00", seconds: 140 },
];

const queueData = [
  { time: "06:00", seg: 2.5 },
  { time: "08:00", seg: 4.2 },
  { time: "10:00", seg: 3.1 },
  { time: "12:00", seg: 3.8 },
  { time: "14:00", seg: 2.9 },
  { time: "16:00", seg: 4.5 },
  { time: "18:00", seg: 5.2 },
  { time: "20:00", seg: 3.4 },
];

const weeklyTrafficData = [
  {
    day: "Mon",
    "00:00 - 06:00": 40,
    "06:00 - 12:00": 150,
    "12:00 - 18:00": 300,
    "18:00 - 24:00": 400,
  },
  {
    day: "Tue",
    "00:00 - 06:00": 35,
    "06:00 - 12:00": 140,
    "12:00 - 18:00": 280,
    "18:00 - 24:00": 380,
  },
  {
    day: "Wed",
    "00:00 - 06:00": 45,
    "06:00 - 12:00": 160,
    "12:00 - 18:00": 320,
    "18:00 - 24:00": 420,
  },
  {
    day: "Thu",
    "00:00 - 06:00": 50,
    "06:00 - 12:00": 170,
    "12:00 - 18:00": 340,
    "18:00 - 24:00": 440,
  },
  {
    day: "Fri",
    "00:00 - 06:00": 55,
    "06:00 - 12:00": 180,
    "12:00 - 18:00": 360,
    "18:00 - 24:00": 460,
  },
  {
    day: "Sat",
    "00:00 - 06:00": 30,
    "06:00 - 12:00": 120,
    "12:00 - 18:00": 250,
    "18:00 - 24:00": 350,
  },
  {
    day: "Sun",
    "00:00 - 06:00": 25,
    "06:00 - 12:00": 100,
    "12:00 - 18:00": 220,
    "18:00 - 24:00": 320,
  },
];

// Format seconds to mm:ss format
const formatTravelTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}m ${secs}s`;
};

const AnalyticsPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Data Analytics | Smart Toll Gate</title>
      </Head>

      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1 className={styles.title}>DATA ANALYTICS</h1>
          <p className={styles.subtitle}>
            Traffic insights and system performance metrics
          </p>
        </header>

        {/* Top Stats */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <TrendingUp size={16} />
              <span>Peak Hour</span>
            </div>
            <div className={`${styles.statValue} ${styles.textCyan}`}>
              16:00
            </div>
            <div className={styles.statMeta}>55 vehicles/hour</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <Activity size={16} />
              <span>Avg Travel Time</span>
            </div>
            <div className={`${styles.statValue} ${styles.textGreen}`}>
              2m 32s
            </div>
            <div className={styles.statMeta}>Average toll duration</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <Target size={16} />
              <span>Success Rate</span>
            </div>
            <div className={`${styles.statValue} ${styles.textPurple}`}>
              92.3%
            </div>
            <div className={styles.statMeta}>Acceptance ratio</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <Clock size={16} />
              <span>Avg Queue Time</span>
            </div>
            <div className={`${styles.statValue} ${styles.textYellow}`}>
              3.7s
            </div>
            <div className={styles.statMeta}>Per vehicle</div>
          </div>
        </div>

        {/* Volume Chart */}
        <section className={styles.chartSection}>
          <h2 className={styles.chartTitle}>
            Traffic Volume - Hourly Breakdown
          </h2>
          <div style={{ height: 350 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={volumeData}>
                <defs>
                  <linearGradient id="colorEntry" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorExit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1e293b"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#64748b"
                  fontSize={10}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={10}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #1e293b",
                    borderRadius: "8px",
                  }}
                  itemStyle={{ color: "#f8fafc" }}
                />
                <Area
                  type="monotone"
                  dataKey="entry"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorEntry)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="exit"
                  stroke="#00d4ff"
                  fillOpacity={1}
                  fill="url(#colorExit)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div
            className={styles.pieLegend}
            style={{ justifyContent: "center" }}
          >
            <div className={styles.legendItem}>
              <div
                className={styles.dot}
                style={{ backgroundColor: "#10b981" }}
              ></div>{" "}
              Entry
            </div>
            <div className={styles.legendItem}>
              <div
                className={styles.dot}
                style={{ backgroundColor: "#00d4ff" }}
              ></div>{" "}
              Exit
            </div>
          </div>
        </section>

        {/* Two Columns Section */}
        <div className={styles.chartRow}>
          <section className={styles.chartSection} style={{ marginBottom: 0 }}>
            <h2 className={styles.chartTitle}>Access Validation</h2>
            <div className={styles.pieContainer}>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={validationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {validationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className={styles.pieLegend}>
                <div className={styles.legendItem}>
                  <div
                    className={styles.dot}
                    style={{ backgroundColor: "#10b981" }}
                  ></div>{" "}
                  Accepted: 1,847
                </div>
                <div className={styles.legendItem}>
                  <div
                    className={styles.dot}
                    style={{ backgroundColor: "#ef4444" }}
                  ></div>{" "}
                  Rejected: 153
                </div>
              </div>
            </div>
          </section>

          <section className={styles.chartSection} style={{ marginBottom: 0 }}>
            <h2 className={styles.chartTitle}>
              Avg Travel Time - Hourly Trend
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={latencyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1e293b"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#64748b"
                  fontSize={10}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={10}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 200]}
                />
                <Tooltip
                  formatter={(value: number) => formatTravelTime(value)}
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #1e293b",
                    borderRadius: "8px",
                  }}
                  itemStyle={{ color: "#f8fafc" }}
                />
                <Line
                  type="monotone"
                  dataKey="seconds"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  dot={{ fill: "#f59e0b", r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </section>
        </div>

        {/* Weekly Traffic Heatmap */}
        <section className={styles.chartSection} style={{ marginTop: "2rem" }}>
          <h2 className={styles.chartTitle}>WEEKLY TRAFFIC HEATMAP</h2>
          <div style={{ padding: "0 20px" }}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyTrafficData} barGap={8}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1e293b"
                  vertical={false}
                />
                <XAxis
                  dataKey="day"
                  stroke="#64748b"
                  fontSize={12}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={12}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 800]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #1e293b",
                    borderRadius: "8px",
                  }}
                  itemStyle={{ fontSize: "12px" }}
                />
                <Bar
                  dataKey="00:00 - 06:00"
                  stackId="a"
                  fill="#a855f7"
                  radius={[0, 0, 0, 0]}
                />
                <Bar
                  dataKey="06:00 - 12:00"
                  stackId="a"
                  fill="#00d4ff"
                  radius={[0, 0, 0, 0]}
                />
                <Bar
                  dataKey="12:00 - 18:00"
                  stackId="a"
                  fill="#f59e0b"
                  radius={[0, 0, 0, 0]}
                />
                <Bar
                  dataKey="18:00 - 24:00"
                  stackId="a"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
            <div
              className={styles.pieLegend}
              style={{
                justifyContent: "center",
                marginTop: "1.5rem",
                flexWrap: "wrap",
              }}
            >
              <div className={styles.legendItem}>
                <div
                  className={styles.dot}
                  style={{ backgroundColor: "#a855f7" }}
                ></div>{" "}
                00:00 - 06:00
              </div>
              <div className={styles.legendItem}>
                <div
                  className={styles.dot}
                  style={{ backgroundColor: "#00d4ff" }}
                ></div>{" "}
                06:00 - 12:00
              </div>
              <div className={styles.legendItem}>
                <div
                  className={styles.dot}
                  style={{ backgroundColor: "#f59e0b" }}
                ></div>{" "}
                12:00 - 18:00
              </div>
              <div className={styles.legendItem}>
                <div
                  className={styles.dot}
                  style={{ backgroundColor: "#10b981" }}
                ></div>{" "}
                18:00 - 24:00
              </div>
            </div>
          </div>
        </section>

        {/* Queue Time Section */}
        <section className={styles.chartSection} style={{ marginTop: "2rem" }}>
          <h2 className={styles.chartTitle}>Average Queue Time Estimation</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={queueData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1e293b"
                vertical={false}
              />
              <XAxis
                dataKey="time"
                stroke="#64748b"
                fontSize={10}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                stroke="#64748b"
                fontSize={10}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip />
              <Bar
                dataKey="seg"
                fill="#10b981"
                radius={[4, 4, 0, 0]}
                barSize={60}
              />
            </BarChart>
          </ResponsiveContainer>
        </section>

        <div style={{ height: "50px" }}></div>
      </main>
    </div>
  );
};

export default AnalyticsPage;
