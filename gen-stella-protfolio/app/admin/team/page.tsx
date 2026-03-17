"use client";

import { useEffect, useState } from "react";
import { TeamMemberForm } from "@/components/admin/TeamMemberForm";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TeamMember } from "@/types/team";

export default function AdminTeamPage() {
  const router = useRouter();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await fetch("/api/admin/team");
      if (response.ok) {
        const data = await response.json();
        setMembers(data);
      }
    } catch (error) {
      console.error("Failed to fetch team members:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      const method = editingMember ? "PUT" : "POST";
      const body = editingMember ? { ...data, id: editingMember.id } : data;

      const response = await fetch("/api/admin/team", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Failed to save team member");
      }

      toast.success(editingMember ? "Team member updated!" : "Team member created!");
      setEditingMember(null);
      setIsAdding(false);
      fetchMembers();
      router.refresh();
    } catch (error) {
      toast.error("Error: Could not save team member.");
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this member?")) return;

    try {
      const response = await fetch(`/api/admin/team?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      toast.success("Member deleted");
      fetchMembers();
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete member");
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
          <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
          <p className="text-muted-foreground">
            {isAdding || editingMember ? "Fill in the details below. Preview your changes live on the right." : "Manage your amazing team members."}
          </p>
        </div>
        {!isAdding && !editingMember && (
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Team Member
          </Button>
        )}
      </div>

      {(isAdding || editingMember) ? (
        <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
          <div className="flex justify-end p-4 border-b">
            <Button variant="ghost" onClick={() => { setEditingMember(null); setIsAdding(false); }}>Cancel</Button>
          </div>
          <TeamMemberForm initialData={editingMember || undefined} onSubmit={handleSubmit} />
        </div>
      ) : loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <div key={member.id} className="bg-white rounded-xl border p-4 shadow-sm flex flex-col group relative overflow-hidden">
               <div className="aspect-square rounded-lg overflow-hidden mb-4 bg-slate-100">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
             </div>
             <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                <p className="text-blue-600 font-medium text-sm mb-2">{member.role}</p>
                <p className="text-slate-500 text-sm line-clamp-2">{member.bio}</p>
             </div>
             <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-50 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="outline" size="sm" className="h-8" onClick={() => setEditingMember(member)}>
                  <Pencil className="h-3.5 w-3.5 mr-1.5" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm" className="h-8" onClick={() => handleDelete(member.id)}>
                  <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                  Delete
                </Button>
             </div>
            </div>
          ))}
          {members.length === 0 && (
            <div className="col-span-full py-16 text-center border-2 border-dashed rounded-2xl bg-slate-50">
              <p className="text-muted-foreground">No team members found. Start by adding one!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
