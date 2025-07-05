from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# Carga variables de entorno
load_dotenv()

# URL de conexión a la base de datos (por defecto SQLite)
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./db.sqlite3")

# Motor de SQLAlchemy
engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)

# Sesiones de base de datos y modelo base
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
Base = declarative_base()
