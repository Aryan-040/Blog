import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import ArticleSidebar from "@/components/ArticleSidebar";
import ArticleContent from "@/components/ArticleContent";
import Footer from "@/components/Footer";

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedBlogId = searchParams.get("blog");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
    {/* Hero Section */}
  <section className="relative flex items-center justify-center py-12 bg-linear-to-b from-background to-muted/40 border-b border-border/40">
    <div className="container px-4">
      <div className="max-w-2xl mx-auto text-center">

        <span className="inline-flex items-center px-3 py-1 text-xs font-semibold tracking-wide text-primary bg-primary/10 rounded-full mb-4">
          Knowledge Hub
        </span>

        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-3">
          CA Monk Blog
        </h1>

        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
          Stay updated with the latest trends in finance, accounting, and career growth
        </p>

      </div>
    </div>
  </section>


      {/* Main Content */}
      <main className="container py-12 px-4">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <ArticleSidebar selectedBlogId={selectedBlogId} onBlogSelect={(id) => setSearchParams({ blog: id })} />
          <ArticleContent blogId={selectedBlogId} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
