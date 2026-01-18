import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Plus } from "lucide-react";
import CreateBlogModal from "./CreateBlogModal";

const Header = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const navItems = ["Tools", "Practice", "Events", "Job Board", "Points"];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-card/80 backdrop-blur-md">
        <div className="container flex h-14 items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-sm group-hover:shadow-md transition-shadow">
              <BookOpen className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground tracking-tight">CA Monk</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="px-3 py-2 text-sm font-medium text-muted-foreground rounded-lg transition-colors hover:text-foreground hover:bg-accent"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button 
              variant="default" 
              size="sm" 
              className="gap-1.5 shadow-sm h-9"
              onClick={() => setCreateModalOpen(true)}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Create</span>
            </Button>
            <Button variant="ghost" size="sm" className="h-9">
              Profile
            </Button>
          </div>
        </div>
      </header>

      <CreateBlogModal open={createModalOpen} onOpenChange={setCreateModalOpen} />
    </>
  );
};

export default Header;
