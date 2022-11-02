import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Box, Button, ButtonGroup } from "@mui/material";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { GiBarbedNails, GiHairStrands } from "react-icons/gi";
import ServicioModal from "./serviciosModal";
import Stack from "@mui/material/Stack";
import { deleteTrabajo, getAllTrabajos } from "../../services/servicios";
import CreateIcon from "@mui/icons-material/Create";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { purple } from "@mui/material/colors";
import translate from "../../components/Translate/translate.json";

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

const MySwal = withReactContent(Swal);

export default function Servicios() {
  const [showbutton, setshowButton] = useState(false);
  const [rowsPelu, setRowsPelu] = useState([]);
  const [rowsUñas, setRowsUñas] = useState([]);
  const [item, setItemSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [tipoServicio, setTipoServicio] = useState([]);

  useEffect(() => {
    rowsdata();
  }, []);

  const search = (e) => {
    if (e.length > 3) {
      filtrar(e);
    } else {
      rowsdata();
    }
  };

  const filtrar = (filtrado) => {
    console.log("FILTRADO", filtrado);
    let resultado = rowsPelu.filter((row) => {
      return row.nombre.toLowerCase().includes(filtrado);
    });
    let resultado2 = rowsUñas.filter((row) => {
      return row.nombre.toLowerCase().includes(filtrado);
    });
    console.log("RESULTADO", resultado);

    setRowsPelu(resultado);
    setRowsUñas(resultado2);
  };

  const rowsdata = async () => {
    const data = await getAllTrabajos();
    console.log("DATA", data.data);
    setRowsPelu(data.data.filter((item) => item.tiposervicioId === 1));
    setRowsUñas(data.data.filter((item) => item.tiposervicioId === 2));
  };

  const showButton = () => {
    setshowButton(!showbutton);
  };

  const handleClose = () => {
    setOpen(false);
    setEdit(false);
  };

  const handleClickOpenPelu = () => {
    setTipoServicio(1);
    setItemSelected({});
    setOpen(true);
    setEdit(false);
  };

  const handleClickOpenUñas = () => {
    setTipoServicio(2);
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
        deleteTrabajo(id);
        MySwal.fire({
          title: "El servicio ha sido eliminado.",
          icon: "success",
        });
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
    /* {
      field: "duracion",
      headerName: "Duracion",
      headerAlign: "center",
      flex: 1,
      renderHeader: (params) => (
        <Box>
          <strong>{params.colDef.headerName}</strong>
        </Box>
      ),
    }, */
    {
      field: "precio",
      headerName: "Precio",
      headerAlign: "center",
      flex: 1,      
      renderCell: (params) => (
        <Box>
          <strong > $ {params.value}</strong>
        </Box>
      ),
      renderHeader: (params) => (
        <Box>
          <strong>{params.colDef.headerName}</strong>
        </Box>
      ),
    },
    {
      field: "acciones",
      headerName: "Acciones",
      headerAlign: "center",
      flex: 1,
      renderHeader: (params) => (
        <Box>
          <strong>{params.colDef.headerName}</strong>
        </Box>
      ),

      renderCell: (params) => {
        return (
          <div className="flex space-x-2 ">
            <CreateIcon onClick={() => handleEdit(params.row)} className="fill-black-500 md:fill-black-700" />
            {/*  Editar
            </button> */}

            <DeleteOutline onClick={() => handleDelete(params.row.id)} className="fill-red-500 md:fill-red-700" />
          </div>
        );
      },
    },
  ];

  return (
    <div className="m-20">
      <div className="flex flex-row justify-center items-center...">
        <Button
          onClick={showButton}
          variant="extended"
          className="text-white bg-gradient-to-r from-purple-800 to-orange-800 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          <AddIcon sx={{ mr: 1 }} />
          Agregar Servicio
        </Button>
        <Search>
          <SearchIconWrapper>
            <SearchIcon sx={{
                    fontSize: 30,
                    justifyContent: "center",
                    color: purple[700],
                  }} />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Buscar Servicio" inputProps={{ "aria-label": "search" }} onChange={(e) => search(e.target.value)} />
        </Search>
        {/* <Button
          onClick={showButton}
          className=" bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          Agregar Un Servicio
        </Button> */}
      </div>
      <div className="flex flex-row justify-center items-center m-10 ...">
        {showbutton ? (
          <ButtonGroup className="flex space-x-4">
            <Fab
              onClick={handleClickOpenPelu}
              variant="extended"
              className="text-white bg-gradient-to-r from-purple-800 to-orange-800 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              <GiHairStrands className="mr-2" />
              Peluqueria
            </Fab>

            <Fab
              onClick={handleClickOpenUñas}
              variant="extended"
              className="text-white bg-gradient-to-r from-purple-800 to-orange-800 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              <GiBarbedNails className="mr-2" />
              Uñas
            </Fab>
          </ButtonGroup>
        ) : null}
      </div>
      <Stack direction="row" spacing={5}>
        <br />
        <ServicioModal
          tipoServicio={tipoServicio}
          edit={edit}
          item={item}
          open={open}
          setOpen={setOpen}
          handleClose={handleClose}
          rowsdata={rowsdata}
        />
      </Stack>
      <div className="flex flex-nowrap space-x-2 max-w-full ...">
        <DataGrid
        localeText={translate}
          style={{ height: 500, margin: 10, width: "85%" }}
          rows={rowsPelu}
          disableSelectionOnClick
          columns={columns}
          pageSize={7}
          rowsPerPageOptions={[7]}
          autoHeight={true}
          align="center"
          columnHeaderHeight={50}
          className="bg-white shadow-lg drop-shadow-2xl rounded-lg my-6 border-solid border-1 border-purple-900
          w-full text-sm text-left text-violet-800 dark:text-violet-900 
          "
        />
        <DataGrid
          style={{ height: 500, margin: 10, width: "85%" }}
          rows={rowsUñas}
          disableSelectionOnClick
          columns={columns}
          pageSize={7}
          rowsPerPageOptions={[7]}
          autoHeight={true}
          align="center"
          columnHeaderHeight={50}
          className="bg-white shadow-lg drop-shadow-2xl rounded-lg my-6 border-solid border-1 border-purple-900
          w-full text-sm text-left text-violet-800 dark:text-violet-900 
          "
        />
      </div>
    </div>
  );
}
