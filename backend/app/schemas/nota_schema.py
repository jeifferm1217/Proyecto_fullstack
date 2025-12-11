from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class NotaBase(BaseModel):
    titulo: str = Field(..., min_length=1)
    contenido: str = Field(..., min_length=1)

class NotaCreate(NotaBase):
    pass

class NotaUpdate(BaseModel):
    titulo: Optional[str]
    contenido: Optional[str]
    estado: Optional[str]

class NotaOut(NotaBase):
    id: int
    estado: str
    creado_en: datetime

    class Config:
        orm_mode = True
