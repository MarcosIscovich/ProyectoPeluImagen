/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import "./clientes.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline, Face } from "@mui/icons-material";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import Stack from "@mui/material/Stack";
import Modal from "./modalForm";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CardModal from "./clienteModal";
import { deleteCliente, getAllClientes } from "../../services/cliente";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import CreateIcon from "@mui/icons-material/Create";
import AddIcon from "@mui/icons-material/Add";
import ModalFicha from "./modalFichaCliente";
import { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import purple from "@mui/material/colors/purple";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function clientes() {
  useEffect(() => {
    rowsdata();
  }, []);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [rows, setRows] = useState([]);

  const [item, setItemSelected] = useState([]);
  //const [idCliente, setIdCliente] = useState([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [openCard, setOpenCard] = useState(false);
  const [openFicha, setOpenFicha] = useState(false);

  const MySwal = withReactContent(Swal);

  const search = (e) => {
    if (e.length > 3) {
    filtrar(e);
    } else {
      rowsdata();
    }
  };

  const filtrar = (filtrado) => {
    
    console.log("FILTRADO", filtrado);
    let resultado = rows.filter((row) => {
      return row.nombre.toLowerCase().includes(filtrado);
    });
    console.log("RESULTADO", resultado);
    setRows(resultado);
       
    
  };

  const cardOpen = (data) => {
    console.log("CARD", data);
    setItemSelected(data);
    setOpenCard(true);
  };
  const openFichaModal = (data) => {
    console.log("FICHA", data);
    //setIdCliente(data.id);
    setOpenFicha(true);
    setItemSelected(data);
  };

  const rowsdata = async () => {
    const data = await getAllClientes();
    setRows(data.data);
  };
  const handleCloseCard = () => {
    setOpenCard(false);
  };
  const handleCloseFicha = () => {
    setOpenFicha(false);
  };

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
    console.log("Cliente edit", data);
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
        deleteCliente(id);
        MySwal.fire("Yo te Adverti!", "El cliente ha sido eliminado.", "success");
        rowsdata();
      }
    });
  };
  const columns = [
    /* { field: "id", headerName: "ID", width: 70 }, */
    {
      field: "nombre",
      headerName: "Nombre",
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
      field: "telefono",
      headerName: "Telefono",
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
      field: "direccion",
      headerName: "Direccion",
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
      field: "email",
      headerName: "E-mail",
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
      field: "fecha_nacimiento",
      headerName: "Fecha de Nacimiento",
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
      field: "red_social",
      headerName: "Red Social",
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
      field: "acciones",
      headerName: "Acciones",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderHeader: (params) => (
        <Box>
          <strong>{params.colDef.headerName}</strong>
        </Box>
      ),
      renderCell: (params) => {
        return (
          <div className="flex space-x-2 ">
            <Tooltip title="Ver y Editar Ficha del Cliente">
            <NoteAltIcon className="cursor-pointer fill-blue-500 md:fill-blue-700 " onClick={() => openFichaModal(params.row)} />
            </Tooltip>
            <Tooltip title="Datos del Cliente Y Servicios Realizados">
            <Face className=" fill-green-500 md:fill-green-700" onClick={() => cardOpen(params.row)} />
          </Tooltip>
            <CreateIcon className="fill-black-500 md:fill-black-700" onClick={() => handleEdit(params.row)} />
            {/*  Editar
            </button> */}

            <DeleteOutline className="fill-red-500 md:fill-red-700" onClick={() => handleDelete(params.row.id)} />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className=" flex mx-15 pt-12 pb-2">
        <Button
          onClick={handleClickOpen}
          variant="extended"
          className="text-white bg-gradient-to-r from-purple-800 to-orange-800 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          <AddIcon sx={{ mr: 1 }} />
          Nuevo Cliente
        </Button>

        <Search>
          <SearchIconWrapper>
            <SearchIcon sx={{
                    fontSize: 30,
                    justifyContent: "center",
                    color: purple[700],
                  }} />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Buscar Cliente" inputProps={{ "aria-label": "search" }} onChange={(e) => search(e.target.value)} />
        </Search>
      </div>

      <CardModal item={item} openCard={openCard} handleCloseCard={handleCloseCard} />
      <ModalFicha openFicha={openFicha} setOpen={setOpen} handleCloseFicha={handleCloseFicha} rowsdata={rowsdata} item={item} />

      <Stack direction="row" spacing={5}>
        <br />
        <Modal edit={edit} item={item} open={open} setOpen={setOpenFicha} handleClose={handleClose} rowsdata={rowsdata} />
      </Stack>
      <Box sx={{ height: 400, margin: 10, width: "95%" }}>
        <DataGrid
          autoHeight
          rows={rows}
          disableSelectionOnClick
          columns={columns}
          pageSize={7}
          rowsPerPageOptions={[7]}
          align="center"
          experimentalFeatures={{ newEditingApi: true }}
          className="bg-white shadow-lg drop-shadow-2xl rounded-lg my-6 border-solid border-1 border-purple-900
          w-full text-sm text-left text-violet-800 dark:text-violet-900 
          "
        />
      </Box>
    </>
  );
}
