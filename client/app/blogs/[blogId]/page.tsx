import React from "react";
import { getBlogs, getBlog } from "@/lib/blogs";
import { IBlog } from "@/types/blog";

export const revalidate = 60;

export async function generateStaticParams() {
  const blogs: IBlog[] = await getBlogs();
  return blogs.map((blog) => ({
    blogId: blog.id.toString(),
  }));
}

async function BlogPage({ params }: { params: Promise<{ blogId: string }> }) {
  const { blogId } = await params;
  const blog = await getBlog(blogId);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
    </div>
  );
}

export default BlogPage;
