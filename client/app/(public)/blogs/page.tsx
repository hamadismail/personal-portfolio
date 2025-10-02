import React from "react";
// import { getBlogs } from "@/lib/blogs";
import { IBlog } from "@/types/blog";
import Link from "next/link";
import Image from "next/image";
import { getBlogsActions } from "@/actions/blogActions";

// export const revalidate = 60;

// Function to strip HTML tags and get plain text excerpt
const stripHtml = (html: string) => {
  return html.replace(/<[^>]*>/g, "");
};

// Function to get excerpt from content
const getExcerpt = (content: string, maxLength: number = 150) => {
  const plainText = stripHtml(content);
  return plainText.length > maxLength
    ? plainText.substring(0, maxLength) + "..."
    : plainText;
};

async function BlogsPage() {
  const blogs: IBlog[] = await getBlogsActions();

  return (
    <div className="min-h-screen bg-gray-50 py-12 pt-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Blog</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Thoughts, ideas, and experiences shared along my journey
          </p>
        </div>

        {/* Featured Blog */}
        {blogs.some((blog) => blog.isFeatured) && (
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Featured Post
            </h2>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {blogs
                .filter((blog) => blog.isFeatured)
                .slice(0, 1)
                .map((featuredBlog) => (
                  <Link
                    href={`/blogs/${featuredBlog.id}`}
                    key={featuredBlog.id}
                  >
                    <div className="cursor-pointer">
                      <div className="md:flex">
                        {featuredBlog.thumbnail && (
                          <div className="md:flex-shrink-0 md:w-1/3">
                            <div className="relative h-64 md:h-full">
                              <Image
                                src={featuredBlog.thumbnail}
                                alt={featuredBlog.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>
                        )}
                        <div className="p-8 md:w-2/3">
                          <div className="flex items-center mb-4">
                            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                              Featured
                            </span>
                            <span className="text-gray-500 text-sm ml-4">
                              {new Date(
                                featuredBlog.createdAt
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <h2 className="text-3xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors">
                            {featuredBlog.title}
                          </h2>
                          <p className="text-gray-600 mb-4 line-clamp-3">
                            {getExcerpt(featuredBlog.content, 200)}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {featuredBlog.tags?.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center text-gray-500 text-sm">
                            <span>📖 {featuredBlog.views} views</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        )}

        {/* All Blogs Grid */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            All Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs
              .filter((blog) => !blog.isFeatured)
              .map((blog) => (
                <Link href={`/blogs/${blog.id}`} key={blog.id}>
                  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group">
                    {blog.thumbnail && (
                      <div className="relative h-48">
                        <Image
                          src={blog.thumbnail}
                          alt={blog.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-gray-500 text-sm">
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                        <span className="text-gray-500 text-sm">
                          📖 {blog.views}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {getExcerpt(blog.content, 120)}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {blog.tags?.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
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
                </Link>
              ))}
          </div>
        </div>

        {/* Empty State */}
        {blogs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No posts yet
            </h3>
            <p className="text-gray-500">Check back later for new content!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogsPage;
