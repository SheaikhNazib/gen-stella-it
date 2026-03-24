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
import { X, Save, Eye, Layout, Type, Globe, Clock, Tag, Search, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { RichTextEditor } from "@/components/ui/RichTextEditor";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";

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
      tags: [],
      category: "Tech",
      featuredImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=300&h=300",
      keywords: [],
      readingTime: "5 min",
      content: "",
      published: false,
    },
  });

  const handleAddTag = (value: string) => {
    const current = form.getValues("tags") || [];
    if (value && !current.includes(value)) {
      form.setValue("tags", [...current, value.trim()]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    const current = form.getValues("tags") || [];
    form.setValue("tags", current.filter((t: string) => t !== tag));
  };

  const handleAddKeyword = (value: string) => {
    const current = form.getValues("keywords") || [];
    if (value && !current.includes(value)) {
      form.setValue("keywords", [...current, value.trim()]);
    }
  };

  const handleRemoveKeyword = (kw: string) => {
    const current = form.getValues("keywords") || [];
    form.setValue("keywords", current.filter((k: string) => k !== kw));
  };

  const preview = form.watch();

  return (
    <div className="h-full flex flex-col bg-slate-50/30 dark:bg-slate-950/30">
      <div className="flex-1 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
          {/* Left Panel: Editor */}
          <div className="lg:col-span-7 xl:col-span-8 border-r bg-white dark:bg-slate-900 overflow-y-auto custom-scrollbar">
            <div className="max-w-4xl mx-auto p-6 md:p-8 space-y-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} id="blog-post-form" className="space-y-8 pb-20">
                  {/* Basic Information */}
                  <section className="space-y-4">
                    <div className="flex items-center gap-2 text-primary">
                       <Type className="h-5 w-5" />
                       <h2 className="text-lg font-semibold tracking-tight">Basic Content</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-bold">Blog Title</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="e.g., The Future of Digital Innovation" 
                                className="h-11 px-4 text-base focus-visible:ring-primary/20 border-slate-200 dark:border-slate-800"
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription className="text-[10px]">What's your article called? Make it catchy!</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="slug"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-bold">URL Slug</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground mr-1">/blog/</span>
                                <Input 
                                  placeholder="future-of-digital-innovation" 
                                  className="pl-14 h-11 focus-visible:ring-primary/20 border-slate-200 dark:border-slate-800"
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormDescription className="text-[10px]">The unique URL address for this post.</FormDescription>
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
                          <FormLabel className="text-sm font-bold">Summary Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe your post in a few sentences for search results and social previews..." 
                              className="min-h-[100px] text-base resize-none focus-visible:ring-primary/20 border-slate-200 dark:border-slate-800"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </section>

                  {/* Media Section */}
                  <section className="space-y-4">
                    <div className="flex items-center gap-2 text-primary">
                       <ImageIcon className="h-5 w-5" />
                       <h2 className="text-lg font-semibold tracking-tight">Main Visual</h2>
                    </div>
                    <FormField
                      control={form.control}
                      name="featuredImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <ImageUpload 
                              value={field.value || ""} 
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormDescription className="text-center text-xs mt-2">
                            High-quality images (16:9) work best.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </section>

                  {/* Editor Section */}
                  <section className="space-y-4">
                    <div className="flex items-center gap-2 text-primary">
                       <Layout className="h-5 w-5" />
                       <h2 className="text-lg font-semibold tracking-tight">Article Body</h2>
                    </div>
                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50/50 dark:bg-slate-900/50">
                              <RichTextEditor 
                                value={field.value} 
                                onChange={field.onChange} 
                                placeholder="Start telling your story..."
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </section>

                  {/* Metadata and SEO */}
                  <section className="space-y-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-primary">
                       <Globe className="h-5 w-5" />
                       <h2 className="text-lg font-semibold tracking-tight">Meta Data & SEO</h2>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <FormField
                          control={form.control}
                          name="author"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Author</FormLabel>
                              <FormControl>
                                <Input placeholder="Stella Team" className="h-10 border-slate-200 dark:border-slate-800" {...field} />
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
                              <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Category</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. Technology" className="h-10 border-slate-200 dark:border-slate-800" {...field} />
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
                              <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Publish Date</FormLabel>
                              <FormControl>
                                <Input type="date" className="h-10 border-slate-200 dark:border-slate-800" {...field} />
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
                              <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Read Time</FormLabel>
                              <FormControl>
                                <Input placeholder="5 min" className="h-10 border-slate-200 dark:border-slate-800" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="flex items-center gap-2 text-sm font-bold">
                              <Tag className="h-4 w-4" /> Tags
                            </FormLabel>
                            <div className="flex flex-wrap gap-2 min-h-1 p-1">
                              {(field.value || []).map((tag: string) => (
                                <Badge key={tag} className="bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 border-none pl-2 py-1 gap-1 group">
                                  {tag}
                                  <button type="button" onClick={() => handleRemoveTag(tag)} className="text-muted-foreground group-hover:text-destructive transition-colors">
                                    <X className="h-3 w-3" />
                                  </button>
                                </Badge>
                              ))}
                            </div>
                            <Input
                              placeholder="Type tag and press Enter..."
                              className="h-10 border-slate-200 dark:border-slate-800 focus-visible:ring-primary/20"
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
                          <FormItem className="space-y-3">
                            <FormLabel className="flex items-center gap-2 text-sm font-bold">
                              <Search className="h-4 w-4" /> SEO Keywords
                            </FormLabel>
                            <div className="flex flex-wrap gap-2 min-h-1 p-1">
                              {(field.value || []).map((kw: string) => (
                                <Badge key={kw} variant="outline" className="pl-2 py-1 gap-1 group border-slate-200 dark:border-slate-800">
                                  {kw}
                                  <button type="button" onClick={() => handleRemoveKeyword(kw)} className="text-muted-foreground group-hover:text-destructive transition-colors">
                                    <X className="h-3 w-3" />
                                  </button>
                                </Badge>
                              ))}
                            </div>
                            <Input
                              placeholder="Add SEO keywords..."
                              className="h-10 border-slate-200 dark:border-slate-800 focus-visible:ring-primary/20"
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
                    </div>
                  </section>

                  {/* Quick Settings Footer (Within Panel) */}
                  <div className="sticky bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-t p-4 -mx-6 md:-mx-8 flex items-center justify-between z-10 box-border">
                    <FormField
                      control={form.control}
                      name="published"
                      render={({ field }) => (
                        <FormItem className="flex items-center gap-3 space-y-0">
                          <FormControl>
                            <Switch 
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-emerald-500"
                            />
                          </FormControl>
                          <div className="flex items-center gap-1.5">
                             <FormLabel className="font-bold cursor-pointer">Published</FormLabel>
                             <span className="text-[10px] text-muted-foreground px-1.5 py-0.5 border rounded-full">Visible to all</span>
                          </div>
                        </FormItem>
                      )}
                    />
                    <div className="flex items-center gap-3">
                      <Button type="submit" size="lg" className="h-11 px-8 shadow-lg shadow-primary/20 font-bold group">
                        {initialData ? (
                          <>
                            <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-300" />
                            Update Story
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Publish Content
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </div>

          {/* Right Panel: Live Preview */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-4 bg-slate-50 dark:bg-slate-950 overflow-y-auto">
             <div className="sticky top-0 z-20 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                   <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Live Card Preview</h3>
                </div>
                <Badge variant="outline" className="bg-white dark:bg-slate-900">v1.2 Draft</Badge>
             </div>
             
             <div className="p-8 flex flex-col items-center">
                <div className="w-full max-w-[340px] perspective-1000">
                  {/* The Preview Card itself */}
                  <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden group transition-all duration-500 hover:shadow-primary/5">
                    <div className="aspect-[16/10] relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                       <img 
                        src={preview.featuredImage} 
                        alt="Preview" 
                        className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1]"
                       />
                       <div className="absolute top-4 left-4">
                          <Badge className="bg-white/90 dark:bg-black/90 text-slate-900 dark:text-white backdrop-blur-sm border-none shadow-sm px-3 py-1 font-bold">
                            {preview.category || 'Category'}
                          </Badge>
                       </div>
                    </div>
                    
                    <div className="p-6 space-y-4">
                       <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-tighter bg-primary/5 px-2 py-1 rounded w-fit">
                          <Clock className="h-3 w-3" />
                          <span>{preview.readingTime || '5 min'} Read</span>
                       </div>
                       
                       <h3 className="text-xl font-bold leading-tight text-slate-900 dark:text-white line-clamp-2 min-h-[56px]">
                         {preview.title || 'Untitled Post'}
                       </h3>
                       
                       <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 leading-relaxed min-h-[40px]">
                         {preview.description || 'Provide a compelling description that draws readers in and summarizes your primary message...'}
                       </p>
                       
                       <div className="pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                          <div className="flex flex-col">
                             <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{preview.author || 'Stella Team'}</span>
                             <span className="text-[10px] text-muted-foreground">{preview.date ? format(new Date(preview.date), "MMM d, yyyy") : 'No Date'}</span>
                          </div>
                          <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                             <Eye className="h-4 w-4 text-slate-400" />
                          </div>
                       </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 text-center space-y-2">
                     <p className="text-xs text-muted-foreground font-medium">This is how your post will appear in the main blog feed.</p>
                     <div className="flex justify-center gap-2">
                        <Badge variant="outline" className="text-[9px] h-5 opacity-60">16:9 Aspect</Badge>
                        <Badge variant="outline" className="text-[9px] h-5 opacity-60">Mobile Ready</Badge>
                        <Badge variant="outline" className="text-[9px] h-5 opacity-60">SEO Optimized</Badge>
                     </div>
                  </div>
                </div>

                {/* Additional Stats / Preview features */}
                <div className="w-full mt-12 grid grid-cols-2 gap-4">
                   <Card className="bg-white dark:bg-slate-900 border-none shadow-sm">
                      <CardContent className="p-4 space-y-1">
                         <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Word Count</span>
                         <div className="text-xl font-bold text-slate-900 dark:text-white">
                           {preview.content?.split(/\s+/).filter(Boolean).length || 0}
                         </div>
                      </CardContent>
                   </Card>
                   <Card className="bg-white dark:bg-slate-900 border-none shadow-sm">
                      <CardContent className="p-4 space-y-1">
                         <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Alt Text</span>
                         <div className="flex items-center gap-2">
                            <div className={`h-2 w-2 rounded-full ${preview.title ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                            <span className="text-xs font-semibold">{preview.title ? 'Ready' : 'Incomplete'}</span>
                         </div>
                      </CardContent>
                   </Card>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
