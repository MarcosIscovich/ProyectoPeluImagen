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
import { alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { purple } from "@mui/material/colors";

const MySwal = withReactContent(Swal);

const defaultValues = {
  nombre: "",
  telefono: "",
  direccion: "",
  email: "",
  fecha_nacimiento: "",
  red_social: "",
};
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "background-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: purple[700],
      borderColor: purple[700],
    },
  },
}));

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
          <Card sx={{ maxWidth: 800 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/*  <Controller
            name="nombre"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextField onChange={onChange} value={value} label={"Nombre"} autoFocus margin="dense" variant="standard" fullWidth/>
            )}
          /> */}
              <Box>
                <Grid container direction="column" item xs={12} md={12} lg={12} justifyContent="center" alignItems="center">
                  <strong>Nombre: </strong>
                  <BootstrapInput
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
                    placeholder="Nombre"
                  />
                </Grid>

                <Grid container direction="row" rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="space-evenly">
                  <Grid item xs={6} md={6} lg={6}>
                    <strong>Telefono:</strong>
                    <BootstrapInput
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
                      placeholder="Telefono"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6} md={6} lg={6}>
                    <strong>Direccion:</strong>
                    <BootstrapInput
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
                      placeholder="Direccion"
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <Grid container direction="column" item xs={12} justifyContent="center" alignItems="center">
                  <strong>Email:</strong>

                  <BootstrapInput
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
                    variant="outlined"
                    placeholder="Email"
                  />
                </Grid>

                <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="space-around">
                  <Grid item xs={6}>
                    <strong>Fecha de Nacimiento:</strong>
                    <BootstrapInput
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
                      placeholder="Fecha de nacimiento"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <strong>Red Social:</strong>
                    <BootstrapInput
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
                      placeholder="Red social"
                    />
                  </Grid>
                </Grid>
              </Box>

              <Grid container direction="column" item xs={12} md={12} lg={12} margin="10px" justifyContent="center" alignItems="center">
                <Grid item xs={12} >
                  <ColorButton onClick={handleClose} variant="outlined">
                    Cancelar
                  </ColorButton>
                  <ColorButton type="submit" variant="outlined">
                    {edit ? "Editar" : "Crear"}
                  </ColorButton>
                </Grid>                
              </Grid>
            </form>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
}
