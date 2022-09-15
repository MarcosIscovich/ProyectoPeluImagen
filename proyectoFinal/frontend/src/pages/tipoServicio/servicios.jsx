import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ButtonGroup} from "@mui/material";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { GiBarbedNails, GiHairStrands } from "react-icons/gi";
import  ServicioModal  from "./serviciosModal";
import Stack from "@mui/material/Stack";
import { deleteTrabajo, getAllTrabajos } from "../../services/servicios";
import CreateIcon from '@mui/icons-material/Create';

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

  const rowsdata = async () => {
    const data = await getAllTrabajos();
    console.log("DATA", data.data);
    setRowsPelu(data.data.filter((item) => item.tiposervicioId === 1));
    setRowsUñas(data.data.filter((item) => item.tiposervicioId === 2));

    }
 
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
    { field: "nombre", headerName: "Nombre", width: 130 },
    { field: "duracion", headerName: "Duracion", width: 100 },
    { field: "precio", headerName: "Precio", width: 100 },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 160,
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
        <Fab
          onClick={showButton}
          variant="extended"
          color="primary"
          aria-label="add"
        >
          <AddIcon sx={{ mr: 1 }} />
          Agregar un Servicio
        </Fab>
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
            <Fab onClick={handleClickOpenPelu} variant="extended">
              <GiHairStrands sx={{ mr: 1 }} />
              Peluqueria
            </Fab>

            <Fab onClick={handleClickOpenUñas} variant="extended">
              <GiBarbedNails sx={{ mr: 1 }} />
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
          style={{ height: 500, margin: 10, width: "85%" }}
          rows={rowsPelu}
          disableSelectionOnClick
          columns={columns}
          pageSize={7}
          rowsPerPageOptions={[7]}
          autoHeight={true}
          align="center"
          columnHeaderHeight={50}
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
        />
      </div>
    </div>
  );
}

