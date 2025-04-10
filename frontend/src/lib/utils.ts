import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Papa from "papaparse";

/**
 * Combines multiple class names and merges Tailwind CSS classes.
 *
 * @param {...ClassValue[]} inputs - An array of class values to be combined.
 * @returns {string} A single merged string of class names, with duplicates removed or merged based on Tailwind CSS rules.
 *
 * @example
 * // Basic usage with conditional class names
 * cn("bg-red-500", isActive && "text-white"); // "bg-red-500 text-white" if isActive is true
 *
 * @example
 * // With multiple class utilities and merging
 * cn("p-4", "p-2"); // "p-2" (tailwind-merge resolves conflicts)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Fetches a dataset from a given URL and returns the first 5 rows as a 2D array.
 *
 * @param {string} datasetLink - The URL to fetch the dataset from.
 * @returns {Promise<string[][]>} A promise that resolves to a 2D array of strings representing the dataset.
 * @throws {Error} If the dataset fails to fetch or parse.
 */
export const fetchDataset = async ({
  datasetLink,
  type,
}: {
  datasetLink: string;
  type: string;
}): Promise<string[][]> => {
  try {
    const response = await fetch(datasetLink);
    if (!response.ok) throw new Error("Failed to fetch dataset.");

    const text = await response.text();
    const parsed = Papa.parse<string[]>(text, {
      header: false, // Change to `true` if CSV has headers
      skipEmptyLines: true,
    });

    return parsed.data // Return first 5 rows
  } catch (error) {
    console.error("Error loading dataset:", error);
    throw new Error("Error loading dataset.");
  }
};