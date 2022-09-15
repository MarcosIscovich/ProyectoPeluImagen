import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
//import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm} from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { createProducto , updateProducto } from "../../services/productos";
import { useEffect } from "react";

const MySwal = withReactContent(Swal);


const defaultValues= {
  nombre: "",
  descripcion: "",
  stock: "",
  precio: "",
  imagen: "",
}

export default function FormDialog(props) {
  const { open, handleClose, item, edit, rowsdata } = props;
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },    
  } = useForm({ defaultValues });  

  const saveProduct = async (data) => {
    const save = await createProducto(data);
    handleClose();
    MySwal.fire({
      title: "Producto creado",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    }).then((result) => {
      reset(save);
      rowsdata();
    });
  };

  const editData = async  (data) => {
    const editData = await updateProducto(data)
    handleClose();
    MySwal.fire({
      title: "Producto editado",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    }).then((result) => {
      reset(editData);
      rowsdata();
    });
  }
    
  useEffect(() => {
    if (item && item.id) {
      reset({...item})
    } else {
      reset(defaultValues)
    }
  }, [item, reset]); 

  const onSubmit = (data) => {
    if (!edit) {
      console.log("entra a save");
      saveProduct(data);
      
    } else {
      console.log("entra a edit");
      editData(data);
    }
  };

/*   setValue("id", item.id);
  setValue("nombre", item.nombre);
  setValue("descripcion", item.descripcion);
  setValue("stock", item.stock);
  setValue("precio", item.precio);
  setValue("imagen", item.imagen); */

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle >{edit ? "Editar Producto" : "Crear Producto"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              className="mt-3 mb-3"
              fullWidth
              label="Nombre"                           
              defaultValue=""
              inputProps={register( "nombre", {
                required: "Please enter nombre",
              })}
              error={errors.nombre}
              helperText={errors.nombre?.message}
              ></TextField>

            <TextField
              className="mt-3 mb-3 w-100 "
              fullWidth
              label="Descripcion"
              defaultValue=""
              inputProps={register("descripcion", {
                required: "Please enter descripcion",
              })}
              error={errors.descripcion}
              helperText={errors.descripcion?.message}
            ></TextField>

            <TextField
              className="mt-3 mb-3 w-100 "
              fullWidth
              label="Stock"
              defaultValue=""
              inputProps={register("stock", {
                required: "Please enter stock",
              })}
              error={errors.stock}
              helperText={errors.stock?.message}
            ></TextField>

            <TextField
              className="mt-3 mb-3 w-100 "
              fullWidth
              label="Precio"
              defaultValue=""
              inputProps={register("precio", {
                required: "Please enter precio",
              })}
              error={errors.precio}
              helperText={errors.precio?.message}
            ></TextField>

            <TextField
              className="mt-3 mb-3 w-100 "
              fullWidth
              type={"file"}
              label="Imagen"              
              defaultValue=""
              inputProps={register("imagen")}
            ></TextField>

            <Button type="submit" className="bg-red-900 justify-content-center">
              {edit ? "Editar" : "Crear"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
