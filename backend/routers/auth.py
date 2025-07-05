from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from schemas.user import UserCreate, UserOut, Token
from crud import user as crud_user
from models import user as user_model
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from auth_utils import verify_password, create_access_token, decode_access_token

router = APIRouter()

# Conexión a la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Registro de usuario
@router.post("/auth/register", response_model=UserOut)
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(user_model.User).filter(user_model.User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Correo ya registrado.")
    return crud_user.create_user(db, user)

# Configuración para autenticación JWT (usado en rutas protegidas)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

# Login de usuario (OAuth2 compatible con Swagger)
@router.post("/auth/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    db_user = db.query(user_model.User).filter(user_model.User.email == form_data.username).first()
    if not db_user or not verify_password(form_data.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Correo o contraseña incorrectos")
    
    token = create_access_token(data={"sub": str(db_user.id)})
    return {"access_token": token, "token_type": "bearer"}

# Función para obtener el usuario actual desde el token
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    payload = decode_access_token(token)
    if payload is None:
        raise HTTPException(status_code=401, detail="Token inválido")
    user_id = int(payload.get("sub"))
    user = db.query(user_model.User).get(user_id)
    if user is None:
        raise HTTPException(status_code=401, detail="Usuario no encontrado")
    return user

# Ruta protegida que devuelve el perfil del usuario autenticado
@router.get("/auth/me", response_model=UserOut)
def read_users_me(current_user: user_model.User = Depends(get_current_user)):
    return current_user
