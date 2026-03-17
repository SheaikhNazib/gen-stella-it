"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { portfolioProjectSchema } from "@/lib/validations/admin";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, X, Globe, Code2 } from "lucide-react";
import { PortfolioProject } from "@/types/portfolio";
import { cn } from "@/lib/utils";

interface PortfolioFormProps {
  initialData?: Partial<PortfolioProject>;
  onSubmit: (data: any) => Promise<void>;
}

export function PortfolioProjectForm({ initialData, onSubmit }: PortfolioFormProps) {
  const form = useForm({
    resolver: zodResolver(portfolioProjectSchema),
    defaultValues: initialData || {
      slug: "",
      title: "",
      description: "",
      shortDescription: "",
      image: "",
      category: "Web App",
      technologies: [],
      link: "",
      caseStudy: "",
      results: [],
      clientName: "",
      testimonialQuote: "",
      date: new Date().toISOString().split('T')[0],
      featured: false,
    },
  });

  const previewData = form.watch();

  const handleAddTech = (tech: string) => {
    const current = form.getValues("technologies") || [];
    if (tech && !current.includes(tech)) {
      form.setValue("technologies", [...current, tech]);
    }
  };

  const handleRemoveTech = (tech: string) => {
    const current = form.getValues("technologies") || [];
    form.setValue("technologies", current.filter(t => t !== tech));
  };

  const handleAddResult = (result: string) => {
    const current = form.getValues("results") || [];
    if (result && !current.includes(result)) {
      form.setValue("results", [...current, result]);
    }
  };

  const handleRemoveResult = (index: number) => {
    const current = form.getValues("results") || [];
    form.setValue("results", current.filter((_, i) => i !== index));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 animate-in fade-in duration-500">
      {/* Form Pane */}
      <div className="space-y-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Title</FormLabel>
                    <FormControl>
                      <Input placeholder="E-commerce Platform Redesign" {...field} />
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
                    <FormLabel>Slug (URL ID)</FormLabel>
                    <FormControl>
                      <Input placeholder="ecommerce-platform-redesign" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="shortDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Brief overview for cards..." className="min-h-[60px]" {...field} />
                  </FormControl>
                  <FormDescription>Shown in the main listing cards.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Detailed breakdown of the project..." className="min-h-[120px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Main Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/project-thumb.jpg" {...field} />
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
                      <Input placeholder="e.g. Web App, SaaS, Mobile" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="technologies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Technologies</FormLabel>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {field.value?.map((tech: string) => (
                      <Badge key={tech} variant="secondary" className="pl-2 pr-1 py-0.5 gap-1">
                        {tech}
                        <button type="button" onClick={() => handleRemoveTech(tech)}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Add tech (Press Enter)" 
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTech(e.currentTarget.value);
                          e.currentTarget.value = "";
                        }
                      }}
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border">
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Featured Project</FormLabel>
                      <FormDescription>
                        This project will be highlighted in the main portfolio section and homepage.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full h-12 text-lg shadow-lg shadow-primary/20 transition-all hover:scale-[1.01]">
              {initialData?.title ? "Update Project" : "Create Project"}
            </Button>
          </form>
        </Form>
      </div>

      {/* Live Preview Pane */}
      <div className="lg:sticky lg:top-4 h-fit">
        <h3 className="text-sm font-bold mb-4 text-muted-foreground uppercase tracking-widest pl-1">
          Card Preview
        </h3>
        <div className="flex justify-center items-center p-8 rounded-3xl bg-slate-100 dark:bg-slate-900/50 border-2 border-dashed border-slate-300 dark:border-slate-800 group transition-all duration-500 min-h-[500px]">
           <div className="max-w-[400px] w-full bg-white dark:bg-slate-950 rounded-[2rem] shadow-2xl overflow-hidden group-hover:translate-y-[-10px] transition-transform duration-500">
             <div className="relative aspect-[16/10] overflow-hidden bg-slate-200 dark:bg-slate-800">
                <img 
                  src={previewData.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600"} 
                  alt={previewData.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 translate-y-[-50px] group-hover:translate-y-0 transition-transform duration-500">
                   <Badge className="bg-white/90 dark:bg-slate-900/90 text-primary border-none text-xs font-bold px-3 shadow-lg backdrop-blur">
                     {previewData.category || "Web App"}
                   </Badge>
                </div>
             </div>
             <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-6">
                   {previewData.technologies?.slice(0, 3).map((t: string) => (
                      <span key={t} className="text-[10px] font-bold tracking-widest text-primary uppercase bg-primary/5 px-2 py-1 rounded">
                        {t}
                      </span>
                   ))}
                   {(previewData.technologies?.length || 0) > 3 && (
                     <span className="text-[10px] font-bold text-muted-foreground uppercase">+{(previewData.technologies?.length || 0) - 3}</span>
                   )}
                </div>
                <h4 className="text-2xl font-black text-slate-900 dark:text-white leading-tight mb-4 group-hover:text-primary transition-colors">
                  {previewData.title || "Project Title"}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-2 mb-6">
                  {previewData.shortDescription || "A brief overview describing the project's impact and main features."}
                </p>
                
                <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-6">
                   <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
                         <Globe className="h-4 w-4 text-slate-500" />
                      </div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white tracking-tight">View Project</span>
                   </div>
                   <div className="h-10 w-10 rounded-full bg-slate-900 dark:bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Plus className="h-5 w-5 text-white dark:text-slate-900" />
                   </div>
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
