import React from "react";
import styles from "./header.module.css";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const Header: React.FC = (): React.ReactNode => {
  return (
    <div className={styles.container}>
      <Link href={"/"}>
        <div className={styles.logo}>
          <Image src="/assets/movieLogo.png" alt="stellarmovies-logo" fill />
        </div>
      </Link>
      <p>Stellarmovies</p>
      <Link href={"/favorites"}>
        <div className={styles.logo}>
          <Image
            src="/assets/heartNotification.png"
            alt="stellarmovies-logo"
            fill
          />
        </div>
      </Link>
    </div>
  );
};

export default Header;
