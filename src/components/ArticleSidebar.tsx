import { useState, useMemo, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "@/api/blogs";
import ArticleCard from "./ArticleCard";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate } from "@/lib/dateUtils";
import type { Blog } from "@/types/blog";

type SortOption = "recent" | "oldest" | "alphabetical";

// Map category to icon type
const getCategoryIcon = (category: string): "finance" | "career" | "regulations" | "skills" | "technology" => {
  const categoryUpper = category.toUpperCase();
  if (categoryUpper.includes("FINANCE") || categoryUpper.includes("FINTECH")) return "finance";
  if (categoryUpper.includes("CAREER") || categoryUpper.includes("JOB")) return "career";
  if (categoryUpper.includes("REGULATION") || categoryUpper.includes("TAX") || categoryUpper.includes("LAW")) return "regulations";
  if (categoryUpper.includes("SKILL") || categoryUpper.includes("DEVELOPMENT")) return "skills";
  if (categoryUpper.includes("TECHNOLOGY") || categoryUpper.includes("TECH") || categoryUpper.includes("AI") || categoryUpper.includes("AUTOMATION")) return "technology";
  return "finance"; 
};

// Convert Blog to ArticleCard props
const blogToArticleCard = (blog: Blog, index: number) => {
  const primaryCategory = blog.category[0] || "Finance";
  const categoryIcon = getCategoryIcon(primaryCategory);
  const timestamp = formatDate(blog.date);
  
  return {
    id: String(blog.id || index),
    category: primaryCategory,
    categoryIcon,
    timestamp,
    title: blog.title,
    description: blog.description || blog.content.substring(0, 100) + "...",
    tag: blog.category[1] || blog.category[0] || "Article",
    isActive: index === 0,
  };
};

interface ArticleSidebarProps {
  selectedBlogId: string | null;
  onBlogSelect: (id: string) => void;
}

const ArticleSidebar = ({ selectedBlogId, onBlogSelect }: ArticleSidebarProps) => {
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const [visibleCount, setVisibleCount] = useState(5);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { data: blogs, isLoading, isError, isPending, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  const sortedArticles = useMemo(() => {
    if (!blogs) return [];

    const articles = blogs.map((blog, index) => {
      const card = blogToArticleCard(blog, index);
      return {
        ...card,
        isActive: selectedBlogId === card.id,
      };
    });

    return [...articles].sort((a, b) => {
      switch (sortBy) {
        case "recent":
          // Sort by date (newest first) - we'll use the original blog date
          const blogA = blogs.find(blog => String(blog.id) === a.id);
          const blogB = blogs.find(blog => String(blog.id) === b.id);
          if (!blogA || !blogB) return 0;
          return new Date(blogB.date).getTime() - new Date(blogA.date).getTime();
        case "oldest":
          const blogAOld = blogs.find(blog => String(blog.id) === a.id);
          const blogBOld = blogs.find(blog => String(blog.id) === b.id);
          if (!blogAOld || !blogBOld) return 0;
          return new Date(blogAOld.date).getTime() - new Date(blogBOld.date).getTime();
        case "alphabetical":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  }, [blogs, sortBy, selectedBlogId]);

  // Get visible articles based on visibleCount
  const visibleArticles = useMemo(() => {
    return sortedArticles.slice(0, visibleCount);
  }, [sortedArticles, visibleCount]);

  // Handle scroll to load more
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      // Load more when user scrolls to within 100px of bottom
      if (scrollHeight - scrollTop - clientHeight < 100) {
        if (visibleCount < sortedArticles.length) {
          setVisibleCount(prev => Math.min(prev + 5, sortedArticles.length));
        }
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [visibleCount, sortedArticles.length]);

  // Reset visible count when sort changes
  useEffect(() => {
    setVisibleCount(5);
  }, [sortBy]);

  return (
    <aside className="w-full lg:w-80 shrink-0 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Latest Articles</h2>
        <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
          <SelectTrigger className="w-32 h-8 text-xs">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="alphabetical">A-Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {(isLoading || isPending) && (
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
      )}

      {isError && (
        <div className="p-4 rounded-xl border border-destructive/20 bg-destructive/5">
          <p className="text-sm font-semibold text-destructive mb-1">Error loading articles</p>
          <p className="text-xs text-muted-foreground">
            {error instanceof Error ? error.message : "Failed to fetch articles. Please try again later."}
          </p>
        </div>
      )}

      {!isLoading && !isPending && !isError && (
        <div 
          ref={scrollContainerRef}
          className="flex flex-col gap-3 overflow-y-auto max-h-[calc(100vh-300px)] pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgb(209 213 219) transparent'
          }}
        >
          {sortedArticles.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No articles found
            </p>
          ) : (
            <>
              {visibleArticles.map((article) => (
                <ArticleCard 
                  key={article.id} 
                  {...article} 
                  onSelect={() => onBlogSelect(article.id)}
                />
              ))}
              {visibleCount < sortedArticles.length && (
                <div className="text-center py-4">
                  <p className="text-xs text-muted-foreground">
                    Scroll for more articles ({sortedArticles.length - visibleCount} remaining)
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </aside>
  );
};

export default ArticleSidebar;
