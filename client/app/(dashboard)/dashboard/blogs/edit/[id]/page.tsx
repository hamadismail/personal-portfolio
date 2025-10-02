"use client";

import React, { useEffect, useState } from "react";
import withAuth from "@/components/auth/withAuth";
import { getBlog, updateBlog } from "@/lib/blogs";
import { IBlog } from "@/types/blog";
import { useRouter, useParams } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Image as TImage } from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { toast } from "sonner";
import Image from "next/image";

const EditBlogPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    thumbnail: "",
    tags: "",
    isFeatured: false,
  });
  const [blogData, setBlogData] = useState<IBlog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: false, // disable built-in link
        underline: false, // disable built-in underline
      }),
      TImage,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "prose prose-lg focus:outline-none max-w-none min-h-[400px] p-4",
      },
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (id) {
          const blog = await getBlog(Number(id));
          setBlogData(blog);
          setFormData({
            title: blog.title,
            thumbnail: blog.thumbnail || "",
            tags: blog.tags?.join(", ") || "",
            isFeatured: blog.isFeatured || false,
          });

          if (editor) {
            editor.commands.setContent(blog.content);
          }
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast.error("Failed to fetch blog");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id, editor]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!editor?.getText().trim()) {
      toast.error("Content is required");
      return;
    }

    setIsSubmitting(true);

    try {
      if (editor && id && blogData) {
        const content = editor.getHTML();
        const tags = formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag);

        const updatedBlog: IBlog = {
          ...blogData,
          title: formData.title,
          content,
          thumbnail: formData.thumbnail,
          tags,
          isFeatured: formData.isFeatured,
          updatedAt: new Date(),
        };

        await updateBlog(Number(id), updatedBlog);
        toast.success("Blog updated successfully!");
        router.push("/dashboard/blogs");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addImage = () => {
    const url = window.prompt("Enter image URL:");
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="space-y-6">
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeftIcon />
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Edit Blog Post</h1>
          </div>
          <p className="text-gray-600 ml-10">
            Update your blog content and settings
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Basic Information
            </h2>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Title *
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter a compelling title..."
                />
              </div>

              {/* Thumbnail URL */}
              <div>
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Thumbnail URL
                </label>
                <input
                  id="thumbnail"
                  name="thumbnail"
                  type="url"
                  value={formData.thumbnail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="https://example.com/image.jpg"
                />
                {formData.thumbnail && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 mb-2">Preview:</p>
                    <div className="relative w-32 h-20 border rounded-lg overflow-hidden">
                      <Image
                        src={formData.thumbnail}
                        alt="Thumbnail preview"
                        className="w-full h-full object-cover"
                        fill
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Tags */}
              <div>
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Tags
                </label>
                <input
                  id="tags"
                  name="tags"
                  type="text"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="technology, programming, web-development (comma separated)"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Separate tags with commas
                </p>
              </div>

              {/* Featured Checkbox */}
              <div className="flex items-center">
                <input
                  id="isFeatured"
                  name="isFeatured"
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="isFeatured"
                  className="ml-2 text-sm font-medium text-gray-700"
                >
                  Feature this post
                </label>
              </div>
            </div>
          </div>

          {/* Content Editor Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-900">Content *</h2>
            </div>

            {/* Toolbar */}
            {editor && (
              <div className="border-b border-gray-200 px-6 py-3 bg-gray-50 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={`p-2 rounded hover:bg-gray-200 ${
                    editor.isActive("bold") ? "bg-gray-300" : ""
                  }`}
                >
                  <strong>B</strong>
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={`p-2 rounded hover:bg-gray-200 ${
                    editor.isActive("italic") ? "bg-gray-300" : ""
                  }`}
                >
                  <em>I</em>
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                  className={`p-2 rounded hover:bg-gray-200 ${
                    editor.isActive("underline") ? "bg-gray-300" : ""
                  }`}
                >
                  <u>U</u>
                </button>
                <div className="w-px bg-gray-300 mx-1"></div>
                <button
                  type="button"
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                  className={`p-2 rounded hover:bg-gray-200 ${
                    editor.isActive("heading", { level: 2 })
                      ? "bg-gray-300"
                      : ""
                  }`}
                >
                  H2
                </button>
                <button
                  type="button"
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                  }
                  className={`p-2 rounded hover:bg-gray-200 ${
                    editor.isActive("heading", { level: 3 })
                      ? "bg-gray-300"
                      : ""
                  }`}
                >
                  H3
                </button>
                <div className="w-px bg-gray-300 mx-1"></div>
                <button
                  type="button"
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                  className={`p-2 rounded hover:bg-gray-200 ${
                    editor.isActive("bulletList") ? "bg-gray-300" : ""
                  }`}
                >
                  • List
                </button>
                <button
                  type="button"
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                  className={`p-2 rounded hover:bg-gray-200 ${
                    editor.isActive("orderedList") ? "bg-gray-300" : ""
                  }`}
                >
                  1. List
                </button>
                <div className="w-px bg-gray-300 mx-1"></div>
                <button
                  type="button"
                  onClick={setLink}
                  className="p-2 rounded hover:bg-gray-200"
                >
                  🔗 Link
                </button>
                <button
                  type="button"
                  onClick={addImage}
                  className="p-2 rounded hover:bg-gray-200"
                >
                  🖼️ Image
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().unsetLink().run()}
                  disabled={!editor.isActive("link")}
                  className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Unlink
                </button>
              </div>
            )}

            {/* Editor Content */}
            <div className="min-h-[500px]">
              <EditorContent editor={editor} />
            </div>
          </div>

          {/* Blog Stats */}
          {blogData && (
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">
                Blog Statistics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-blue-700 font-medium">Views</p>
                  <p className="text-2xl font-bold text-blue-900">
                    {blogData.views || 0}
                  </p>
                </div>
                <div>
                  <p className="text-blue-700 font-medium">Created</p>
                  <p className="text-blue-900">
                    {new Date(blogData.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-blue-700 font-medium">Last Updated</p>
                  <p className="text-blue-900">
                    {new Date(blogData.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-blue-700 font-medium">Status</p>
                  <p className="text-blue-900">
                    {blogData.isFeatured ? "Featured" : "Published"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6">
            <button
              type="button"
              onClick={() => router.push("/dashboard/blogs")}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              disabled={isSubmitting}
            >
              Cancel
            </button>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => {
                  // Preview functionality
                  window.open(`/blogs/${id}`, "_blank");
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                disabled={isSubmitting}
              >
                Preview
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Updating...
                  </span>
                ) : (
                  "Update Blog"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// Icon Components
const ArrowLeftIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 19l-7-7m0 0l7-7m-7 7h18"
    />
  </svg>
);

export default withAuth(EditBlogPage);
