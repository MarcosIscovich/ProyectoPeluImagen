import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { DataGrid} from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import FichaModal from "./fichaModal";
import Stack from "@mui/material/Stack";
import { deleteFicha, getAllFichas } from "../../services/fichaCliente";
import Autocomplete from "@mui/material/Autocomplete";
import { getAllClientes } from "../../services/cliente";
import CreateIcon from '@mui/icons-material/Create';


const MySwal = withReactContent(Swal);



export default function Servicios() {
  const [showbutton, setshowButton] = useState(false);
  const [rows, setRows] = useState([]);
  const [item, setItemSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [clienteSelected , setClienteSelected] = useState({});

  useEffect(() => {    
    rowsdata();
  }, []);

  const rowsdata = async () => {
    const data = await getAllFichas();
    console.log("DATA", data.data);
    setRows(data.data);
  };

  const getclientes = async () => {
    const data = await getAllClientes();
    console.log("CLIENTES", data.data);
    setClientes(data.data);
  };

  const showButton = () => {
    setshowButton(!showbutton);
    getclientes();
  };

  const handleClose = () => {
    setOpen(false);
    setEdit(false);
  };

  const handleClickOpen = (data) => {
    console.log(data)    
    setClienteSelected(data)
    setOpen(true);
    setEdit(false);
    setItemSelected({});
    setshowButton(false);
  };

  const handleEdit = (data) => {
    console.log("ITEM EDIT", data);
    setItemSelected(data);
    setOpen(true);
    setEdit(true);
  };

  const handleDelete = (id) => {
    console.log("ID", id);
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
        deleteFicha(id);
        MySwal.fire(
          "Yo te Adverti!",
          "La ficha ha sido eliminada.",
          "success"
        );
        rowsdata();
      }
    });
  };

  const columns = [
    /* { field: "id", headerName: "ID", width: 70 }, */
    { field: "ocupacion", headerName: "Ocupacion", width: 130 },
    { field: "tipo_cabello", headerName: "Tipo de Cabello", width: 100 },
    { field: "estado_cabello", headerName: "Estado del Cabello", width: 100 },
    { field: "formula", headerName: "Formula", width: 300 },
    { field: "cliente", headerName: "Cliente", width: 130 ,
     renderCell: (params) => (
          <p>{params.row.cliente.nombre}</p>
      )},
    {
      field: "acciones",
      headerName: "Acciones",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="flex space-x-2 ">
            <CreateIcon
              onClick={() => handleEdit(params.row)}
              className="fill-black-500 md:fill-black-700"
            />
             {/*  Editar
            </button> */}

            <DeleteOutline
              onClick={() => handleDelete(params.row.id)}
              className="fill-red-500 md:fill-red-700"
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="m-20">
      <div className="flex flex-row justify-center items-center...">
        <Fab
          onClick={showButton}
          variant="extended"
          color="primary"
          aria-label="add"
        >
          <AddIcon sx={{ mr: 1 }} />
          Agregar Ficha
        </Fab>
        {showbutton && (
          <Autocomplete
            style={{ width: 300 }}
            id="clientes"
            options={clientes} 
            getOptionLabel={(option) => option.nombre} 
            onChange={(event, value) => handleClickOpen(value)}          
            renderInput={(params) => (
              <TextField {...params} label="Clientes"  placeholder="Clientes" />
            )}
          />
        )}
      </div>
      <div className="flex flex-row justify-center items-center m-10 ...">
        {/* {showbutton ? (
          <ButtonGroup className="flex space-x-4">
            <Fab onClick={handleClickOpenPelu} variant="extended">
              <GiHairStrands sx={{ mr: 1 }} />
              Peluqueria
            </Fab>

            <Fab onClick={handleClickOpenUñas} variant="extended">
              <GiBarbedNails sx={{ mr: 1 }} />
              Uñas
            </Fab>
          </ButtonGroup>
        ) : null} */}
      </div>
      <Stack direction="row" spacing={5}>
        <br />
        <FichaModal
          edit={edit}
          item={item}
          open={open}
          setOpen={setOpen}
          handleClose={handleClose}
          rowsdata={rowsdata}
          clienteSelected={clienteSelected}
        />
      </Stack>
      <div className="flex flex-nowrap space-x-2 max-w-full ...">
        <DataGrid
          style={{ height: 500, margin: 10, width: "85%" }}      
          rows={rows}
          disableSelectionOnClick
          columns={columns}
          pageSize={7}
          rowsPerPageOptions={[7]}
          autoHeight={true}
          align="center"
          columnHeaderHeight={50}
        />
      </div>
    </div>
  );
}
