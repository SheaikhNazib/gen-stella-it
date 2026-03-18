"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { teamMemberFormSchema } from "@/lib/validations/admin";
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
import { TeamMember } from "@/types/team";
import ProfilePlaceholder from "@/components/ui/profile-placeholder";
import { Github, Linkedin, Twitter, MoveHorizontal, MoveVertical, ZoomIn } from "lucide-react";
import { FormDescription } from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";

export type TeamMemberFormValues = z.infer<typeof teamMemberFormSchema>;

interface TeamMemberFormProps {
  initialData?: TeamMember;
  onSubmit: (data: TeamMemberFormValues) => Promise<void>;
}

export function TeamMemberForm({ initialData, onSubmit }: TeamMemberFormProps) {
  const form = useForm({
    resolver: zodResolver(teamMemberFormSchema),
    defaultValues: initialData ? {
      name: initialData.name,
      role: initialData.role,
      expertise: initialData.expertise?.join(", ") || "",
      bio: initialData.bio,
      image: initialData.image,
      imagePositionX: initialData.imagePositionX ?? 50,
      imagePositionY: initialData.imagePositionY ?? 50,
      imageScale: initialData.imageScale ?? 1,
      email: initialData.email || "",
      twitter: initialData.twitter || "",
      linkedin: initialData.linkedin || "",
      github: initialData.github || "",
    } : {
      name: "",
      role: "",
      expertise: "",
      bio: "",
      image: "",
      imagePositionX: 50,
      imagePositionY: 50,
      imageScale: 1,
      email: "",
      twitter: "",
      linkedin: "",
      github: "",
    },
  });

  const previewData = form.watch();
  const previewExpertise = Array.isArray(previewData.expertise)
    ? previewData.expertise
    : (previewData.expertise || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

  const formattedPreview = {
    id: "preview",
    name: previewData.name || "Member Name",
    role: previewData.role || "Job Title",
    expertise: previewExpertise,
    bio: previewData.bio || "Member biography will appear here...",
    image: previewData.image,
    imagePositionX: previewData.imagePositionX ?? 50,
    imagePositionY: previewData.imagePositionY ?? 50,
    imageScale: previewData.imageScale ?? 1,
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
                  <FormLabel>Roles</FormLabel>
                  <FormControl>
                    <Input placeholder="Web Developer, Frontend Engineer" {...field} />
                  </FormControl>
                  <FormDescription>
                    Add multiple roles separated by commas.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expertise"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expertise</FormLabel>
                  <FormControl>
                    <Input placeholder="Next.js, Vue.js, TypeScript" {...field} />
                  </FormControl>
                  <FormDescription>
                    Add core technologies or specialties separated by commas.
                  </FormDescription>
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
                      imagePositionX={form.watch("imagePositionX") ?? 50}
                      imagePositionY={form.watch("imagePositionY") ?? 50}
                      imageScale={form.watch("imageScale") ?? 1}
                      onUpdateCrop={(data) => {
                        if (data.x !== undefined) form.setValue("imagePositionX", data.x);
                        if (data.y !== undefined) form.setValue("imagePositionY", data.y);
                        if (data.scale !== undefined) form.setValue("imageScale", data.scale);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Adjust the image position and zoom so the face sits well inside the circle.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 gap-5 rounded-xl border bg-muted/20 p-6">
              <div className="flex flex-col gap-1 mb-2">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <ZoomIn className="h-4 w-4 text-blue-500" />
                  Fine-tune Controls
                </h4>
                <p className="text-xs text-muted-foreground">
                  Use sliders for precise adjustments if mouse interaction is too fast.
                </p>
              </div>
              
              <FormField
                control={form.control}
                name="imagePositionX"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between gap-3">
                      <FormLabel className="flex items-center gap-2 text-xs font-medium uppercase tracking-tight">
                        <MoveHorizontal className="h-3.5 w-3.5" />
                        Horizontal
                      </FormLabel>
                      <span className="text-[10px] text-muted-foreground tabular-nums font-mono">{field.value ?? 50}%</span>
                    </div>
                    <FormControl>
                      <Slider
                        value={[field.value ?? 50]}
                        min={0}
                        max={100}
                        step={0.1}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imagePositionY"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between gap-3">
                      <FormLabel className="flex items-center gap-2 text-xs font-medium uppercase tracking-tight">
                        <MoveVertical className="h-3.5 w-3.5" />
                        Vertical
                      </FormLabel>
                      <span className="text-[10px] text-muted-foreground tabular-nums font-mono">{field.value ?? 50}%</span>
                    </div>
                    <FormControl>
                      <Slider
                        value={[field.value ?? 50]}
                        min={0}
                        max={100}
                        step={0.1}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageScale"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between gap-3">
                      <FormLabel className="flex items-center gap-2 text-xs font-medium uppercase tracking-tight">
                        <ZoomIn className="h-3.5 w-3.5" />
                        Zoom
                      </FormLabel>
                      <span className="text-[10px] text-muted-foreground tabular-nums font-mono">{Number(field.value ?? 1).toFixed(3)}x</span>
                    </div>
                    <FormControl>
                      <Slider
                        value={[field.value ?? 1]}
                        min={0.8}
                        max={3.0}
                        step={0.005}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
                  imagePositionX={formattedPreview.imagePositionX}
                  imagePositionY={formattedPreview.imagePositionY}
                  imageScale={formattedPreview.imageScale}
                  className="w-24 h-24 mb-6 ring-4 ring-blue-500/10 shadow-lg" 
                />
                <h3 className="font-bold text-gray-900 text-lg leading-tight">
                  {formattedPreview.name}
                </h3>
                <p className="text-sm font-medium text-blue-600 mt-2 mb-4 uppercase tracking-wider">
                  {formattedPreview.role}
                </p>

                {formattedPreview.expertise.length > 0 && (
                  <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
                    {formattedPreview.expertise.map((item) => (
                      <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                        {item}
                      </span>
                    ))}
                  </div>
                )}
                
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
