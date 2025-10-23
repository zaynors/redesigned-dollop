import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";
import { format } from "date-fns";
import type { Article } from "@shared/schema";
import { useEffect } from "react";
import { Link } from "wouter";

export default function ArticlePage() {
  const [, params] = useRoute("/article/:slug");
  const slug = params?.slug;

  const { data: article, isLoading } = useQuery<Article>({
    queryKey: ["/api/articles/slug", slug],
    enabled: !!slug,
  });

  useEffect(() => {
    if (article) {
      document.title = `${article.title} - Somali Diaspora News Network`;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", article.excerpt);
      }
      
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (!ogTitle) {
        ogTitle = document.createElement("meta");
        ogTitle.setAttribute("property", "og:title");
        document.head.appendChild(ogTitle);
      }
      ogTitle.setAttribute("content", article.title);
      
      let ogDescription = document.querySelector('meta[property="og:description"]');
      if (!ogDescription) {
        ogDescription = document.createElement("meta");
        ogDescription.setAttribute("property", "og:description");
        document.head.appendChild(ogDescription);
      }
      ogDescription.setAttribute("content", article.excerpt);
      
      if (article.featuredImage) {
        let ogImage = document.querySelector('meta[property="og:image"]');
        if (!ogImage) {
          ogImage = document.createElement("meta");
          ogImage.setAttribute("property", "og:image");
          document.head.appendChild(ogImage);
        }
        ogImage.setAttribute("content", article.featuredImage);
      }
      
      let ogType = document.querySelector('meta[property="og:type"]');
      if (!ogType) {
        ogType = document.createElement("meta");
        ogType.setAttribute("property", "og:type");
        document.head.appendChild(ogType);
      }
      ogType.setAttribute("content", "article");
    }
  }, [article]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-3xl space-y-8">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-[400px] w-full" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-3xl text-center space-y-4 py-24">
            <h1 className="font-serif text-3xl font-bold">Article Not Found</h1>
            <p className="text-muted-foreground">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const publishDate = article.publishedAt ? new Date(article.publishedAt) : new Date(article.createdAt);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <article className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link href="/" data-testid="button-back">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <header className="space-y-6 mb-8">
            <Badge variant="secondary" data-testid="badge-category">
              {article.category}
            </Badge>

            <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight" data-testid="text-article-title">
              {article.title}
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed" data-testid="text-article-excerpt">
              {article.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6 py-4 border-y">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium" data-testid="text-article-author">
                  {article.author}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <time dateTime={publishDate.toISOString()} data-testid="text-article-date">
                  {format(publishDate, "MMMM d, yyyy")}
                </time>
              </div>
              <Button variant="ghost" size="sm" className="ml-auto" data-testid="button-share">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </header>

          {article.featuredImage && (
            <div className="mb-8 overflow-hidden rounded-lg">
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full object-cover"
                data-testid="img-article-featured"
              />
            </div>
          )}

          <div 
            className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-h2:text-3xl prose-h3:text-2xl prose-p:leading-relaxed prose-a:text-primary prose-img:rounded-lg"
            dangerouslySetInnerHTML={{ __html: article.content }}
            data-testid="content-article-body"
          />
        </div>
      </article>

      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Somali Diaspora News Network. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
