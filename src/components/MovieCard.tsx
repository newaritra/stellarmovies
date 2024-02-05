"use client";
import React, { Dispatch, SetStateAction } from "react";
import styles from "./moviecard.module.css";
import type { Movies } from "./MovieList";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import Link from "next/link";
const setAsFavorite = (id: number) => {
  const fav = localStorage.getItem("favorites");
  let favoritesidArray: number[] = [],
    updatedArray: number[] = [];
  if (fav) favoritesidArray = JSON.parse(fav);
  if (!favoritesidArray.some((favId) => favId == id)) {
    updatedArray = [...favoritesidArray, id];
    localStorage.setItem("favorites", JSON.stringify(updatedArray));
  } else {
    const ind = favoritesidArray.findIndex((el) => el == id);
    favoritesidArray.splice(ind, 1);
    updatedArray = favoritesidArray;
    localStorage.setItem("favorites", JSON.stringify(updatedArray));
  }
  return updatedArray;
};
const MovieCard = ({
  id,
  title,
  release_date,
  vote_average,
  poster_path,
  favorited,
  setFav,
}: Movies & {
  favorited: boolean;
  setFav: Dispatch<SetStateAction<number[]>>;
}) => {
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const { mutateAsync: setFavoriteMovie } = useMutation({
    mutationFn: async (id: number) => {
      return setAsFavorite(id);
    },
    onSuccess: (data) => {
      if (pathname.includes("favorites")) {
        let movies: Movies[] | undefined = queryClient.getQueryData(["movies"]);
        movies = movies?.filter((movie) => data.some((el) => el == movie.id));
        queryClient.setQueryData(["movies"], movies);
        console.log(movies,"mobsdjb")
      }
      setFav(data);
    },
  });

  return (
    <div className={styles.container}>
      <div
        style={{
          height: "70%",
          objectFit: "cover",
          width: "100%",
          position: "relative",
          cursor: "pointer",
        }}
      >
        <Link href={`/movie/${id}`}>
          <Image
            style={{ objectFit: "cover" }}
            src={`https://image.tmdb.org/t/p/original/${poster_path}`}
            alt="movie_poster"
            fill
          />
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0px 20px",
        }}
      >
        <h4>{title}</h4>
        <div
          onClick={() => {
            setFavoriteMovie(id);
          }}
          style={{
            position: "relative",
            height: "25px",
            aspectRatio: "1/1",
            alignSelf: "flex-start",
            marginTop: "20px",
            cursor: "pointer",
            filter: favorited
              ? "brightness(50%) sepia(100) saturate(100) hue-rotate(25deg)"
              : "none",
          }}
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
