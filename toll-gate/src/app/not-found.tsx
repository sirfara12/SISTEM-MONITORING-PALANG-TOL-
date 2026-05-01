import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/404.module.css";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.dotLayer} aria-hidden="true">
        <Image
          src="/ascii.svg"
          alt=""
          width={1050}
          height={800}
          priority
          className={styles.dotImage}
        />
      </div>

      <div className={styles.topLeftBadge}>404</div>

      <div className={styles.content}>
        <Image
          src="/toll.svg"
          alt="Toll gate illustration"
          width={400}
          height={400}
          priority
          className={styles.tollImage}
        />
        <h1 className={`${styles.title} ${orbitron.className}`}>
          404, Page Not Found.
        </h1>
        <Link href="/" className={styles.button}>
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
