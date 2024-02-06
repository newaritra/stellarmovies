"use client";
import { useQuery } from "@tanstack/react-query";
import MovieCard from "./MovieCard";
import styles from "./movielist.module.css";
import { usePathname } from "next/navigation";
export interface Movies {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
}

const getMovies = async () => {
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

export default function MovieList() {
  const pathname = usePathname();

  const {
    data: movies,
    error: queryError,
    isLoading,
  } = useQuery({
    queryFn: getMovies,
    queryKey: ["movies"],
    staleTime: 60 * 5 * 1000,
  });

  const {
    data: favoriteMovies,
    error: queryErrorFavorites,
    isLoading: isLoadingFavorites,
  } = useQuery({
    queryFn: () => {
      const favObject = localStorage.getItem("favorites");
      let favoritesArray: Movies[] = [];
      if (favObject) favoritesArray = JSON.parse(favObject);
      return favoritesArray as Movies[];
    },
    queryKey: ["favorites"],
  });

  if (queryError || queryErrorFavorites) {
    console.log(queryError);
    return <>Error</>;
  }
  return (
    <div className={styles.container}>
      {pathname.includes("favorites") ? (
        isLoadingFavorites ? (
          <p>Loading</p>
        ) : favoriteMovies?.length ? (
          isLoading ? (
            <p>Loading</p>
          ) : (
            favoriteMovies.map((movie) => (
              <MovieCard
                favorited={
                  pathname.includes("favorites") ||
                  favoriteMovies.some((mov) => mov.id == movie.id)
                }
                {...movie}
                key={movie.id}
              />
            ))
          )
        ) : (
          <h3 style={{ marginTop: "25%" }}>Nothing to see here 😅</h3>
        )
      ) : isLoading ? (
        <p>Loading</p>
      ) : movies?.length ? (
        movies.map((movie) => (
          <MovieCard
            favorited={
              pathname.includes("favorites") ||
              favoriteMovies?.some((mov) => mov.id == movie.id)
            }
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
