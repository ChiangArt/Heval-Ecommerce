import productsApi from "@/core/api/productsApi";

export const putUser = async (
  userId: number,
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await productsApi.put(`/users/${userId}`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error al guardar usuario:", error);
    throw error;
  }
};

// export const getUserById = async () => {
// 


//   const response = await productsApi.get("/cart");

//   return response.data;
// };
