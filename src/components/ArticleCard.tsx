import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBlog } from "@/api/blogs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TrendingUp, Briefcase, Scale, Users, Monitor, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface ArticleCardProps {
  id: string;
  category: string;
  categoryIcon: "finance" | "career" | "regulations" | "skills" | "technology";
  timestamp: string;
  title: string;
  description: string;
  tag: string;
  isActive?: boolean;
  onSelect: () => void;
}

const iconMap = {
  finance: TrendingUp,
  career: Briefcase,
  regulations: Scale,
  skills: Users,
  technology: Monitor,
};

const ArticleCard = ({
  id,
  category,
  categoryIcon,
  timestamp,
  title,
  description,
  tag,
  isActive = false,
  onSelect,
}: ArticleCardProps) => {
  const Icon = iconMap[categoryIcon];
  const queryClient = useQueryClient();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: () => deleteBlog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["blog", id] });
      toast.success("Blog deleted successfully!");
      setIsDeleteDialogOpen(false);
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to delete blog");
    },
  });

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger selection if clicking on delete button or dialog
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('[role="dialog"]')) {
      return;
    }
    onSelect();
  };

  return (
    <article
      onClick={handleCardClick}
      className={`group relative rounded-xl border bg-card p-4 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer ${
        isActive ? "border-l-4 border-l-primary shadow-md ring-1 ring-primary/10" : "border-border/60 hover:border-primary/40"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-primary/10">
            <Icon className="h-3 w-3 text-primary" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            {category}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{timestamp}</span>
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/10 hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDeleteDialogOpen(true);
                }}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </DialogTrigger>
            <DialogContent onClick={(e) => e.stopPropagation()}>
              <DialogHeader>
                <DialogTitle>Delete Blog</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete "{title}"? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDeleteDialogOpen(false);
                  }}
                  disabled={deleteMutation.isPending}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteMutation.mutate();
                  }}
                  disabled={deleteMutation.isPending}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  {deleteMutation.isPending ? "Deleting..." : "Delete"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
        {title}
      </h3>

      <p className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
        {description}
      </p>

      <Badge variant="secondary" className="text-xs font-medium">
        {tag}
      </Badge>
    </article>
  );
};

export default ArticleCard;
