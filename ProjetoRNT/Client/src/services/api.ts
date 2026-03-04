import { supabase } from "../lib/supabase";

const BASE_URL = import.meta.env.VITE_API_URL;

async function getAuthHeaders() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("Usuário não autenticado");
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session.access_token}`,
  };
}

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
) {
  const headers = await getAuthHeaders();

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    let errorMessage = "Erro na requisição";

    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorMessage;
    } catch {
      // resposta não tinha body JSON
    }

    throw new Error(errorMessage);
  }

  if (response.status === 204) return null;

  return response.json();
}