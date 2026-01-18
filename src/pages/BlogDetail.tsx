import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBlogById, deleteBlog } from "../api/blogs";
import { formatFullDate, calculateReadTime } from "@/lib/dateUtils";
import { getCategoryColor } from "@/lib/categoryColors";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Share2, ThumbsUp, MessageSquare, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  //fetching blog data using tanstack query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlogById(id!),
    enabled: !!id,
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: () => deleteBlog(id!),
    onSuccess: () => {
      // Invalidate and refetch blogs list
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["blog", id] });
      toast.success("Blog deleted successfully!");
      setIsDeleteDialogOpen(false);
      navigate("/");
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to delete blog");
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article className="flex-1 max-w-3xl mx-auto">
            <Skeleton className="w-full h-64 rounded-2xl mb-6" />
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6" />
          </article>
        </main>
        <Footer />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article className="flex-1 max-w-3xl mx-auto">
            <div className="p-6 text-center">
              <p className="text-destructive text-lg mb-2">Error loading article</p>
              <p className="text-muted-foreground">Please try again later</p>
            </div>
          </article>
        </main>
        <Footer />
      </div>
    );
  }

  if (!id || !data) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article className="flex-1 max-w-3xl mx-auto">
            <div className="flex items-center justify-center h-96 text-center">
              <div>
                <p className="text-2xl font-semibold text-muted-foreground mb-2">
                  Select an article to view
                </p>
                <p className="text-muted-foreground">
                  Choose an article from the sidebar to read the full content
                </p>
              </div>
            </div>
          </article>
        </main>
        <Footer />
      </div>
    );
  }

  const primaryCategory = data.category[0] || 'FINANCE';
  const categoryColor = getCategoryColor(primaryCategory);
  const readTime = calculateReadTime(data.content);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="flex-1 max-w-3xl mx-auto">
          {/* Hero Image */}
          <div className="relative rounded-2xl overflow-hidden mb-6 aspect-[16/9] bg-gradient-to-br from-accent to-primary/10 shadow-lg">
            <img
              src={data.coverImage}
              alt={data.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Meta */}
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="secondary" className={`text-xs font-semibold ${categoryColor}`}>
              {primaryCategory}
            </Badge>
            <span className="text-sm text-muted-foreground">{readTime} min read</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight tracking-tight">
            {data.title}
          </h1>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mb-6">
            <Button variant="default" size="sm" className="shadow-sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share Article
            </Button>
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="shadow-sm bg-red-600 hover:bg-red-700 text-white border-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Blog
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Blog</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete "{data.title}"? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsDeleteDialogOpen(false)}
                    disabled={deleteMutation.isPending}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => deleteMutation.mutate()}
                    disabled={deleteMutation.isPending}
                  >
                    {deleteMutation.isPending ? "Deleting..." : "Delete"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Article Stats */}
          <div className="grid grid-cols-3 gap-4 p-5 bg-card rounded-xl border border-border/60 mb-8 shadow-sm">
            <div className="text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5">
                Category
              </p>
              <p className="font-semibold text-foreground">{data.category.join(" & ")}</p>
            </div>
            <div className="text-center border-x border-border/60">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5">
                Read Time
              </p>
              <p className="font-semibold text-foreground">{readTime} Mins</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5">
                Date
              </p>
              <p className="font-semibold text-foreground">{formatFullDate(data.date)}</p>
            </div>
          </div>

          {/* Article Body */}
          <div className="prose prose-slate max-w-none">
            <div className="text-muted-foreground leading-relaxed whitespace-pre-line text-base">
              {data.content}
            </div>
          </div>

          {/* Author Section */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" />
                <AvatarFallback className="bg-primary/10 text-primary">AM</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-foreground text-sm">Written by Arjun Mehta</p>
                <p className="text-xs text-muted-foreground">Senior Financial Analyst</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <ThumbsUp className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <MessageSquare className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
