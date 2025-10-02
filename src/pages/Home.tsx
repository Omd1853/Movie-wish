import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPopularMovies, searchMovies } from "@/lib/tmdb";
import { MovieCard } from "@/components/MovieCard";
import { SearchBar } from "@/components/SearchBar";
import { Navbar } from "@/components/Navbar";
import { Loader2 } from "lucide-react";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["movies", searchQuery],
    queryFn: () => (searchQuery ? searchMovies(searchQuery) : fetchPopularMovies()),
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="mb-16 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-transparent blur-3xl -z-10" />
          
          <div className="inline-block mb-6">
            <span className="text-primary font-bold text-sm tracking-wider uppercase bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
              🎬 Your Personal Cinema
            </span>
          </div>
          
          <h1 className="font-black text-foreground mb-6 tracking-tight animate-fade-in">
            <span className="text-gradient">Discover</span> Amazing Movies
          </h1>
          
          <p className="text-muted-foreground text-xl mb-10 max-w-2xl mx-auto animate-slide-up">
            {searchQuery
              ? `Found results for "${searchQuery}"`
              : "Explore thousands of movies and curate your perfect watchlist"}
          </p>
          
          <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <SearchBar
              onSearch={setSearchQuery}
              onClear={() => setSearchQuery("")}
            />
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl animate-pulse" />
              <Loader2 className="h-16 w-16 animate-spin text-primary relative" />
            </div>
            <p className="text-muted-foreground mt-6 text-lg font-medium">Loading amazing movies...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-32 max-w-2xl mx-auto">
            <div className="glass-effect border border-destructive/30 rounded-2xl p-12">
              <div className="bg-destructive/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">⚠️</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Oops! Something went wrong</h3>
              <p className="text-destructive text-lg mb-4">
                {error instanceof Error ? error.message : "Failed to load movies"}
              </p>
              <p className="text-muted-foreground">
                Please add your TMDB API key in <code className="bg-secondary px-2 py-1 rounded text-sm">src/lib/tmdb.ts</code>
              </p>
            </div>
          </div>
        )}

        {/* Movies Grid */}
        {data && data.results.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-foreground">
                {searchQuery ? "Search Results" : "Popular Movies"}
              </h2>
              <span className="text-muted-foreground font-medium bg-secondary/50 px-4 py-2 rounded-lg">
                {data.results.length} movies
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {data.results.map((movie, index) => (
                <div 
                  key={movie.id} 
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {data && data.results.length === 0 && (
          <div className="text-center py-32">
            <div className="glass-effect border border-border/50 rounded-2xl p-16 max-w-2xl mx-auto">
              <div className="bg-secondary/50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                <span className="text-6xl">🔍</span>
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-4">No Movies Found</h3>
              <p className="text-muted-foreground text-lg mb-8">
                We couldn't find any movies matching <span className="text-primary font-semibold">"{searchQuery}"</span>
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="text-primary hover:text-primary/80 font-semibold transition-colors"
              >
                ← Back to popular movies
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
