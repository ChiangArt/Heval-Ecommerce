import productsApi from "@/core/api/productsApi";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../interface/user";

export const postAuthRegister = async (
  payload: RegisterRequest
): Promise<RegisterResponse> => {
  try {
    console.log("Datos enviados a la API:", payload);
    const { data } = await productsApi.post<RegisterResponse>(
      "/auth/register",
      payload
    );

    return data;
  } catch (error) {
    console.error("Error al registrarse", error);
    throw error;
  }
};

export const postAuthLogin = async (
  payload: LoginRequest
): Promise<LoginResponse> => {
  try {
    const { data } = await productsApi.post<LoginResponse>(
      "/auth/login",
      payload
    );

    return data;
  } catch (error) {
    console.error("Error al loguearse", error);
    throw error;
  }
};

export const postAuthForgotPassword = async (email: string) => {
  try {
    const { data } = await productsApi.post("/auth/forgot-password", null, {
      params: { email },
    });

    return data;
  } catch (error) {
    console.error("Error al enviar el código de recuperación", error);
    throw error;
  }
};


export const postAuthResetPassword = async (
  token: string,
  newPassword: string
): Promise<void> => {
  try {
    const { data } = await productsApi.post("/auth/reset-password", null, {
      params: { token, newPassword },
    });
    return data;
  } catch (error) {
    console.error("Error al enviar el código de creación de cuenta", error);
    throw error;
  }
};

export const postAuthSendCode = async (email: string) => {
  try {
    // Incluimos el email en la URL como query param
    const { data } = await productsApi.post(
      `/auth/send-code?email=${encodeURIComponent(email)}`
    );
    return data;
  } catch (error) {
    console.error("Error al enviar el código de creación de cuenta", error);
    throw error;
  }
};
