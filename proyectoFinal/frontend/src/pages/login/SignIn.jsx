import { Box, Card, CardContent, CardMedia, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import TextFieldForms from "../../components/textFieldForms";
import ButtonPurple from "../../components/ButtonPurple";
import Logo2 from "../../images/logo2.jpg";
import { createUser } from "../../services/user";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Login() {
  const MySwal = withReactContent(Swal);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    console.log("DATA CREATE", data);
    const  res = await createUser(data);
    console.log("RES", res);
    if (res.ok) {
      MySwal.fire({
        title: "Usuario creado con exito",
        icon: "success",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
    } else {
      MySwal.fire({
        title: "Error al crear el usuario",
        icon: "error",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/signIn";
        }
      });
    }
  };

  return (
    <>
      <Box className="h-screen flex bg-gray-100">
        <Card className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-1">
          {/* <Typography className="text-2xl font-medium text-center">
            <p className="text-lg font-semibold">Welcome to My-App</p>
          </Typography> */}
          <CardMedia
            component="img"
            image={Logo2}
            alt="Logo"
            sx={{
              width: "95%",
              height: "auto",
              margin: "auto",
              marginTop: "10px",
              marginBottom: "10px",
              borderRadius: "10px",
              boxShadow: "0 0 10px 0 rgba(150, 27, 235, 0.8)",
            }}
          />

          <CardContent className="text-primary m-6">
            <div className="flex items-center mt-3 justify-center">
              <Typography className="text-2xl font-medium text-primary  mb-2 text-purple-700">Registrar Usuario</Typography>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Typography className="text-center text-purple-700">Usuario</Typography>

              {/* <input
                name="username"
                type="text"
                value={formData.user.username}
                onChange={handleChange}
                placeholder="Username"
                className={"w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"}
              /> */}
              <Controller
                name="username"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <TextFieldForms
                    {...field}
                    error={!!errors.username}
                    label="Username"
                    variant="outlined"
                    className="w-full p-2 border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4 border- shadow-sm"
                  />
                )}
              />
              {errors.username && <span style={{ color: "red" }}>Este campo es requerido</span>}

              <Typography className="text-center text-purple-700">Contraseña</Typography>

              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <TextFieldForms
                    {...field}
                    type="password"
                    label="Password"
                    variant="outlined"
                    className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4 shadow-sm"
                  />
                )}
              />
              {errors.password && <span style={{ color: "red" }}>Este campo es requerido</span>}
              <div className="flex items-center mt-3 justify-center">
                <ButtonPurple type="submit">Registrar</ButtonPurple>
              </div>
            </form>
            {/* <div className="flex items-center mt-3 justify-center">
              <button className={"justify-center text-blue-500 hover:underline"}>Need to register? Sign up for free</button>
            </div> */}
          </CardContent>
        </Card>
      </Box>
      );
    </>
  );
}
