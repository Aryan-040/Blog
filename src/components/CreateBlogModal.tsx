import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { ImagePlus, X } from "lucide-react";

interface CreateBlogModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateBlogModal = ({ open, onOpenChange }: CreateBlogModalProps) => {
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !overview.trim() || !description.trim() || !category) {
      toast.error("Please fill in all required fields");
      return;
    }

    // In a real app, this would save to a database
    toast.success("Blog created successfully!");
    
    // Reset form
    setTitle("");
    setOverview("");
    setDescription("");
    setCategory("");
    setImagePreview(null);
    onOpenChange(false);
  };

  const handleClose = () => {
    setTitle("");
    setOverview("");
    setDescription("");
    setCategory("");
    setImagePreview(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader className="pb-4 border-b border-gray-200">
          <DialogTitle className="text-xl font-semibold tracking-tight text-gray-900">Create New Blog</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 py-5">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Cover Image</Label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            {imagePreview ? (
              <div className="relative rounded-xl overflow-hidden aspect-video bg-muted">
                <img
                  src={imagePreview}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-background/90 hover:bg-background text-foreground shadow-sm transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full aspect-video rounded-xl border-2 border-dashed border-border bg-muted/30 hover:bg-muted/50 transition-colors flex flex-col items-center justify-center gap-3 cursor-pointer"
              >
                <div className="p-3 rounded-full bg-primary/10">
                  <ImagePlus className="h-6 w-6 text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">Upload cover image</p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
                </div>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title <span className="text-destructive">*</span></Label>
              <Input
                id="title"
                placeholder="Enter blog title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-11 bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category <span className="text-destructive">*</span></Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="h-11 bg-background">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="career">Career</SelectItem>
                  <SelectItem value="regulations">Regulations</SelectItem>
                  <SelectItem value="skills">Skills</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="overview">Overview <span className="text-destructive">*</span></Label>
            <Textarea
              id="overview"
              placeholder="Brief summary of your blog post..."
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              className="min-h-20 resize-none bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Content <span className="text-destructive">*</span></Label>
            <Textarea
              id="description"
              placeholder="Write your blog content here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-36 resize-none bg-background"
            />
          </div>

          <DialogFooter className="pt-5 border-t border-gray-200 gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button type="submit" className="px-6">
              Publish Blog
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBlogModal;
