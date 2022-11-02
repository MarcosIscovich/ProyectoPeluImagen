import * as React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { updateCliente } from "../../services/cliente";
import { Box , Stack} from "@mui/system";
import {Card , CardContent, Modal, Grid , TextareaAutosize , Typography , createTheme, ThemeProvider} from "@mui/material";
import { purple } from "@mui/material/colors";
import TextFieldForms from "../../components/textFieldForms";
import ButtonPurple from "../../components/ButtonPurple";

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
    <>
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
              color: "white",
              textAlign: "center",
              marginTop: 2,
              marginBottom: 2,
              backgroundColor: purple[700],
              borderRadius: 1,
              boxShadow: "0 0 10px 0 rgba(150, 27, 235, 0.8)",
              padding: 1,
            }}
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
                      Ocupacion:
                    </span>
                    <Controller
                      name="ocupacion"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <TextFieldForms
                          {...field}
                          sx={{
                            borderRadius: 2,
                            boxShadow: 6,
                          }}
                          name="ocupacion"
                          id="ocupacion"
                          type="text"
                          placeholder="Ocupacion"
                          disabled={!editFicha}
                        />
                      )}
                    />
                    {errors.ocupacion && <span style={{ color: "red" }}>Este campo es requerido</span>}
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
                        Estado del cabello:
                      </strong>
                      <Controller
                        name="estado_cabello"
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
                            id="estado_cabello"
                            type="text"
                            placeholder="Estado Cabello"
                            disabled={!editFicha}
                          />
                        )}
                      />
                      {errors.estado_cabello && <span style={{ color: "red" }}>Este campo es requerido</span>}
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
                        Tipo de cabello:
                      </strong>
                      <Controller
                        name="tipo_cabello"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <TextFieldForms
                            {...field}
                            sx={{
                              borderRadius: 2,
                              boxShadow: 6,
                            }}
                            id="tipo_cabello"
                            type="text"
                            placeholder="Tipo Cabello"
                            disabled={!editFicha}
                          />
                        )}
                      />
                      {errors.tipo_cabello && <span style={{ color: "red" }}>Este campo es requerido</span>}
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
                      Formula:
                    </span>
                    <Controller
                      name="formula"
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
                          name="formula"
                          id="formula"
                          placeholder="Formula"
                          disabled={!editFicha}
                        />
                      )}
                    />

                    {errors.formula && <span style={{ color: "red" }}>Este campo es requerido</span>}
                  </Grid>
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
                  <ButtonPurple variant="contained" color="error" component="label" onClick={handleCloseFicha}>
                    Cancelar
                  </ButtonPurple>

                  {editFicha ? (
                    <ButtonPurple variant="contained" color="success" type="submit">
                      Guardar
                    </ButtonPurple>
                  ) : null}

                  {editFicha ? null : (
                    <ButtonPurple variant="contained" color="success" onClick={handleEditFicha}>
                      Editar Ficha
                    </ButtonPurple>
                  )}
                </Stack>
              </form>
            </ThemeProvider>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
}
