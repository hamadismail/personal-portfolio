"use client";

import React, { useState } from "react";
import withAuth from "@/components/auth/withAuth";
import { createBlog } from "@/lib/blogs";
import { useRouter } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { Image as TImage } from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Image from "next/image";
import { toast } from "sonner";

const CreateBlogPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    thumbnail: "",
    tags: "",
    isFeatured: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
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
      const content = editor.getHTML();
      const tags = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);

      await createBlog({
        title: formData.title,
        content,
        thumbnail: formData.thumbnail,
        tags,
        isFeatured: formData.isFeatured,
      });

      toast.success("Blog created successfully!");
      router.push("/dashboard/blogs");
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error("Failed to create blog. Please try again.");
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Create New Blog Post
          </h1>
          <p className="text-gray-600 mt-2">
            Share your thoughts and experiences with the world
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
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
              </div>
            )}

            {/* Editor Content */}
            <div className="min-h-[500px]">
              <EditorContent editor={editor} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6 md:col-span-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              disabled={isSubmitting}
            >
              Cancel
            </button>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => {
                  // Save as draft functionality
                  toast.info("Draft feature coming soon!");
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                disabled={isSubmitting}
              >
                Save Draft
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Publishing...
                  </span>
                ) : (
                  "Publish Blog"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withAuth(CreateBlogPage);
