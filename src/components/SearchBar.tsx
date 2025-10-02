import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onClear: () => void;
}

export const SearchBar = ({ onSearch, onClear }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery("");
    onClear();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 w-full max-w-3xl mx-auto">
      <div className="relative flex-1 group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
        <Input
          type="text"
          placeholder="Search thousands of movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-12 pr-12 h-14 bg-card/50 backdrop-blur-sm border-2 border-border/50 focus:border-primary/50 focus:bg-card/80 transition-all duration-300 text-base rounded-xl shadow-lg focus:shadow-[0_8px_32px_-8px_hsl(348_90%_55%/0.3)]"
        />
        {query && (
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 hover:bg-destructive/20 hover:text-destructive rounded-lg transition-all"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Button 
        type="submit" 
        disabled={!query.trim()}
        size="lg"
        variant="premium"
        className="px-8 rounded-xl"
      >
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </form>
  );
};
