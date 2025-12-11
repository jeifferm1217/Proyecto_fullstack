import { useEffect, useState } from "react";

export default function NoteForm({ onSubmit, editing, onCancel, disabled }) {
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");

  useEffect(()=>{
    if (editing){
      setTitulo(editing.titulo || "");
      setContenido(editing.contenido || "");
    } else {
      setTitulo("");
      setContenido("");
    }
  }, [editing]);

  const submit = (e) => {
    e.preventDefault();
    if (!titulo.trim()) return alert("El título es obligatorio");
    if (!contenido.trim()) return alert("El contenido es obligatorio");
    onSubmit({ titulo: titulo.trim(), contenido: contenido.trim() });
  };

  return (
    <form className="todo-form" onSubmit={submit}>
      <div style={{display:"flex", flexDirection:"column", gap:8, flex:1}}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          disabled={disabled}
        />
        <textarea
          rows={3}
          placeholder="Contenido"
          value={contenido}
          onChange={e => setContenido(e.target.value)}
          disabled={disabled}
          style={{resize:"vertical"}}
        />
      </div>

      <div style={{display:"flex", flexDirection:"column", gap:8}}>
        <button type="submit" disabled={disabled}>{ editing ? "Actualizar" : "Crear" }</button>
        { editing && <button type="button" onClick={onCancel} style={{background:"#f3f4f6", color:"#111"}}>Cancelar</button> }
      </div>
    </form>
  );
}
