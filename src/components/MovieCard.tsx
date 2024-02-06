"use client";
import React, { Dispatch, SetStateAction } from "react";
import styles from "./moviecard.module.css";
import type { Movies } from "./MovieList";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import Link from "next/link";

const setAsFavorite = (movie: Movies) => {
  const fav = localStorage.getItem("favorites");
  let favoritesArray: Movies[] = [],
    updatedArray: Movies[] = [];
  if (fav) favoritesArray = JSON.parse(fav);

  //If the favorite movie does not exist then add it to the list
  if (!favoritesArray.some((favMov) => favMov.id == movie.id)) {
    updatedArray = [...favoritesArray, movie];
    localStorage.setItem("favorites", JSON.stringify(updatedArray));
  } else {
    //If the favorite movie exists then remove it from the list
    const ind = favoritesArray.findIndex((el) => el.id == movie.id);
    favoritesArray.splice(ind, 1);
    updatedArray = favoritesArray;
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
}: Movies & {
  favorited?: boolean;
}) => {
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const { mutateAsync: setFavoriteMovie } = useMutation({
    mutationFn: async (movie: Movies) => {
      //on mutation the new favorite movies array is returned to the onSuccess method to mutate the data
      return setAsFavorite(movie);
    },
    onSuccess: (data) => {
      //Update the favorites when a movie is selected/deselected from the favorites
      //Set the new data as the favorite movies and refetch it
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
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
            setFavoriteMovie({
              id,
              title,
              release_date,
              vote_average,
              poster_path,
            });
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
