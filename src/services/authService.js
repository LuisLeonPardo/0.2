import api from '../api/axios';

// Servicio de autenticación que consume el backend

// Envía las credenciales al backend y devuelve el token JWT
export const login = async (email, password) => {
  const formData = new URLSearchParams();
  formData.append('username', email);
  formData.append('password', password);

  const response = await api.post('/auth/login', formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return response.data; // { access_token, token_type }
};

// Obtiene el perfil del usuario autenticado usando el token
export const getProfile = async (token) => {
  const response = await api.get('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
