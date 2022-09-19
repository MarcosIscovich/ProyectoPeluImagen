/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import "./productos.css";
import "../../services/productos";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import ModalProducto from "./modalProducto";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CreateIcon from '@mui/icons-material/Create';
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";


import { deleteProducto, getProductos } from "../../services/productos";
//import CardModal from "./clienteModal"


export default function productos() {
  useEffect(() => {
    rowsdata();
  }, []);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [rows, setRows] = useState([]);
  const [item, setItemSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
/*   const [openCard, setOpenCard] = useState(false); */

  const MySwal = withReactContent(Swal);

/*   const cardOpen = (data) => {
    console.log("CARD", data);
    setItemSelected(data);
    setOpenCard(true);
  }; */

  const rowsdata = async () => {
    const data = await getProductos();
      setRows( data.data);
    }
  
 /*  const handleCloseCard = () => {
    setOpenCard(false);
  }; */

  const handleClose = () => {
    setOpen(false);
    setEdit(false);
  };

  const handleClickOpen = () => {
    setItemSelected({});
    setOpen(true);
    setEdit(false);
  };

  const handleEdit = (data) => {
    console.log("ITEM EDIT", data);
    setItemSelected(data);
    setOpen(true);
    setEdit(true);
  };

  const handleDelete = (id) => {

    MySwal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, bórralo!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProducto(id);
        MySwal.fire(
          "Yo te Adverti!",
          "El cliente ha sido eliminado.",
          "success"
        );
        rowsdata();
      }
    });
  };

  const columns = [
    /* { field: "id", headerName: "ID", width: 70 }, */
    { field: "nombre", headerName: "Nombre", width: 130 , headerAlign: 'center',
    align: 'center' },
    { field: "descripcion", headerName: "Descripcion", width: 130 , headerAlign: 'center',
    align: 'center' },
    { field: "stock", headerName: "Stock", width: 130 , headerAlign: 'center',
    align: 'center' },
    { field: "precio", headerName: "Precio", width: 180 , headerAlign: 'center',
    align: 'center'},
    {
      field: "imagen",
      headerName: "Imagen",
      width: 160,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 130,
      headerAlign: 'center',
    align: 'center',
      renderCell: (params) => {
        return (
        <div className="flex space-x-2 ">
            
      <CreateIcon className="fill-orange-500 md:fill-orange-700 mx-5"  onClick={() => handleEdit(params.row)}/>
      {/*   Editar
      </ImPencil> */}

      <DeleteOutline
        className="fill-red-500 md:fill-red-700"
        onClick={() => handleDelete(params.row.id)}
      />
    </div>
  );
      },
    },
  ];

  return (

    <div >
      <div className=" mx-20 pt-12 pb-2">
      <Fab
        onClick={handleClickOpen}
        variant="extended"
        color="primary"
        aria-label="add"
      >
        <AddIcon sx={{ mr: 1 }} />
      Agregar Producto
      </Fab>
      </div>
     {/* <CardModal item={item} openCard={openCard} handleCloseCard={handleCloseCard} />  */} 

      <Stack direction="row" spacing={5}>
        <br />
        <ModalProducto
          edit={edit}
          item={item}
          open={open}
          setOpen={setOpen}
          handleClose={handleClose}
          rowsdata={rowsdata}
        />
      </Stack>

      <DataGrid
        style={{ height: 400, margin: 60, width: "70%" }}
        rows={rows}
        disableSelectionOnClick
        columns={columns}
        pageSize={6}
        rowsPerPageOptions={[6]}
      />
    </div>
  );
}
