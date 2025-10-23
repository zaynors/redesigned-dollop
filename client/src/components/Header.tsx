import { Link } from "wouter";
import { Newspaper, Rss } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover-elevate rounded-md px-3 py-2 -ml-3" data-testid="link-home">
            <Newspaper className="h-8 w-8 text-primary" />
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold text-foreground">
                Somali Diaspora News Network
              </span>
              <span className="text-xs text-muted-foreground hidden sm:block">
                News from the Somali Community Worldwide
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <a href="/rss.xml" className="flex items-center gap-2" data-testid="link-rss">
                <Rss className="h-4 w-4" />
                <span className="hidden sm:inline">RSS</span>
              </a>
            </Button>
            <Button variant="default" size="sm" asChild>
              <Link href="/admin" data-testid="link-admin">
                Admin
              </Link>
            </Button>
          </nav>
        </div>
      </div>

      <div className="border-t">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-1 overflow-x-auto py-2" data-testid="nav-categories">
            {["World", "Politics", "Culture", "Business", "Technology", "Community"].map((category) => (
              <Button
                key={category}
                variant="ghost"
                size="sm"
                className="whitespace-nowrap"
                data-testid={`link-category-${category.toLowerCase()}`}
              >
                {category}
              </Button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
