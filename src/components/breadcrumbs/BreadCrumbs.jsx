'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { SlHome } from 'react-icons/sl';
import styles from './Breadcrumbs.module.css';

import { FiBell, FiLogOut } from "react-icons/fi";
import axios from 'axios';
import { useRouter } from 'next/navigation';

const segmentNameMap = {
  projects: 'Sample Project',
  'add-podcast': 'Add your podcast',
  // Add more mappings as needed
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const route = useRouter();

  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (!confirmed) return;
    try {
      await axios.post("/api/logout", {}, { withCredentials: true });
      route.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  const breadcrumbTrail = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const name = segmentNameMap[segment] || segment.replace(/-/g, ' ');
    return { name, href };
  });

  return (
    <div className={styles.space}>
      <div className={styles.breadcrumb}>
        <Link href="/" className={styles.link}>
          <SlHome className={styles.icon} />
          <span className={styles.bold}>Home Page</span>
        </Link>

        {breadcrumbTrail.map((crumb, index) => (
          <span key={crumb.href} className={styles.segment}>
            /
            {index === breadcrumbTrail.length - 1 ? (
              <span className={styles.current}>{crumb.name}</span>
            ) : (
              <Link href={crumb.href} className={styles.link}>
                <span className={styles.bold}>{crumb.name}</span>
              </Link>
            )}
          </span>
        ))}
      </div>
      <div className={styles.iconButtonContainer}>
        <div className={styles.iconCircle}>
          <FiBell size={24} color="#1A1A1A" />
        </div>
        <div className={styles.iconCircle} onClick={handleLogout}>
          <FiLogOut size={24} color="#E63946" />
        </div>
      </div>
    </div>
  );
}
