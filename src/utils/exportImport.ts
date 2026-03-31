import type { ReviewData } from '../types';

interface ExportPayload {
  version: 1;
  exportedAt: string;
  reviewData: Record<string, ReviewData>;
}

export function exportData(reviewData: Record<string, ReviewData>): string {
  const payload: ExportPayload = {
    version: 1,
    exportedAt: new Date().toISOString(),
    reviewData,
  };
  return JSON.stringify(payload, null, 2);
}

export function importData(json: string): Record<string, ReviewData> | null {
  try {
    const parsed = JSON.parse(json);
    if (parsed?.version !== 1 || typeof parsed.reviewData !== 'object') return null;
    return parsed.reviewData as Record<string, ReviewData>;
  } catch {
    return null;
  }
}

export function mergeReviewData(
  existing: Record<string, ReviewData>,
  imported: Record<string, ReviewData>,
): Record<string, ReviewData> {
  const merged = { ...existing };
  for (const [id, data] of Object.entries(imported)) {
    const current = merged[id];
    if (!current || (data.lastReviewedAt && (!current.lastReviewedAt || data.lastReviewedAt > current.lastReviewedAt))) {
      merged[id] = data;
    }
  }
  return merged;
}

export function downloadJson(content: string, filename: string) {
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
