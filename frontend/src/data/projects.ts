import { currentUser } from "@/server/auth";
import { db } from "@/server/db";

/**
 * Retrieves all projects from the database.
 * @returns A promise that resolves to an array of projects.
 */
export const getAllProjectsForUser = async (id: string) => {
  const projects = await db.project.findMany({ where: { userId: id } });
  return projects;
};

/**
 * Retrieves a project by its ID.
 * @param id - The ID of the project to retrieve.
 * @returns The project object if found, or null if not found.
 */
export const getProjectById = async (id: string) => {
  try {
    const crntUser = await currentUser();

    if (!crntUser) {
      return null;
    }
    const project = await db.project.findUnique({
      where: { id: id, userId: crntUser.id },
      include: {
        models: {
          include: {
            deployments: true,
          },
        },
      },
    });

    return project;
  } catch {
    return null;
  }
};
