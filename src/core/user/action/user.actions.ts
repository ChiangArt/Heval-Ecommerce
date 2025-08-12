import productsApi from "@/core/api/productsApi";
import { User } from "../interface/userResponse";
import { logError, logInfo } from "@/app/utils/logger";

export interface UserRequest {
  name: string;
  email: string;
  password?: string; // ← opcional
  identityDocument?: string; // ← opcional
  cel?: string; // ← opcional
  role: "ADMIN" | "CLIENT";
}

export const putUser = async (userId: number, user: UserRequest) => {
  try {
    logInfo("📡 PUT a:", `/users/${userId}`);
    logInfo("🧾 Body:", user);

    const response = await productsApi.put(`/users/${userId}`, user);
    return response.data;
  } catch (error) {
    logError("❌ Error al guardar usuario:", error);
    throw error;
  }
};

export const getUsers = async (): Promise<User[]> => {
  try {
    const { data } = await productsApi.get("/users");

    return data;
  } catch (error) {
    logError("Error al obtener productos", error);
    throw error;
  }
};

// export const getUserById = async () => {
//

//   const response = await productsApi.get("/cart");

//   return response.data;
// };
