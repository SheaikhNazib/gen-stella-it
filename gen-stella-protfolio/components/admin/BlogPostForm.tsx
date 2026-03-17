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
  FormDescription,
  FormItem as FormItem_ui
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar, User, Tag, Image as ImageIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";

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
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post Content (Markdown or HTML)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Markdown/HTML body here..." className="min-h-[200px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
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
