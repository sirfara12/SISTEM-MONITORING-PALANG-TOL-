import Sidebar from "@/components/sidebar/sidebar";
import styles from "@/styles/management.module.css";
import {
  Calendar,
  CreditCard,
  Download,
  FileText,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import Head from "next/head";
import React, { useMemo, useState } from "react";

const initialCardData = [
  { uid: "RFID-4521", owner: "John Doe", date: "2026-01-15", status: "ACTIVE" },
  {
    uid: "RFID-7832",
    owner: "Jane Smith",
    date: "2026-02-08",
    status: "ACTIVE",
  },
  {
    uid: "RFID-3345",
    owner: "Bob Johnson",
    date: "2026-03-12",
    status: "ACTIVE",
  },
  {
    uid: "RFID-6678",
    owner: "Alice Williams",
    date: "2026-03-25",
    status: "ACTIVE",
  },
  {
    uid: "RFID-1234",
    owner: "Charlie Brown",
    date: "2026-04-01",
    status: "INACTIVE",
  },
];

const ManagementPage = () => {
  const [cards, setCards] = useState(initialCardData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCard, setNewCard] = useState({
    uid: "",
    owner: "",
    status: "ACTIVE",
  });

  // Search Logic
  const filteredCards = useMemo(() => {
    return cards.filter(
      (card) =>
        card.uid.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.owner.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [cards, searchTerm]);

  // Stats Logic
  const stats = useMemo(
    () => ({
      total: cards.length,
      active: cards.filter((c) => c.status === "ACTIVE").length,
      inactive: cards.filter((c) => c.status === "INACTIVE").length,
    }),
    [cards],
  );

  // Export Logic
  const exportToCSV = (data: any[], filename: string) => {
    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(","));

    for (const row of data) {
      const values = headers.map((header) => {
        const val = row[header];
        return `"${val}"`;
      });
      csvRows.push(values.join(","));
    }

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportCards = () => {
    if (cards.length === 0) return;
    exportToCSV(cards, "rfid_cards_registry.csv");
  };

  const handleExportLogs = () => {
    const fakeLogs = [
      {
        timestamp: "2026-04-14 08:30:12",
        uid: "RFID-4521",
        action: "ENTRY",
        status: "SUCCESS",
      },
      {
        timestamp: "2026-04-14 09:15:45",
        uid: "RFID-7832",
        action: "ENTRY",
        status: "SUCCESS",
      },
      {
        timestamp: "2026-04-14 10:05:22",
        uid: "RFID-1234",
        action: "ENTRY",
        status: "REJECTED",
      },
    ];
    exportToCSV(fakeLogs, "transaction_logs.csv");
  };

  // Add Card Logic
  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCard.uid || !newCard.owner) return;

    const today = new Date().toISOString().split("T")[0];
    const cardToAdd = { ...newCard, date: today };

    setCards([cardToAdd, ...cards]);
    setNewCard({ uid: "", owner: "", status: "ACTIVE" });
    setIsModalOpen(false);
  };

  // Delete Logic
  const handleDelete = (uid: string) => {
    if (confirm(`Are you sure you want to delete card ${uid}?`)) {
      setCards(cards.filter((c) => c.uid !== uid));
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Data Management | Smart Toll Gate</title>
      </Head>

      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1 className={styles.title}>DATA MANAGEMENT</h1>
          <p className={styles.subtitle}>
            Manage RFID cards and export system logs
          </p>
        </header>

        {/* Stats Section */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <CreditCard size={14} />
              <span>Total Cards</span>
            </div>
            <div className={`${styles.statValue} ${styles.textCyan}`}>
              {stats.total}
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <CreditCard size={14} />
              <span>Active Cards</span>
            </div>
            <div className={`${styles.statValue} ${styles.textGreen}`}>
              {stats.active}
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <CreditCard size={14} />
              <span>Inactive Cards</span>
            </div>
            <div className={`${styles.statValue} ${styles.textRed}`}>
              {stats.inactive}
            </div>
          </div>
        </div>

        {/* Export Section */}
        <div className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>Export System Logs</h2>
          <div className={styles.exportButtons}>
            <button
              onClick={handleExportCards}
              className={`${styles.exportBtn} ${styles.btnCyan}`}
            >
              <Download size={18} />
              <span>Export Cards (CSV)</span>
            </button>
            <button
              onClick={handleExportLogs}
              className={`${styles.exportBtn} ${styles.btnGreen}`}
            >
              <FileText size={18} />
              <span>Export Transaction Logs</span>
            </button>
          </div>
          <p className={styles.btnDesc}>
            Generate comprehensive reports including all gate transactions,
            access logs, and system events
          </p>
        </div>

        {/* RFID Card Registry Section */}
        <div className={styles.sectionCard}>
          <div className={styles.registryHeader}>
            <h2 className={styles.sectionTitle} style={{ marginBottom: 0 }}>
              RFID CARD REGISTRY
            </h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className={styles.addBtn}
            >
              <Plus size={16} />
              <span>Add Card</span>
            </button>
          </div>

          <div className={styles.searchContainer}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by UID or owner name..."
              className={`${styles.searchInput} ${styles.searchIconPadding}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <table className={styles.tableContainer}>
            <thead>
              <tr>
                <th className={styles.tableHeader}>Card UID</th>
                <th className={styles.tableHeader}>Owner</th>
                <th className={styles.tableHeader}>Registered Date</th>
                <th className={styles.tableHeader}>Status</th>
                <th className={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCards.map((card) => (
                <tr key={card.uid} className={styles.row}>
                  <td className={`${styles.cell} ${styles.uid}`}>{card.uid}</td>
                  <td
                    className={styles.cell}
                    style={{ color: "white", fontWeight: 500 }}
                  >
                    {card.owner}
                  </td>
                  <td className={styles.cell}>
                    <div className={styles.dateCell}>
                      <Calendar size={14} />
                      {card.date}
                    </div>
                  </td>
                  <td className={styles.cell}>
                    <span
                      className={`${styles.statusBadge} ${card.status === "ACTIVE" ? styles.activeBadge : styles.inactiveBadge}`}
                    >
                      {card.status}
                    </span>
                  </td>
                  <td className={styles.cell}>
                    <button
                      onClick={() => handleDelete(card.uid)}
                      className={styles.deleteBtn}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredCards.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    style={{
                      textAlign: "center",
                      padding: "2rem",
                      color: "#64748b",
                    }}
                  >
                    No cards found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Simple Modal for Adding Card */}
        {isModalOpen && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                backgroundColor: "#0f172a",
                padding: "2rem",
                borderRadius: "12px",
                border: "1px solid #1e293b",
                width: "400px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "1.5rem",
                }}
              >
                <h3 style={{ color: "white", margin: 0 }}>Add New RFID Card</h3>
                <X
                  size={20}
                  color="#64748b"
                  style={{ cursor: "pointer" }}
                  onClick={() => setIsModalOpen(false)}
                />
              </div>
              <form
                onSubmit={handleAddCard}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div>
                  <label
                    style={{
                      color: "#94a3b8",
                      fontSize: "0.8rem",
                      display: "block",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Card UID
                  </label>
                  <input
                    required
                    className={styles.searchInput}
                    placeholder="e.g. RFID-9999"
                    value={newCard.uid}
                    onChange={(e) =>
                      setNewCard({ ...newCard, uid: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    style={{
                      color: "#94a3b8",
                      fontSize: "0.8rem",
                      display: "block",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Owner Name
                  </label>
                  <input
                    required
                    className={styles.searchInput}
                    placeholder="Full Name"
                    value={newCard.owner}
                    onChange={(e) =>
                      setNewCard({ ...newCard, owner: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    style={{
                      color: "#94a3b8",
                      fontSize: "0.8rem",
                      display: "block",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Status
                  </label>
                  <select
                    className={styles.searchInput}
                    style={{ appearance: "none" }}
                    value={newCard.status}
                    onChange={(e) =>
                      setNewCard({ ...newCard, status: e.target.value })
                    }
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className={styles.addBtn}
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    marginTop: "1rem",
                    padding: "1rem",
                  }}
                >
                  Save Card
                </button>
              </form>
            </div>
          </div>
        )}

        <div style={{ height: "50px" }}></div>
      </main>
    </div>
  );
};

export default ManagementPage;
