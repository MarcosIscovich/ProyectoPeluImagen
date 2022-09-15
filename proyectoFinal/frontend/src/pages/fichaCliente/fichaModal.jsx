import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { createFicha, updateFicha } from "../../services/fichaCliente";


const MySwal = withReactContent(Swal);

const defaultValues = {
  ocupacion: "",
  tipo_cabello: "",
  estado_cabello: "",
  formula: "",
 
};

export default function FormDialog(props) {
  const {
    open,
    handleClose,
    item,
    edit,
    rowsdata,
    clienteSelected,
  } = props;

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  useEffect(() => {
    if (item && item.id) {
      reset({ ...item });
    } else {
      reset(defaultValues);
    }
  }, [item, reset]);

  const editData = async (data) => {
    
    const editData = await updateFicha(data);
    handleClose();
    MySwal.fire({
      title: "Ficha Editada",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    }).then((result) => {
      reset(editData);
      rowsdata();
    });
  };

  const saveFicha = async (data) => {
    data.clienteId = clienteSelected.id;
    console.log("DATA", data);
    const save = await createFicha(data);     
    handleClose();
    MySwal.fire({
      title: "Ficha Guardada",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    }).then((result) => {
      reset(save);
      rowsdata();
    });
  };

  const onSubmit = (data) => {
    if (!edit) {
      console.log("entra a save");
      saveFicha(data);
    } else {
      console.log("entra a edit");
      editData(data);
    } 
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="italic hover:not-italic">
          {edit
            ? "Editar Servicio"
            : `Agregar Ficha a ${clienteSelected.nombre}`}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              inputProps={register("ocupacion", {
                required: "Please enter ocupacion",
              })}
              error={errors.ocupacion}
              helperText={errors.ocupacion?.message}
              autoFocus
              margin="dense"
              id="ocupacion"
              label="Ocupacion"
              type="text"
              fullWidth
              variant="standard"
            />

            <TextField
              defaultValue=""
              inputProps={register("tipo_cabello", {
                required: "Please enter tipo_cabello",
              })}
              error={errors.tipo_cabello}
              helperText={errors.tipo_cabello?.message}
              margin="dense"
              id="tipo_cabello"
              label="Tipo de Cabello"
              type="text"
              fullWidth
              variant="standard"
            />

            <TextField
              defaultValue=""
              inputProps={register("estado_cabello", {
                required: "Please enter estado_cabello",
              })}
              error={errors.estado_cabello}
              helperText={errors.estado_cabello?.message}
              margin="dense"
              id="estado_cabello"
              label="Estado del Cabello"
              type="text"
              fullWidth
              variant="standard"
            />

            <TextField
              aria-label="minimum height"
              multiline
              style={{ width: "100%", marginTop: "10px" }}
              placeholder="Formula"
              defaultValue=""
              inputProps={register("formula", {
                required: "Please enter formula",
              })}
              error={errors.formula}
              helperText={errors.formula?.message}
              margin="dense"
              id="formula"
              variant="standard"
            />

            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="submit" className="bg-red-900 ">
              {edit ? "Editar" : "Crear"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
