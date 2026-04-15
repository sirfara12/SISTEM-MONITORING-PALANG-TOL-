import "../styles/globals.css";
import type { AppProps } from "next/app";
import Sidebar from "@/components/sidebar/sidebar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: "250px" }}>
        <Component {...pageProps} />
      </div>
    </div>
  );
}
