import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog } from "../api/blogs";
import type { Blog } from "../types/blog";
import { useState } from "react";

export default function BlogForm() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setTitle("");
      setDescription("");
    },
  });

  const handleSubmit = () => {
    const blog: Blog = {
      title,
      description,
      category: ["TECH"],
      content: description,
      date: new Date().toISOString(),
      coverImage: "https://picsum.photos/600/400",
    };

    mutation.mutate(blog);
  };

  return (
    <div className="border p-4 rounded-lg space-y-2">
      <input
        className="border p-2 w-full"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        className="border p-2 w-full"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Create Blog
      </button>
    </div>
  );
}
