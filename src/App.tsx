import { Routes, Route } from "react-router-dom";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";
import BlogForm from "./components/BlogForm";

export default function App() {
  return (
    <div className="h-screen grid grid-cols-[400px_1fr]">
      {/* Left panel */}
      <div className="border-r p-4 overflow-y-auto space-y-4">
        <BlogForm />
        <BlogList />
      </div>

      {/* Right panel */}
      <div className="p-6 overflow-y-auto">
        <Routes>
          <Route
            path="/blogs/:id"
            element={<BlogDetail />}
          />
          <Route
            path="*"
            element={
              <div className="text-gray-400">
                Select a blog to view details
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
