'use client';

import React, { useEffect } from 'react';
import styles from './SideBar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineEdit } from 'react-icons/ai';
import { FaRegCopy } from 'react-icons/fa6';
import { CiHeart, CiSettings } from 'react-icons/ci';
import logoName from '../../../public/coloredLogoName.png';
import avatar from '../../../public/avatar.png';
import useProfile from '@/hooks/useProfile';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const Sidebar = () => {


  const { userData, fetchProfile } = useProfile();
  const router = useRouter();
  const handleRoute = () => {
    router.push("/podcast/account-setting");
  };

  return (
    <aside className={styles.sidebar}>
      <Image src={logoName} alt="Ques.AI Logo" width={150} height={30} />
      <nav className={styles.nav}>
        <Link href="#" className={`${styles.text} ${styles.activeLink}`}>
          + Add your Podcast(s)
        </Link>
        <Link href="#" className={`${styles.text} `} >
          <AiOutlineEdit /> Create & Repurpose
        </Link>
        <Link href="#" className={`${styles.text} `}>
          <FaRegCopy /> Podcast Widget
        </Link>
        <Link href="#" className={`${styles.text} `}>
          <CiHeart /> Upgrade
        </Link>
      </nav>
      <div className={styles.helpSection}>
        <Link href="#" className={styles.text}>
          <CiSettings /> Help
        </Link>
        <div className={styles.userInfo} onClick={handleRoute} >
          <div className={styles.profile}>
            <Image src={avatar} alt="User Avatar" className={styles.icon} />

            {userData && (
              <div className={styles.space} >
                <div className={styles.username}>{userData.UserName || ""}</div>
                <div className={styles.email}>{userData.emailId || ""}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
