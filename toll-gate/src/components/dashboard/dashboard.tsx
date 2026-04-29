import { useEffect, useState } from "react";
import mqtt from "mqtt";
import {
  DoorOpen,
  DoorClosed,
  CheckCircle,
  XCircle,
  Car,
  Clock,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import styles from "@/styles/dashboard.module.css";

type GateStatus = "OPEN" | "CLOSED";
type TrafficLevel = "SMOOTH" | "MODERATE" | "CONGESTED";
type Transaction = {
  id: string;
  cardId: string;
  date: string;
  time: string;
  status: "ACCEPTED" | "REJECTED";
  gate: "ENTRY" | "EXIT";
};

export function Dashboard() {
  const [entryGateStatus, setEntryGateStatus] = useState<GateStatus>("CLOSED");
  const [exitGateStatus, setExitGateStatus] = useState<GateStatus>("CLOSED");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [vehiclesEntered, setVehiclesEntered] = useState(0);
  const [vehiclesExited, setVehiclesExited] = useState(0);
  const [trafficLevel, setTrafficLevel] = useState<TrafficLevel>("SMOOTH");
  const [responseTime, setResponseTime] = useState(0); // Bisa untuk data ultrasonik / travel time nanti

  // Format seconds to mm:ss format
  const formatTravelTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  // ==========================================
  // KONEKSI MQTT (HIVEMQ OVER WEBSOCKETS)
  // ==========================================
  useEffect(() => {
    // Port 8884 wajib untuk WebSockets HiveMQ Cloud
    const brokerUrl =
      "wss://fe30660ee0264ad6adb0b772e3d11a56.s1.eu.hivemq.cloud:8884/mqtt";

    const client = mqtt.connect(brokerUrl, {
      username: "esp32",
      password: "Esp12345",
      clientId: `nextjs-dashboard-${Math.random().toString(16).substring(2, 8)}`,
    });

    client.on("connect", () => {
      console.log("Berhasil terhubung ke HiveMQ (WebSockets)!");
      client.subscribe("tol/gate1/#", (err) => {
        if (!err) {
          console.log("Subscribed ke topik: tol/gate1/#");
        }
      });
    });

    client.on("message", (topic, message) => {
      const payload = message.toString();
      console.log(`Pesan masuk [${topic}]: ${payload}`);

      // 1. UPDATE STATUS PALANG
      if (topic === "tol/gate1/palang") {
        setEntryGateStatus(payload === "OPEN" ? "OPEN" : "CLOSED");
      }

      // 2. TANGKAP EVENT TRANSAKSI (DITERIMA / DITOLAK) DARI JSON ESP32
      if (topic === "tol/gate1/event") {
        try {
          const data = JSON.parse(payload); // Parse string JSON jadi objek JS

          const now = new Date();
          const timeString = now.toLocaleTimeString("en-US", { hour12: false });
          const dateString = now.toISOString().split("T")[0];

          // Buat baris transaksi baru
          const newTransaction: Transaction = {
            id: Date.now().toString(),
            cardId: data.uid,
            date: dateString,
            time: timeString,
            // Deteksi status dari ESP32
            status: data.status === "DITERIMA" ? "ACCEPTED" : "REJECTED",
            gate: "ENTRY",
          };

          // Simpan ke tabel (maksimal 10 data terbaru)
          setTransactions((prev) => [newTransaction, ...prev].slice(0, 10));

          // Update angka kendaraan masuk mengambil dari "total" di JSON
          if (data.status === "DITERIMA" && data.total !== undefined) {
            setVehiclesEntered(data.total);
          }
        } catch (error) {
          console.error("Gagal membaca JSON dari ESP32:", error);
        }
      }

      // 3. (Opsional) UPDATE JARAK ULTRASONIK DI LAYAR JIKA PERLU
      if (topic === "tol/gate1/distance") {
        // Contoh jika ingin mengubah responseTime jadi indikator jarak (sementara):
        // setResponseTime(Number(payload));
      }
    });

    return () => {
      if (client) {
        client.end();
      }
    };
  }, []);

  // ==========================================
  // LOGIKA STATUS KEMACETAN (TRAFFIC LEVEL)
  // ==========================================
  useEffect(() => {
    const vehiclesInside = vehiclesEntered - vehiclesExited;
    if (vehiclesInside > 30) {
      setTrafficLevel("CONGESTED");
    } else if (vehiclesInside > 15) {
      setTrafficLevel("MODERATE");
    } else {
      setTrafficLevel("SMOOTH");
    }
  }, [vehiclesEntered, vehiclesExited]);

  const handleGateControl = (
    gate: "ENTRY" | "EXIT",
    action: "OPEN" | "CLOSE",
  ) => {
    // Fungsi ini untuk tombol manual di web, tidak merubah status otomatis dari ESP
    if (gate === "ENTRY") {
      setEntryGateStatus(action);
    } else {
      setExitGateStatus(action);
    }
  };

  const getTrafficStatusClass = () => {
    switch (trafficLevel) {
      case "SMOOTH":
        return styles.trafficSmooth;
      case "MODERATE":
        return styles.trafficModerate;
      case "CONGESTED":
        return styles.trafficCongested;
    }
  };

  return (
    <main className={styles.mainContent}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>REAL-TIME MONITORING</h1>
          <p>Live system status and gate control</p>
        </div>
        <div className={`${styles.trafficStatus} ${getTrafficStatusClass()}`}>
          <div className={styles.statusIndicator} />
          <span className={styles.statusText}>{trafficLevel}</span>
        </div>
      </div>

      {/* Vehicle Counters */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <ArrowRight size={16} style={{ color: "#00d4ff" }} />
            <span>VEHICLES ENTERED</span>
          </div>
          <p className={`${styles.statValue} ${styles.textCyan}`}>
            {vehiclesEntered}
          </p>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <ArrowLeft size={16} style={{ color: "#ec4899" }} />
            <span>VEHICLES EXITED</span>
          </div>
          <p className={`${styles.statValue} ${styles.textMagenta}`}>
            {vehiclesExited}
          </p>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <Car size={16} style={{ color: "#10b981" }} />
            <span>CURRENTLY INSIDE</span>
          </div>
          <p className={`${styles.statValue} ${styles.textGreen}`}>
            {vehiclesEntered - vehiclesExited}
          </p>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <Clock size={16} style={{ color: "#f59e0b" }} />
            <span>AVG TRAVEL TIME</span>
          </div>
          <p className={`${styles.statValue} ${styles.textYellow}`}>
            {formatTravelTime(responseTime)}
          </p>
        </div>
      </div>

      {/* Gate Monitoring */}
      <div className={styles.gateGrid}>
        {/* Entry Gate */}
        <div className={styles.gateCard}>
          <div className={styles.gateHeader}>
            <h3 className={styles.gateTitle} style={{ color: "#00d4ff" }}>
              ENTRY GATE
            </h3>
          </div>
          <div className={styles.gateContent}>
            <div className={styles.gateStatus}>
              <div className={styles.gateStatusLeft}>
                {entryGateStatus === "OPEN" ? (
                  <DoorOpen
                    size={40}
                    style={{ color: "#00d4ff" }}
                    strokeWidth={1}
                  />
                ) : (
                  <DoorClosed
                    size={40}
                    style={{ color: "#64748b" }}
                    strokeWidth={1}
                  />
                )}
                <div>
                  <p className={styles.gateStatusLabel}>STATUS</p>
                  <p
                    className={styles.gateStatusValue}
                    style={{
                      color: entryGateStatus === "OPEN" ? "#00d4ff" : "#64748b",
                    }}
                  >
                    {entryGateStatus}
                  </p>
                </div>
              </div>
              <div
                className={`${styles.gateIndicator} ${
                  entryGateStatus === "OPEN" ? styles.gateIndicatorActive : ""
                }`}
              >
                <div
                  className={`${styles.gateIndicatorDot} ${
                    entryGateStatus === "OPEN"
                      ? styles.gateIndicatorDotActive
                      : ""
                  }`}
                />
              </div>
            </div>

            <div className={styles.gateButtons}>
              <button
                onClick={() => handleGateControl("ENTRY", "OPEN")}
                disabled={entryGateStatus === "OPEN"}
                className={`${styles.gateBtn} ${styles.gateBtnOpen} ${
                  entryGateStatus === "OPEN" ? styles.gateBtnDisabled : ""
                }`}
              >
                OPEN GATE
              </button>
              <button
                onClick={() => handleGateControl("ENTRY", "CLOSE")}
                disabled={entryGateStatus === "CLOSED"}
                className={`${styles.gateBtn} ${styles.gateBtnClose} ${
                  entryGateStatus === "CLOSED" ? styles.gateBtnDisabled : ""
                }`}
              >
                CLOSE GATE
              </button>
            </div>
          </div>
        </div>

        {/* Exit Gate */}
        <div className={styles.gateCard}>
          <div className={styles.gateHeader}>
            <h3 className={styles.gateTitle} style={{ color: "#ec4899" }}>
              EXIT GATE
            </h3>
          </div>
          <div className={styles.gateContent}>
            <div className={styles.gateStatus}>
              <div className={styles.gateStatusLeft}>
                {exitGateStatus === "OPEN" ? (
                  <DoorOpen
                    size={40}
                    style={{ color: "#ec4899" }}
                    strokeWidth={1}
                  />
                ) : (
                  <DoorClosed
                    size={40}
                    style={{ color: "#64748b" }}
                    strokeWidth={1}
                  />
                )}
                <div>
                  <p className={styles.gateStatusLabel}>STATUS</p>
                  <p
                    className={styles.gateStatusValue}
                    style={{
                      color: exitGateStatus === "OPEN" ? "#ec4899" : "#64748b",
                    }}
                  >
                    {exitGateStatus}
                  </p>
                </div>
              </div>
              <div
                className={`${styles.gateIndicator} ${
                  exitGateStatus === "OPEN" ? styles.gateIndicatorActive : ""
                }`}
                style={{
                  borderColor:
                    exitGateStatus === "OPEN"
                      ? "rgba(236, 72, 153, 0.3)"
                      : undefined,
                }}
              >
                <div
                  className={`${styles.gateIndicatorDot} ${
                    exitGateStatus === "OPEN"
                      ? styles.gateIndicatorDotActive
                      : ""
                  }`}
                  style={{
                    background:
                      exitGateStatus === "OPEN" ? "#ec4899" : "#64748b",
                  }}
                />
              </div>
            </div>

            <div className={styles.gateButtons}>
              <button
                onClick={() => handleGateControl("EXIT", "OPEN")}
                disabled={exitGateStatus === "OPEN"}
                className={`${styles.gateBtn} ${styles.gateBtnOpen} ${
                  exitGateStatus === "OPEN" ? styles.gateBtnDisabled : ""
                }`}
              >
                OPEN GATE
              </button>
              <button
                onClick={() => handleGateControl("EXIT", "CLOSE")}
                disabled={exitGateStatus === "CLOSED"}
                className={`${styles.gateBtn} ${styles.gateBtnClose} ${
                  exitGateStatus === "CLOSED" ? styles.gateBtnDisabled : ""
                }`}
              >
                CLOSE GATE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Live Transaction Feed */}
      <div className={styles.transactionCard}>
        <div className={styles.transactionHeader}>
          <h3 className={styles.transactionTitle}>LIVE TRANSACTION FEED</h3>
          <div className={styles.realTimeIndicator}>
            <div className={styles.realTimeDot} />
            <span className={styles.realTimeText}>REAL-TIME</span>
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className={styles.transactionTable}>
            <thead>
              <tr>
                <th className={styles.tableHeaderCell}>CARD ID</th>
                <th className={styles.tableHeaderCell}>GATE</th>
                <th className={styles.tableHeaderCell}>DATE</th>
                <th className={styles.tableHeaderCell}>ACCESS TIME</th>
                <th className={styles.tableHeaderCell}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    style={{
                      textAlign: "center",
                      padding: "20px",
                      color: "#64748b",
                    }}
                  >
                    Menunggu data RFID... Tap kartu di Wokwi.
                  </td>
                </tr>
              ) : (
                transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className={`${styles.tableBodyRow} ${
                      transaction.status === "ACCEPTED"
                        ? styles.tableBodyRowAccepted
                        : styles.tableBodyRowRejected
                    }`}
                  >
                    <td
                      className={`${styles.tableCell} ${styles.tableCellCardId}`}
                    >
                      {transaction.cardId}
                    </td>
                    <td className={styles.tableCell}>
                      <span className={styles.gateTag}>
                        {transaction.gate === "ENTRY" ? (
                          <ArrowRight size={14} style={{ color: "#00d4ff" }} />
                        ) : (
                          <ArrowLeft size={14} style={{ color: "#ec4899" }} />
                        )}
                        {transaction.gate}
                      </span>
                    </td>
                    <td
                      className={`${styles.tableCell} ${styles.tableCellTime}`}
                    >
                      {transaction.date}
                    </td>
                    <td
                      className={`${styles.tableCell} ${styles.tableCellTime}`}
                    >
                      {transaction.time}
                    </td>
                    <td className={styles.tableCell}>
                      <div className={styles.statusBadge}>
                        {transaction.status === "ACCEPTED" ? (
                          <>
                            <CheckCircle
                              size={18}
                              style={{ color: "#10b981" }}
                            />
                            <span className={styles.statusAccepted}>
                              ACCEPTED
                            </span>
                          </>
                        ) : (
                          <>
                            <XCircle size={18} style={{ color: "#ec4899" }} />
                            <span className={styles.statusRejected}>
                              REJECTED
                            </span>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </main>
  );
}
