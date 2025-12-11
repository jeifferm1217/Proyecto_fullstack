from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import settings

# Motor de conexión (MySQL + PyMySQL)
engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,
    connect_args={"charset": "utf8mb4"}  )

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

# Dependency para endpoints
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
