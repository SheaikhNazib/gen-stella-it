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
import { ImageUpload } from "@/components/ui/ImageUpload";
import ProfilePlaceholder from "@/components/ui/profile-placeholder";

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
      image: "",
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

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author Photo (Optional)</FormLabel>
                  <FormControl>
                    <ImageUpload 
                      value={field.value || ""} 
                      onChange={field.onChange} 
                      disabled={form.formState.isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {initialData ? "Update Testimonial" : "Create Testimonial"}
            </Button>
          </form>
        </Form>
      </div>

      <div className="lg:sticky lg:top-24 h-fit">
        <h3 className="text-lg font-semibold mb-4 text-muted-foreground uppercase tracking-wider">
          Testimonial Preview
        </h3>
        <div className="p-12 rounded-xl bg-slate-50 border-2 border-dashed border-slate-200 min-h-[400px] flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 relative max-w-[380px] w-full transition-all animate-in fade-in zoom-in duration-300">
                <div className="flex gap-1 mb-6">
                    {[...Array(preview.rating ?? 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    {[...Array(5 - (preview.rating ?? 5))].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-slate-200" />
                    ))}
                </div>
                <blockquote className="text-lg text-slate-700 italic leading-relaxed mb-8">
                    "{preview.quote || "The quote snippet will show up here as a preview for the testimonial card."}"
                </blockquote>
                <div className="flex items-center gap-4 border-t pt-6">
                    <ProfilePlaceholder 
                      name={preview.author || "User"} 
                      src={preview.image} 
                      size="md" 
                      className="w-12 h-12 shadow-sm"
                    />
                    <div>
                        <div className="font-extrabold text-slate-900 leading-none">
                          {preview.author || "Author Name"}
                        </div>
                        <div className="text-xs font-semibold text-blue-600 mt-1 uppercase tracking-wider">
                          {preview.title || "Job Title"} @ {preview.company || "Company"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
