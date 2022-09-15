/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import "./clientes.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline, Face } from "@mui/icons-material";
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
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

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
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [openCard, setOpenCard] = useState(false);

  const MySwal = withReactContent(Swal);

  const search = (e) => {
    filtrar(e);
  };

  const filtrar = (filtrado) => {
    console.log("FILTRADO", filtrado);
    /*   let resultado = rows.filter((data) => {
      if (data.title.toString().toLowerCase().includes(filtrado.toLowerCase())
        || data.category.toString().toLowerCase().includes(filtrado.toLowerCase())
        || data.price.toString().toLowerCase().includes(filtrado.toLowerCase())
      ) {
        return data;
      }

    }) 
   rowsdata(resultado);*/
  };

  const cardOpen = (data) => {
    console.log("CARD", data);
    setItemSelected(data);
    setOpenCard(true);
  };

  const rowsdata = async () => {
    const data = await getAllClientes();
    setRows(data.data);
  };
  const handleCloseCard = () => {
    setOpenCard(false);
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
    {
      field: "nombre",
      headerName: "Nombre",
      width: 130,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "telefono",
      headerName: "Telefono",
      width: 130,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "direccion",
      headerName: "Direccion",
      width: 130,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "E-mail",
      width: 250,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "fecha_nacimiento",
      headerName: "Fecha de Nacimiento",
      width: 160,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "red_social",
      headerName: "Red Social",
      width: 130,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 160,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="flex space-x-2 ">
            <Face
              className=" fill-green-500 md:fill-green-700"
              onClick={() => cardOpen(params.row)}
            />

            <CreateIcon
              className="fill-black-500 md:fill-black-700"
              onClick={() => handleEdit(params.row)}
            />
            {/*  Editar
            </button> */}

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
    <div>
      
      <div className=" flex mx-20 pt-12 pb-2">
        <Fab
        onClick={handleClickOpen}
        variant="extended"
        color="primary"
        aria-label="add"
      >
        <AddIcon sx={{ mr: 1 }} />
      Agregar Cliente
      </Fab>

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Buscar Cliente"
            inputProps={{ "aria-label": "search" }}
            onChange={(e) => search(e.target.value)}
          />
        </Search>
      </div>

      <CardModal
        item={item}
        openCard={openCard}
        handleCloseCard={handleCloseCard}
      />

      <Stack direction="row" spacing={5}>
        <br />
        <Modal
          edit={edit}
          item={item}
          open={open}
          setOpen={setOpen}
          handleClose={handleClose}
          rowsdata={rowsdata}
        />
      </Stack>
      <Box sx={{ height: 400, margin: 10, width: "80%" }}>
        <DataGrid
          autoHeight
          rows={rows}
          disableSelectionOnClick
          columns={columns}
          pageSize={7}
          rowsPerPageOptions={[7]}
          align="center"
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </div>
  );
}
