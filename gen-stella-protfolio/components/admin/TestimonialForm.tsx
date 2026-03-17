"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { testimonialSchema } from "@/lib/validations/admin";
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
import { Star, User, Building } from "lucide-react";

interface TestimonialFormProps {
  initialData?: any;
  onSubmit: (data: any) => Promise<void>;
}

export function TestimonialForm({ initialData, onSubmit }: TestimonialFormProps) {
  const form = useForm({
    resolver: zodResolver(testimonialSchema),
    defaultValues: initialData || {
      quote: "",
      author: "",
      title: "",
      company: "",
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=300&h=300",
      rating: 5,
    },
  });

  const preview = form.watch();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4">
      <div className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="quote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quote</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="The quote from the client..." 
                      className="min-h-[140px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Author Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Job Title / Role</FormLabel>
                    <FormControl>
                        <Input placeholder="CEO at Acme Inc" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Rating (1-5)</FormLabel>
                    <FormControl>
                        <Input 
                            type="number" 
                            min={1} 
                            max={5} 
                            {...field} 
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                   <FormItem>
                   <FormLabel>Company Name</FormLabel>
                   <FormControl>
                       <Input placeholder="Acme Inc." {...field} />
                   </FormControl>
                   <FormMessage />
                   </FormItem>
                )}
                />
            </div>

            <Button type="submit" className="w-full">
              {initialData ? "Update Testimonial" : "Create Testimonial"}
            </Button>
          </form>
        </Form>
      </div>

      <div className="lg:sticky lg:top-24 h-fit">
        <h3 className="text-lg font-semibold mb-4 text-muted-foreground uppercase tracking-wider">
          Testimonial Preview
        </h3>
        <div className="p-8 rounded-xl bg-slate-50 border border-dashed border-slate-200">
            <div className="bg-white p-8 rounded-2xl shadow-xl relative max-w-sm mx-auto">
                <div className="flex gap-1 mb-4">
                    {[...Array(preview.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    {[...Array(5 - preview.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-slate-200" />
                    ))}
                </div>
                <blockquote className="text-lg text-slate-700 italic leading-relaxed mb-6">
                    "{preview.quote || "The quote snippet will show up here as a preview for the testimonial section."}"
                </blockquote>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 border border-slate-100">
                        <img src={preview.image} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <div className="font-bold text-slate-900">{preview.author || "Author Name"}</div>
                        <div className="text-sm text-slate-500">{preview.title || "Job Title"}</div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
