import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
//import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function NestedModal(props) {
  const { openCard, handleCloseCard, item } = props;
  

  return (
    <div>
      
      <Modal
        open={openCard}
        onClose={handleCloseCard}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        
        <Card sx={{ ...style, width: 400, maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      />
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
          Aqui va la ficha del cliente
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Button size="small">Ver Ficha</Button> */}
        <Button size="small">Ver servicios realizados</Button>
      </CardActions>
    </Card>
        
      </Modal>
    </div>
  );
}
