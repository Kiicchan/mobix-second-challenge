import { Button } from "@mui/material";
import { useContext } from "react";
import FormContext from "../../contexts/FormContext";

export default function SubmitButton() {
  const { state } = useContext(FormContext);
  const { formState } = state;
  const handleSubmit = () => {
    let permissionList;
    permissionList = formState
      .filter((element) => {
        return element.value;
      })
      .map((element) => {
        return `${element.permission} em ${element.submodule}`;
      });
    console.log(permissionList);
  };
  return (
    <Button variant="contained" onClick={handleSubmit} sx={{ borderRadius: 5 }}>
      CADASTRAR
    </Button>
  );
}
