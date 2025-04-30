'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

import styles from './CreateProject.module.css';
import logoName from '../../../public/coloredLogoName.png';
import illustration from '../../../public/podcast.png';
import settingsIcon from '../../../public/setting-icon.png';
import bellIcon from '../../../public/bell-icon.png';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function CreateProject() {
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const modalRef = useRef(null);

  const handleCreateProject = async () => {
    if (projectName.trim() === '') {
      setError("Project Name Can't be empty");
      return;
    }
    try {
      const response = await axios.post("/api/projects", { name: projectName }, { withCredentials: true });

      if (response.status === 200) {
        router.push("/");
      }
    } catch (error) {
    }
    setShowModal(false);
    setProjectName('');
    setError('');
  };

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowModal(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.logoSection}>
          <Image src={logoName} alt="Ques.AI Logo" width={150} height={30} />
        </div>
        <div className={styles.iconSection}>
          <Image src={settingsIcon} alt="Settings" width={30} height={30} />
          <Image src={bellIcon} alt="Notifications" width={30} height={30} />
        </div>
      </header>

      <main className={styles.mainContent}>
        <h1 className={styles.mainHeading}>Create a New Project</h1>
        <Image src={illustration} alt="Illustration" width={500} height={300} className={styles.illustration} />
        <p className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        </p>
        <button className={styles.createProjectButton} onClick={() => setShowModal(true)}>
          <span className={styles.circle}>➕</span> Create New Project
        </button>

        {showModal && (
          <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.modalContent} ref={modalRef}>
              <div className={styles.modalItem}>
                <h2 className={styles.headingCreate}>Create Project</h2>
                <label htmlFor="projectName">Enter Project Name:</label>
                <input
                  id="projectName"
                  type="text"
                  placeholder="Type here"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>

              {error && <p className={styles.errorText}>{error}</p>}

              <div className={styles.buttonRow}>
                <button className={styles.cancelButton} onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className={styles.createButton} onClick={handleCreateProject}>
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
