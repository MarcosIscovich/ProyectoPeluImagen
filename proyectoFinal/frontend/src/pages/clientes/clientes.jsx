/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import "./clientes.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Stack from "@mui/material/Stack";
import ModalAdd from "./agregarModal";
import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function clientes() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [editData, setData] = useState([]);
  const [rows, setRows] = useState([]);

  const MySwal = withReactContent(Swal);

  const rowsdata = () => {
    axios.get("http://localhost:3000/clientes/").then((response) => {
      console.log("entra a rowsdata", response.data);
      setRows(response.data);
    });
  };

  const handleEdit = (id) => {
    console.log(id);
    axios.get(`http://localhost:3000/clientes/${id}`).then((response) => {
      setData(response.data);
      console.log("data para editar", editData);
    });
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
        MySwal.fire("¡Eliminado!", "El cliente ha sido eliminado.", "success");
      }
    });
  };

  useEffect(() => {
    rowsdata();
  }, []);

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
            <button
              className="btnEdit"
              onClick={() => handleEdit(params.row.id)}
            >
              {" "}
              Editar
            </button>

            <DeleteOutlineIcon
              className="btnDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </div>
        );
      },
    },
  ];

  /* const rows = [
    {
      id: 1,
      nombre: "Juan",
      telefono: "123456789",
      direccion: "Calle 1",
      email: "Juan@gmail.com",
      fechadeNacimiento: "01/01/2000",
      redSocial: "Facebook",
    },
    {
      id: 2,
      nombre: "Pedro",
      telefono: "123456789",
      direccion: "Calle 2",
      email: "Pedro@gmail.com",
      fechadeNacimiento: "01/01/2000",
      redSocial: "Intagram",
    },
    {
      id: 3,
      nombre: "Maria",
      telefono: "123456789",
      direccion: "Calle 3",
      email: "Maria@gmail.com",
      fechadeNacimiento: "01/01/2000",
      redSocial: "Facebook",
    },
    {
      id: 4,
      nombre: "Maria",
      telefono: "123456789",
      direccion: "Calle 3",
      email: "Maria@gmail.com",
      fechadeNacimiento: "01/01/2000",
      redSocial: "Facebook",
    },
    {
      id: 5,
      nombre: "Maria",
      telefono: "123456789",
      direccion: "Calle 3",
      email: "Maria@gmail.com",
      fechadeNacimiento: "01/01/2000",
      redSocial: "Facebook",
    },
    {
      id: 6,
      nombre: "Maria",
      telefono: "123456789",
      direccion: "Calle 3",
      email: "Maria@gmail.com",
      fechadeNacimiento: "01/01/2000",
      redSocial: "Facebook",
    },
    {
      id: 7,
      nombre: "Maria",
      telefono: "123456789",
      direccion: "Calle 3",
      email: "Maria@gmail.com",
      fechadeNacimiento: "01/01/2000",
      redSocial: "Facebook",
    },
    {
      id: 8,
      nombre: "Maria",
      telefono: "123456789",
      direccion: "Calle 3",
      email: "Maria@gmail.com",
      fechadeNacimiento: "01/01/2000",
      redSocial: "Facebook",
    }, 
  ];*/

  return (
    <div className="clienteList">
      <Stack direction="row" spacing={5}>
        <br />
        <ModalAdd editData={editData} rowsdata={rowsdata} />
      </Stack>

      <DataGrid
        style={{ height: 400, margin: 60, width: "80%" }}
        rows={rows}
        disableSelectionOnClick
        columns={columns}
        pageSize={4}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}
