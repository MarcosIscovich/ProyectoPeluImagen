import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
//import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { createProducto, updateProducto } from "../../services/productos";
import { useEffect, useState } from "react";
import { moment } from "moment";

const MySwal = withReactContent(Swal);

const defaultValues = {
  fecha_concurrencia: "",
  precio: "",
  hora_desde: "",
  hora_hasta: "",
  imagen: "",
  clienteId: "",
  trabajoId: "",
};

export default function FormDialog(props) {
  const { open, closeModal, addTurno, timeText /* , item */ } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  /* useEffect(() => {
    if (item && item.id) {
      reset({ ...item });
    } else {
      reset(defaultValues);
    }
  }, [item, reset]); */

  const onSubmit = (data) => {
    addTurno(data)
    closeModal();
    reset(defaultValues);
    
    /* if (!edit) {
      console.log("entra a save");
      handleDateSelect(data);
      
    } else {
      console.log("entra a edit");
      handleDateSelect(data);
    } */
  };

  return (
    <div>
      <Dialog open={open} onClose={closeModal}>
        {/* <DialogTitle >{edit ? "Editar Producto" : "Crear Producto"}</DialogTitle> */}
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              className="mt-3 mb-3"
              fullWidth
              label="Precio"
              defaultValue=""
              inputProps={register("precio", {
                required: "Please enter nombre",
              })}
              error={errors.nombre}
              helperText={errors.nombre?.message}
            ></TextField>

            <TextField
              className="mt-3 mb-3 w-100 "
              fullWidth
              type="time"
              label="Hora desde"
              value={timeText.substring(0, 5)}
              inputProps={register("hora_desde", {
                required: "Please enter descripcion",
              })}
              error={errors.descripcion}
              helperText={errors.descripcion?.message}
              readOnly
            ></TextField>

            <Button type="submit" className="bg-red-900 justify-content-center">
              {/* {edit ? "Editar" : "Crear"} */}Guardar
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
