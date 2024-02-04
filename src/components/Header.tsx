import React from "react";
import styles from "./header.module.css";
import { Poppins } from "next/font/google";
import Image from "next/image";

const Header: React.FC = (): React.ReactNode => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image src="/assets/movieLogo.png" alt="stellarmovies-logo" fill />
      </div>
      <p>Stellarmovies</p>
      <div className={styles.logo}>
        <Image
          src="/assets/heartNotification.png"
          alt="stellarmovies-logo"
          fill
        />
      </div>
    </div>
  );
};

export default Header;
