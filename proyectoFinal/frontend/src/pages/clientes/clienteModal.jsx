import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { getTurno } from "../../services/turnos";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Logo2 from "../../images/logo2.jpg";
import Grid from "@mui/material/Grid";
import { purple } from "@mui/material/colors";
import ButtonPurple from "../../components/ButtonPurple";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import translate from "../../components/Translate/translate.json";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "100%",
}));

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

export default function NestedModal(props) {
  const { openCard, handleCloseCard, item } = props;
  const [openModal2, setOpenModal2] = React.useState(false);
  const [turnoCliente, setTurnoCliente] = React.useState([]);

  const handleOpenModal2 = async () => {
    console.log("handleOpenModal2", item.id);
    const turnosCliente = await getTurno(item.id);

    console.log("turnosCliente", turnosCliente.data);

    let allTurnos = turnosCliente.data.map((turno) => {
      return {
        id: turno.clienteId,
        fecha_concurrencia: moment(turno.fecha_concurrencia).format("DD/MM/YYYY"),
        servicio_realizado: turno.trabajo.nombre,
        precio: "$" + turno.trabajo.precio,
      };
    });
    setTurnoCliente(allTurnos);
    console.log("turnosCliente OPEN MODAL", allTurnos);
    setOpenModal2(true);
  };
  const handleCloseModal2 = () => setOpenModal2(false);

  const columns = [
    /* { field: "id", headerName: "ID", width: 70 }, */
    {
      field: "fecha_concurrencia",
      headerName: "Fecha de Concurrencia",
      flex: 1,
      headerAlign: "center",
      align: "center",

      renderHeader: (params) => (
        <Box>
          <strong>{params.colDef.headerName}</strong>
        </Box>
      ),
    },
    {
      field: "servicio_realizado",
      headerName: "Servicio Realizado",
      flex: 1,
      headerAlign: "center",
      align: "center",
      /* renderCell: (params) => ( <span>{params.row.trabajo.nombre}</span>), */
      renderHeader: (params) => (
        <Box>
          <strong>{params.colDef.headerName}</strong>
        </Box>
      ),
    },
    {
      field: "precio",
      headerName: "Precio",
      flex: 1,
      headerAlign: "center",
      align: "center",

      renderHeader: (params) => (
        <Box>
          <strong>{params.colDef.headerName}</strong>
        </Box>
      ),
    },
  ];

  return (
    <>
      <Modal open={openCard} onClose={handleCloseCard} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
        <Card sx={{ ...style, width: 500 }}>
          <CardMedia
            component="img"
            image={Logo2}
            alt="Logo"
            sx={{
              width: "95%",
              height: "auto",
              margin: "auto",
              marginTop: "10px",
              marginBottom: "10px",
              borderRadius: "10px",
              boxShadow: "0 0 10px 0 rgba(150, 27, 235, 0.8)",
            }}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
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
            >
              {item.nombre}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: 20,
                fontWeight: "bold",
                fontFamily: "Roboto",
                color: purple[500],
                textAlign: "start",
                marginTop: 2,
                marginBottom: 2,
                borderRadius: "10px",
                boxShadow: "0 0 10px 0 rgba(150, 27, 235, 0.8)",
              }}
            >
              <span
                style={{
                  fontFamily: "Roboto",
                  marginLeft: 10,
                }}
              >
                Telefono: {item.telefono}
              </span>
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: 20,
                fontWeight: "bold",
                fontFamily: "Roboto",
                color: purple[500],
                textAlign: "start",
                marginTop: 2,
                marginBottom: 2,
                borderRadius: "10px",
                boxShadow: "0 0 10px 0 rgba(150, 27, 235, 0.8)",
              }}
            >
              <span
                style={{
                  fontFamily: "Roboto",
                  marginLeft: 10,
                }}
              >
                Direccion: {item.direccion}
              </span>
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: 20,
                fontWeight: "bold",
                fontFamily: "Roboto",
                color: purple[500],
                textAlign: "start",
                marginTop: 2,
                marginBottom: 2,
                borderRadius: "10px",
                boxShadow: "0 0 10px 0 rgba(150, 27, 235, 0.8)",
              }}
            >
              <span
                style={{
                  fontFamily: "Roboto",
                  marginLeft: 10,
                }}
              >
                Red Social: {item.red_social}
              </span>
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: 20,
                fontWeight: "bold",
                fontFamily: "Roboto",
                color: purple[500],
                textAlign: "start",
                marginTop: 2,
                marginBottom: 2,
                borderRadius: "10px",
                boxShadow: "0 0 10px 0 rgba(150, 27, 235, 0.8)",
              }}
            >
              <span
                style={{
                  fontFamily: "Roboto",
                  marginLeft: 10,
                }}
              >
                {" "}
                Ocupacion:{item.ocupacion} <br />
              </span>

              <span
                style={{
                  fontFamily: "Roboto",
                  marginLeft: 10,
                }}
              >
                Tipo De Cabello :{item.tipo_cabello} <br />{" "}
              </span>
              <span
                style={{
                  fontFamily: "Roboto",
                  marginLeft: 10,
                }}
              >
                {" "}
                Estado De Cabello :{item.estado_cabello} <br />{" "}
              </span>
              <span
                style={{
                  fontFamily: "Roboto",
                  marginLeft: 10,
                }}
              >
                Formula :{item.formula} <br />
              </span>
            </Typography>
          </CardContent>
          <CardActions>
            {/* <Button size="small">Ver Ficha</Button> */}

            <Grid container direction="column" item xs={12} md={12} lg={12} justifyContent="center" alignItems="center">
              <ButtonPurple variant="outlined" onClick={() => handleOpenModal2()}>
                Ver servicios realizados
              </ButtonPurple>
            </Grid>
          </CardActions>
        </Card>
      </Modal>

      <Modal open={openModal2} onClose={handleCloseModal2} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
        <Card sx={{ ...style, width: 600, margin: 0, height: 600, display: "flex", justifyContent: "center" }}>
          <>
            <Grid container direction="column" item xs={12} md={12} lg={12} justifyContent="center" alignItems="center">
              <Typography
                gutterBottom
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
                Servicios Realizados a : {item.nombre}
              </Typography>

              <DataGrid
                localeText={translate}
                style={{ height: 400, width: "90%" }}
                rows={turnoCliente}
                disableSelectionOnClick
                columns={columns}
                pageSize={6}
                rowsPerPageOptions={[6]}
                experimentalFeatures={{ newEditingApi: true }}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  boxShadow: "0 0 10px 0 rgba(150, 27, 235, 0.8)",
                }}
              />
            </Grid>
          </>
        </Card>
      </Modal>
    </>
  );
}
