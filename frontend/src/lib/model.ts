import type { JsonObject, JsonValue } from "@prisma/client/runtime/library";

export function isTrained(metrics: JsonValue) {
  return (
    metrics &&
    typeof metrics === "object" &&
    !Array.isArray(metrics) &&
    Object.keys(metrics).length > 0
  );
}

export function getModelMetrics(metrics: JsonValue) {
  if (metrics && typeof metrics === "object" && !Array.isArray(metrics)) {
    return metrics;
  }
  return JSON.parse("{}") as JsonObject;
}
