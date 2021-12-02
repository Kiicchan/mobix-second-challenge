import { createContext, useReducer } from "react";
const FormContext = createContext();
export default FormContext;

const reducer = (state, action) => {
  switch (action.type) {
    case "value":
      return { ...state };

    default:
      break;
  }
};

function init({ permissions, modules }) {
  //   const state = {};
  //   modules.forEach((module) => {
  //     module.submodules.forEach((submodule) => {
  //       permissions.forEach((permission) => {
  //         state[module.name] = {};
  //         state[module.name][submodule] = {};
  //         state[module.name][submodule][permission] = true;
  //       });
  //     });
  //   });
  return {
    permissions,
    modules,
  };
}

export function FormContextProvider({ children }) {
  const initialConfiguration = {
    permissions: ["Ver listagem", "Ver detalhes", "Criar", "Editar", "Deletar"],
    modules: [
      {
        name: "Análise",
        submodules: ["Análise de Contas", "Análise de Transações"],
      },
      {
        name: "Contas",
        submodules: ["Cliente", "Transações", "Contas digitais"],
      },
      {
        name: "Customização",
        submodules: [
          "Limites e horários",
          "Tarifas",
          "Tarifas Personalizadas",
          "Conta",
        ],
      },
      {
        name: "Financeiro",
        submodules: ["Entradas"],
      },
    ],
  };

  const [state, dispatch] = useReducer(reducer, initialConfiguration, init);
  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
}
