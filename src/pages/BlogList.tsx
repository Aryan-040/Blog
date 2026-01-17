import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "../api/blogs.ts";
import BlogCard from "../components/BlogCard.tsx";
import BlogListSkeleton from "../components/BlogListSkeleton";

export default function BlogList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  if (isLoading) return <BlogListSkeleton />;
  if (isError) return <p className="p-4 text-red-500">Error loading blogs</p>;

  return (
    <div className="space-y-4">
      {data?.map(blog => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
