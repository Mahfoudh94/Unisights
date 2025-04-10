import { db } from "@/server/db";


/**
 * Retrieves all sentiments from the database.
 * @returns A promise that resolves to an array of sentiments.
 */
export const getAllSentiments = async () => {
  const sentiments = await db.sentimentOverview.findMany();
  return sentiments;
};
