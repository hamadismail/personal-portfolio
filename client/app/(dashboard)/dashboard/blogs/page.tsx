"use client";

import React, { useEffect, useState } from "react";
import withAuth from "@/components/auth/withAuth";
import { getBlogs, deleteBlog } from "@/lib/blogs";
import { IBlog } from "@/types/blog";
import Link from "next/link";
import { toast } from "sonner";

const ManageBlogsPage = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const fetchedBlogs = await getBlogs();
        setBlogs(fetchedBlogs);
      } catch {
        toast.error("Failed to fetch blogs");
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteBlog(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
      toast.success("Blog deleted successfully");
    } catch {
      toast.error("Failed to delete blog");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">Manage Blogs</h1>
        <Link
          href="/dashboard/blogs/create"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Blog
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
            <div className="flex justify-end">
              <Link
                href={`/dashboard/blogs/edit/${blog.id}`}
                className="text-blue-500 hover:text-blue-700 mr-4"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(blog.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withAuth(ManageBlogsPage);
