"use server";
import type { addNewModelSchema } from "@/schemas";
import { currentUser } from "@/server/auth";
import { db } from "@/server/db";
import type { Model } from "@prisma/client";
import { revalidatePath } from "next/cache";
import type z from "zod";

/**
 * Create new model and associates it with a project.
 *
 * @param model - The model details, validated against `addNewModelSchema`.
 * @returns An object with either a success message or an error message.
 */
export const createModel = async (
  model: z.infer<typeof addNewModelSchema> & { projectId: string },
) => {
  try {
    const crntUser = await currentUser();

    if (!crntUser) {
      return { error: "User authentication failed. Please log in." };
    }

    // Create the model entry in the database
    const newModel = await db.model.create({
      data: {
        userId: crntUser.id!,
        name: model.name.trim(),
        type: model.type,
        projectId: model.projectId,
        datasetId: model.datasetId,
        targetColumn: model.targetColumn.trim(),
      },
    });

    return {
      success: "Model has been successfully uploaded!",
      modelId: newModel.id,
    };
  } catch (error) {
    console.error("Error creating model:", error);

    if (error instanceof Error) {
      if (error.message.includes("Unique constraint failed")) {
        return { error: "A model with this name already exists." };
      }
    }

    return { error: "Failed to upload the model. Please try again later." };
  }
};

/**
 * Deletes a model from the database.
 *
 * @param model - The model to delete.
 * @returns An object with either a success message or an error message.
 */
export const deleteModel = async (model: Model) => {
  try {
    const crntUser = await currentUser();

    if (!crntUser) {
      return { error: "No current user found." };
    }

    if (crntUser.id !== model.userId) {
      return { error: "You do not have permission to delete this model!" };
    }

    await db.model.delete({
      where: { id: model.id },
    });

    revalidatePath("/dashboard/projects/");

    return { success: "Model has been deleted!" };
  } catch (error) {
    console.error("Error deleting model:", error);
    return { error: "An error occurred while deleting the model." };
  }
};

export const changeHyperparameters = async (
  modelId: string,
  hyperparameters: Record<string, string | number | boolean>,
) => {
  try {
    const crntUser = await currentUser();

    if (!crntUser) {
      return { error: "User authentication failed. Please log in." };
    }

    // Find the model and get existing hyperparameters
    const model = await db.model.findUnique({
      where: { id: modelId },
      select: { userId: true, hyperparameters: true },
    });

    if (!model) {
      return { error: "Model not found." };
    }

    if (crntUser.id !== model.userId) {
      return { error: "You do not have permission to update this model!" };
    }

    // Ensure existing hyperparameters is an object
    const existingHyperparameters = (model.hyperparameters ?? {}) as Record<
      string,
      string | number | boolean
    >;

    // Merge existing hyperparameters with new ones
    const updatedHyperparameters = {
      ...existingHyperparameters,
      ...hyperparameters,
    };

    // Update the model's hyperparameters
    await db.model.update({
      where: { id: modelId },
      data: { hyperparameters: updatedHyperparameters },
    });

    return { success: "Hyperparameters updated successfully!" };
  } catch (error) {
    console.error("Error updating hyperparameters:", error);
    return { error: "An error occurred while updating hyperparameters." };
  }
};
