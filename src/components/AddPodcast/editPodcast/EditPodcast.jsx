"use client";
import React, { useEffect, useState } from 'react';
import styles from "./EditPodcast.module.css";
import { FaArrowLeft } from "react-icons/fa";
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';

const EditPodcast = ({ id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("");

  const fetchData = async () => {
    const res = await axios.get(`/api/transcript/${id}`);
    console.log(res);
    setText(res.data?.transcript?.content || "");
  };



  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  const handleSave = async () => {
    try {
      const res = await axios.put(`/api/transcript/${id}`, { content: text }, { withCredentials: true });
      console.log(res);
      toast.success("saved changes");
    } catch (error) {
      toast.error("data not saved");

    }

    setIsEditing(false);
  };

  const handleDiscard = () => {
    console.log("Discarding edits...");
    setIsEditing(false);
  };

  return (
    <div className={styles.editContainer}>
      <div className={styles.editTranscriptContainer}>
        <div className={styles.alignEditButton}>
          <div className={styles.editHeading}>
            <Link href="#" className={styles.backLink}>
              <FaArrowLeft color="black" size={20} />
            </Link>
            <h3>Edit Transcript</h3>
          </div>
          <div>
            {isEditing ? (
              <div className={styles.buttonGroup}>
                <button className={styles.discardButton} onClick={handleDiscard}>Discard</button>
                <button className={styles.saveButton} onClick={handleSave}>Save</button>
              </div>
            ) : (
              <button className={styles.editButton} onClick={() => setIsEditing(true)}>Edit</button>
            )}
          </div>
        </div>
        <div className={styles.transcriptCard}>
          <h4 className={styles.speaker}>Speaker</h4>
          <textarea
            className={styles.transcriptText}
            value={text}
            onChange={(e) => setText(e.target.value)}
            readOnly={!isEditing}
          />

        </div>
      </div>
    </div >
  );
};

export default EditPodcast;
