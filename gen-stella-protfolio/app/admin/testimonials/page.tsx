"use client";

import { useEffect, useState } from "react";
import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Plus, Pencil, Trash2, Loader2, Quote } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Testimonial } from "@/types/index";

export default function AdminTestimonialsPage() {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch("/api/admin/testimonials");
      if (response.ok) {
        const data = await response.json();
        setTestimonials(data);
      }
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      const method = editingTestimonial ? "PUT" : "POST";
      const body = editingTestimonial ? { ...data, id: editingTestimonial.id } : data;

      const response = await fetch("/api/admin/testimonials", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Failed to save testimonial");
      }

      toast.success(editingTestimonial ? "Testimonial updated!" : "Testimonial created!");
      setEditingTestimonial(null);
      setIsAdding(false);
      fetchTestimonials();
      router.refresh();
    } catch (error) {
      toast.error("Error: Could not save testimonial.");
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      const response = await fetch(`/api/admin/testimonials?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      toast.success("Testimonial deleted");
      fetchTestimonials();
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete testimonial");
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl mt-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="space-y-1">
          <Link 
            href="/admin" 
            className="text-sm text-muted-foreground hover:text-primary flex items-center transition-colors mb-2"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Testimonials Management</h1>
          <p className="text-muted-foreground">
            {isAdding || editingTestimonial ? "Showcase what clients say. Preview live on the right." : "Manage social proof and client feedback."}
          </p>
        </div>
        {!isAdding && !editingTestimonial && (
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Testimonial
          </Button>
        )}
      </div>

      {(isAdding || editingTestimonial) ? (
        <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
          <div className="flex justify-end p-4 border-b">
            <Button variant="ghost" onClick={() => { setEditingTestimonial(null); setIsAdding(false); }}>Cancel</Button>
          </div>
          <TestimonialForm initialData={editingTestimonial || undefined} onSubmit={handleSubmit} />
        </div>
      ) : loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-xl border p-6 shadow-sm flex flex-col group relative overflow-hidden">
             <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-slate-100 overflow-hidden flex-shrink-0">
                    <img src={t.image} alt={t.author} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{t.author}</h3>
                    <p className="text-[10px] text-slate-500">{t.title} at {t.company}</p>
                  </div>
                </div>
                <div className="relative">
                  <Quote className="h-4 w-4 text-primary/20 absolute -top-1 -left-2" />
                  <p className="text-slate-600 text-sm italic line-clamp-4 pl-3">{t.quote}</p>
                </div>
             </div>
             <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-50 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="outline" size="sm" className="h-8" onClick={() => setEditingTestimonial(t)}>
                  <Pencil className="h-3.5 w-3.5 mr-1.5" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm" className="h-8" onClick={() => handleDelete(t.id)}>
                  <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                  Delete
                </Button>
             </div>
            </div>
          ))}
          {testimonials.length === 0 && (
            <div className="col-span-full py-16 text-center border-2 border-dashed rounded-2xl bg-slate-50">
              <p className="text-muted-foreground">No testimonials yet. Add some client praise!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
