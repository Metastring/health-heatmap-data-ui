import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Health Heatmap Data Management</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome</h1>
        <p>Data can be edited here</p>
        <ul>
          <li>
            <Link href="/datafiles">
              <a>See Datafiles</a>
            </Link>
          </li>
        </ul>
      </main>
    </div>
  );
}
