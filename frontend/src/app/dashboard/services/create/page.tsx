"use client";

import { useAuth } from "@/providers/auth-provider";
import { CreateVisaForm } from "@/components/dashboard/forms/create-visa-form";

export default function CreateVisaPage() {
  const { user } = useAuth();
  const userRole = user?.role || "ADMIN";

  return <CreateVisaForm />;
}
