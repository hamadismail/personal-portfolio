'use client';

import React, { useState } from 'react';
import withAuth from '@/components/auth/withAuth';
import { createProject } from '@/lib/projects';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const CreateProjectPage = () => {
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [gitRepo, setGitRepo] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProject({ title, thumbnail, liveUrl, gitRepo });
      toast.success('Project created successfully');
      router.push('/dashboard/projects');
    } catch (error) {
      toast.error('Failed to create project');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Create Project</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="thumbnail">
            Thumbnail URL
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="thumbnail"
            type="text"
            placeholder="Thumbnail URL"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="liveUrl">
            Live URL
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="liveUrl"
            type="text"
            placeholder="Live URL"
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gitRepo">
            Git Repo URL
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="gitRepo"
            type="text"
            placeholder="Git Repo URL"
            value={gitRepo}
            onChange={(e) => setGitRepo(e.target.value)}
          />
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

export default withAuth(CreateProjectPage);
