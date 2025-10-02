"use client";

import React, { useEffect, useState } from "react";
import withAuth from "@/components/auth/withAuth";
import { getBlogs, deleteBlog } from "@/lib/blogs";
import { IBlog } from "@/types/blog";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";

const ManageBlogsPage = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const fetchedBlogs = await getBlogs();
        setBlogs(fetchedBlogs);
      } catch {
        toast.error("Failed to fetch blogs");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id: number) => {
    toast.custom((t) => (
      <div className="p-4 rounded-lg bg-gray-100 shadow-md text-sm flex flex-col gap-3">
        <p>
          Are you sure you want to delete this blog? This action cannot be
          undone.
        </p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={async () => {
              toast.dismiss(t); // close confirm toast
              setDeletingId(id);
              try {
                await deleteBlog(Number(id));
                setBlogs(blogs.filter((blog) => blog.id !== id));
                toast.success("Blog deleted successfully");
              } catch {
                toast.error("Failed to delete blog");
              } finally {
                setDeletingId(null);
              }
            }}
            className="px-3 py-1 rounded bg-red-600 text-white text-xs"
          >
            Yes, Delete
          </button>
          <button
            onClick={() => toast.dismiss(t)}
            className="px-3 py-1 rounded bg-gray-300 text-xs"
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  const getExcerpt = (content: string, maxLength: number = 100) => {
    const plainText = content.replace(/<[^>]*>/g, "");
    return plainText.length > maxLength
      ? plainText.substring(0, maxLength) + "..."
      : plainText;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Manage Blog Posts
            </h1>
            <p className="text-gray-600 mt-2">
              Create, edit, and manage your blog content
            </p>
          </div>
          <Link
            href="/dashboard/blogs/create"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-colors"
          >
            <PlusIcon />
            Create New Blog
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
            <p className="text-sm font-medium text-gray-600">Total Posts</p>
            <p className="text-2xl font-bold text-gray-900">{blogs.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
            <p className="text-sm font-medium text-gray-600">Featured</p>
            <p className="text-2xl font-bold text-gray-900">
              {blogs.filter((blog) => blog.isFeatured).length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
            <p className="text-sm font-medium text-gray-600">Total Views</p>
            <p className="text-2xl font-bold text-gray-900">
              {blogs.reduce((sum, blog) => sum + (blog.views || 0), 0)}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-orange-500">
            <p className="text-sm font-medium text-gray-600">This Month</p>
            <p className="text-2xl font-bold text-gray-900">
              {
                blogs.filter((blog) => {
                  const monthAgo = new Date();
                  monthAgo.setMonth(monthAgo.getMonth() - 1);
                  return new Date(blog.createdAt) > monthAgo;
                }).length
              }
            </p>
          </div>
        </div>

        {/* Blogs Table/Cards */}
        {blogs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No blog posts yet
            </h3>
            <p className="text-gray-500 mb-6">
              Start writing your first blog post to share with your audience.
            </p>
            <Link
              href="/dashboard/blogs/create"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PlusIcon />
              Create Your First Blog
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden lg:block">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Blog Post
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Views
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Created
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {blogs.map((blog) => (
                    <tr
                      key={blog.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          {blog.thumbnail && (
                            <div className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={blog.thumbnail}
                                alt={blog.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <h3 className="text-sm font-semibold text-gray-900 truncate">
                              {blog.title}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1 truncate">
                              {getExcerpt(blog.content)}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {blog.tags?.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                                >
                                  #{tag}
                                </span>
                              ))}
                              {blog.tags && blog.tags.length > 2 && (
                                <span className="text-gray-400 text-xs">
                                  +{blog.tags.length - 2}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          {blog.isFeatured && (
                            <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                              Featured
                            </span>
                          )}
                          <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                            Published
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-sm text-gray-900">
                          <EyeIcon />
                          {blog.views || 0}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/blogs/${blog.id}`}
                            target="_blank"
                            className="inline-flex items-center p-2 text-gray-400 hover:text-gray-600 transition-colors"
                            title="View"
                          >
                            <EyeIcon />
                          </Link>
                          <Link
                            href={`/dashboard/blogs/edit/${blog.id}`}
                            className="inline-flex items-center p-2 text-blue-600 hover:text-blue-800 transition-colors"
                            title="Edit"
                          >
                            <EditIcon />
                          </Link>
                          <button
                            onClick={() => handleDelete(blog.id)}
                            disabled={deletingId === blog.id}
                            className="inline-flex items-center p-2 text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            title="Delete"
                          >
                            {deletingId === blog.id ? (
                              <Spinner />
                            ) : (
                              <DeleteIcon />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden divide-y divide-gray-200">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {getExcerpt(blog.content, 80)}
                      </p>
                    </div>
                    {blog.thumbnail && (
                      <div className="relative w-20 h-16 rounded-lg overflow-hidden ml-4 flex-shrink-0">
                        <Image
                          src={blog.thumbnail}
                          alt={blog.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags?.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span>
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <EyeIcon />
                        {blog.views || 0} views
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/blogs/${blog.id}`}
                        target="_blank"
                        className="p-2 text-gray-400 hover:text-gray-600"
                      >
                        <EyeIcon />
                      </Link>
                      <Link
                        href={`/dashboard/blogs/edit/${blog.id}`}
                        className="p-2 text-blue-600 hover:text-blue-800"
                      >
                        <EditIcon />
                      </Link>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        disabled={deletingId === blog.id}
                        className="p-2 text-red-600 hover:text-red-800 disabled:opacity-50"
                      >
                        {deletingId === blog.id ? <Spinner /> : <DeleteIcon />}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Icon Components
const PlusIcon = () => (
  <svg
    className="w-5 h-5 mr-2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4v16m8-8H4"
    />
  </svg>
);

const EyeIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const EditIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);

const DeleteIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

const Spinner = () => (
  <svg
    className="w-4 h-4 animate-spin"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 2v4m0 12v4m8-10h-4M6 12H2"
    />
  </svg>
);

export default withAuth(ManageBlogsPage);
