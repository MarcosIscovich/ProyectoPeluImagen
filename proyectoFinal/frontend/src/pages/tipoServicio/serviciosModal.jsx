import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useForm  } from "react-hook-form";
import { useEffect } from "react";
import { createTrabajo, updateTrabajo } from "../../services/servicios";

const MySwal = withReactContent(Swal);

const defaultValues= {
    nombre:  "" ,
    duracion: "",
    precio: "",
    cantTrabajadores: "",
    tiposervicioId: "",
  }

export default function FormDialog(props) {
  const { open, handleClose, item, edit, rowsdata , tipoServicio } = props;  

  const {reset, register, handleSubmit, formState: {errors}} = useForm({defaultValues});


 useEffect(() => {
    if (item && item.id) {
      reset({...item})
    } else {
      reset(defaultValues)
    }
  }, [item, reset]); 



  const editData = async  (data) => {
    data.tiposervicioId = tipoServicio;
    const editData = await updateTrabajo(data)
    handleClose();
    MySwal.fire({
      title: "Servicio guardado",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    }).then((result) => {
      reset(editData);
      rowsdata();
    });
  }

  const saveTrabajo = async (data) => {
    data.tiposervicioId = tipoServicio;
    console.log(data)
    const save = await createTrabajo(data);
    handleClose();
    MySwal.fire({
      title: "SERVICIO Guardado",
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
      saveTrabajo(data);
      
    } else {
      console.log("entra a edit");
      editData(data);
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle className="italic hover:not-italic">{edit ? "Editar Servicio" : "Crear Servicio"}</DialogTitle>
        <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>

               <TextField
              
              inputProps={register( "nombre", {
                required: "Please enter nombre",
              })}
              error={errors.nombre}
              helperText={errors.nombre?.message}
                autoFocus
                margin="dense"
                id="nombre"
                label="Nombre"
                type="text"
                fullWidth
                variant="standard"
              />
            
              <TextField
              defaultValue=""
              inputProps={register( "duracion", {
                required: "Please enter duracion",
              })}
              error={errors.duracion}
              helperText={errors.duracion?.message}
                
                margin="dense"
                id="duracion"
                label="Duración"
                type="text"
                fullWidth
                variant="standard"
              />
            
              <TextField
              defaultValue=""
              inputProps={register( "precio", {
                required: "Please enter precio",
              })}
              error={errors.precio}
              helperText={errors.precio?.message}
                
                margin="dense"
                id="precio"
                label="Precio"
                type="text"
                fullWidth
                variant="standard"
              />
          
              <TextField
              defaultValue=""
              inputProps={register( "cantTrabajadores", {
                required: "Please enter Cantidad de Trabajadores",
              })}
              error={errors.cantTrabajadores}
              helperText={errors.cantTrabajadores?.message}
                
                margin="dense"
                id="cantTrabajadores"
                label="Cantidad de Trabajadores"
                type="text"
                fullWidth
                variant="standard"
              />

              

            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="submit" className="bg-red-900 ">
              {edit ? "Guardar" : "Crear"}
            </Button>

          </form>
        </DialogContent>

      </Dialog>
    </div>
  );
}
