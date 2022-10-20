import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
//import Box from '@mui/material/Box';
import Modal from "@mui/material/Modal";
import { getTurno } from "../../services/turnos";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Logo2 from "../../images/logo2.jpg";
import Grid from "@mui/material/Grid";
import moment from "moment";
import { purple } from "@mui/material/colors";
import ButtonPurple from "../../components/ButtonPurple";

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
    setTurnoCliente(turnosCliente.data);
    console.log("turnosCliente", turnosCliente);
    setOpenModal2(true);
  };
  const handleCloseModal2 = () => setOpenModal2(false);

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
              sx={{
                fontSize: 20,
                fontWeight: "bold",
                fontFamily: "Roboto",
                color: purple[500],
                textAlign: "center",
                marginTop: 2,
                marginBottom: 2,
                borderRadius: "10px",
                boxShadow: "0 0 10px 0 rgba(150, 27, 235, 0.8)",
              }}
            >
              {item.direccion}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: 20,
                fontWeight: "bold",
                fontFamily: "Roboto",
                color: purple[500],
                textAlign: "center",
                marginTop: 2,
                marginBottom: 2,
                borderRadius: "10px",
                boxShadow: "0 0 10px 0 rgba(150, 27, 235, 0.8)",
              }}
            >
              {item.red_social}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: 20,
                fontWeight: "bold",
                fontFamily: "Roboto",
                color: purple[500],
                textAlign: "center",
                marginTop: 2,
                marginBottom: 2,
                borderRadius: "10px",
                boxShadow: "0 0 10px 0 rgba(150, 27, 235, 0.8)",
              }}
            >
              Ocupacion:{item.ocupacion} <br />
              Tipo De Cabello :{item.tipo_cabello} <br />
              Estado De Cabello :{item.estado_cabello} <br />
              Formula :{item.formula} <br />
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
        <Card sx={{ ...style, width: 500 }}>
          <CardContent>
            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              {turnoCliente.map((item) => (
                <Typography
                  gutterBottom
                  variant="body2"
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                    p: 1,
                    m: 1,
                    border: 1,
                    borderColor: "text.primary",
                    borderRadius: 1,
                  }}
                  component="div"
                >
                  <span>
                    fecha de Concurrencia : {item.fecha_concurrencia.substring(0, 10)}
                    <br />
                  </span>
                  <span>Servicio Realizado: {item.trabajo.nombre}</span>
                </Typography>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
}
