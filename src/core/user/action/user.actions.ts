import productsApi from "@/core/api/productsApi";
import { User } from "../interface/userResponse";

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
    console.log("📡 PUT a:", `/users/${userId}`);
    console.log("🧾 Body:", user);

    const response = await productsApi.put(`/users/${userId}`, user);
    return response.data;
  } catch (error) {
    console.error("❌ Error al guardar usuario:", error);
    throw error;
  }
};

export const getUsers = async (): Promise<User[]> => {
  try {
    const { data } = await productsApi.get("/users");

    return data;
  } catch (error) {
    console.error("Error al obtener productos", error);
    throw error;
  }
};

// export const getUserById = async () => {
//

//   const response = await productsApi.get("/cart");

//   return response.data;
// };
