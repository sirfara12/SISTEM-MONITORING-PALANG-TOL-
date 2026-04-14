import "../styles/globals.css";
import type { AppProps } from "next/app";
import Sidebar from "@/components/sidebar/sidebar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Component {...pageProps} />
      </div>
    </div>
  );
}