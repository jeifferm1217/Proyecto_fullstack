from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import engine, Base   # ← AQUÍ SE IMPORTA Base CORRECTAMENTE

import app.models.nota                     # ← Importa cada modelo aquí

from app.routers.nota_router import router as nota_router

# Crear tablas (solo para desarrollo; en producción usar Alembic)
Base.metadata.create_all(bind=engine)

app = FastAPI(title='API Notas (MySQL)')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],  # EN PRODUCCIÓN: restringir a dominio(s) de Vercel
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

app.include_router(nota_router)

if __name__ == '__main__':
    import uvicorn
    from app.core.config import settings
    uvicorn.run('app.main:app', host='0.0.0.0', port=settings.port, reload=True)
