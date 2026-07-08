const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

export async function apiRequest(path, options = {}) {
  const isFormData = options.body instanceof FormData;
  const response = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    headers: isFormData ? options.headers : { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
    body: options.body && !isFormData ? JSON.stringify(options.body) : options.body,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Error en la solicitud");
  }

  return data;
}
