"use client";

import { useEffect, useState } from "react";
import { PortfolioProjectForm } from "@/components/admin/PortfolioProjectForm";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Plus, Pencil, Trash2, Loader2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PortfolioProject } from "@/types/portfolio";

export default function AdminPortfolioPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/admin/portfolio");
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      const method = editingProject ? "PUT" : "POST";
      const body = editingProject ? { ...data, id: editingProject.id } : data;

      const response = await fetch("/api/admin/portfolio", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Failed to save project");
      }

      toast.success(editingProject ? "Project updated!" : "Project created!");
      setEditingProject(null);
      setIsAdding(false);
      fetchProjects();
      router.refresh();
    } catch (error) {
      toast.error("Error: Could not save project.");
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await fetch(`/api/admin/portfolio?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      toast.success("Project deleted");
      fetchProjects();
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete project");
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
          <h1 className="text-3xl font-bold tracking-tight">Portfolio Management</h1>
          <p className="text-muted-foreground">
            {isAdding || editingProject ? "Fill in the details below. Preview your changes live on the right." : "Manage your showcase of amazing works."}
          </p>
        </div>
        {!isAdding && !editingProject && (
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        )}
      </div>

      {(isAdding || editingProject) ? (
        <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
          <div className="flex justify-end p-4 border-b">
            <Button variant="ghost" onClick={() => { setEditingProject(null); setIsAdding(false); }}>Cancel</Button>
          </div>
          <PortfolioProjectForm initialData={editingProject || undefined} onSubmit={handleSubmit} />
        </div>
      ) : loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl border p-4 shadow-sm flex flex-col group relative overflow-hidden">
               <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-slate-100">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
             </div>
             <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{project.title}</h3>
                  {project.featured && (
                    <span className="text-[10px] bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded uppercase">Featured</span>
                  )}
                </div>
                <p className="text-blue-600 font-medium text-xs mb-2">{project.category}</p>
                <p className="text-slate-500 text-sm line-clamp-2">{project.shortDescription}</p>
             </div>
             <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-50 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="outline" size="sm" className="h-8" onClick={() => setEditingProject(project)}>
                  <Pencil className="h-3.5 w-3.5 mr-1.5" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm" className="h-8" onClick={() => handleDelete(project.id)}>
                  <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                  Delete
                </Button>
                {project.link && (
                  <Button variant="ghost" size="icon" className="h-8 w-8 ml-auto" asChild>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                )}
             </div>
            </div>
          ))}
          {projects.length === 0 && (
            <div className="col-span-full py-16 text-center border-2 border-dashed rounded-2xl bg-slate-50">
              <p className="text-muted-foreground">No projects found. Time to showcase some work!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
