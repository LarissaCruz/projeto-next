import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001", // Insira a URL base da sua API aqui
});

export async function loginUser(username: string, password: string) {
  try {
    const response = await api.post("/login", { username, password });

    if (response.status === 200) {
      return response;
    } else {
      throw new Error("Credenciais inválidas");
    }
  } catch (error) {
    throw new Error("Falha ao verificar o usuário");
  }
}
