// Información base de cualquier usuario
export interface User {
  id?: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'CLIENT' | string;
}

// Request de registro (sign up)
export interface RegisterRequest extends User {
  password: string;
  code: string;
}

// Request de login
export interface LoginRequest {
  email: string;
  password: string;
}

// Respuesta de registro (usuario completo)
export interface RegisterResponse extends User {
  id: number;
  identityDocument: string;
  cel: string;
  createdDate: string;
  status: 'ACTIVE' | 'INACTIVE' | string;
}

// Respuesta de login (token + info)
export interface LoginResponse extends User {
  userId: number;
  token: string;
}
