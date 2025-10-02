import { TMDBResponse } from "@/types/movie";

// TMDB API key - Note: TMDB allows client-side API keys as they're designed for public use
// In production, you should add domain restrictions in your TMDB account settings
const API_KEY =import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export const getImageUrl = (path: string | null, size: string = "w500") => {
  if (!path) return "/placeholder.svg";
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const fetchPopularMovies = async (page: number = 1): Promise<TMDBResponse> => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
  );
  if (!response.ok) throw new Error("Failed to fetch popular movies");
  return response.json();
};

export const searchMovies = async (query: string, page: number = 1): Promise<TMDBResponse> => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
  );
  if (!response.ok) throw new Error("Failed to search movies");
  return response.json();
};