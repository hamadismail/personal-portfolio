"use client";

import React, { useEffect, useState } from "react";
import withAuth from "@/components/auth/withAuth";
import { getProject, updateProject } from "@/lib/projects";
import { IProject } from "@/types/project";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

const EditProjectPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    thumbnail: "",
    liveUrl: "",
    gitRepo: "",
    description: "",
    tags: "",
    techStack: "",
    features: "",
    isFeatured: false,
  });
  const [projectData, setProjectData] = useState<IProject | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (id) {
          const project = await getProject(Number(id));
          setProjectData(project);
          setFormData({
            title: project.title,
            thumbnail: project.thumbnail || "",
            liveUrl: project.liveUrl || "",
            gitRepo: project.gitRepo || "",
            description: project.description,
            tags: project.tags?.join(", ") || "",
            techStack: project.techStack?.join(", ") || "",
            features: project.features?.join("\n") || "",
            isFeatured: project.isFeatured || false,
          });
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        toast.error("Failed to fetch project");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Project title is required");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Project description is required");
      return;
    }

    setIsSubmitting(true);

    try {
      if (id && projectData) {
        const updatedProject: IProject = {
          ...projectData,
          title: formData.title,
          thumbnail: formData.thumbnail,
          liveUrl: formData.liveUrl,
          gitRepo: formData.gitRepo,
          description: formData.description,
          tags: formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag),
          techStack: formData.techStack
            .split(",")
            .map((tech) => tech.trim())
            .filter((tech) => tech),
          features: formData.features
            .split("\n")
            .filter((feature) => feature.trim()),
          isFeatured: formData.isFeatured,
          updatedAt: new Date(),
        };

        await updateProject(Number(id), updatedProject);
        toast.success("Project updated successfully!");
        router.push("/dashboard/projects");
      }
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Failed to update project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="space-y-6">
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded w-1/4"></div>
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
          <div className="flex items-center gap-4 mb-2">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeftIcon />
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Edit Project</h1>
          </div>
          <p className="text-gray-600 ml-10">
            Update your project details and information
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Basic Information
            </h2>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Project Title *
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter project title..."
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Project Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  placeholder="Describe your project, its purpose, and what problem it solves..."
                />
              </div>

              {/* Featured Checkbox */}
              <div className="flex items-center">
                <input
                  id="isFeatured"
                  name="isFeatured"
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="isFeatured"
                  className="ml-2 text-sm font-medium text-gray-700"
                >
                  Feature this project on your portfolio
                </label>
              </div>
            </div>
          </div>

          {/* Media & Links Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Media & Links
            </h2>

            <div className="space-y-4">
              {/* Thumbnail URL */}
              <div>
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Thumbnail URL
                </label>
                <input
                  id="thumbnail"
                  name="thumbnail"
                  type="url"
                  value={formData.thumbnail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="https://example.com/project-screenshot.jpg"
                />
                {formData.thumbnail && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 mb-2">Preview:</p>
                    <div className="relative w-32 h-20 border rounded-lg overflow-hidden">
                      <Image
                        src={formData.thumbnail}
                        alt="Thumbnail preview"
                        fill
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Live URL */}
              <div>
                <label
                  htmlFor="liveUrl"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Live Demo URL
                </label>
                <input
                  id="liveUrl"
                  name="liveUrl"
                  type="url"
                  value={formData.liveUrl}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="https://your-project.com"
                />
              </div>

              {/* GitHub Repo */}
              <div>
                <label
                  htmlFor="gitRepo"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  GitHub Repository URL
                </label>
                <input
                  id="gitRepo"
                  name="gitRepo"
                  type="url"
                  value={formData.gitRepo}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="https://github.com/yourusername/your-project"
                />
              </div>
            </div>
          </div>

          {/* Technical Details Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Technical Details
            </h2>

            <div className="space-y-4">
              {/* Tech Stack */}
              <div>
                <label
                  htmlFor="techStack"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Tech Stack
                </label>
                <input
                  id="techStack"
                  name="techStack"
                  type="text"
                  value={formData.techStack}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="React, Node.js, MongoDB, Tailwind CSS (comma separated)"
                />
                <p className="text-sm text-gray-500 mt-1">
                  List technologies used in this project
                </p>
              </div>

              {/* Tags */}
              <div>
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Project Tags
                </label>
                <input
                  id="tags"
                  name="tags"
                  type="text"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="web-app, fullstack, responsive, portfolio (comma separated)"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Add tags to help categorize your project
                </p>
              </div>

              {/* Features */}
              <div>
                <label
                  htmlFor="features"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Key Features
                </label>
                <textarea
                  id="features"
                  name="features"
                  value={formData.features}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  placeholder="Enter each feature on a new line:
- User authentication
- Real-time updates
- Responsive design
- Dark mode support"
                />
                <p className="text-sm text-gray-500 mt-1">
                  List key features, one per line
                </p>
              </div>
            </div>
          </div>

          {/* Project Stats */}
          {projectData && (
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">
                Project Information
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-blue-700 font-medium">Created</p>
                  <p className="text-blue-900">
                    {new Date(projectData.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-blue-700 font-medium">Last Updated</p>
                  <p className="text-blue-900">
                    {new Date(projectData.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-blue-700 font-medium">Status</p>
                  <p className="text-blue-900">
                    {projectData.isFeatured ? "Featured" : "Published"}
                  </p>
                </div>
                <div>
                  <p className="text-blue-700 font-medium">Technologies</p>
                  <p className="text-blue-900">
                    {projectData.techStack?.length || 0}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Preview Card */}
          <div className="bg-green-50 rounded-xl p-6 border border-green-200">
            <h3 className="text-lg font-semibold text-green-900 mb-4">
              Project Preview
            </h3>
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <div className="flex items-start gap-4">
                {formData.thumbnail && (
                  <div className="relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={formData.thumbnail}
                      alt="Project preview"
                      fill
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-gray-900">
                      {formData.title || "Project Title"}
                    </h4>
                    {formData.isFeatured && (
                      <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {formData.description ||
                      "Project description will appear here..."}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {formData.tags
                      .split(",")
                      .slice(0, 3)
                      .map(
                        (tag, index) =>
                          tag.trim() && (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                            >
                              #{tag.trim()}
                            </span>
                          )
                      )}
                    {formData.techStack
                      .split(",")
                      .slice(0, 2)
                      .map(
                        (tech, index) =>
                          tech.trim() && (
                            <span
                              key={index}
                              className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded"
                            >
                              {tech.trim()}
                            </span>
                          )
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6">
            <button
              type="button"
              onClick={() => router.push("/dashboard/projects")}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              disabled={isSubmitting}
            >
              Cancel
            </button>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => {
                  // Preview functionality
                  window.open(`/projects/${id}`, "_blank");
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                disabled={isSubmitting}
              >
                Preview Live
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Updating...
                  </span>
                ) : (
                  "Update Project"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// Icon Components
const ArrowLeftIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 19l-7-7m0 0l7-7m-7 7h18"
    />
  </svg>
);

export default withAuth(EditProjectPage);
