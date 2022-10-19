import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import "./clientes.css";
import { createCliente, updateCliente } from "../../services/cliente";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { ButtonGroup } from "@mui/material";

const MySwal = withReactContent(Swal);

const defaultValues = {
  nombre: "",
  telefono: "",
  direccion: "",
  email: "",
  fecha_nacimiento: "",
  red_social: "",
};

export default function FormDialog(props) {
  const { open, handleClose, item, edit, rowsdata } = props;

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
    const editData = await updateCliente(data);
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
  };

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
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogTitle className="">{edit ? "Editar Cliente" : "Crear Cliente"}</DialogTitle>
        <DialogContent>
          <Card sx={{ maxWidth: 600 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/*  <Controller
            name="nombre"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextField onChange={onChange} value={value} label={"Nombre"} autoFocus margin="dense" variant="standard" fullWidth/>
            )}
          /> */}

              <Grid container item xs={12} md={12} lg={12} justifyContent="center" alignItems="center">
                <TextField
                  inputProps={register("nombre", {
                    required: "Por favor ingrese un nombre",
                  })}
                  error={errors.nombre}
                  helperText={errors.nombre?.message}
                  autoFocus
                  margin="dense"
                  id="nombre"
                  label="Nombre"
                  type="text"
                  variant="outlined"
                />
              </Grid>

              <Box sx={{ width: "100%" }}>
                <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="space-around">
                  <Grid item xs={6} md={6} lg={6}>
                    <TextField
                      defaultValue=""
                      inputProps={register("telefono", {
                        required: "Por favor ingrese un telefono",
                      })}
                      error={errors.telefono}
                      helperText={errors.telefono?.message}
                      margin="dense"
                      id="telefono"
                      label="Telefono"
                      type="text"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6} md={6} lg={6}>
                    <TextField
                      defaultValue=""
                      inputProps={register("direccion", {
                        required: "Por favor ingrese una direccion",
                      })}
                      error={errors.direccion}
                      helperText={errors.direccion?.message}
                      margin="dense"
                      id="direccion"
                      label="Direccion"
                      type="text"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    defaultValue=""
                    inputProps={register("email", {
                      required: "Por favor ingrese un email",
                    })}
                    error={errors.email}
                    helperText={errors.email?.message}
                    margin="dense"
                    id="email"
                    label="Email"
                    type="text"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>

                <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="space-around">
                  <Grid item xs={6}>
                    <TextField
                      defaultValue=""
                      inputProps={register("fecha_nacimiento", {
                        required: "Por favor ingrese una fecha de nacimiento",
                      })}
                      error={errors.fecha_nacimiento}
                      helperText={errors.fecha_nacimiento?.message}
                      margin="dense"
                      id="fecha_nacimiento"
                      label="Fecha de nacimiento"
                      type="date"
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      defaultValue=""
                      inputProps={register("red_social", {
                        required: "Por favor ingrese una red social",
                      })}
                      error={errors.red_social}
                      helperText={errors.red_social?.message}
                      margin="dense"
                      id="red_social"
                      label="Red social"
                      type="text"
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </Box>

              <ButtonGroup className="flex space-x-4 justify-end">
                <Button onClick={handleClose}>Cancelar</Button>
                <Button type="submit" className="justify-end">
                  {edit ? "Editar" : "Crear"}
                </Button>
              </ButtonGroup>
            </form>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
}
