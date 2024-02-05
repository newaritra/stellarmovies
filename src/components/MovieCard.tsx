"use client";
import React from "react";
import styles from "./moviecard.module.css";
import type { Movies } from "./MovieList";
import Image from "next/image";
const MovieCard = ({
  id,
  title,
  release_date,
  vote_average,
  poster_path,
}: Movies) => {
  return (
    <div className={styles.container}>
      <div
        style={{
          height: "70%",
          objectFit: "cover",
          width: "100%",
          position: "relative",
        }}
      >
        <Image
          style={{ objectFit: "cover" }}
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          alt="movie_poster"
          fill
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0px 20px"
        }}
      >
        <h4>{title}</h4>
        <div
          style={{ position: "relative", height: "25px", aspectRatio: "1/1", alignSelf:"flex-start", marginTop:"20px", cursor:"pointer" }}
        >
          <Image
            src="/assets/heartNotification.png"
            alt="stellarmovies-logo"
            fill
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 20px",
        }}
      >
        <p>{release_date.split("-")[0]}</p>
        <p>{vote_average}</p>
      </div>
    </div>
  );
};

export default MovieCard;
