from pydantic import BaseModel, EmailStr

# Datos requeridos para crear un usuario
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

# Datos devueltos al consultar un usuario
class UserOut(BaseModel):
    id: int
    name: str
    email: EmailStr

    model_config = {
        "from_attributes": True
    }

# Esquema de login de usuario
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Respuesta con el token JWT
class Token(BaseModel):
    access_token: str
    token_type: str
