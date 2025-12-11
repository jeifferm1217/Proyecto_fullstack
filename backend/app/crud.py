from sqlalchemy.orm import Session
from app.models.nota import Nota
from app.schemas.nota_schema import NotaCreate, NotaUpdate

def obtener_notas(db: Session):
    return db.query(Nota).all()

def obtener_nota(db: Session, nota_id: int):
    return db.query(Nota).filter(Nota.id == nota_id).first()

def crear_nota(db: Session, nota: NotaCreate):
    nueva_nota = Nota(
        titulo=nota.titulo,
        contenido=nota.contenido,
    )
    db.add(nueva_nota)
    db.commit()
    db.refresh(nueva_nota)
    return nueva_nota

def actualizar_nota(db: Session, nota_id: int, data: NotaUpdate):
    nota_db = obtener_nota(db, nota_id)
    if not nota_db:
        return None

    if data.titulo is not None:
        nota_db.titulo = data.titulo

    if data.contenido is not None:
        nota_db.contenido = data.contenido

    if data.estado is not None:
        nota_db.estado = data.estado

    db.commit()
    db.refresh(nota_db)
    return nota_db

def eliminar_nota(db: Session, nota_id: int):
    nota_db = obtener_nota(db, nota_id)
    if nota_db:
        db.delete(nota_db)
        db.commit()
        return True
    return False
