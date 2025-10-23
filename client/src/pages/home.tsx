import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { ArticleCard } from "@/components/ArticleCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { Article } from "@shared/schema";
import { useEffect } from "react";

export default function Home() {
  const { data: articles, isLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles/published"],
  });

  useEffect(() => {
    document.title = "Somali Diaspora News Network - Latest News from the Somali Community";
  }, []);

  const featuredArticle = articles?.[0];
  const otherArticles = articles?.slice(1) || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="space-y-12">
            <div className="space-y-4">
              <Skeleton className="h-[400px] w-full rounded-lg" />
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-[400px] rounded-lg" />
              ))}
            </div>
          </div>
        ) : articles && articles.length > 0 ? (
          <div className="space-y-12">
            {featuredArticle && (
              <section className="space-y-6" data-testid="section-featured">
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-primary" />
                  <h2 className="font-serif text-2xl font-bold text-primary">Featured Story</h2>
                  <div className="h-px flex-1 bg-primary" />
                </div>
                <div className="overflow-hidden rounded-lg border bg-card">
                  <div className="grid md:grid-cols-2 gap-0">
                    {featuredArticle.featuredImage && (
                      <div className="aspect-video md:aspect-auto overflow-hidden bg-muted">
                        <img
                          src={featuredArticle.featuredImage}
                          alt={featuredArticle.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex flex-col justify-center p-8 space-y-4">
                      <div className="inline-flex">
                        <span className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
                          {featuredArticle.category}
                        </span>
                      </div>
                      <h2 className="font-serif text-3xl md:text-4xl font-bold leading-tight">
                        {featuredArticle.title}
                      </h2>
                      <p className="text-lg text-muted-foreground line-clamp-3">
                        {featuredArticle.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4">
                        <span className="font-medium">{featuredArticle.author}</span>
                        <span>•</span>
                        <time>
                          {new Date(featuredArticle.publishedAt || featuredArticle.createdAt).toLocaleDateString(
                            "en-US",
                            { month: "long", day: "numeric", year: "numeric" }
                          )}
                        </time>
                      </div>
                      <div>
                        <a
                          href={`/article/${featuredArticle.slug}`}
                          className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                        >
                          Read full story →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            <section className="space-y-6" data-testid="section-latest">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <h2 className="font-serif text-2xl font-bold">Latest News</h2>
                <div className="h-px flex-1 bg-border" />
              </div>
              {otherArticles.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {otherArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-12">
                  No more articles available at the moment.
                </p>
              )}
            </section>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <div className="rounded-full bg-muted p-8">
              <svg className="h-16 w-16 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h2 className="font-serif text-2xl font-bold">No Articles Yet</h2>
            <p className="text-muted-foreground text-center max-w-md">
              There are no published articles yet. Check back soon for the latest news from the Somali Diaspora community.
            </p>
          </div>
        )}
      </main>

      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold">About Us</h3>
              <p className="text-sm text-muted-foreground">
                Somali Diaspora News Network brings you the latest news and stories from the Somali community worldwide.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold">Categories</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary">World</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Politics</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Culture</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Business</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold">Connect</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/rss.xml" className="text-muted-foreground hover:text-primary">RSS Feed</a></li>
                <li><a href="/sitemap.xml" className="text-muted-foreground hover:text-primary">Sitemap</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Contact</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Somali Diaspora News Network. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
