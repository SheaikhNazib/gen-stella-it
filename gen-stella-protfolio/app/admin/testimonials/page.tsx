import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import AdminTestimonialsClient from "@/components/admin/AdminTestimonialsClient";

export default async function AdminTestimonialsPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "ADMIN") {
    return (
      <div className="container mx-auto py-12 px-4 max-w-7xl mt-16">
        <div className="space-y-4">
          <Link href="/admin" className="text-sm text-muted-foreground hover:text-primary flex items-center transition-colors mb-2">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold">Unauthorized</h1>
          <p className="text-muted-foreground">You must be signed in as an admin to view this page.</p>
        </div>
      </div>
    );
  }

  const testimonials = await db.testimonial.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl mt-16">
      <AdminTestimonialsClient initialTestimonials={testimonials} />
    </div>
  );
}
