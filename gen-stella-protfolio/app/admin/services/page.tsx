"use client";

import { useEffect, useState } from "react";
import { ServiceForm } from "@/components/admin/ServiceForm";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Plus, Pencil, Trash2, Loader2, Layout } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Service } from "@/types/service";

export default function AdminServicesPage() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/admin/services");
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      }
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      const method = editingService ? "PUT" : "POST";
      const body = editingService ? { ...data, id: editingService.id } : data;

      const response = await fetch("/api/admin/services", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Failed to save service");
      }

      toast.success(editingService ? "Service updated!" : "Service created!");
      setEditingService(null);
      setIsAdding(false);
      fetchServices();
      router.refresh();
    } catch (error) {
      toast.error("Error: Could not save service.");
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      const response = await fetch(`/api/admin/services?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      toast.success("Service deleted");
      fetchServices();
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete service");
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
          <h1 className="text-3xl font-bold tracking-tight">Services Management</h1>
          <p className="text-muted-foreground">
            {isAdding || editingService ? "Define your service offerings. Preview live on the right." : "Manage the solutions you provide to clients."}
          </p>
        </div>
        {!isAdding && !editingService && (
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Button>
        )}
      </div>

      {(isAdding || editingService) ? (
        <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
          <div className="flex justify-end p-4 border-b">
            <Button variant="ghost" onClick={() => { setEditingService(null); setIsAdding(false); }}>Cancel</Button>
          </div>
          <ServiceForm initialData={editingService || undefined} onSubmit={handleSubmit} />
        </div>
      ) : loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-xl border p-6 shadow-sm flex flex-col group relative overflow-hidden">
             <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-primary/5 text-primary">
                    <Layout className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 line-clamp-1">{service.title}</h3>
                </div>
                <p className="text-slate-500 text-sm line-clamp-3 mb-4">{service.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {service.features.slice(0, 3).map((f, i) => (
                    <span key={i} className="text-[10px] bg-slate-50 text-slate-500 px-2 py-0.5 rounded border border-slate-100">{f}</span>
                  ))}
                  {service.features.length > 3 && <span className="text-[10px] text-slate-400">+{service.features.length - 3} more</span>}
                </div>
             </div>
             <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-50 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="outline" size="sm" className="h-8" onClick={() => setEditingService(service)}>
                  <Pencil className="h-3.5 w-3.5 mr-1.5" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm" className="h-8" onClick={() => handleDelete(service.id)}>
                  <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                  Delete
                </Button>
             </div>
            </div>
          ))}
          {services.length === 0 && (
            <div className="col-span-full py-16 text-center border-2 border-dashed rounded-2xl bg-slate-50">
              <p className="text-muted-foreground">No services defined yet. Start defining your business!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
