/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import "./clientes.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline, Face } from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import Modal from "./modalForm";
import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Button from "@mui/material/Button";

export default function clientes() {
  useEffect(() => {
    rowsdata();
  }, []);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [rows, setRows] = useState([]);
  const [item, setItemSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const [edit , setEdit] = useState(false);

  const MySwal = withReactContent(Swal);

  const rowsdata = () => {
    axios.get("http://localhost:3000/clientes/").then((response) => {
      console.log("entra a rowsdata", response.data);
      setRows(response.data);
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setItemSelected({});
    setOpen(true);
  };

  const handleEdit = (data) => {
    console.log("Cliente edit" , data)
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
        axios
          .delete(`http://localhost:3000/clientes/delete/${id}`)
          .then((response) => {
            console.log(response);
            rowsdata();
          });
        MySwal.fire(
          "Yo te Adverti!",
          "El cliente ha sido eliminado.",
          "success"
        );
      }
    });
  };

  const columns = [
    /* { field: "id", headerName: "ID", width: 70 }, */
    { field: "nombre", headerName: "Nombre", width: 130 },
    { field: "telefono", headerName: "Telefono", width: 130 },
    { field: "direccion", headerName: "Direccion", width: 130 },
    { field: "email", headerName: "E-mail", width: 180 },
    {
      field: "fecha_nacimiento",
      headerName: "Fecha de Nacimiento",
      width: 160,
    },
    { field: "red_social", headerName: "Red Social", width: 130 },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 130,
      renderCell: (params) => {
        return (
          <div>
            <Face className="btnFace" />

            <button className="btnEdit" onClick={() => handleEdit(params.row)}>
              Editar
            </button>

            <DeleteOutline
              className="btnDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="clienteList">
      <Button className="btnAdd" onClick={handleClickOpen}>
        Agregar Cliente
      </Button>

      <Stack direction="row" spacing={5}>
        <br />
        <Modal edit={edit} item={item} open={open} setOpen={setOpen} handleClose={handleClose} rowsdata={rowsdata} />
      </Stack>

      <DataGrid
        style={{ height: 400, margin: 60, width: "90%" }}
        rows={rows}
        disableSelectionOnClick
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}
