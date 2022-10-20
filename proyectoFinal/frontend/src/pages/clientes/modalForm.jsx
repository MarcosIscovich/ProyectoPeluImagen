import * as React from "react";
import Button from "@mui/material/Button";
import "./clientes.css";
import { createCliente, updateCliente } from "../../services/cliente";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { purple } from "@mui/material/colors";
import { Modal } from "@mui/material";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Stack } from "@mui/system";
import TextFieldForms from "../../components/textFieldForms"


const MySwal = withReactContent(Swal);

const defaultValues = {
  nombre: "",
  telefono: "",
  direccion: "",
  email: "",
  fecha_nacimiento: "",
  red_social: "",
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

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: purple[700],
  },
}));



export default function FormDialog(props) {
  const { open, handleClose, item, edit, rowsdata } = props;

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
            {edit ? "Editar Cliente" : "Agendar Nuevo Cliente"}
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
                    borderRadius: 1,
                    boxShadow: 6,
                  }}
                >
                  <Grid container direction="column" item xs={12} md={12} lg={12} justifyContent="center" alignItems="center">
                    <span
                      style={{
                        color: purple[700],
                        fontSize: 20,
                        fontWeight: "bold",
                        fontFamily: "Roboto",
                        textAlign: "center",
                        marginTop: 2,
                        marginBottom: 2,
                      }}
                    >
                      Nombre:
                    </span>
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
                          name="nombre"
                          id="nombre"
                          type="text"
                          placeholder="Nombre"                                                    
                        />
                      )}
                    />
                    {errors.nombre && <span style={{ color:"red" }}>Este campo es requerido</span>}
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
                  <Grid
                    container
                    direction="row"
                    item
                    rowSpacing={2}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    
                  >
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
                        Telefono:
                      </strong>
                      <Controller
                        name="telefono"
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
                            id="telefono"
                            type="text"
                            placeholder="Telefono"                            
                          />
                        )}
                      />
                      {errors.telefono && <span style={{ color:"red" }}>Este campo es requerido</span>}
                    </Grid>
                    <Grid item xs={6} md={6} lg={6} >
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
                        Direccion:{" "}
                      </strong>
                      <Controller
                        name="direccion"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <TextFieldForms
                            {...field}
                            sx={{
                              borderRadius: 2,
                              boxShadow: 6,
                            }}                            
                            id="direccion"                            
                            type="text"
                            placeholder="Direccion"
                          />
                        )}
                      />
                      {errors.direccion && <span style={{ color:"red" }}>Este campo es requerido</span>}
                    </Grid>
                  </Grid>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    p: 1,
                    m: 1,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    boxShadow: 6,
                  }}
                >
                  <Grid container direction="column" item xs={12} justifyContent="center" alignItems="center">
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
                      E-mail:
                    </strong>
                    <Controller
                      name="email"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <TextFieldForms
                          {...field}
                          placeholder="E-mail"
                          type="text"
                          style={{
                            width: 450,                            
                            borderRadius: 5,
                            boxShadow: 6,
                          }}
                          id="email"
                        />
                      )}
                    />
                    {errors.email && <span style={{ color:"red" }}>Este campo es requerido</span>}
                  </Grid>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    p: 1,
                    m: 1,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    boxShadow: 6,
                  }}
                >
                  <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="space-around">
                    <Grid item xs={6}>
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
                        Fecha de Nacimiento:
                      </strong>
                      <Controller
                        name="fecha_nacimiento"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <TextFieldForms
                            {...field}
                            sx={{
                              width: 210,
                              borderRadius: 2,
                              boxShadow: 6,
                            }}                            
                            id="fecha_nacimiento"
                            type="date"                            
                          />
                        )}
                      />
                      {errors.fecha_nacimiento && <span style={{ color:"red" }}>Este campo es requerido</span>}
                    </Grid>
                    <Grid item xs={6}>
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
                        Red Social:
                      </strong>
                      <Controller
                        name="red_social"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <TextFieldForms
                            {...field}
                            sx={{                              
                              borderRadius: 2,
                              boxShadow: 6,
                            }}                            
                            id="red_social"                            
                            type="text"
                            placeholder="Red Social"                            
                          />
                        )}
                      />
                      {errors.red_social && <span style={{ color:"red" }}>Este campo es requerido</span>}
                    </Grid>
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
                  <ColorButton onClick={handleClose} variant="outlined">
                    Cancelar
                  </ColorButton>
                  <ColorButton type="submit" variant="outlined">
                    {edit ? "Editar" : "Crear"}
                  </ColorButton>
                </Stack>
              </form>
            </ThemeProvider>
          </CardContent>

          {/*  <CardActions>
      
        <Button size="small">Ver servicios realizados</Button>
      </CardActions> */}
        </Card>
      </Modal>

      
    </>
  );
}
