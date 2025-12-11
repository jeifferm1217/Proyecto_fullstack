import { useEffect, useState } from "react";
import { listarNotas, crearNota, actualizarNota, eliminarNota } from "../services/notasService";
import NoteForm from "../components/NoteForm";
import NoteItem from "../components/NoteItem";

export default function Home(){
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await listarNotas();
      setNotas(res || []);
    } catch (err) {
      setError(err.message || "Error al cargar notas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{ load(); }, []);

  const handleCreate = async (payload) => {
    setBusy(true);
    try {
      const created = await crearNota(payload);
      setNotas(prev => [...prev, created]);
    } catch (err) {
      alert(err.message || "Error al crear");
    } finally {
      setBusy(false);
    }
  };

  const handleUpdate = async (id, payload) => {
    setBusy(true);
    try {
      const updated = await actualizarNota(id, payload);
      setNotas(prev => prev.map(n => n.id === id ? updated : n));
      setEditing(null);
    } catch (err) {
      alert(err.message || "Error al actualizar");
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (id) => {
    setBusy(true);
    try {
      await eliminarNota(id);
      setNotas(prev => prev.filter(n => n.id !== id));
    } catch (err) {
      alert(err.message || "Error al eliminar");
    } finally {
      setBusy(false);
    }
  };

  const toggleStatus = async (id, nuevoEstado) => {
    setBusy(true);
    try {
      const updated = await actualizarNota(id, { estado: nuevoEstado });
      setNotas(prev => prev.map(n => n.id === id ? updated : n));
    } catch (err) {
      alert(err.message || "Error al actualizar estado");
    } finally {
      setBusy(false);
    }
  };

  const onSubmitForm = (payload) => {
    if (editing) {
      handleUpdate(editing.id, payload);
      return;
    }
    handleCreate(payload);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Notas / Todo List</h1>
        <div style={{color:"#666", fontSize:13}}>Conecta a tu backend FastAPI</div>
      </div>

      <div className="card">
        <NoteForm
          onSubmit={onSubmitForm}
          editing={editing}
          onCancel={()=>setEditing(null)}
          disabled={busy}
        />
      </div>

      <div className="card">
        {loading ? <div className="empty">Cargando notas...</div> : null}
        {error ? <div className="empty" style={{color:"red"}}>{error}</div> : null}

        {(!loading && notas.length === 0) && <div className="empty">No hay notas. Crea una.</div>}

        <div className="todo-list">
          {notas.map(n => (
            <NoteItem
              key={n.id}
              nota={n}
              onEdit={(nota)=>setEditing(nota)}
              onDelete={handleDelete}
              onToggleStatus={toggleStatus}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
