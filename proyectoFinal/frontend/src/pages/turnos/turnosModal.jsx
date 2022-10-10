import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
//import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useEffect, useState } from "react";
import { moment } from "moment";
import Autocomplete from "@mui/material/Autocomplete";
import { InsertEmoticonOutlined } from "@mui/icons-material";

const MySwal = withReactContent(Swal);

const defaultValues = {
  fecha_concurrencia: "",
  precio: "",
  hora_desde: "",
  hora_hasta: "",
  imagen: "",
  clienteId: "",
  trabajoId: "",
};

export default function FormDialog(props) {
  const { open, closeModal, addTurno, timeText, clientes, servicios, item } =
    props;
  const [precioServ, setPrecioServicio] = useState("");
  const [precioSelected, setPrecioSelected] = useState("");
  const [cargado, setCargado] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  const precioServicio = (data) => {
    setPrecioSelected(true);
    setPrecioServicio(data.precio);
    console.log("DATA", data);
  };

  useEffect(() => {
    if (item && item.trabajoId) {
      console.log("ITEM en USEEFFECT", item);
      reset({ ...item });
    } else {
      reset(defaultValues);
    }
    setCargado(true);
  }, [item, reset]);

  const onSubmit = (data) => {
    console.log("ONSUBMIT DATA", data);
    addTurno(data);
    closeModal();
    reset(defaultValues);

    /* if (!edit) {
      console.log("entra a save");
      handleDateSelect(data);
      
    } else {
      console.log("entra a edit");
      handleDateSelect(data);
    } */
  };

  return (
    <div>
      <Dialog open={open} onClose={closeModal}>
        <DialogTitle>
          Hora de inicio del turno {timeText.substring(0, 5)}Hs
        </DialogTitle>

        <DialogContent>
          {cargado && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="clienteId"
                control={control}
                defaultValue={defaultValues.clienteId}
                render={ ({ field: { onChange, ref, ...field } } ) => ( 
                  <Autocomplete
                    options={clientes}                    
                    onChange= { (_, data) => onChange(data.nombre) }
                    defaultValue={item}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        {...field}
                        label="Cliente"
                        variant="outlined"
                        inputRef={ref}
                        error={!!errors.clienteId}
                        helperText={errors.clienteId?.message}

                  />
                )}
              />
            )}
          />

              {/* <Autocomplete
                style={{ width: 300 }}
                
                options={servicios}
                getOptionLabel={(option) => option.nombre}
                onChange={(event, newValue) => {
                  precioServicio(newValue);
                  console.log("newValue", newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="servicios"
                    placeholder="servicios"
                    {...register("trabajoId", {
                      required: "Ingrese el servicio",
                    })}
                  />
                )}
              />
              {precioSelected && (
                <TextField
                  className="mt-3 mb-3"
                  fullWidth
                  label="Precio"
                  value={precioServ}
                  inputProps={register("precio", {
                    required: "Please enter nombre",
                  })}
                  error={errors.nombre}
                  helperText={errors.nombre?.message}
                />
              )} */}

              {/* <TextField
              className="mt-3 mb-3 w-100 "
              fullWidth
              type="time"
              label="Hora desde"
              value={timeText.substring(0, 5)}
              inputProps={register("hora_desde", {
                required: "Please enter descripcion",
              })}
              error={errors.descripcion}
              helperText={errors.descripcion?.message}
              readOnly
            ></TextField> */}

              <Button
                type="submit"
                className="bg-red-900 justify-content-center"
              >
                {/* {edit ? "Editar" : "Crear"} */}Guardar
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
