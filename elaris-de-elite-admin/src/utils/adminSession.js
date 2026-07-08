const STORAGE_KEY = "elaris_admin";

// The real session lives in the httpOnly "authCookie" the backend sets on login,
// which JS can't read. This just mirrors "is someone logged in" for the UI
// (route guarding, showing the admin's name) - the backend still enforces
// access on sensitive endpoints via the adminAuth middleware.
export function saveAdminSession(admin) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(admin));
}

export function getAdminSession() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function clearAdminSession() {
  localStorage.removeItem(STORAGE_KEY);
}
