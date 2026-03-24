"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceSchema } from "@/lib/validations/admin";
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
import { Plus, X, Laptop } from "lucide-react";
import * as z from "zod";

interface ServiceFormProps {
  initialData?: any;
  onSubmit: (data: any) => Promise<void>;
}

export function ServiceForm({ initialData, onSubmit }: ServiceFormProps) {
  const form = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      icon: "Laptop",
      features: [],
      technologies: [],
      caseStudySlug: "",
      category: "",
      ctaText: "Get Started",
      ctaHref: "/contact",
    },
  });

  const handleAddFeature = (value: string) => {
    const current = form.getValues("features") || [];
    if (value && !current.includes(value)) {
      form.setValue("features", [...current, value]);
    }
  };

  const handleRemoveFeature = (index: number) => {
    const current = form.getValues("features") || [];
    form.setValue("features", current.filter((_: string, i: number) => i !== index));
  };

  const handleAddTech = (value: string) => {
    const current = form.getValues("technologies") || [];
    if (value && !current.includes(value)) {
      form.setValue("technologies", [...current, value]);
    }
  };

  const handleRemoveTech = (tech: string) => {
    const current = form.getValues("technologies") || [];
    form.setValue("technologies", current.filter((t: string) => t !== tech));
  };

  const preview = form.watch();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4">
      <div className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Custom Software Development" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the service..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Lucide Icon Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Laptop, Cloud, etc." {...field} />
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
                        <Input placeholder="Cloud, Web, Mobile" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>

            <FormField
              control={form.control}
              name="features"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Features</FormLabel>
                  <div className="space-y-2">
                    {(field.value || []).map((f: string, i: number) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="flex-1 text-sm bg-slate-50 dark:bg-slate-900 px-3 py-2 rounded border">{f}</span>
                        <button type="button" onClick={() => handleRemoveFeature(i)} className="text-red-500 hover:text-red-700">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add feature (Press Enter)"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddFeature(e.currentTarget.value);
                          e.currentTarget.value = "";
                        }
                      }}
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="technologies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Technologies</FormLabel>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {(field.value || []).map((tech: string) => (
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="caseStudySlug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Case Study Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="my-case-study" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ctaText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CTA Text</FormLabel>
                    <FormControl>
                      <Input placeholder="Get Started" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ctaHref"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CTA Link</FormLabel>
                    <FormControl>
                      <Input placeholder="/contact" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">
              {initialData ? "Update Service" : "Create Service"}
            </Button>
          </form>
        </Form>
      </div>

      <div className="lg:sticky lg:top-24 h-fit">
        <h3 className="text-lg font-semibold mb-4 text-muted-foreground uppercase tracking-wider">
          Preview
        </h3>
        <div className="p-8 rounded-xl bg-slate-50 border border-dashed border-slate-200">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 max-w-sm mx-auto">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                    <Laptop className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-xl font-bold mb-2">{preview.title || "Service Title"}</h4>
                <p className="text-slate-600 text-sm mb-4">{preview.description || "Service description preview..."}</p>
                {(preview.features?.length > 0) && (
                  <ul className="space-y-1 mb-4">
                    {preview.features.map((f: string, i: number) => (
                      <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
                {(preview.technologies?.length > 0) && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {preview.technologies.map((t: string) => (
                      <span key={t} className="text-[10px] bg-slate-50 text-slate-500 px-2 py-0.5 rounded border">{t}</span>
                    ))}
                  </div>
                )}
                <div className="pt-4 border-t border-slate-50">
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                        {preview.category || "Category"}
                    </span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
