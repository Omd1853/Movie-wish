import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { MovieCard } from "@/components/MovieCard";
import { useWatchlist } from "@/hooks/useWatchlist";
import { Button } from "@/components/ui/button";
import { Film } from "lucide-react";

const Watchlist = () => {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="mb-16 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-transparent blur-3xl -z-10" />
          
          <div className="inline-block mb-6">
            <span className="text-primary font-bold text-sm tracking-wider uppercase bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
              ⭐ Your Collection
            </span>
          </div>
          
          <h1 className="font-black text-foreground mb-6 tracking-tight animate-fade-in">
            My <span className="text-gradient">Watchlist</span>
          </h1>
          
          <p className="text-muted-foreground text-xl mb-6 animate-slide-up">
            {watchlist.length > 0
              ? `You have ${watchlist.length} amazing movie${watchlist.length === 1 ? "" : "s"} saved`
              : "Start building your perfect movie collection"}
          </p>

          {watchlist.length > 0 && (
            <div className="flex items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="glass-effect border border-border/50 rounded-xl px-6 py-3">
                <span className="text-sm text-muted-foreground">Total Movies</span>
                <p className="text-2xl font-bold text-primary">{watchlist.length}</p>
              </div>
              <div className="glass-effect border border-border/50 rounded-xl px-6 py-3">
                <span className="text-sm text-muted-foreground">Hours of Content</span>
                <p className="text-2xl font-bold text-accent">
                  {Math.round(watchlist.length * 2.2)}+
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Empty State */}
        {watchlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="glass-effect border border-border/50 rounded-2xl p-16 max-w-2xl mx-auto text-center">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-primary/10 blur-2xl" />
                <div className="relative p-8 bg-secondary/30 rounded-full inline-block">
                  <Film className="h-24 w-24 text-primary" />
                </div>
              </div>
              
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Your Watchlist is Empty
              </h2>
              
              <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                Start exploring our collection and add movies you want to watch. Build your perfect cinema queue!
              </p>
              
              <Link to="/">
                <Button variant="premium" size="lg" className="px-8">
                  <Film className="h-5 w-5 mr-2" />
                  Browse Movies
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          /* Movies Grid */
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-foreground">Your Saved Movies</h2>
              <button
                onClick={() => {
                  if (confirm(`Remove all ${watchlist.length} movies from watchlist?`)) {
                    watchlist.forEach(movie => removeFromWatchlist(movie.id));
                  }
                }}
                className="text-sm text-muted-foreground hover:text-destructive transition-colors font-medium"
              >
                Clear All
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {watchlist.map((movie, index) => (
                <div 
                  key={movie.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <MovieCard movie={movie} showRemove />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Watchlist;
