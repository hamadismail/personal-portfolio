'use client';

import React, { useEffect, useState } from 'react';
import withAuth from '@/components/auth/withAuth';
import { getBlog, updateBlog } from '@/lib/blogs';
import { IBlog } from '@/types/blog';
import toast from 'react-hot-toast';
import { useRouter, useParams } from 'next/navigation';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const EditBlogPage = () => {
  const [title, setTitle] = useState('');
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (id) {
          const blog = await getBlog(Number(id));
          setTitle(blog.title);
          if (editor) {
            editor.commands.setContent(blog.content);
          }
        }
      } catch (error) {
        toast.error('Failed to fetch blog');
      }
    };

    fetchBlog();
  }, [id, editor]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editor && id) {
        const content = editor.getHTML();
        await updateBlog(Number(id), { title, content });
        toast.success('Blog updated successfully');
        router.push('/dashboard/blogs');
      }
    } catch (error) {
      toast.error('Failed to update blog');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Edit Blog</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Content</label>
          <div className="border rounded">
            <EditorContent editor={editor} />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default withAuth(EditBlogPage);
