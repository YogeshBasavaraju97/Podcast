'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './LoginPage.module.css';
import logo from "../../../public/logo.png";
import logowithName from "../../../public/logoName.png";
import Image from 'next/image';
import imageEffect from "../../../public/image.png";
import axios from 'axios';
import toast from 'react-hot-toast';
import { validateLogin } from '@/helper/validateLogin';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { addUser } from '@/utils/userSlice';

export default function LoginPage() {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const errorMessage = validateLogin({ emailId, password });
    if (errorMessage) {
      toast.error(errorMessage);
      setError(errorMessage);
      return;
    }

    try {
      const res = await axios.post('/api/login', { emailId, password }, { withCredentials: true });

      if (res.status === 200) {
        await toast.success("Login successful!");
        dispatch(addUser(res?.data?.user));
        router.push("/");
      }

    } catch (error) {
      const message = error?.response?.data?.error || "Something went wrong";
      toast.error(message);
      setError(message);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginLeft}>
        <Image src={imageEffect} alt="Effect" className={styles.backgroundEffect} />
        <div className={styles.branding}>
          <div className={styles.logoWrapper}>
            <Image src={logowithName} alt="Logo" width={200} height={50} className={styles.logoImage} />
          </div>
          <p className={styles.mainHeading}>
            Your podcast<br />
            will no longer<br />
            be just a hobby.
          </p>
          <p className={styles.subHeading}>
            Supercharge Your Distribution<br />
            using our AI assistant!
          </p>
        </div>
      </div>

      <div className={styles.loginRight}>
        <div className={styles.loginBox}>
          <Image src={logo} alt="Logo" width={100} height={100} />
          <h2 className={styles.color}>
            <span className={styles.normalText1}>Welcome to</span><br />
            <span className={styles.brand}>Ques.AI</span>
          </h2>
          <div className={styles.form}>
            <input
              type="email"
              placeholder="Email Address"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className={styles.errorText}>{error}</p>}

            <div className={styles.rememberRow}>
              <a href="#">Forgot password?</a>
            </div>
            <button className={styles.loginButton} onClick={handleSubmit}>Login</button>

            <p className={styles.signup}>
              Don’t have an account? <Link href="/create-account">Create Account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
