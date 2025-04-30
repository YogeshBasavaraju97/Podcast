'use client';

import { useState } from "react";
import axios from "axios";
import styles from "./UploadPopUp.module.css";
import ytLogo from "../../../../public/ytLogo.png";
import Image from "next/image";
import toast from "react-hot-toast";

export default function UploadPopUp({ isOpen, onUpload, onClose, projectId }) {
  const [name, setName] = useState("");
  const [transcript, setTranscript] = useState("");

  const handleUpload = async () => {
    if (!projectId) {
      toast.error("Missing project ID");
      return;
    }

    try {
      await axios.post(`/api/projects/${projectId}`, {
        title: name,
        content: transcript,
      });
      toast.success("Transcript uploaded successfully");
      onUpload("success");
      setName("");
      setTranscript("");
      onClose();
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Upload failed");
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <Image src={ytLogo} width={40} alt="YouTube Logo" />
          <h2 className={styles.uploadHeading}>Upload from YouTube</h2>
          <span className={styles.closeButton} onClick={onClose}>
            &times;
          </span>
        </div>

        <div className={styles.modalBody}>
          <label>Name</label>
          <input
            type="text"
            className={styles.inputField}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Transcript</label>
          <textarea
            className={styles.textareaField}
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
          />

          <div className={styles.uploadButtonContainer}>
            <button className={styles.uploadButton} onClick={handleUpload}>
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
