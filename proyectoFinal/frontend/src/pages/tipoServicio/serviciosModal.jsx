import * as React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { createTrabajo, updateTrabajo } from "../../services/servicios";
import { purple } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { Modal } from "@mui/material";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Stack } from "@mui/system";
import TextFieldForms from "../../components/textFieldForms";
import ButtonPurple from "../../components/ButtonPurple";

const MySwal = withReactContent(Swal);

const defaultValues = {
  nombre: "",
  duracion: "",
  precio: "",
  cantTrabajadores: "",
  tiposervicioId: "",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  border: {
    color: "black",
  },
  palette: {
    primary: {
      main: "#0971f1",
      darker: "#053e85",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
    purple: {
      main: "#efb7f7",
    },
  },
});

export default function FormDialog(props) {
  const { open, handleClose, item, edit, rowsdata, tipoServicio } = props;

  const {
    reset,
    handleSubmit,
    control,
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
    data.tiposervicioId = tipoServicio;
    const editData = await updateTrabajo(data);
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
  };

  const saveTrabajo = async (data) => {
    data.tiposervicioId = tipoServicio;
    console.log(data);
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
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        sx={{
          border: "2px solid #000",
          boxShadow: 24,
          pt: 2,
          px: 4,
          pb: 3,
        }}
      >
        <Card sx={{ ...style, width: 600, maxWidth: 600 }}>
          <Typography
            sx={{
              fontSize: 30,
              fontWeight: "bold",
              fontFamily: "Roboto",
              color: "white",
              textAlign: "center",
              marginTop: 2,
              marginBottom: 2,
              backgroundColor: purple[700],
              borderRadius: 1,
              padding: 1,
            }}

            /*<CardMedia 
            component="img"
            height="140"
            image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
            alt="green iguana" /> */
          >
            {edit ? "Editar Servicio" : "Agendar Nuevo Servicio"}
          </Typography>

          <CardContent>
            <ThemeProvider theme={theme}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    p: 1,
                    m: 1,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    boxShadow: 6,
                  }}
                >
                  <Grid container direction="row" item rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6} md={6} lg={6}>
                      <strong
                        style={{
                          color: purple[700],
                          fontSize: 20,
                          fontWeight: "bold",
                          fontFamily: "Roboto",
                          textAlign: "center",
                          marginTop: 2,
                          marginBottom: 2,
                          boxShadow: 6,
                        }}
                      >
                        Nombre:
                      </strong>
                      <Controller
                        name="nombre"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <TextFieldForms
                            {...field}
                            sx={{
                              borderRadius: 2,
                              boxShadow: 6,
                            }}
                            margin="dense"
                            id="nombre"
                            type="text"
                            placeholder="Nombre"
                          />
                        )}
                      />
                      {errors.nombre && <span style={{ color: "red" }}>Este campo es requerido</span>}
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                      <strong
                        style={{
                          color: purple[700],
                          fontSize: 20,
                          fontWeight: "bold",
                          fontFamily: "Roboto",
                          textAlign: "center",
                          marginTop: 2,
                          marginBottom: 2,
                          boxShadow: 6,
                        }}
                      >
                        Duracion:
                      </strong>
                      <Controller
                        name="duracion"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <TextFieldForms
                            {...field}
                            sx={{
                              borderRadius: 2,
                              boxShadow: 6,
                            }}
                            id="duracion"
                            type="text"
                            placeholder="Duracion"
                          />
                        )}
                      />
                      {errors.duracion && <span style={{ color: "red" }}>Este campo es requerido</span>}
                    </Grid>
                  </Grid>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    p: 1,
                    m: 1,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    boxShadow: 6,
                  }}
                >
                  <Grid container direction="row" item rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6} md={6} lg={6}>
                      <strong
                        style={{
                          color: purple[700],
                          fontSize: 20,
                          fontWeight: "bold",
                          fontFamily: "Roboto",
                          textAlign: "center",
                          marginTop: 2,
                          marginBottom: 2,
                          boxShadow: 6,
                        }}
                      >
                        Precio:
                      </strong>
                      <Controller
                        name="precio"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <TextFieldForms
                            {...field}
                            sx={{
                              borderRadius: 2,
                              boxShadow: 6,
                            }}
                            margin="dense"
                            id="precio"
                            type="text"
                            placeholder="Precio"
                          />
                        )}
                      />
                      {errors.precio && <span style={{ color: "red" }}>Este campo es requerido</span>}
                    </Grid>
                    {/* <Grid item xs={6} md={6} lg={6}>
                      <strong
                        style={{
                          color: purple[700],
                          fontSize: 20,
                          fontWeight: "bold",
                          fontFamily: "Roboto",
                          textAlign: "center",
                          marginTop: 2,
                          marginBottom: 2,
                          boxShadow: 6,
                        }}
                      >
                        Cantidad de Trabajadores:{" "}
                      </strong>
                      <Controller
                        name="cantTrabajadores"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <TextFieldForms
                            {...field}
                            sx={{
                              borderRadius: 2,
                              boxShadow: 6,
                            }}
                            id="cantTrabajadores"
                            type="text"
                            placeholder="cantTrabajadores"
                          />
                        )}
                      />
                      {errors.cantTrabajadores && <span style={{ color: "red" }}>Este campo es requerido</span>}
                    </Grid>*/}
                  </Grid> 
                </Box>

                <Stack
                  sx={{
                    display: "flex-row",
                    justifyContent: "end",
                    alignItems: "end",
                    marginTop: 5,
                    marginBottom: 0,
                  }}
                  direction="row"
                  spacing={2}
                >
                  <ButtonPurple onClick={handleClose} variant="outlined">
                    Cancelar
                  </ButtonPurple>
                  <ButtonPurple type="submit" variant="outlined">
                    {edit ? "Editar" : "Crear"}
                  </ButtonPurple>
                </Stack>
              </form>
            </ThemeProvider>
          </CardContent>

          {/*  <CardActions>
      
        <Button size="small">Ver servicios realizados</Button>
      </CardActions> */}
        </Card>
      </Modal>

      {/* <Dialog open={open} onClose={handleClose}>
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

      </Dialog> */}
    </>
  );
}
