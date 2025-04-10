import type { DataType } from "@prisma/client";

export const dataTypes: { value: DataType; label: string; extensions: string[] }[] = [
  { value: "CSV", label: "CSV", extensions: [".csv"] },
  // { value: "JSON", label: "JSON", extensions: [".json"] },
  // { value: "EXCEL", label: "Excel", extensions: [".xlsx", ".xls"] },
  // { value: "PARQUET", label: "Parquet", extensions: [".parquet"] },
  // { value: "TEXT", label: "Text", extensions: [".txt"] },
  // {
  //   value: "IMAGE",
  //   label: "Image",
  //   extensions: [".jpg", ".jpeg", ".png", ".gif", ".webp"],
  // },
];

export const isValidUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch (_) {
    return false;
  }
};

export const isValidFileType = (url: string, datasetType: DataType): boolean => {
  const extension = `.${url.split(".").pop()?.toLowerCase()}`;
  const matchedType = dataTypes.find((type) => type.value === datasetType);

  return matchedType ? matchedType.extensions.includes(extension) : false;
};

export const checkUrlAccessibility = async (url: string): Promise<boolean> => {
    try {
      const response = await fetch(url, { method: "HEAD" });
      return response.ok;
    } catch {
      return false;
    }
  };
  