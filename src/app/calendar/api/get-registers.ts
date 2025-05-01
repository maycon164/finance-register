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

export function useGetRegisters({ date }: { date: Date }) {
  return useQuery<RegisterResponse[], unknown>({
    queryKey: ["registers", date],
    queryFn: () => getRegisters(date),
  });
}

const getRegisters = async (date: Date): Promise<RegisterResponse[]> => {
  const response = await api.get(
    `/registers?day=${date.toISOString().slice(0, 10)}`
  );
  return response.data;
};
