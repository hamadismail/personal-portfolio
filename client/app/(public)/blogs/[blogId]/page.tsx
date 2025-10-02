import React from "react";
import { getBlogs, getBlog } from "@/lib/blogs";
import { IBlog } from "@/types/blog";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import BackToTopButton from "@/components/shared/BackToTopButton";


export const revalidate = 60;

export async function generateStaticParams() {
  const blogs: IBlog[] = await getBlogs();
  return blogs.map((blog) => ({
    blogId: blog.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = await params;
  const blog = await getBlog(Number(blogId));

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: `${blog.title} | My Blog`,
    description: blog.content.replace(/<[^>]*>/g, "").substring(0, 160) + "...",
    openGraph: {
      title: blog.title,
      description:
        blog.content.replace(/<[^>]*>/g, "").substring(0, 160) + "...",
      type: "article",
      publishedTime: blog.createdAt,
      images: blog.thumbnail ? [blog.thumbnail] : [],
    },
  };
}

async function BlogPage({ params }: { params: Promise<{ blogId: string }> }) {
  const { blogId } = await params;
  const blog = await getBlog(Number(blogId));

  if (!blog) {
    notFound();
  }

  const readingTime = Math.ceil(blog.content.split(/\s+/).length / 200);

  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-12">
      {/* Navigation */}
      <div className="container mx-auto px-4 mb-8">
        <Link
          href="/blogs"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          ← Back to Blogs
        </Link>
      </div>

      <article className="container mx-auto px-4 max-w-4xl">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          {/* Featured Badge */}
          {blog.isFeatured && (
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              ⭐ Featured Post
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                {blog.author?.name?.charAt(0) || "A"}
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {blog.author?.name || "Admin"}
                </p>
                <p className="text-sm">Author</p>
              </div>
            </div>

            <div className="h-8 w-px bg-gray-300"></div>

            <div className="flex items-center gap-1">
              <CalendarIcon />
              <span>
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <div className="h-8 w-px bg-gray-300"></div>

            <div className="flex items-center gap-1">
              <ClockIcon />
              <span>{readingTime} min read</span>
            </div>

            <div className="h-8 w-px bg-gray-300"></div>

            <div className="flex items-center gap-1">
              <EyeIcon />
              <span>{blog.views} views</span>
            </div>
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Thumbnail Image */}
        {blog.thumbnail && (
          <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden mb-8 shadow-lg">
            <Image
              src={blog.thumbnail}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 lg:p-12">
          <div
            className="prose prose-lg max-w-none
                      prose-headings:text-gray-900
                      prose-p:text-gray-700 prose-p:leading-relaxed
                      prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                      prose-strong:text-gray-900
                      prose-em:text-gray-700
                      prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-xl
                      prose-ul:text-gray-700 prose-ol:text-gray-700
                      prose-li:leading-relaxed
                      prose-code:text-gray-800 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
                      prose-pre:bg-gray-900 prose-pre:text-gray-100
                      prose-img:rounded-xl prose-img:shadow-md
                      prose-table:border-gray-300 prose-table:shadow-sm
                      prose-th:bg-gray-100 prose-th:text-gray-900
                      prose-td:border-gray-300"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>

        {/* Author Bio */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 mt-8">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {blog.author?.name?.charAt(0) || "A"}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {blog.author?.name || "Admin"}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Passionate about sharing knowledge and experiences through
                writing. Always learning and exploring new technologies and
                ideas.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Navigation Footer */}
      <div className="container mx-auto px-4 max-w-4xl mt-12">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link
            href="/blogs"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium w-full sm:w-auto justify-center"
          >
            ← All Blogs
          </Link>

          <BackToTopButton />
        </div>
      </div>
    </div>
  );
}

// Icon Components (Keep these as they're just SVG icons, no interactivity)
const CalendarIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const ClockIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const EyeIcon = () => (
  <svg
    className="w-5 h-5"
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

export default BlogPage;
