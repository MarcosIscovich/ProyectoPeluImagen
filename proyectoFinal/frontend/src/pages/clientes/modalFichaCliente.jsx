import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { updateCliente } from "../../services/cliente";
import { Box } from "@mui/system";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Modal } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { Stack } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

const MySwal = withReactContent(Swal);

const defaultValues = {
  nombre: "",
  ocupacion: "",
  tipo_cabello: "",
  estado_cabello: "",
  formula: "",
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

export default function FormDialog(props) {
  const { openFicha, handleCloseFicha, rowsdata, item } = props;
  const [editFicha, setEditFicha] = useState(false);

  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues });

  useEffect(() => {
    // console.log("idCliente", idCliente);
    if (item && item.id) {
      reset({ ...item });
    } else {
      reset(defaultValues);
    }
  }, [item, reset]);

  const editData = async (data) => {
    const editData = await updateCliente(data);
    if (editData.ok) {
      handleCloseFicha();
      MySwal.fire({
        title: "Ficha editada",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        reset(editData);
        rowsdata();
        setEditFicha(false);
      });
    } else {
      MySwal.fire({
        title: "Error",
        text: "No se pudo editar la ficha",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleEditFicha = () => {
    console.log("editFicha", editFicha);
    setEditFicha(true);
    console.log("editFicha", editFicha);
  };

  const onSubmit = (data) => {
    console.log("FICHA", data);
    editData(data);
  };

  return (
    <div>
      <Modal
        open={openFicha}
        onClose={handleCloseFicha}
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
              color: "black",
              textAlign: "center",
              marginTop: 2,
              marginBottom: 2,
              backgroundColor: "primary.main",
              borderRadius: 1,
              padding: 1,
            }}
            /*<CardMedia 
            component="img"
            height="140"
            image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
            alt="green iguana" /> */
          >
             {item.nombre}
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
                    boxShadow: 3,
                  }}
                >
                  <Controller
                    name="ocupacion"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        sx={{
                          width: 200,
                          maxWidth: 200,
                          minWidth: 200,
                          backgroundColor: "purple.main",
                          borderRadius: 2,
                        }}
                        name="ocupacion"
                        error={errors.ocupacion}
                        disabled={editFicha ? false : true}
                        autoFocus
                        margin="dense"
                        id="ocupacion"
                        label="Ocupacion"
                        type="text"
                        variant="filled"
                        color="warning"
                      />
                    )}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    p: 1,
                    m: 1,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    boxShadow: 3,
                  }}
                >
                  <Controller
                    name="tipo_cabello"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        sx={{
                          width: 200,
                          maxWidth: 200,
                          minWidth: 200,
                          backgroundColor: "#efb7f7",
                          borderRadius: 2,
                          borderColor: "border.color",
                        }}
                        disabled={editFicha ? false : true}
                        error={errors.tipo_cabello}
                        label="Tipo de Cabello"
                        color="secondary"
                        margin="dense"
                        id="tipo_cabello"
                        type="text"
                        variant="filled"
                      />
                    )}
                  />
                  <Controller
                    name="estado_cabello"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        sx={{
                          width: 200,
                          maxWidth: 200,
                          minWidth: 200,
                          backgroundColor: "#efb7f7",
                          borderRadius: 2,
                          boxShadow: 3,
                        }}
                        error={errors.estado_cabello}
                        disabled={editFicha ? false : true}
                        margin="dense"
                        id="estado_cabello"
                        label="Estado del Cabello"
                        type="text"
                        variant="filled"
                      />
                    )}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    p: 1,
                    m: 1,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    boxShadow: 3,
                  }}
                >
                  <Controller
                    name="formula"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextareaAutosize
                        {...field}
                        aria-label="empty textarea"
                        placeholder="Formula"
                        style={{
                          width: 500,
                          height: 100,
                          fontSize: 20,
                          backgroundColor: "#efb7f7",
                          borderRadius: 5,
                          boxShadow: 3,
                        }}
                        error={errors.formula}
                        disabled={editFicha ? false : true}
                      />
                    )}
                  />
                </Box>
                <Stack
                  sx={{
                    display: "flex-row",
                    justifyContent: "end",
                    alignItems: "end",
                    marginTop: 1,
                    marginBottom: 1,
                  }}
                  direction="row"
                  spacing={2}
                >
                  <Button
                    variant="contained"
                    color="error"
                    component="label"
                    sx={{
                      marginTop: 2,
                      color: "black",
                      backgroundColor: "#BE7DC0",
                      borderRadius: 2,
                      width: 100,
                      height: 40,
                      fontSize: 14,
                      fontWeight: "bold",
                      fontFamily: "Roboto",
                    }}
                    onClick={handleCloseFicha}
                  >
                    Cancelar
                  </Button>

                  {editFicha ? (
                    <Button
                      variant="contained"
                      color="success"
                      sx={{
                        marginTop: 2,
                        color: "black",
                        backgroundColor: "#BE7DC0",
                        borderRadius: 1,
                        width: 100,
                        height: 40,
                        fontSize: 14,
                        fontWeight: "bold",
                        fontFamily: "Roboto",
                      }}
                      type="submit"
                    >
                      Guardar
                    </Button>
                  ) : null}

                  {editFicha ? null : (
                    <Button
                      variant="contained"
                      color="success"
                      onClick={handleEditFicha}
                      sx={{
                        marginTop: 2,
                        color: "black",
                        backgroundColor: "#BE7DC0",
                        borderRadius: 1,
                        width: 100,
                        height: 40,
                        fontSize: 12,
                        fontWeight: "bold",
                        fontFamily: "Roboto",
                      }}
                    >
                      Editar Ficha
                    </Button>
                  )}
                </Stack>
              </form>
            </ThemeProvider>
          </CardContent>

          {/*  <CardActions>
      
        <Button size="small">Ver servicios realizados</Button>
      </CardActions> */}
        </Card>
      </Modal>
    </div>
  );
}
