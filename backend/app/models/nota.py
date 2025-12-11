from sqlalchemy import Column, Integer, String, Text, DateTime, func
from app.db.database import Base

class Nota(Base):
    __tablename__ = "nota"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    titulo = Column(String(255), nullable=False)
    contenido = Column(Text, nullable=False)
    estado = Column(String(20), nullable=False, default="pendiente")
    creado_en = Column(DateTime, server_default=func.now())
    actualizado_en = Column(DateTime, server_default=func.now(), onupdate=func.now())
