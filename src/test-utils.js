import * as React from "react";
import {} from "module";
import { FormContextProvider } from "./contexts/FormContext";
import { mount } from "@cypress/react";

export const mountFormContextWith = (elements) => {
  mount(
    <FormContextProvider>
      {elements.map((Element, index) => {
        return Element;
      })}
    </FormContextProvider>
  );
};
