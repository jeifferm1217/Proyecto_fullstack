export default function NoteItem({ nota, onEdit, onDelete, onToggleStatus }){
  const date = nota.creado_en ? new Date(nota.creado_en) : null;
  const dateStr = date ? date.toLocaleString() : "";

  return (
    <div className="note-item card">
      <div className="note-left">
        <div className="note-title">
          <span style={{fontSize:16}}>{nota.titulo}</span>
          <span className="status">{nota.estado || "pendiente"}</span>
        </div>
        <div className="note-content">{nota.contenido}</div>
        <div className="note-meta">Creada: {dateStr}</div>
      </div>

      <div className="note-actions">
        <button className="icon-btn btn-success" title="Toggle estado" onClick={()=>{
          const nuevo = nota.estado === "completed" || nota.estado === "completada" ? "pendiente" : "completed";
          onToggleStatus(nota.id, nuevo);
        }}>
          {nota.estado === "completed" || nota.estado === "completada" ? "✅" : "✔️"}
        </button>

        <button className="icon-btn" title="Editar" onClick={() => onEdit(nota)}>✏️</button>

        <button className="icon-btn btn-danger" title="Eliminar" onClick={()=>{
          if (confirm("¿Eliminar esta nota?")) onDelete(nota.id)
        }}>🗑️</button>
      </div>
    </div>
  );
}
