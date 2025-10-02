"use server";

import { IBlog } from "@/types/blog";
import { revalidatePath } from "next/cache";

const API_URL = process.env.BACKEND_URL; // use server-only env var (not NEXT_PUBLIC_API)

export async function getBlogsActions() {
  const res = await fetch(`${process.env.BACKEND_URL}/blogs`, {
    cache: "no-store", // disables caching, true SSR
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return res.json();
}

// ✅ Server Action for creating a blog
export async function createBlogAction(data: Partial<IBlog>) {
  const res = await fetch(`${API_URL}/blogs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create blog");

  revalidatePath("/blogs");
  return res.json();
}

// ✅ Server Action for updating a blog
export async function updateBlogAction(id: number, data: Partial<IBlog>) {
  const res = await fetch(`${API_URL}/blogs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update blog");

  revalidatePath("/blogs");
  revalidatePath(`/blogs/${id}`);
  return res.json();
}

// ✅ Server Action for deleting a blog
export async function deleteBlogAction(id: number) {
  const res = await fetch(`${API_URL}/blogs/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete blog");

  revalidatePath("/blogs");
  revalidatePath(`/blogs/${id}`);
  return res.json();
}
