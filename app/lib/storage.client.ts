const isBrowser = typeof window !== "undefined";

type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };

export function readJsonFromStorage<T extends JsonValue>(key: string, fallback: T): T {
  if (!isBrowser) return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJsonToStorage<T extends JsonValue>(key: string, value: T) {
  if (!isBrowser) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}
