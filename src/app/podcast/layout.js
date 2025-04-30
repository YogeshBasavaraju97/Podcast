'use client';

import Sidebar from "@/components/sideBar/Sidebar";
import styles from './AddPodcastLayout.module.css';
import Breadcrumbs from "@/components/breadcrumbs/BreadCrumbs";


export default function AddPodcastLayout({ children }) {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>
      <main className={styles.main}>

        <Breadcrumbs />
        {children}
      </main>
    </div>
  );
}
