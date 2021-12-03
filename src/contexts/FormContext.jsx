import { createContext, useReducer } from "react";
const FormContext = createContext();
export default FormContext;

const reducer = (state, action) => {
  const { formState } = state;
  let newFormState = [...formState];
  let element;
  const { label, permission, value } = action.payload;
  switch (action.type) {
    case "submodule":
      // element = newFormState.find((element) => {
      //   return element.submodule === label && element.permission === permission;
      // });
      let index = newFormState.findIndex((element) => {
        return element.submodule === label && element.permission === permission;
      });
      // element.value = value;
      // A documentação do react sugere que não se modifique valores de estado diretamente.
      // Por isso, usa-se o spread para criar novos objetos e adicioná-los a um novo array
      element = newFormState[index];
      newFormState[index] = { ...element, value: value };
      return { ...state, formState: newFormState };

    case "module":
      newFormState.forEach((element, index, array) => {
        if (element.module === label && element.permission === permission) {
          // element.value = value;
          array[index] = { ...element, value: value };
        }
      });
      return { ...state, formState: newFormState };
    case "all":
      newFormState.forEach((element, index, array) => {
        if (element.permission === permission) {
          // element.value = value;
          array[index] = { ...element, value: value };
        }
      });
      return { ...state, formState: newFormState };

    default:
      break;
  }
};

function init({ permissions, modules }) {
  // const formState = {};    //Uma árvore em vez de uma lista seria outro jeito de organizar o estado
  // modules.forEach((module) => {
  //   module.submodules.forEach((submodule) => {
  //     permissions.forEach((permission) => {
  //       formState[module.name] = {};
  //       formState[module.name][submodule] = {};
  //       formState[module.name][submodule][permission] = true;
  //     });
  //   });
  // });
  //um callback hell pq ninguém é de ferro
  const formState = [];
  modules.forEach((module) => {
    module.submodules.forEach((submodule) => {
      permissions.forEach((permission) => {
        formState.push({
          module: module.name,
          submodule,
          permission,
          value: true,
        });
      });
    });
  });
  //o estado de cada permissão (módulo, submódulo, nome da permissão e checkbox) é armazenado numa lista
  return {
    permissions,
    modules,
    formState,
  };
}

export function FormContextProvider({ children }) {
  const initialConfiguration = {
    //Configuração da tabela: uma lista de permissões, e os módulos e seus submódulos listados
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
