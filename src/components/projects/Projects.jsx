'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './Projects.module.css';
import logoName from "../../../public/coloredLogoName.png";
import Image from 'next/image';
import settingsIcon from '../../../public/setting-icon.png';
import bellIcon from '../../../public/bell-icon.png';
import axios from 'axios';
import useProfile from '@/hooks/useProfile';
import { useRouter } from 'next/navigation';



export default function Projects() {
  const [showModal, setShowModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const [projectName, setProjectName] = useState('');
  const router = useRouter();
  const { userData } = useProfile();


  const modalRef = useRef(null);

  const handleCreateProject = async () => {

    if (projectName.trim() === '') {
      setError("Project Name Can't be empty");
      return;
    }
    try {
      const response = await axios.post("/api/projects", { name: projectName }, { withCredentials: true });
      console.log(response);
      if (response.status === 200) {
        router.push("/projects");
      }
    } catch (error) {
    }
    setShowModal(false);
    setProjectName('');
    setError('');
  };



  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('/api/projects', { withCredentials: true });
        console.log(res);

        setProjects(res.data.projects);
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    };

    fetchProjects();
  }, [showModal]);

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowModal(false);
    }
  };
  const handleProject = (id) => {
    router.push(`/podcast/${id}`);

  };



  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <div className={styles.logoSection}>
          <Image src={logoName} alt="Ques.AI Logo" width={150} height={30} />
        </div>
        <div className={styles.iconsSection}>
          <Image src={settingsIcon} alt="Settings" width={30} height={30} />
          <Image src={bellIcon} alt="Notifications" width={30} height={30} />
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.projectsHeader}>
          <h2 className={styles.heading1}>Projects</h2>
          <button className={styles.createButton} onClick={() => setShowModal(true)}>
            <span className={styles.circle}> ➕ </span>
            Create New Project
          </button>
        </div>

        <div className={styles.projectsGrid}>
          {projects.map((project) => (
            <div key={project._id} className={styles.projectCard} onClick={() => handleProject(project._id)}>
              <div className={styles.projectIcon}>{project.name.charAt(0)}</div>
              <div className={styles.projectDetails}>
                <h3 className={styles.heading1}>{project.name}</h3>
                <p>{project.transcriptCount} Files</p>
                <p className={styles.editedText}> {project.lastUpdatedTranscript
                  ? new Date(project.lastUpdatedTranscript).toLocaleString()
                  : 'No transcripts yet'}</p>
              </div>
            </div>
          )
          )

          }

        </div>
      </main>

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
              <button className={styles.createButtonPop} onClick={handleCreateProject}>
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
