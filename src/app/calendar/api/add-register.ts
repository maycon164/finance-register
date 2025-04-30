import { api } from "@/lib/api";
import { RegisterForm } from "../form/AddRegisterForm";
import { useMutation } from "@tanstack/react-query";

interface RegisterPostRequest {
  spaceId: number;
  register: {
    description: string;
    value: number;
    registerType: string;
    registerDate: string;
  };
}

const addRegister = async (register: RegisterForm) => {
  const response = await api.post(
    "/registers",
    toRegisterPostRequest(register)
  );
  return response.data;
};

function toRegisterPostRequest(register: RegisterForm): RegisterPostRequest {
  return {
    spaceId: 2,
    register: {
      description: register.description ?? "",
      value: Number(register.quantity),
      registerType: register.type.toLocaleUpperCase(),
      registerDate: register.register.toISOString(),
    },
  };
}

export const useAddRegister = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: () => void;
}) => {
  return useMutation({
    mutationFn: addRegister,
    onError,
    onSuccess,
  });
};
