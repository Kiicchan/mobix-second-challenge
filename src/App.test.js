/// <reference types="cypress" />

import React, { useContext } from "react";
import { mount } from "@cypress/react";
import App from "./App.jsx";
import { mountFormContextWith } from "./test-utils";
import FormContext from "./contexts/FormContext";
import PermissionTable from "./components/Permission/Table";
import PermissionSubmitButton from "./components/Permission/SubmitButton";

const getState = () => {
  return cy
    .get("#state-holder")
    .invoke("attr", "state")
    .then((stateString) => {
      return JSON.parse(stateString);
    });
};
const ContextStateToText = () => {
  //um componente para armazenar todo o estado do contexto, uma vez que o estado interno aos componentes não é diretamente visível ao cypress
  const { state } = useContext(FormContext);
  const stateText = JSON.stringify(state);
  return <div id="state-holder" state={stateText}></div>;
};

describe("App component", () => {
  it("renders permission table and all checkboxes", () => {
    mount(<App />);

    cy.get('[aria-label="permission table"]')
      .should("be.visible")
      .find("input[type=checkbox]")
      .should("have.length", 75);
  });
  it("renders permissionButton", () => {
    mount(<App />);
    cy.get("button").contains("CADASTRAR");
  });
});

describe("FormContextProvider", () => {
  beforeEach(() => {
    mountFormContextWith([
      <PermissionTable key="permissiontable" />,
      <PermissionSubmitButton key="permissionsubmitbutton" />,
      <ContextStateToText key="contextstatetotext" />,
    ]);
  });

  it("passes given value", () => {
    getState().then((state) => {
      assert.deepEqual(state.permissions, [
        "Ver listagem",
        "Ver detalhes",
        "Criar",
        "Editar",
        "Deletar",
      ]);
      assert.deepEqual(state.modules, [
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
      ]);
    });
  });

  it("creates the exact number of permissions in formState", () => {
    getState().then((state) => {
      assert.equal(
        state.formState.length,
        50,
        "state.formState.length equals 50"
      );
    });
  });

  it("changes state on click", () => {
    getState().then((initialState) => {
      cy.get("input[type=checkbox]").first().click({});
      getState().then((newState) => {
        assert.notDeepEqual(initialState, newState);
      });
    });
  });

  it("is consistent accross the application", () => {
    //primeiro vamos bagunçar um bocado os checkboxs
    cy.get("input[type=checkbox]").each((checkbox, index) => {
      if (index % 3) {
        cy.wrap(checkbox).click();
      }
    });
    //agora vamos ver se cada checkbox corresponde ao valor do seu estado no FormContext
    getState().then((state) => {
      state.formState.forEach((permissionObject) => {
        const { submodule, permission, value } = permissionObject;
        if (value) {
          cy.get(`[aria-label='${submodule} ${permission}']`).check();
        } else {
          cy.get(`[aria-label='${submodule} ${permission}']`).uncheck();
        }
      });
    });
  });
});

describe("Modules", () => {
  it("can be Collapsed/Expanded", () => {
    mount(<App />);
    cy.contains("Análise de Contas");
    cy.get("[aria-label='Análise']").find("button").click();
    cy.contains("Análise de Contas").should("not.exist");
    cy.get("[aria-label='Análise']").find("button").click();
    cy.contains("Análise de Transações");
  });

  it("keeps memory of checkboxs state after being collapsed and expanded again", () => {
    mount(<App />);

    cy.get('[aria-label="Cliente Ver listagem"]').check().click().uncheck();
    cy.get("[aria-label='Contas']").find("button").click();
    cy.get('[aria-label="Cliente Ver listagem"]').should("not.exist");
    cy.get("[aria-label='Contas']").find("button").click();
    cy.get('[aria-label="Cliente Ver listagem"]').uncheck();
  });

  it("can change state of its submodules even when collapsed", () => {
    mount(<App />);

    cy.get("[aria-label='Customização']").find("button").click();
    cy.get("[aria-label='Customização Ver detalhes']").click();
    cy.get("[aria-label='Customização']").find("button").click();
    [
      "Limites e horários",
      "Tarifas",
      "Tarifas Personalizadas",
      "Conta",
    ].forEach((submodule) => {
      cy.get(`[aria-label='${submodule} Ver detalhes']`).uncheck();
    });
  });
});

describe("submodules", () => {
  it("permissions affects the state of its parents checkboxs", () => {
    mount(<App />);

    cy.get("[aria-label='Tarifas Deletar']").click();
    cy.get("[aria-label='Customização Deletar']").uncheck();
    cy.get("[aria-label='Todos Deletar']").uncheck();
  });
});
