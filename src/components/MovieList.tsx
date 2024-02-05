"use client";
import { useQuery } from "@tanstack/react-query";
import MovieCard from "./MovieCard";
import styles from "./movielist.module.css";
export interface Movies {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
}

const getMovies = async () => {
  const data = await fetch("https://api.themoviedb.org/3/discover/movie", {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    },
  });
  const res = await data.json();
  return res.results as Movies[];
};

export default function MovieList() {
  const { data: movies, error } = useQuery({
    queryFn: getMovies,
    queryKey: ["movies"],
  });
  return (
    <div className={styles.container}>
      {movies?.map((movie) => (
        <MovieCard {...movie} key={movie.id} />
      ))}
    </div>
  );
}
