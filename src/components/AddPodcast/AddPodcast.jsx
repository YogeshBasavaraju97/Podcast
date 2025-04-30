'use client';

import React, { useEffect, useState } from 'react';
import styles from './AddPodcast.module.css';
import Image from 'next/image';
import rss from '../../../public/rss.png';
import yt from '../../../public/yt.png';
import uploadIcon from '../../../public/uploadIcon.png';
import cloud from '../../../public/uploadCloud.png';
import UploadPopUp from './UploadPopUp';
import axios from 'axios';
import useProfile from '@/hooks/useProfile';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function AddPodcast() {
  useProfile();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [listOfPodCast, setListOfPodcast] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const projectId = params.id;
  const router = useRouter();

  const fetchTranscripts = async () => {
    try {
      const response = await axios.get(`/api/projects/${projectId}`);

      const formatted = response.data.transcripts.map((t, index) => ({
        _id: t._id,
        id: index + 1,
        name: t.title,
        uploadDate: new Date(t.createdAt).toLocaleString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }),
      }));
      setListOfPodcast(formatted);
    } catch (err) {
      console.error('Failed to fetch transcripts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTranscripts();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Do you really want to delete?");
    if (confirmed) {

      const res = await axios.delete(`/api/transcript/${id}`);
      toast.success("transcript deleted");
      fetchTranscripts();


    } else {
      console.log("Deletion cancelled");
    }
  };

  const handleView = (id) => {
    console.log("add", id);
    router.push(`/podcast/edit-podcast/${id}`);
  };

  const handleUpload = () => {

    setPopupOpen(false);
    fetchTranscripts();
  };

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>


        <h2 className={styles.heading}>Add Podcast</h2>

        <div className={styles.options}>
          {['RSS Feed', 'Youtube Video', 'Upload Files'].map((label, idx) => (
            <div key={idx} className={styles.optionCard} onClick={() => setPopupOpen(true)}>
              <div className={styles.optionText}>
                <h3>{label}</h3>
                <p>Lorem ipsum dolor sit. Dolor lorem sit.</p>
              </div>
              <div className={`${styles.imgDimension} ${idx === 2 ? styles.bgIcon : ''}`}>
                <Image src={[rss, yt, uploadIcon][idx]} alt={label} width={60} />
              </div>
            </div>
          ))}
        </div>

        <UploadPopUp isOpen={isPopupOpen} onUpload={handleUpload} projectId={projectId} onClose={() => setPopupOpen(false)} />

        {loading ? (
          <p>Loading...</p>
        ) : listOfPodCast.length === 0 ? (
          <div className={styles.uploadSection}>
            <Image src={cloud} alt="Upload Cloud" width={80} />
            <p>Select a file or drag and drop here (Podcast Media or Transcription Text)</p>
            <small className={styles.lightText}>
              MP4, MOV, MP3, WAV, PDF, DOCX or TXT file
            </small>
            <button className={styles.selectButton}>Select File</button>
          </div>
        ) : (
          <div className={styles.tableContainer}>
            <h2 className={styles.title}>Your Files</h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Upload Date & Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {listOfPodCast.map((file) => (
                  <tr key={file.id}>
                    <td>{file.id}</td>
                    <td className={styles.fileName}>{file.name}</td>
                    <td>{file.uploadDate}</td>
                    <td className={styles.actionButtons}>
                      <button className={styles.viewButton} onClick={() => handleView(file._id)} >View</button>
                      <button className={styles.deleteButton} onClick={() => handleDelete(file._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
