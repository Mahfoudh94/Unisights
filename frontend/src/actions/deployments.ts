"use server";
import type { addNewDeploymentSchema } from "@/schemas";
import { currentUser } from "@/server/auth";
import { db } from "@/server/db";
import type { Deployment } from "@prisma/client";
import type z from "zod";

/**
 * Create new deployment and associates it with a project.
 *
 * @param deployment - The deployment details, validated against `addNewDeploymentSchema`.
 * @returns An object with either a success message or an error message.
 */
export const createDeployment = async (
  deployment: z.infer<typeof addNewDeploymentSchema>,
) => {
  try {
    const crntUser = await currentUser();

    if (!crntUser) {
      return { error: "User authentication failed. Please log in." };
    }

    // Create the deployment entry in the database
    await db.deployment.create({
      data: {
        userId: crntUser.id!,
        apiKeyId: deployment.apiKeyId,
        endpoint: deployment.endpoint,
        modelId: deployment.modelId,
      },
    });

    return { success: "Deployment has been successfully uploaded!" };
  } catch (error) {
    console.error("Error creating deployment:", error);

    if (error instanceof Error) {
      if (error.message.includes("Unique constraint failed")) {
        return { error: "A deployment with this name already exists." };
      }
    }

    return {
      error: "Failed to upload the deployment. Please try again later.",
    };
  }
};

/**
 * Deletes a deployment from the database.
 *
 * @param deployment - The deployment to delete.
 * @returns An object with either a success message or an error message.
 */
export const deleteDeployment = async (deployment: Deployment) => {
  try {
    const crntUser = await currentUser();

    if (!crntUser) {
      return { error: "No current user found." };
    }

    if (crntUser.id !== deployment.userId) {
      return { error: "You do not have permission to delete this deployment!" };
    }

    await db.deployment.delete({
      where: { id: deployment.id },
    });

    return { success: "Deployment has been deleted!" };
  } catch (error) {
    console.error("Error deleting deployment:", error);
    return { error: "An error occurred while deleting the deployment." };
  }
};
