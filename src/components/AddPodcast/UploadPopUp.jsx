'use client';

import { useState } from "react";
import axios from "axios";
import "./uploadPopUp.css";
import ytLogo from "../../../public/ytLogo.png";
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
      setName(""); // optional: reset fields
      setTranscript("");
      onClose(); // optional: close popup after upload
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Upload failed");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <Image src={ytLogo} width={40} alt="YouTube Logo" />
          <h2 className="uploadHeading">Upload from Youtube</h2>
          <span className="close-button" onClick={onClose}>
            &times;
          </span>
        </div>

        <div className="modal-body">
          <label>Name</label>
          <input
            type="text"
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Transcript</label>
          <textarea
            className="textarea-field"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
          />

          <div className="uploadButton">
            <button className="upload-button" onClick={handleUpload}>
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
