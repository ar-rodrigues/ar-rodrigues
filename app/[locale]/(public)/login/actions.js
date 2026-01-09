"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData) {
  const supabase = await createClient();
  const locale = formData.get("locale") || "es";

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    // Log the error for debugging
    console.error("Login error:", error.message);

    // Return error instead of redirecting to error page
    // This allows the client to handle the error gracefully
    throw new Error(error.message);
  }

  revalidatePath("/", "layout");
  redirect(`/${locale}/private`);
}

export async function signup(formData) {
  const supabase = await createClient();
  const locale = formData.get("locale") || "es";

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || ""}/${locale}/auth/confirm?next=/${locale}/private`,
    },
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    // Log the error for debugging
    console.error("Signup error:", error.message);

    // Return error instead of redirecting to error page
    // This allows the client to handle the error gracefully
    throw new Error(error.message);
  }

  // For signup, we might want to show a success message
  // and redirect to a confirmation page or back to login
  revalidatePath("/", "layout");

  // Redirect to login with success message
  redirect(`/${locale}/login?message=signup_success`);
}
