import { useEffect, useState } from "react";
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
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      cardId: "RFID-5555",
      date: "2026-04-21",
      time: "11:48:44",
      status: "REJECTED",
      gate: "EXIT",
    },
    {
      id: "2",
      cardId: "RFID-5555",
      date: "2026-04-21",
      time: "11:45:56",
      status: "ACCEPTED",
      gate: "ENTRY",
    },
    {
      id: "3",
      cardId: "RFID-7832",
      date: "2026-04-21",
      time: "11:45:41",
      status: "ACCEPTED",
      gate: "EXIT",
    },
    {
      id: "4",
      cardId: "RFID-9901",
      date: "2026-04-21",
      time: "11:45:38",
      status: "REJECTED",
      gate: "ENTRY",
    },
    {
      id: "5",
      cardId: "RFID-7832",
      date: "2026-04-21",
      time: "11:45:16",
      status: "ACCEPTED",
      gate: "ENTRY",
    },
    {
      id: "6",
      cardId: "RFID-6678",
      date: "2026-04-21",
      time: "11:45:18",
      status: "ACCEPTED",
      gate: "EXIT",
    },
    {
      id: "7",
      cardId: "RFID-4521",
      date: "2026-04-21",
      time: "11:45:07",
      status: "ACCEPTED",
      gate: "EXIT",
    },
    {
      id: "8",
      cardId: "RFID-4521",
      date: "2026-04-21",
      time: "11:23:45",
      status: "ACCEPTED",
      gate: "ENTRY",
    },
    {
      id: "9",
      cardId: "RFID-7832",
      date: "2026-04-21",
      time: "11:23:12",
      status: "ACCEPTED",
      gate: "EXIT",
    },
    {
      id: "10",
      cardId: "RFID-9901",
      date: "2026-04-21",
      time: "11:22:58",
      status: "REJECTED",
      gate: "ENTRY",
    },
  ]);
  const [vehiclesEntered, setVehiclesEntered] = useState(248);
  const [vehiclesExited, setVehiclesExited] = useState(234);
  const [trafficLevel, setTrafficLevel] = useState<TrafficLevel>("SMOOTH");
  const [responseTime, setResponseTime] = useState(182);

  // Dummy avg travel time per card ID (in seconds)
  const cardTravelTimes: { [key: string]: number } = {
    "RFID-4521": 145,
    "RFID-7832": 182,
    "RFID-9901": 156,
    "RFID-3345": 198,
    "RFID-6678": 165,
  };

  // Format seconds to mm:ss format
  const formatTravelTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const cardIds = [
          "RFID-4521",
          "RFID-7832",
          "RFID-9901",
          "RFID-3345",
          "RFID-6678",
        ];
        const isAccepted = Math.random() > 0.2;
        const isEntry = Math.random() > 0.5;
        const now = new Date();
        const timeString = now.toLocaleTimeString("en-US", { hour12: false });
        const dateString = now.toISOString().split("T")[0];

        const selectedCardId =
          cardIds[Math.floor(Math.random() * cardIds.length)];

        const newTransaction: Transaction = {
          id: Date.now().toString(),
          cardId: selectedCardId,
          date: dateString,
          time: timeString,
          status: isAccepted ? "ACCEPTED" : "REJECTED",
          gate: isEntry ? "ENTRY" : "EXIT",
        };

        setTransactions((prev) => [newTransaction, ...prev].slice(0, 10));

        if (isAccepted) {
          if (isEntry) {
            setVehiclesEntered((prev) => prev + 1);
          } else {
            setVehiclesExited((prev) => prev + 1);
          }
          // Set response time based on card ID
          setResponseTime(cardTravelTimes[selectedCardId] || 160);
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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
              {transactions.map((transaction) => (
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
                  <td className={`${styles.tableCell} ${styles.tableCellTime}`}>
                    {transaction.date}
                  </td>
                  <td className={`${styles.tableCell} ${styles.tableCellTime}`}>
                    {transaction.time}
                  </td>
                  <td className={styles.tableCell}>
                    <div className={styles.statusBadge}>
                      {transaction.status === "ACCEPTED" ? (
                        <>
                          <CheckCircle size={18} style={{ color: "#10b981" }} />
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
              ))}
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
