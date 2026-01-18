import { Card, CardContent } from "@/components/ui/card";
import type { Blog } from "../types/blog";
import { Link } from "react-router-dom";
import { formatDate } from "@/lib/dateUtils";
import { getCategoryColor } from "@/lib/categoryColors";
import type { ReactNode } from "react";
import { 
  TrendingUp, 
  GraduationCap, 
  FileText, 
  Lightbulb, 
  Settings,
  BookOpen,
  Heart
} from "lucide-react";

const categoryIcons: Record<string, ReactNode> = {
  'FINANCE': <TrendingUp className="w-4 h-4" />,
  'TECH': <Settings className="w-4 h-4" />,
  'CAREER': <GraduationCap className="w-4 h-4" />,
  'EDUCATION': <BookOpen className="w-4 h-4" />,
  'REGULATIONS': <FileText className="w-4 h-4" />,
  'SKILLS': <Lightbulb className="w-4 h-4" />,
  'TECHNOLOGY': <Settings className="w-4 h-4" />,
  'LIFESTYLE': <Heart className="w-4 h-4" />,
};

export default function BlogCard({ blog, isActive = false }: { blog: Blog; isActive?: boolean }) {
  const primaryCategory = blog.category[0] || 'FINANCE';
  const categoryColor = getCategoryColor(primaryCategory);
  const icon = categoryIcons[primaryCategory] || <FileText className="w-4 h-4" />;

  return (
    <Link to={`/blogs/${blog.id}`}>
      <Card 
        className={`transition-all cursor-pointer hover:shadow-md ${
          isActive ? 'border-purple-500 border-2 shadow-md' : 'border-gray-200'
        }`}
      >
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded ${categoryColor}`}>
              {icon}
            </div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              {primaryCategory}
            </span>
            <span className="text-xs text-gray-400 ml-auto">
              {formatDate(blog.date)}
            </span>
          </div>
          
          <h3 className="font-bold text-lg text-gray-900 leading-tight">
            {blog.title}
          </h3>
          
          <p className="text-sm text-gray-600 line-clamp-2">
            {blog.description}
          </p>
          
          {isActive && (
            <span className="inline-block px-2 py-1 text-xs font-semibold bg-purple-100 text-purple-700 rounded">
              Featured
            </span>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
