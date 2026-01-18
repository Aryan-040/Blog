import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog } from "../api/blogs";
import type { Blog } from "../types/blog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BlogForm() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setTitle("");
      setDescription("");
      setContent("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !content) {
      return;
    }

    const blog: Blog = {
      title,
      description,
      category: ["TECH"],
      content,
      date: new Date().toISOString(),
      coverImage: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg",
    };

    mutation.mutate(blog);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Create New Blog</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Title
            </label>
            <Input
              placeholder="Enter blog title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Description
            </label>
            <Textarea
              placeholder="Enter blog description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Content
            </label>
            <Textarea
              placeholder="Enter full blog content"
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={6}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Creating..." : "Create Blog"}
          </Button>

          {mutation.isError && (
            <p className="text-sm text-red-500">
              Failed to create blog. Please try again.
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
