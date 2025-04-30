import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { on } from "events";

interface LoginPostData {
  email: string;
  password: string;
}

export interface LoginResponseSuccess {
  token: string;
}

export function useMakeLogin({
  onError,
  onSuccess,
}: {
  onSuccess: (response: LoginResponseSuccess) => void;
  onError: (error: string) => void;
}) {
  return useMutation({
    mutationFn: async (loginData: LoginPostData) => await makeLogin(loginData),
    onSuccess,
    onError,
  });
}

const makeLogin = async (
  data: LoginPostData
): Promise<LoginResponseSuccess> => {
  const response = await api.post("/auth/login", data);
  console.log("Login response", response.data);
  return response.data;
};
