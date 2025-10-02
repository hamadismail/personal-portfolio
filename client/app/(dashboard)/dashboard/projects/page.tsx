"use client";

import React, { useEffect, useState } from "react";
import withAuth from "@/components/auth/withAuth";
import { getProjects, deleteProject } from "@/lib/projects";
import { IProject } from "@/types/project";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";

const ManageProjectsPage = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const fetchedProjects = await getProjects();
        setProjects(fetchedProjects);
      } catch {
        toast.error("Failed to fetch projects");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = (id: number) => {
    toast.custom((t) => (
      <div className="flex flex-col gap-3 rounded-lg bg-white p-4 shadow-lg">
        <p className="text-sm font-medium text-gray-800">
          Are you sure you want to delete this project? <br />
          <span className="text-red-500">This action cannot be undone.</span>
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => toast.dismiss(t)}
            className="rounded-md border px-3 py-1 text-sm text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              toast.dismiss(t);
              setDeletingId(id);
              try {
                await deleteProject(id);
                setProjects((prev) => prev.filter((p) => p.id !== id));
                toast.success("Project deleted successfully");
              } catch {
                toast.error("Failed to delete project");
              } finally {
                setDeletingId(null);
              }
            }}
            className="rounded-md bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    ));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Manage Projects
            </h1>
            <p className="text-gray-600 mt-2">
              Manage and organize your portfolio projects
            </p>
          </div>
          <Link
            href="/dashboard/projects/create"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-colors"
          >
            <PlusIcon />
            Add New Project
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
            <p className="text-sm font-medium text-gray-600">Total Projects</p>
            <p className="text-2xl font-bold text-gray-900">
              {projects.length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
            <p className="text-sm font-medium text-gray-600">Featured</p>
            <p className="text-2xl font-bold text-gray-900">
              {projects.filter((project) => project.isFeatured).length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
            <p className="text-sm font-medium text-gray-600">With Live Demo</p>
            <p className="text-2xl font-bold text-gray-900">
              {projects.filter((project) => project.liveUrl).length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-orange-500">
            <p className="text-sm font-medium text-gray-600">Public Repos</p>
            <p className="text-2xl font-bold text-gray-900">
              {projects.filter((project) => project.gitRepo).length}
            </p>
          </div>
        </div>

        {/* Projects Grid/Table */}
        {projects.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No projects yet
            </h3>
            <p className="text-gray-500 mb-6">
              Start building your portfolio by adding your first project.
            </p>
            <Link
              href="/dashboard/projects/create"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PlusIcon />
              Add Your First Project
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden lg:block">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Project
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Technologies
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Links
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {projects.map((project) => (
                    <tr
                      key={project.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          {project.thumbnail && (
                            <div className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={project.thumbnail}
                                alt={project.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-sm font-semibold text-gray-900 truncate">
                                {project.title}
                              </h3>
                              {project.isFeatured && (
                                <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                  Featured
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500 line-clamp-2">
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {project.tags?.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                                >
                                  #{tag}
                                </span>
                              ))}
                              {project.tags && project.tags.length > 2 && (
                                <span className="text-gray-400 text-xs">
                                  +{project.tags.length - 2}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {project.techStack?.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.techStack &&
                            project.techStack.length > 3 && (
                              <span className="text-gray-400 text-xs">
                                +{project.techStack.length - 3}
                              </span>
                            )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1 text-sm">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 transition-colors truncate"
                            >
                              🌐 Live Demo
                            </a>
                          )}
                          {project.gitRepo && (
                            <a
                              href={project.gitRepo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-600 hover:text-gray-800 transition-colors truncate"
                            >
                              💻 Code
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                            Published
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(project.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <a
                            href={`/projects/${project.id}`}
                            target="_blank"
                            className="inline-flex items-center p-2 text-gray-400 hover:text-gray-600 transition-colors"
                            title="View Live"
                          >
                            <ExternalLinkIcon />
                          </a>
                          <Link
                            href={`/dashboard/projects/edit/${project.id}`}
                            className="inline-flex items-center p-2 text-blue-600 hover:text-blue-800 transition-colors"
                            title="Edit"
                          >
                            <EditIcon />
                          </Link>
                          <button
                            onClick={() => handleDelete(project.id)}
                            disabled={deletingId === project.id}
                            className="inline-flex items-center p-2 text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            title="Delete"
                          >
                            {deletingId === project.id ? (
                              <Spinner />
                            ) : (
                              <DeleteIcon />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden divide-y divide-gray-200">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {project.title}
                        </h3>
                        {project.isFeatured && (
                          <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                    {project.thumbnail && (
                      <div className="relative w-20 h-16 rounded-lg overflow-hidden ml-4 flex-shrink-0">
                        <Image
                          src={project.thumbnail}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {/* Technologies */}
                  {project.techStack && project.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="text-gray-400 text-xs">
                          +{project.techStack.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        Live Demo
                      </a>
                    )}
                    {project.gitRepo && (
                      <a
                        href={project.gitRepo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        Source Code
                      </a>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                    <div className="flex gap-2">
                      <a
                        href={`/projects/${project.id}`}
                        target="_blank"
                        className="p-2 text-gray-400 hover:text-gray-600"
                      >
                        <ExternalLinkIcon />
                      </a>
                      <Link
                        href={`/dashboard/projects/edit/${project.id}`}
                        className="p-2 text-blue-600 hover:text-blue-800"
                      >
                        <EditIcon />
                      </Link>
                      <button
                        onClick={() => handleDelete(project.id)}
                        disabled={deletingId === project.id}
                        className="p-2 text-red-600 hover:text-red-800 disabled:opacity-50"
                      >
                        {deletingId === project.id ? (
                          <Spinner />
                        ) : (
                          <DeleteIcon />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Icon Components
const PlusIcon = () => (
  <svg
    className="w-5 h-5 mr-2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4v16m8-8H4"
    />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
);

const EditIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);

const DeleteIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

const Spinner = () => (
  <svg
    className="w-4 h-4 animate-spin"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 2v4m0 12v4m8-10h-4M6 12H2"
    />
  </svg>
);

export default withAuth(ManageProjectsPage);
