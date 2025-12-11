const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

/*
Endpoints backend:
GET  /api/notas
POST /api/notas
PUT  /api/notas/{id}
DELETE /api/notas/{id}
*/

async function handleRes(res){
  const contentType = res.headers.get("content-type") || "";
  if (!res.ok) {
    let body = null;
    if (contentType.includes("application/json")) body = await res.json();
    const message = body?.detail || body?.message || res.statusText || "Error en la petición";
    throw new Error(message);
  }
  if (contentType.includes("application/json")) return res.json();
  return null;
}

export const listarNotas = async () => {
  const res = await fetch(`${API_BASE}/notas/`);
  return handleRes(res);
};

export const crearNota = async (payload) => {
  const res = await fetch(`${API_BASE}/notas/`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(payload)
  });
  return handleRes(res);
};

export const actualizarNota = async (id, payload) => {
  const res = await fetch(`${API_BASE}/notas/${id}`, {
    method: "PUT",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(payload)
  });
  return handleRes(res);
};

export const eliminarNota = async (id) => {
  const res = await fetch(`${API_BASE}/notas/${id}`, {
    method: "DELETE"
  });
  return handleRes(res);
};
