from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app import crud
from app.schemas.nota_schema import NotaCreate, NotaUpdate, NotaOut

router = APIRouter(
    prefix="/api/notas",
    tags=["Notas"]
)

@router.get("/", response_model=list[NotaOut])
def listar_notas(db: Session = Depends(get_db)):
    return crud.obtener_notas(db)

@router.post("/", response_model=NotaOut)
def crear_nota(nota: NotaCreate, db: Session = Depends(get_db)):
    return crud.crear_nota(db, nota)

@router.put("/{nota_id}", response_model=NotaOut)
def actualizar_nota(nota_id: int, datos: NotaUpdate, db: Session = Depends(get_db)):
    nota = crud.actualizar_nota(db, nota_id, datos)
    if not nota:
        raise HTTPException(status_code=404, detail="Nota no encontrada")
    return nota

@router.delete("/{nota_id}")
def eliminar_nota(nota_id: int, db: Session = Depends(get_db)):
    crud.eliminar_nota(db, nota_id)
    return {"message": "Nota eliminada correctamente"}
