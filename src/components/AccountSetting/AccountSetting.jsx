"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaArrowLeft } from "react-icons/fa";
import styles from './AccountSetting.module.css';
import useProfile from '@/hooks/useProfile';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '@/utils/userSlice';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function AccountSettings() {
  const { userData, fetchProfile } = useProfile();
  const [userName, setUserName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();


  useEffect(() => {
    if (userData) {
      setUserName(userData.UserName);
    }

  }, [userData]);

  const handleChange = (e) => {
    setUserName(e.target.value);
    setIsEditing(true);
  };

  const handleSave = async () => {
    console.log("Saving username:", userName);
    setIsEditing(false);
    try {
      const response = await axios.put('/api/profile/', { UserName: userName }, {
        withCredentials: true,
      });
      toast.success("username updated");
      dispatch(addUser(response?.data?.user));
    } catch (error) {
      console.log(error);
      if (error?.response?.status === 401) {
        router.push('/login');
      }
    }
  };

  return (
    <div className={styles.accountSettingsContainer}>
      <div className={styles.header}>
        <div onClick={() => router.back()} className={styles.backLink}>
          <FaArrowLeft color="black" size={20} />
        </div>
        <h2>Account Settings</h2>
      </div>

      <div className={styles.profileSection}>
        <img
          src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
          alt="Profile"
          className={styles.profileImage}
        />
        <div className={styles.inputFields}>
          <div className={styles.inputGroup}>
            <label>User Name</label>
            <input type="text" value={userName} onChange={handleChange} />
          </div>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input type="email" value={userData?.emailId || ""} readOnly />
          </div>
          {isEditing && (
            <button className={styles.saveButton} onClick={handleSave}>
              Save
            </button>
          )}
        </div>


      </div>
    </div>
  );
}
