import productsApi from "@/core/api/productsApi";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../interface/user";
import { logError, logInfo } from "@/app/utils/logger";

export const postAuthRegister = async (
  payload: RegisterRequest
): Promise<RegisterResponse> => {
  try {
    logInfo("Datos enviados a la API:", payload);
    const { data } = await productsApi.post<RegisterResponse>(
      "/auth/register",
      payload
    );

    return data;
  } catch (error) {
    logError("Error al registrarse", error);
    throw error;
  }
};

export const postAuthLogin = async (
  payload: LoginRequest
): Promise<LoginResponse> => {
  try {
    logInfo("Intentando login con payload:", payload);

    const { data, status } = await productsApi.post<LoginResponse>(
      "/auth/login",
      payload
    );

    logInfo("Respuesta del login:", { status, data });
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      // error.message existe
      logError("Error al loguearse - Error:", error.message);
    }

    // Si es un error de Axios
    if (typeof error === "object" && error !== null && "response" in error) {
      const err = error as { response?: { data: unknown; status: number } };
      logError("Error al loguearse - Backend respondió:", err.response?.data);
      logError("Status Code:", err.response?.status);
    }git

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
    logError("Error al enviar el código de recuperación", error);
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
    logError("Error al enviar el código de creación de cuenta", error);
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
    logError("Error al enviar el código de creación de cuenta", error);
    throw error;
  }
};
