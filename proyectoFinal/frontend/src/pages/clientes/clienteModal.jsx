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
import Grid from "@mui/material/Grid";
import moment from "moment";

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
          <CardMedia component="img" height="140" image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg" alt="green iguana" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.nombre}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.direccion}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.red_social}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ocupacion:{item.ocupacion} <br />
              Tipo De Cabello :{item.tipo_cabello} <br />
              Estado De Cabello :{item.estado_cabello} <br />
              Formula :{item.formula} <br />
            </Typography>
          </CardContent>
          <CardActions>
            {/* <Button size="small">Ver Ficha</Button> */}
            <Button size="small" onClick={() => handleOpenModal2()}>
              Ver servicios realizados
            </Button>
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
