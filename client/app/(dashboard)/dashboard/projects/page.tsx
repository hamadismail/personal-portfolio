'use client';

import React, { useEffect, useState } from 'react';
import withAuth from '@/components/auth/withAuth';
import { getProjects, deleteProject } from '@/lib/projects';
import { IProject } from '@/types/project';
import Link from 'next/link';
import { toast } from 'sonner';

const ManageProjectsPage = () => {
  const [projects, setProjects] = useState<IProject[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const fetchedProjects = await getProjects();
        setProjects(fetchedProjects);
      } catch  {
        toast.error('Failed to fetch projects');
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteProject(id);
      setProjects(projects.filter((project) => project.id !== id));
      toast.success('Project deleted successfully');
    } catch  {
      toast.error('Failed to delete project');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">Manage Projects</h1>
        <Link href="/dashboard/projects/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create Project
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
            <div className="flex justify-end">
              <Link href={`/dashboard/projects/edit/${project.id}`} className="text-blue-500 hover:text-blue-700 mr-4">
                Edit
              </Link>
              <button onClick={() => handleDelete(project.id)} className="text-red-500 hover:text-red-700">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withAuth(ManageProjectsPage);
