"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogPostSchema } from "@/lib/validations/admin";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { RichTextEditor } from "@/components/ui/RichTextEditor";
import { ImageUpload } from "@/components/ui/ImageUpload";

interface BlogPostFormProps {
  initialData?: any;
  onSubmit: (data: any) => Promise<void>;
}

export function BlogPostForm({ initialData, onSubmit }: BlogPostFormProps) {
  const form = useForm({
    resolver: zodResolver(blogPostSchema),
    defaultValues: initialData || {
      slug: "",
      title: "",
      description: "",
      date: new Date().toISOString().split('T')[0],
      author: "Stella Team",
      tags: [""],
      category: "Tech",
      featuredImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=300&h=300",
      keywords: [""],
      readingTime: "5 min",
      content: "",
      published: false,
    },
  });

  const handleAddTag = (value: string) => {
    const current = form.getValues("tags") || [];
    if (value && !current.includes(value)) {
      form.setValue("tags", [...current, value]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    const current = form.getValues("tags") || [];
    form.setValue("tags", current.filter((t: string) => t !== tag));
  };

  const handleAddKeyword = (value: string) => {
    const current = form.getValues("keywords") || [];
    if (value && !current.includes(value)) {
      form.setValue("keywords", [...current, value]);
    }
  };

  const handleRemoveKeyword = (kw: string) => {
    const current = form.getValues("keywords") || [];
    form.setValue("keywords", current.filter((k: string) => k !== kw));
  };

  const preview = form.watch();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4">
      <div className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Blog Title</FormLabel>
                    <FormControl>
                        <Input placeholder="Future of AI" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                        <Input placeholder="future-of-ai" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brief Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="A quick summary for the card..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="featuredImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Featured Image</FormLabel>
                  <FormControl>
                    <ImageUpload value={field.value || ""} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post Content</FormLabel>
                  <FormControl>
                    <RichTextEditor 
                      value={field.value} 
                      onChange={field.onChange} 
                      placeholder="Write your article here..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author</FormLabel>
                      <FormControl>
                        <Input placeholder="Stella Team" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input placeholder="Tech" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="readingTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reading Time</FormLabel>
                      <FormControl>
                        <Input placeholder="5 min" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {(field.value || []).map((tag: string) => (
                      <Badge key={tag} variant="secondary" className="pl-2 pr-1 py-0.5 gap-1">
                        {tag}
                        <button type="button" onClick={() => handleRemoveTag(tag)}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <Input
                    placeholder="Add tag (Press Enter)"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag(e.currentTarget.value);
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SEO Keywords</FormLabel>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {(field.value || []).map((kw: string) => (
                      <Badge key={kw} variant="outline" className="pl-2 pr-1 py-0.5 gap-1">
                        {kw}
                        <button type="button" onClick={() => handleRemoveKeyword(kw)}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <Input
                    placeholder="Add keyword (Press Enter)"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddKeyword(e.currentTarget.value);
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-4">
                {/* Published Toggle */}
                <FormField
                    control={form.control}
                    name="published"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-white">
                        <div className="space-y-0.5">
                            <FormLabel>Published</FormLabel>
                        </div>
                        <FormControl>
                            <Switch 
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                        </FormItem>
                    )}
                />
            </div>

            <Button type="submit" className="w-full">
              {initialData ? "Update Post" : "Create Post"}
            </Button>
          </form>
        </Form>
      </div>

      <div className="lg:sticky lg:top-24 h-fit">
        <h3 className="text-lg font-semibold mb-4 text-muted-foreground uppercase tracking-wider">
          Blog Card Preview
        </h3>
        <div className="p-4 rounded-xl bg-slate-50 border border-dashed border-slate-200">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-sm mx-auto group">
                <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                    <img 
                        src={preview.featuredImage} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                </div>
                <div className="p-6">
                    <div className="flex items-center gap-4 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-3">
                        {preview.category}
                        <span className="text-slate-300">•</span>
                        {preview.readingTime}
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {preview.title || "Post Title Preview"}
                    </h4>
                    <p className="mt-3 text-slate-600 text-sm line-clamp-3">
                        {preview.description || "A quick preview of the blog post's content summary for the main listing page."}
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
