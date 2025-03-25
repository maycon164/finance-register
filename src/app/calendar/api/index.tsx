const lastRegisters = [
  {
    id: 1,
    userName: "David",
    type: "OUTCOME",
    value: 1000,
    description: "Gasto com o ponto xxx",
  },
  {
    id: 2,
    userName: "Ana",
    type: "INCOME",
    value: 2500,
    description: "Venda de Vestido",
  },
  {
    id: 3,
    userName: "David",
    type: "OUTCOME",
    value: 150,
    description: "Valor da luz",
  },
  {
    id: 4,
    userName: "David",
    type: "OUTCOME",
    value: 300,
    description: "Segurança",
  },
  {
    id: 5,
    userName: "Ana",
    type: "INCOME",
    value: 500,
    description: "Pedido xxx",
  },
];

type useGetRegisterByDate = {
  date: Date;
};

export const useGetRegisterByDate = ({ date }: useGetRegisterByDate) => {
  return {
    registers: lastRegisters,
    date: date,
  };
};
