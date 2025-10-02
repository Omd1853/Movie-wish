import { Movie } from "@/types/movie";
import { getImageUrl } from "@/lib/tmdb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Check, X } from "lucide-react";
import { useWatchlist } from "@/hooks/useWatchlist";
import { cn } from "@/lib/utils";

interface MovieCardProps {
  movie: Movie;
  showRemove?: boolean;
}

export const MovieCard = ({ movie, showRemove = false }: MovieCardProps) => {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(movie.id);

  const handleAction = () => {
    if (showRemove || inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <Card className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover-glow hover:scale-[1.03] hover:-translate-y-2">
      <div className="aspect-[2/3] relative overflow-hidden rounded-t-lg">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={`${movie.title} poster`}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
          loading="lazy"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            <h3 className="text-foreground font-bold text-lg mb-3 line-clamp-2 drop-shadow-lg">
              {movie.title}
            </h3>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm font-medium text-muted-foreground bg-secondary/80 backdrop-blur-sm px-2.5 py-1 rounded-md">
                {movie.release_date?.split("-")[0] || "N/A"}
              </span>
              <div className="flex items-center gap-1.5 bg-primary/20 backdrop-blur-sm px-2.5 py-1 rounded-md">
                <span className="text-primary text-lg">⭐</span>
                <span className="text-sm font-bold text-primary">
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
            </div>
            {movie.overview && (
              <p className="text-xs text-muted-foreground line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                {movie.overview}
              </p>
            )}
          </div>
        </div>

        {/* Top Badge - In Watchlist */}
        {inWatchlist && !showRemove && (
          <div className="absolute top-2 left-2 bg-primary/90 backdrop-blur-sm text-primary-foreground px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1 shadow-lg">
            <Check className="h-3 w-3" />
            Saved
          </div>
        )}
      </div>

      {/* Action Button */}
      <Button
        size="icon"
        variant={inWatchlist || showRemove ? "destructive" : "default"}
        className={cn(
          "absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl hover:scale-110 rounded-full",
          (inWatchlist || showRemove) && "bg-destructive/90 backdrop-blur-sm hover:bg-destructive"
        )}
        onClick={handleAction}
        aria-label={showRemove || inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
      >
        {showRemove || inWatchlist ? (
          <X className="h-4 w-4" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
      </Button>
    </Card>
  );
};
