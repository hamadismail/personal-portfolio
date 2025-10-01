import React from 'react';
import { getBlogs } from '@/lib/blogs';
import { IBlog } from '@/types/blog';
import Link from 'next/link';

export const revalidate = 60;

async function BlogsPage() {
  const blogs: IBlog[] = await getBlogs();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <Link href={`/blogs/${blog.id}`} key={blog.id}>
            <div className="bg-white rounded-lg shadow-md p-6 cursor-pointer">
              <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BlogsPage;
