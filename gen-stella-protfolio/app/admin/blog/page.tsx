"use client";

import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronLeft, Eye, ExternalLink, Filter, LayoutGrid, List, Loader2, MoreVertical, Pencil, Plus, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { BlogPostForm } from "@/components/admin/BlogPostForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BlogPost } from "@/types/blog";

export default function AdminBlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/blog");
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      toast.error("Failed to load blog posts");
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.slug.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = categoryFilter === "all" || post.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, categoryFilter]);

  const categories = useMemo(() => {
    const cats = new Set(posts.map(p => p.category));
    return Array.from(cats);
  }, [posts]);

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

  if (isAdding || editingPost) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {editingPost ? "Edit Post" : "Create New Post"}
            </h1>
            <p className="text-muted-foreground mt-1">
              {editingPost ? `Editing: ${editingPost.title}` : "Fill in the details for your new article."}
            </p>
          </div>
          <Button variant="outline" onClick={() => { setEditingPost(null); setIsAdding(false); }}>
            Cancel
          </Button>
        </div>
        <div className="bg-card rounded-xl border shadow-sm overflow-hidden min-h-[600px]">
          <BlogPostForm initialData={editingPost || undefined} onSubmit={handleSubmit} />
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-500 bg-clip-text text-transparent dark:from-white dark:to-slate-400">
            Blog Management
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage your articles, news, and updates.
          </p>
        </div>
        <Button size="lg" onClick={() => setIsAdding(true)} className="shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
          <Plus className="h-5 w-5 mr-2" />
          New Post
        </Button>
      </motion.div>

      {/* Analytics/Summary Snapshot (Optional but looks professional) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
         <Card className="bg-slate-50/50 dark:bg-slate-900/50 border-none shadow-sm hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors">
            <CardContent className="p-4 flex flex-col justify-center h-24">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider text-[10px]">Total Posts</span>
              <span className="text-2xl font-bold">{posts.length}</span>
            </CardContent>
         </Card>
         <Card className="bg-slate-50/50 dark:bg-slate-900/50 border-none shadow-sm hover:bg-emerald-50/30 dark:hover:bg-emerald-900/10 transition-colors">
            <CardContent className="p-4 flex flex-col justify-center h-24">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider text-[10px]">Published</span>
              <span className="text-2xl font-bold text-emerald-600">{posts.filter(p => p.published).length}</span>
            </CardContent>
         </Card>
         <Card className="bg-slate-50/50 dark:bg-slate-900/50 border-none shadow-sm hover:bg-amber-50/30 dark:hover:bg-amber-900/10 transition-colors">
            <CardContent className="p-4 flex flex-col justify-center h-24">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider text-[10px]">Drafts</span>
              <span className="text-2xl font-bold text-amber-600">{posts.filter(p => !p.published).length}</span>
            </CardContent>
         </Card>
         <Card className="bg-slate-50/50 dark:bg-slate-900/50 border-none shadow-sm hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors">
            <CardContent className="p-4 flex flex-col justify-center h-24">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider text-[10px]">Categories</span>
              <span className="text-2xl font-bold text-blue-600">{categories.length}</span>
            </CardContent>
         </Card>
      </motion.div>

      {/* Filters and Search Bar */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-xl border shadow-sm"
      >
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search posts..." 
            className="pl-10 h-10 bg-slate-50/50 border-none focus-visible:ring-primary/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[180px] h-10 bg-slate-50/50 border-none focus:ring-primary/20 transition-all">
              <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex border rounded-lg overflow-hidden shrink-0">
             <Button 
              variant={viewMode === 'table' ? 'secondary' : 'ghost'} 
              size="icon" 
              className="h-10 w-10 rounded-none border-r transition-all"
              onClick={() => setViewMode('table')}
             >
               <List className="h-4 w-4" />
             </Button>
             <Button 
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'} 
              size="icon" 
              className="h-10 w-10 rounded-none transition-all"
              onClick={() => setViewMode('grid')}
             >
               <LayoutGrid className="h-4 w-4" />
             </Button>
          </div>
        </div>
      </motion.div>

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground animate-pulse">Fetching your stories...</p>
        </div>
      ) : filteredPosts.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-24 px-4 bg-slate-50/50 dark:bg-slate-900/50 border-2 border-dashed rounded-3xl text-center space-y-4"
        >
          <div className="h-20 w-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-2">
            <BookOpen className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold">No posts found</h3>
          <p className="text-muted-foreground max-w-sm mx-auto">
            {searchQuery || categoryFilter !== "all" 
              ? "We couldn't find any posts matching your current filters." 
              : "Ready to start writing? Create your first post and share it with the world!"}
          </p>
          {(searchQuery || categoryFilter !== "all") && (
            <Button variant="link" onClick={() => { setSearchQuery(""); setCategoryFilter("all"); }}>
              Clear all filters
            </Button>
          )}
          {!searchQuery && categoryFilter === "all" && (
            <Button onClick={() => setIsAdding(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create your first post
            </Button>
          )}
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          {viewMode === 'table' ? (
            <motion.div 
              key="table"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="rounded-xl border bg-white dark:bg-slate-900 shadow-sm overflow-hidden"
            >
              <Table>
                <TableHeader className="bg-slate-50/50 dark:bg-slate-800/50">
                  <TableRow>
                    <TableHead className="w-[45%]">Post</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.map((post) => (
                    <TableRow key={post.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors cursor-default">
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <div className="h-14 w-24 relative rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                            <img 
                              src={post.featuredImage} 
                              alt={post.title}
                              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                          <div className="min-w-0 max-w-xs xl:max-w-md">
                            <div className="font-bold text-slate-900 dark:text-slate-100 truncate group-hover:text-primary transition-colors">{post.title}</div>
                            <div className="text-xs text-muted-foreground truncate">{post.description}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-none font-medium">
                          {post.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {post.published ? (
                          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none font-medium">Published</Badge>
                        ) : (
                          <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-100 border-none font-medium text-[10px] uppercase tracking-wider">Draft</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm font-medium">
                        {format(new Date(post.date), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 transition-all hover:bg-slate-100 dark:hover:bg-slate-800">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 p-1">
                            <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-muted-foreground px-2 py-1.5 font-bold">Post Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="rounded-lg gap-2 cursor-pointer" onClick={() => setEditingPost(post)}>
                              <Pencil className="h-4 w-4" />
                              Edit Content
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild className="rounded-lg gap-2 cursor-pointer">
                              <Link href={`/blog/${post.slug}`} target="_blank">
                                <ExternalLink className="h-4 w-4" />
                                View Public URL
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive rounded-lg gap-2 cursor-pointer" onClick={() => handleDelete(post.id)}>
                              <Trash2 className="h-4 w-4" />
                              Move to Trash
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </motion.div>
          ) : (
            <motion.div 
              key="grid"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredPosts.map((post, idx) => (
                <motion.div 
                  key={post.id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white dark:bg-slate-900 rounded-2xl border p-4 shadow-sm flex flex-col group relative overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all duration-300"
                >
                   <div className="aspect-video rounded-xl overflow-hidden mb-4 bg-slate-100 dark:bg-slate-800 relative shadow-inner">
                    <img 
                      src={post.featuredImage} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                       {post.published ? (
                          <Badge className="bg-emerald-500/90 text-white backdrop-blur-sm border-none shadow-sm h-6 px-2 font-bold text-[10px]">Published</Badge>
                        ) : (
                          <Badge className="bg-amber-500/90 text-white backdrop-blur-sm border-none shadow-sm h-6 px-2 font-bold text-[10px]">Draft</Badge>
                        )}
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                       <Button variant="secondary" size="sm" className="rounded-full font-bold shadow-xl" onClick={() => setEditingPost(post)}>
                         Quick Edit
                       </Button>
                    </div>
                 </div>
                 <div className="flex-1 px-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter shadow-sm border border-blue-100/50 dark:border-blue-800/50">{post.category}</span>
                      <span className="text-[10px] text-muted-foreground ml-auto">{format(new Date(post.date), "MMM d, yyyy")}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2 leading-tight mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-2 leading-relaxed">{post.description}</p>
                 </div>
                 
                 <div className="flex items-center gap-2 mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <Button variant="secondary" size="sm" className="h-8 flex-1 font-semibold group/edit" onClick={() => setEditingPost(post)}>
                      <Pencil className="h-3.5 w-3.5 mr-1.5 transition-transform group-hover/edit:-rotate-12" />
                      Edit Post
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-all active:scale-90" onClick={() => handleDelete(post.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 ml-auto hover:text-primary transition-colors" asChild title="View Public">
                      <Link href={`/blog/${post.slug}`} target="_blank">
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                 </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
