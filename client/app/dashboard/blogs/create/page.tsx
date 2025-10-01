'use client';

import React, { useState } from 'react';
import withAuth from '@/components/auth/withAuth';
import { createBlog } from '@/lib/blogs';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const CreateBlogPage = () => {
  const [title, setTitle] = useState('');
  const router = useRouter();

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editor) {
        const content = editor.getHTML();
        await createBlog({ title, content });
        toast.success('Blog created successfully');
        router.push('/dashboard/blogs');
      }
    } catch (error) {
      toast.error('Failed to create blog');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Create Blog</h1>
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
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default withAuth(CreateBlogPage);
