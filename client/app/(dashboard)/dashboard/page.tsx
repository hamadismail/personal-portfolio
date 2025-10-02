"use client";

import React, { useEffect, useState } from "react";
import withAuth from "@/components/auth/withAuth";
import { getBlogs } from "@/lib/blogs";
import { getProjects } from "@/lib/projects";
import { IBlog } from "@/types/blog";
import { IProject } from "@/types/project";
import Link from "next/link";
import { toast } from "sonner";
// import { toast } from "sonner";

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalProjects: 0,
    featuredBlogs: 0,
    featuredProjects: 0,
    recentBlogs: [],
    recentProjects: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogs, projects] = await Promise.all([
          getBlogs(),
          getProjects(),
        ]);

        const recentBlogs = blogs
          .sort(
            (a: IBlog, b: IBlog) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 3);

        const recentProjects = projects
          .sort(
            (a: IProject, b: IProject) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 3);

        setStats({
          totalBlogs: blogs.length,
          totalProjects: projects.length,
          featuredBlogs: blogs.filter((blog: IBlog) => blog.isFeatured).length,
          featuredProjects: projects.filter(
            (project: IProject) => project.isFeatured
          ).length,
          recentBlogs,
          recentProjects,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 mt-2">
            Welcome back! Here&#39;s what&#39;s happening with your portfolio.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Blogs */}
          <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Blogs</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalBlogs}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BlogIcon />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-sm text-green-600 font-medium">
                +{stats.featuredBlogs} featured
              </span>
            </div>
          </div>

          {/* Total Projects */}
          <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Projects
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalProjects}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <ProjectIcon />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-sm text-green-600 font-medium">
                +{stats.featuredProjects} featured
              </span>
            </div>
          </div>

          {/* Total Views */}
          <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.recentBlogs.reduce(
                    (sum, blog: IBlog) => sum + (blog.views || 0),
                    0
                  )}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <EyeIcon />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-sm text-gray-500">All time</span>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Recent Activity
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.recentBlogs.length + stats.recentProjects.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <ActivityIcon />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-sm text-gray-500">Last 3 items</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/dashboard/blogs/create"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors group"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors">
                  <PlusIcon />
                </div>
                <div>
                  <p className="font-medium text-gray-900">New Blog</p>
                  <p className="text-sm text-gray-500">Write a new article</p>
                </div>
              </Link>

              <Link
                href="/dashboard/projects/create"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-200 transition-colors group"
              >
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-green-200 transition-colors">
                  <PlusIcon />
                </div>
                <div>
                  <p className="font-medium text-gray-900">New Project</p>
                  <p className="text-sm text-gray-500">Add a new project</p>
                </div>
              </Link>

              <Link
                href="/dashboard/blogs"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-200 transition-colors group"
              >
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-purple-200 transition-colors">
                  <BlogIcon />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Manage Blogs</p>
                  <p className="text-sm text-gray-500">Edit existing posts</p>
                </div>
              </Link>

              <Link
                href="/dashboard/projects"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-orange-50 hover:border-orange-200 transition-colors group"
              >
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-orange-200 transition-colors">
                  <ProjectIcon />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Manage Projects</p>
                  <p className="text-sm text-gray-500">Update projects</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Recent Blogs */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Blogs
              </h2>
              <Link
                href="/dashboard/blogs"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {stats.recentBlogs.length > 0 ? (
                stats.recentBlogs.map((blog: IBlog) => (
                  <div
                    key={blog.id}
                    className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {blog.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(blog.createdAt).toLocaleDateString()} •{" "}
                        {blog.views || 0} views
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      {blog.isFeatured && (
                        <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          Featured
                        </span>
                      )}
                      <Link
                        href={`/dashboard/blogs/edit/${blog.id}`}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <EditIcon />
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-4xl mb-2">📝</div>
                  <p className="text-gray-500">No blogs yet</p>
                  <Link
                    href="/dashboard/blogs/create"
                    className="inline-block mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Create your first blog
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Projects */}
        <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Projects
            </h2>
            <Link
              href="/dashboard/projects"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.recentProjects.length > 0 ? (
              stats.recentProjects.map((project: IProject) => (
                <div
                  key={project.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 line-clamp-2">
                      {project.title}
                    </h3>
                    {project.isFeatured && (
                      <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full ml-2 flex-shrink-0">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLinkIcon />
                        </a>
                      )}
                      {project.gitRepo && (
                        <a
                          href={project.gitRepo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                          title="Source Code"
                        >
                          <GitHubIcon />
                        </a>
                      )}
                    </div>
                    <Link
                      href={`/dashboard/projects/edit/${project.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <div className="text-gray-400 text-4xl mb-2">🚀</div>
                <p className="text-gray-500">No projects yet</p>
                <Link
                  href="/dashboard/projects/create"
                  className="inline-block mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Add your first project
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Icon Components
const BlogIcon = () => (
  <svg
    className="w-6 h-6 text-blue-600"
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

const ProjectIcon = () => (
  <svg
    className="w-6 h-6 text-green-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    />
  </svg>
);

const EyeIcon = () => (
  <svg
    className="w-6 h-6 text-purple-600"
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

const ActivityIcon = () => (
  <svg
    className="w-6 h-6 text-orange-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
    />
  </svg>
);

const PlusIcon = () => (
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
      d="M12 4v16m8-8H4"
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

const GitHubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

export default withAuth(DashboardPage);
