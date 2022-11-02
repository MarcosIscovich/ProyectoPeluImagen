import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { createProducto, updateProducto } from "../../services/productos";
import { useEffect } from "react";
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
import TextareaAutosize from "@mui/material/TextareaAutosize";

const MySwal = withReactContent(Swal);

const defaultValues = {
  nombre: "",
  descripcion: "",
  stock: "",
  precio: "",
  imagen: "",
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
  const { open, handleClose, item, edit, rowsdata } = props;
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const saveProduct = async (data) => {
    const save = await createProducto(data);
    handleClose();
    MySwal.fire({
      title: "Producto creado",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    }).then((result) => {
      reset(save);
      rowsdata();
    });
  };

  const editData = async (data) => {
    const editData = await updateProducto(data);
    handleClose();
    MySwal.fire({
      title: "Producto editado",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    }).then((result) => {
      reset(editData);
      rowsdata();
    });
  };

  useEffect(() => {
    if (item && item.id) {
      reset({ ...item });
    } else {
      reset(defaultValues);
    }
  }, [item, reset]);

  const onSubmit = (data) => {
    if (!edit) {
      console.log("entra a save");
      saveProduct(data);
    } else {
      console.log("entra a edit");
      editData(data);
    }
  };

  /*   setValue("id", item.id);
  setValue("nombre", item.nombre);
  setValue("descripcion", item.descripcion);
  setValue("stock", item.stock);
  setValue("precio", item.precio);
  setValue("imagen", item.imagen); */

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
            {edit ? "Editar Producto" : "Agregar Nuevo Producto"}
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
                    {errors.nombre && <span style={{ color: "red" }}>Este campo es requerido</span>}
                  </Grid>
                </Box>

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
                      Descripcion:
                    </span>
                    <Controller
                      name="descripcion"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <TextareaAutosize
                          {...field}
                          style={{
                            width: "90%",
                            height: "100px",
                            borderRadius: 5,
                            boxShadow: 6,
                            borderColor: purple[700],
                          }}
                          name="descripcion"
                          id="descripcion"
                          placeholder="Descripcion"
                        />
                      )}
                    />
                    
                    {errors.descripcion && <span style={{ color: "red" }}>Este campo es requerido</span>}
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
                        Stock:
                      </strong>
                      <Controller
                        name="stock"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <TextFieldForms
                            {...field}
                            sx={{
                              borderRadius: 2,
                              boxShadow: 6,
                            }}
                            id="stock"
                            type="text"
                            placeholder="Stock"
                          />
                        )}
                      />
                      {errors.stock && <span style={{ color: "red" }}>Este campo es requerido</span>}
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
                      Imagen:
                    </span>
                    <Controller
                      name="imagen"
                      control={control}
                      //rules={{ required: true }}
                      render={({ field }) => (
                        <TextFieldForms
                          {...field}
                          sx={{
                            borderRadius: 2,
                            boxShadow: 6,
                          }}
                          name="imagen"
                          id="imagen"
                          type="file"
                          placeholder="Imagen"
                        />
                      )}
                    />
                    {errors.imagen && <span style={{ color: "red" }}>Este campo es requerido</span>}
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
        <DialogTitle >{edit ? "Editar Producto" : "Crear Producto"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              className="mt-3 mb-3"
              fullWidth
              label="Nombre"                           
              defaultValue=""
              inputProps={register( "nombre", {
                required: "Please enter nombre",
              })}
              error={errors.nombre}
              helperText={errors.nombre?.message}
              ></TextField>

            <TextField
              className="mt-3 mb-3 w-100 "
              fullWidth
              label="Descripcion"
              defaultValue=""
              inputProps={register("descripcion", {
                required: "Please enter descripcion",
              })}
              
              error={errors.descripcion}
              helperText={errors.descripcion?.message}
            ></TextField>

            <TextField
              className="mt-3 mb-3 w-100 "
              fullWidth
              label="Stock"
              defaultValue=""
              inputProps={register("stock", {
                required: "Please enter stock",
              })}
              error={errors.stock}
              helperText={errors.stock?.message}
            ></TextField>

            <TextField
              className="mt-3 mb-3 w-100 "
              fullWidth
              label="Precio"
              defaultValue=""
              inputProps={register("precio", {
                required: "Please enter precio",
              })}
              error={errors.precio}
              helperText={errors.precio?.message}
            ></TextField>

            <TextField
              className="mt-3 mb-3 w-100 "
              fullWidth
              type={"file"}
              label="Imagen"              
              defaultValue=""
              inputProps={register("imagen")}
            ></TextField>

            <Button type="submit" className="bg-red-900 justify-content-center">
              {edit ? "Editar" : "Crear"}
            </Button>
          </form>
        </DialogContent>
      </Dialog> */}
    </>
  );
}
