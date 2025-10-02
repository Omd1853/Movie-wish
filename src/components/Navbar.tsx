import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Film, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 glass-effect border-b border-border/30 shadow-xl">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative p-2.5 bg-gradient-to-br from-primary to-accent rounded-xl group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-[0_8px_24px_-8px_hsl(348_90%_55%/0.6)]">
              <Film className="h-7 w-7 text-primary-foreground" />
              <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-foreground tracking-tight">MovieHub</span>
              <span className="text-xs text-muted-foreground font-medium">Discover & Watch</span>
            </div>
          </Link>
          
          <div className="flex gap-3">
            <Link to="/">
              <Button
                variant={location.pathname === "/" ? "premium" : "glass"}
                className={cn(
                  "transition-all duration-300 px-6",
                  location.pathname !== "/" && "hover:border-primary/30"
                )}
              >
                <Film className="h-4 w-4 mr-2" />
                Browse
              </Button>
            </Link>
            <Link to="/watchlist">
              <Button
                variant={location.pathname === "/watchlist" ? "premium" : "glass"}
                className={cn(
                  "transition-all duration-300 px-6",
                  location.pathname !== "/watchlist" && "hover:border-primary/30"
                )}
              >
                <Bookmark className="h-4 w-4 mr-2" />
                Watchlist
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
