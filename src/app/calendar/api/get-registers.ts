import { api } from "@/lib/api";
import { RegisterType } from "@/models";
import { useQuery } from "@tanstack/react-query";

export interface RegisterResponse {
  id: number;
  value: number;
  type: RegisterType;
  createdAt: string;
  createdBy: {
    id: number;
    name: string;
    email: string;
  };
}

export function useGetRegisters() {
  return useQuery<RegisterResponse[], unknown>({
    queryKey: ["registers"],
    queryFn: getRegisters,
  });
}

const getRegisters = async (): Promise<RegisterResponse[]> => {
  const response = await api.get("/registers");
  return response.data;
};
