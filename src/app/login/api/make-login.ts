import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

interface LoginPostData {
  email: string;
  password: string;
}

export interface LoginResponseSuccess {
  token: string;
}

export function useMakeLogin(
  onSuccess: (response: LoginResponseSuccess) => void
) {
  return useMutation({
    mutationFn: async (loginData: LoginPostData) => await makeLogin(loginData),
    onSuccess,
  });
}

const makeLogin = async (
  data: LoginPostData
): Promise<LoginResponseSuccess> => {
  const response = await api.post("/auth/login", data);
  console.log("Login response", response.data);
  return response.data;
};
