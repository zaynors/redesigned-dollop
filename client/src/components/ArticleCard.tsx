import { Link } from "wouter";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";
import { format } from "date-fns";
import type { Article } from "@shared/schema";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const publishDate = article.publishedAt ? new Date(article.publishedAt) : new Date(article.createdAt);

  return (
    <Link href={`/article/${article.slug}`} data-testid={`card-article-${article.id}`}>
      <Card className="h-full hover-elevate overflow-hidden transition-all duration-200">
          {article.featuredImage && (
            <div className="aspect-video w-full overflow-hidden bg-muted">
              <img
                src={article.featuredImage}
                alt={article.title}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                data-testid={`img-article-${article.id}`}
              />
            </div>
          )}
          <CardHeader className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" data-testid={`badge-category-${article.id}`}>
                {article.category}
              </Badge>
            </div>
            <h3 className="font-serif text-xl font-bold leading-tight line-clamp-2" data-testid={`text-title-${article.id}`}>
              {article.title}
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground line-clamp-3" data-testid={`text-excerpt-${article.id}`}>
              {article.excerpt}
            </p>
          </CardContent>
          <CardFooter className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span data-testid={`text-author-${article.id}`}>{article.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <time dateTime={publishDate.toISOString()} data-testid={`text-date-${article.id}`}>
                {format(publishDate, "MMM d, yyyy")}
              </time>
            </div>
          </CardFooter>
        </Card>
    </Link>
  );
}
