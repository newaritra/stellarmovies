"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import styles from "./page.module.css";
import type { Movies } from "@/components/MovieList";
import Image from "next/image";
const Page = ({ params }: { params: { id: string } }): React.ReactNode => {
  const { data: movie, error: queryError } = useQuery({
    queryKey: ["single-movie"],
    queryFn: async () => {
      let data = await fetch(
        `https://api.themoviedb.org/3/movie/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
          },
        }
      );
      let res = await data.json();
      console.log(res);
      return res as Movies & {
        backdrop_path: string;
        overview: string;
        runtime: number;
      };
    },
  });
  return (
    <div className={styles.container}>
      {!movie ? (
        <p>Nah not again 👽</p>
      ) : (
        <div className={styles.backdrop}>
          <Image
            fill
            style={{ objectFit: "cover", opacity: "0.5" }}
            src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
            alt="movie backdrop poster"
          />
          <div className={styles.poster}>
            <Image
              style={{ objectFit: "cover" }}
              fill
              src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
              alt="movie main poster"
            />
          </div>
          <div className={styles.detailsContainer}>
            <h2>{movie?.title}</h2>
            <p>{movie?.release_date.split("-")[0]}</p>
            <p>
              Runtime:{" "}
              {Math.floor(movie?.runtime / 60) >= 1
                ? `${Math.floor(movie?.runtime / 60)}hr ${
                    movie?.runtime % 60
                  }min`
                : `${movie?.runtime % 60}min`}
            </p>
            <p>Rating: {movie?.vote_average}</p>
            <p className={styles.overview}>{movie?.overview}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
