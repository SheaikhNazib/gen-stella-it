"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { teamMemberSchema } from "@/lib/validations/admin";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TeamMember } from "@/types/team";

interface TeamMemberFormProps {
  initialData?: TeamMember;
  onSubmit: (data: any) => Promise<void>;
}

export function TeamMemberForm({ initialData, onSubmit }: TeamMemberFormProps) {
  const form = useForm({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: initialData ? {
      name: initialData.name,
      role: initialData.role,
      bio: initialData.bio,
      image: initialData.image,
      email: initialData.email || "",
      twitter: initialData.twitter || "",
      linkedin: initialData.linkedin || "",
      github: initialData.github || "",
    } : {
      name: "",
      role: "",
      bio: "",
      image: "",
      email: "",
      twitter: "",
      linkedin: "",
      github: "",
    },
  });

  const previewData = form.watch();

  const formattedPreview: TeamMember = {
    id: "preview",
    name: previewData.name || "Member Name",
    role: previewData.role || "Job Title",
    bio: previewData.bio || "Member biography will appear here...",
    image: previewData.image || "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=300&h=300",
    email: previewData.email,
    twitter: previewData.twitter,
    linkedin: previewData.linkedin,
    github: previewData.github,
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4">
      {/* Form Pane */}
      <div className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input placeholder="Lead Software Engineer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us about this person..." 
                      className="min-h-[120px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/photo.jpg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://linkedin.com/in/..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="github"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://github.com/..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full">
              {initialData ? "Update Member" : "Create Member"}
            </Button>
          </form>
        </Form>
      </div>

      {/* Live Preview Pane */}
      <div className="lg:sticky lg:top-24 h-fit">
        <h3 className="text-lg font-semibold mb-4 text-muted-foreground uppercase tracking-wider">
          Live Preview
        </h3>
        <div className="flex justify-center items-start p-8 rounded-xl bg-slate-50 border border-dashed border-slate-200 min-h-[400px]">
           {/* Mocking the card or using actual component */}
           <div className="max-w-[300px] w-full bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-300">
             <div className="aspect-square overflow-hidden bg-slate-100">
                <img 
                  src={formattedPreview.image} 
                  alt={formattedPreview.name}
                  className="w-full h-full object-cover"
                />
             </div>
             <div className="p-6">
                <h4 className="text-xl font-bold text-slate-900 leading-tight">
                  {formattedPreview.name}
                </h4>
                <p className="text-blue-600 font-medium text-sm mb-3">
                  {formattedPreview.role}
                </p>
                <p className="text-slate-600 text-sm italic line-clamp-4">
                  "{formattedPreview.bio}"
                </p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
