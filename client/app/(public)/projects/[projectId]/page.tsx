import React from "react";
// import { getProjects, getProject } from "@/lib/projects";
import { IProject } from "@/types/project";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import BackToTopButton from "@/components/shared/BackToTopButton";
import {
  getProjectsActions,
  getSingleProjectActions,
} from "@/actions/blogActions";

// export const revalidate = 60;

export async function generateStaticParams() {
  const projects: IProject[] = await getProjectsActions();
  return projects.map((project) => ({
    projectId: project.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = await getSingleProjectActions(Number(projectId));

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | My Projects`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "website",
      images: project.thumbnail ? [project.thumbnail] : [],
    },
  };
}

async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = await getSingleProjectActions(Number(projectId));

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-24">
      {/* Navigation */}
      <div className="container mx-auto px-4 mb-8">
        <Link
          href="/projects"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          ← Back to Projects
        </Link>
      </div>

      <div className="container mx-auto px-4">
        {/* Project Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Project Thumbnail */}
            {project.thumbnail && (
              <div className="lg:w-2/5">
                <div className="relative h-80 lg:h-96 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            )}

            {/* Project Info */}
            <div className="lg:w-3/5">
              <div className="flex items-center gap-3 mb-4">
                {project.isFeatured && (
                  <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    ⭐ Featured Project
                  </span>
                )}
                <span className="text-gray-500 text-sm">
                  {new Date(project.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {project.title}
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {project.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-6">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <LiveDemoIcon />
                    Live Demo
                  </a>
                )}
                {project.gitRepo && (
                  <a
                    href={project.gitRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <GitHubIcon />
                    Source Code
                  </a>
                )}
              </div>

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Features Section */}
            {project.features && project.features.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Key Features
                </h2>
                <div className="grid gap-4">
                  {project.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckIcon />
                      </div>
                      <p className="text-gray-700 leading-relaxed">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Project Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Project Overview
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p>
                  This project showcases modern development practices and
                  innovative solutions to real-world problems. Built with
                  cutting-edge technologies and best practices, it demonstrates
                  professional-grade software development.
                </p>
                {/* You can add more detailed project description here */}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tech Stack */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack &&
                  project.techStack.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
              </div>
            </div>

            {/* Project Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Project Info
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status</span>
                  <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Completed
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Created</span>
                  <span className="text-gray-900 font-medium">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Last Updated</span>
                  <span className="text-gray-900 font-medium">
                    {new Date(project.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                {project.isFeatured && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Project Type</span>
                    <span className="text-blue-600 font-medium">Featured</span>
                  </div>
                )}
              </div>
            </div>

            {/* Related Links */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Links
              </h3>
              <div className="space-y-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <ExternalLinkIcon />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Live Demo</p>
                      <p className="text-sm text-gray-500 truncate max-w-[200px]">
                        {new URL(project.liveUrl).hostname}
                      </p>
                    </div>
                  </a>
                )}
                {project.gitRepo && (
                  <a
                    href={project.gitRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                      <GitHubIcon />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Source Code</p>
                      <p className="text-sm text-gray-500 truncate max-w-[200px]">
                        {new URL(project.gitRepo).pathname
                          .split("/")
                          .slice(1, 3)
                          .join("/")}
                      </p>
                    </div>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/projects"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium w-full sm:w-auto justify-center"
          >
            ← All Projects
          </Link>

          <BackToTopButton />
        </div>
      </div>
    </div>
  );
}

// Icon Components (Keep these as they're just SVG icons, no interactivity)
const LiveDemoIcon = () => (
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
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const CheckIcon = () => (
  <svg
    className="w-4 h-4 text-green-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
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

export default ProjectDetailsPage;
