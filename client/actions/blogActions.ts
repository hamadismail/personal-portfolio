export async function getBlogsActions() {
  const res = await fetch(`${process.env.BACKEND_URL}/blogs`, {
    cache: "no-store", // disables caching, true SSR
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return res.json();
}

export const getSingleBlogActions = async (id: number) => {
  const res = await fetch(`${process.env.BACKEND_URL}/blogs/${id}`, {
    cache: "no-store", // disables caching, true SSR
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return res.json();
};

export async function getProjectsActions() {
  const res = await fetch(`${process.env.BACKEND_URL}/projects`, {
    cache: "no-store", // disables caching, true SSR
  });

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  return res.json();
}

export const getSingleProjectActions = async (id: number) => {
  const res = await fetch(`${process.env.BACKEND_URL}/projects/${id}`, {
    cache: "no-store", // disables caching, true SSR
  });

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  return res.json();
};
