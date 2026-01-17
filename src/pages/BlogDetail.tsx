import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBlogById } from "../api/blogs";

export default function BlogDetail() {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlogById(id!),
  });

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (isError) return <p className="p-4 text-red-500">Error loading blog</p>;

  return (
    <div className="p-6 space-y-4">
      <img src={data?.coverImage} className="rounded-lg" />
      <h1 className="text-2xl font-bold">{data?.title}</h1>
      <p className="text-gray-600">{data?.content}</p>
    </div>
  );
}
