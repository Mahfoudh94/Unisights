"use server";
import { currentUser } from "@/server/auth";
import { db } from "@/server/db";
import { type Project } from "@prisma/client";
import { revalidatePath } from "next/cache";

/**
 * Create a new project.
 *
 * @param name - The project name.
 * @returns An object with either a success message or an error message.
 */
export const createProject = async (
  name: string,
) => {
  try {
    // Validate the project name
    if (!name || name.trim().length === 0) {
      return { error: "Project name cannot be empty." };
    }

    if (name.length > 100) {
      return { error: "Project name cannot exceed 100 characters." };
    }

    // Get the current user
    const crntUser = await currentUser();

    if (!crntUser) {
      return { error: "No current user found. Please log in." };
    }

    // Create the project in the database
    await db.project.create({
      data: {
        userId: crntUser.id!,
        name: name.trim(),
      },
    });
    revalidatePath("/dashboard/projects")

    return { success: "Project has been created!" };
  } catch (error) {
    console.error("Error creating new project:", error);

    // Handle specific errors
    if (error instanceof Error) {
      if (error.message.includes("Unique constraint failed")) {
        return { error: "A project with this name already exists." };
      }
    }

    return { error: "An error occurred while creating the project." };
  }
};

/**
 * Deletes a project from the database.
 *
 * @param project - The project to delete.
 * @returns An object with either a success message or an error message.
 */
export const deleteProject = async (project: Project) => {
  try {
    const crntUser = await currentUser();

    if (!crntUser) {
      return { error: "No current user found." };
    }

    if (crntUser.id !== project.userId) {
      return { error: "You do not have permission to delete this project!" };
    }

    await db.project.delete({
      where: { id: project.id },
    });
    revalidatePath("/dashboard/projects")

    return { success: "Project has been deleted!" };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { error: "An error occurred while deleting the project." };
  }
};
