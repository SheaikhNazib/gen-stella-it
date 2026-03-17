"use client";

import { useEffect, useState } from "react";
import { BlogPostForm } from "@/components/admin/BlogPostForm";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Plus, Pencil, Trash2, Loader2, BookOpen } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BlogPost } from "@/types/blog";

export default function AdminBlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/admin/blog");
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      const method = editingPost ? "PUT" : "POST";
      const body = editingPost ? { ...data, id: editingPost.id } : data;

      const response = await fetch("/api/admin/blog", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Failed to save blog post");
      }

      toast.success(editingPost ? "Blog post updated!" : "Blog post created!");
      setEditingPost(null);
      setIsAdding(false);
      fetchPosts();
      router.refresh();
    } catch (error) {
      toast.error("Error: Could not save blog post.");
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await fetch(`/api/admin/blog?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      toast.success("Post deleted");
      fetchPosts();
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete post");
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl mt-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="space-y-1">
          <Link 
            href="/admin" 
            className="text-sm text-muted-foreground hover:text-primary flex items-center transition-colors mb-2"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Blog Management</h1>
          <p className="text-muted-foreground">
            {isAdding || editingPost ? "Write your thoughts. Preview the post live on the right." : "Manage your articles and updates."}
          </p>
        </div>
        {!isAdding && !editingPost && (
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        )}
      </div>

      {(isAdding || editingPost) ? (
        <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
          <div className="flex justify-end p-4 border-b">
            <Button variant="ghost" onClick={() => { setEditingPost(null); setIsAdding(false); }}>Cancel</Button>
          </div>
          <BlogPostForm initialData={editingPost || undefined} onSubmit={handleSubmit} />
        </div>
      ) : loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl border p-4 shadow-sm flex flex-col group relative overflow-hidden">
               <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-slate-100">
                <img 
                  src={post.featuredImage} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
             </div>
             <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-slate-900 line-clamp-2">{post.title}</h3>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded uppercase">{post.category}</span>
                  {!post.published && (
                    <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded uppercase">Draft</span>
                  )}
                </div>
                <p className="text-slate-500 text-sm line-clamp-2">{post.description}</p>
             </div>
             <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-50 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="outline" size="sm" className="h-8" onClick={() => setEditingPost(post)}>
                  <Pencil className="h-3.5 w-3.5 mr-1.5" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm" className="h-8" onClick={() => handleDelete(post.id)}>
                  <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                  Delete
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 ml-auto" asChild>
                  <Link href={`/blog/${post.slug}`}>
                    <BookOpen className="h-3.5 w-3.5" />
                  </Link>
                </Button>
             </div>
            </div>
          ))}
          {posts.length === 0 && (
            <div className="col-span-full py-16 text-center border-2 border-dashed rounded-2xl bg-slate-50">
              <p className="text-muted-foreground">No blog posts found. Share your first story!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
