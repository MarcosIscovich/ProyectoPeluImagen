import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle";
import "./clientes.css";
import { createCliente , updateCliente } from "../../services/cliente";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useForm  } from "react-hook-form";
import { useEffect } from "react";

const MySwal = withReactContent(Swal);

const defaultValues= {
    nombre:  "" ,
    telefono: "",
    direccion: "",
    email: "",
    fecha_nacimiento: "",
    red_social: "",
  }

export default function FormDialog(props) {
  const { open, handleClose, item, edit, rowsdata } = props;  

  const {reset, register, handleSubmit, formState: {errors}} = useForm({defaultValues});


 useEffect(() => {
    if (item && item.id) {
      reset({...item})
    } else {
      reset(defaultValues)
    }
  }, [item, reset]); 



  const editData = async  (data) => {
    const editData = await updateCliente(data)
    handleClose();
    MySwal.fire({
      title: "Cliente Editado",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    }).then((result) => {
      reset(editData);
      rowsdata();
    });
  }

  const saveCliente = async (data) => {
    const save = await createCliente(data);
    handleClose();
    MySwal.fire({
      title: "Cliente Guardado",
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
      saveCliente(data);
      
    } else {
      console.log("entra a edit");
      editData(data);
    }
  };


   /*setValue("id", item.id);
  setValue("nombre", item.nombre);
  setValue("telefono", item.telefono);
  setValue("direccion", item.direccion);
  setValue("email", item.email);
  setValue("fecha_nacimiento", item.fecha_nacimiento);
  setValue("red_social", item.red_social); */


  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{edit ? "Editar Cliente" : "Crear Cliente"}</DialogTitle>
        <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>


         {/*  <Controller
            name="nombre"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextField onChange={onChange} value={value} label={"Nombre"} autoFocus margin="dense" variant="standard" fullWidth/>
            )}
          /> */}

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
              inputProps={register( "telefono", {
                required: "Please enter telefono",
              })}
              error={errors.telefono}
              helperText={errors.telefono?.message}
                
                margin="dense"
                id="telefono"
                label="Telefono"
                type="text"
                fullWidth
                variant="standard"
              />
            
              <TextField
              defaultValue=""
              inputProps={register( "direccion", {
                required: "Please enter direccion",
              })}
              error={errors.direccion}
              helperText={errors.direccion?.message}
                
                margin="dense"
                id="direccion"
                label="Direccion"
                type="text"
                fullWidth
                variant="standard"
              />
          
              <TextField
              defaultValue=""
              inputProps={register( "email", {
                required: "Please enter email",
              })}
              error={errors.email}
              helperText={errors.email?.message}
                
                margin="dense"
                id="email"
                label="Email"
                type="text"
                fullWidth
                variant="standard"
              />

              <TextField
              defaultValue=""
              inputProps={register( "fecha_nacimiento", {
                required: "Please enter fecha_nacimiento",
              })}
              error={errors.fecha_nacimiento}
              helperText={errors.fecha_nacimiento?.message}
                
                margin="dense"
                id="fecha_nacimiento"
                label="Fecha de nacimiento"
                type="date"
                fullWidth
                variant="standard"
              />

              <TextField
              defaultValue=""
              inputProps={register( "red_social", {
                required: "Please enter red_social",
              })}
              error={errors.red_social}
              helperText={errors.red_social?.message}
                
                margin="dense"
                id="red_social"
                label="Red social"
                type="text"
                fullWidth
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
