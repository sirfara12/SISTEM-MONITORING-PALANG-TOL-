import Sidebar from "@/components/sidebar/sidebar";
import Head from "next/head";

export default function Home() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0b1426' }}>
      <Head>
        <title>Dashboard | Smart Toll Gate</title>
      </Head>

      <Sidebar />

      <main style={{ flex: 1, padding: '2rem', marginLeft: '250px' }}>
        <header style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', letterSpacing: '1px' }}>DASHBOARD</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.5rem' }}>Welcome to the system overview</p>
        </header>

        <div style={{ 
          padding: '60px', 
          textAlign: 'center', 
          border: '1px dashed #1e293b', 
          borderRadius: '16px',
          backgroundColor: '#0f172a',
          color: '#94a3b8' 
        }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 500 }}>Ini halaman dashboard</h2>
          <p style={{ fontSize: '0.85rem', marginTop: '10px' }}>Halaman ini sedang dikerjakan</p>
        </div>
      </main>
    </div>
  );
}