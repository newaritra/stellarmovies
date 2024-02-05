"use client";
import { useQuery } from "@tanstack/react-query";
import MovieCard from "./MovieCard";
import styles from "./movielist.module.css";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
export interface Movies {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
}

const getMovies = async () => {
  console.log("we here again");
  const data = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    }
  );
  const res = await data.json();

  return res.results as Movies[];
};

const getFavorites = async (favoritesIdArray: number[]) => {
  console.log("Why");
  const res = await Promise.all(
    favoritesIdArray.map(async (id: number) => {
      {
        let data = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
          },
        });
        let res = await data.json();
        return { ...res, id };
      }
    })
  );
  console.log(res);
  return res as Movies[];
};

export default function MovieList() {
  const pathname = usePathname();
  const favObject = localStorage.getItem("favorites");
  let favoritesIdArray: number[] = [];
  if (favObject) favoritesIdArray = JSON.parse(favObject);
  const [fav, setFav] = useState(favoritesIdArray);
  useEffect(() => {}, []);
  useEffect(() => {
    console.log("we  in ise effect", pathname.includes("favorites"));
    setFav(favoritesIdArray);
  }, []);

  const {
    data: movies,
    error: queryError,
    isLoading,
  } = useQuery({
    queryFn: pathname.includes("favorites")
      ? () => getFavorites(favoritesIdArray)
      : getMovies,
    queryKey: ["movies"],
  });
  if (queryError) {
    console.log(queryError);
    return <>Error</>;
  }
  return (
    <div className={styles.container}>
      {isLoading ? (
        <p>Loading</p>
      ) : movies?.length ? (
        movies.map((movie) => (
          <MovieCard
            setFav={setFav}
            favorited={fav.some((movId) => movId == movie.id)}
            {...movie}
            key={movie.id}
          />
        ))
      ) : (
        <h3 style={{ marginTop: "25%" }}>Nothing to see here 😅</h3>
      )}
    </div>
  );
}
