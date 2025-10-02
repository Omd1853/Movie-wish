import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Movie } from "@/types/movie";
import { toast } from "@/hooks/use-toast";

interface WatchlistContextType {
  watchlist: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: number) => void;
  isInWatchlist: (movieId: number) => boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

const WATCHLIST_KEY = "movie-watchlist";

export const WatchlistProvider = ({ children }: { children: ReactNode }) => {
  const [watchlist, setWatchlist] = useState<Movie[]>(() => {
    const stored = localStorage.getItem(WATCHLIST_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (movie: Movie) => {
    if (!isInWatchlist(movie.id)) {
      setWatchlist((prev) => [...prev, movie]);
      toast({
        title: "Added to Watchlist",
        description: `${movie.title} has been added to your watchlist.`,
      });
    }
  };

  const removeFromWatchlist = (movieId: number) => {
    const movie = watchlist.find((m) => m.id === movieId);
    setWatchlist((prev) => prev.filter((m) => m.id !== movieId));
    if (movie) {
      toast({
        title: "Removed from Watchlist",
        description: `${movie.title} has been removed from your watchlist.`,
      });
    }
  };

  const isInWatchlist = (movieId: number) => {
    return watchlist.some((m) => m.id === movieId);
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error("useWatchlist must be used within WatchlistProvider");
  }
  return context;
};
