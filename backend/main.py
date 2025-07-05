from fastapi import FastAPI
from database import Base, engine
from routers import auth
from fastapi.middleware.cors import CORSMiddleware


# Aplicación principal de FastAPI
app = FastAPI()

# Crea las tablas en la base de datos SQLite
Base.metadata.create_all(bind=engine)

# Incluye las rutas de autenticación bajo /api
app.include_router(auth.router, prefix="/api")

# Habilita CORS para permitir peticiones del frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # o ["*"] para pruebas
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
