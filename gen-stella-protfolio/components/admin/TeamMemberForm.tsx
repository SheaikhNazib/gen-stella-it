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
import { ImageUpload } from "@/components/ui/ImageUpload";
import { Card, CardContent } from "@/components/ui/card";
import { TeamMember } from "@/types/team";
import ProfilePlaceholder from "@/components/ui/profile-placeholder";
import { Github, Linkedin, Twitter } from "lucide-react";

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

  const formattedPreview = {
    id: "preview",
    name: previewData.name || "Member Name",
    role: previewData.role || "Job Title",
    bio: previewData.bio || "Member biography will appear here...",
    image: previewData.image,
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
                  <FormLabel>Profile Photo</FormLabel>
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
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="john@example.com" type="email" {...field} />
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
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
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
        <div className="flex justify-center items-start p-12 rounded-xl bg-slate-50 border-2 border-dashed border-slate-200 min-h-[500px]">
           <div className="w-full max-w-[320px] rounded-2xl border border-gray-200/70 bg-white p-6 shadow-xl transition-all animate-in fade-in zoom-in duration-300">
              <div className="flex flex-col items-center text-center">
                <ProfilePlaceholder 
                  name={formattedPreview.name} 
                  src={formattedPreview.image} 
                  size="lg" 
                  className="w-24 h-24 mb-6 ring-4 ring-blue-500/10 shadow-lg" 
                />
                <h3 className="font-bold text-gray-900 text-lg leading-tight">
                  {formattedPreview.name}
                </h3>
                <p className="text-sm font-medium text-blue-600 mt-2 mb-4 uppercase tracking-wider">
                  {formattedPreview.role}
                </p>
                
                <p className="text-sm text-gray-600 mb-8 italic line-clamp-4">
                  "{formattedPreview.bio}"
                </p>

                <div className="flex items-center justify-center gap-4 mt-auto">
                  {formattedPreview.twitter && (
                    <div className="p-2.5 rounded-full bg-gray-100 text-gray-600">
                      <Twitter className="w-5 h-5" />
                    </div>
                  )}
                  {formattedPreview.linkedin && (
                    <div className="p-2.5 rounded-full bg-gray-100 text-gray-600">
                      <Linkedin className="w-5 h-5" />
                    </div>
                  )}
                  {formattedPreview.github && (
                    <div className="p-2.5 rounded-full bg-gray-100 text-gray-600">
                      <Github className="w-5 h-5" />
                    </div>
                  )}
                </div>
              </div>
           </div>
        </div>
        <p className="text-xs text-center text-muted-foreground mt-4 italic">
          Preview approximates the appearance in the "About Us" section.
        </p>
      </div>
    </div>
  );
}
