from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.hash import bcrypt
from dotenv import load_dotenv
import os

# Carga variables de entorno para las claves
load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 60))

# Verifica la contraseña usando bcrypt
def verify_password(plain_password, hashed_password):
    return bcrypt.verify(plain_password, hashed_password)

# Genera un token JWT con expiración
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# Decodifica y valida un token JWT
def decode_access_token(token: str):
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        return None
