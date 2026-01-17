import { Card, CardContent } from "@/components/ui/card";
import type { Blog } from "../types/blog";
import { Link } from "react-router-dom";

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link to={`/blogs/${blog.id}`}>
      <Card className="hover:bg-muted transition cursor-pointer">
        <CardContent className="p-4 space-y-1">
          <p className="text-xs text-muted-foreground">
            {blog.category.join(", ")}
          </p>
          <h3 className="font-semibold">{blog.title}</h3>
          <p className="text-sm text-muted-foreground">
            {blog.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
