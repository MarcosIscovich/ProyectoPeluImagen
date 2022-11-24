import React, { useState } from "react";
import { turnosSelected } from "../../services/turnos";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import moment from "moment";
import Typography from "@mui/material/Typography";
import { purple } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "react-datepicker/dist/react-datepicker.css";
import range from "lodash/range";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const MySwal = withReactContent(Swal);


export default function Home() {
  const [ventasTotales, setVentasTotales] = useState(0);
  const [turnosTotales, setTurnosTotales] = useState(0);
  const [dataTurnosMes, setDataTurnosMes] = useState([]);
  const [dataVentasMes, setDataVentasMes] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  

  const years = range(1990, getYear(new Date()) + 1, 1);
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];


  const SelectDates = async () => {
    let fechainicio = moment(startDate).format("YYYY-MM-DD");
    let fechafin = moment(endDate).format("YYYY-MM-DD");
    let fechasBack = {
      fechainicio: fechainicio,
      fechafin: fechafin,
    };
    let daycount = 0;
    let DataTurnos = [];
    let ventasXdia = [];

    if (fechainicio === fechafin) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Las fechas deben ser diferentes",
      });
      return;
    } else if (fechainicio > fechafin) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "La fecha de inicio debe ser menor a la fecha de fin",
      });
      return;
    } else {
      daycount = moment(fechafin).diff(moment(fechainicio), "days");
    }

    console.log("daycount", daycount);

    console.log("fechasBack", fechasBack);

    const result = await turnosSelected(fechasBack);

    console.log("result", result.data);

    //armo array para recorrer y sumar los turnos por dia
    let dias = [...new Array(daycount + 1)].map((_, i) => moment(fechainicio).add(i, "days").format("YYYY-MM-DD"));
    console.log("DIAS", dias);

    //recorro el array de dias y agrego los turnos por dia
    dias.map((dia) => {
      let turnosdia = result.data.filter((turno) => turno.fecha_concurrencia === dia);
      return DataTurnos.push({ name: moment(dia).format("DD-MM-YYYY"), Turnos: turnosdia.length });
    });

   
    
    console.log("DataTurnos", DataTurnos);

    setDataTurnosMes(DataTurnos);

    //cuento la cantidad de turnos totales
    let turnosTotales = 0;
    DataTurnos.map((turno) => (turnosTotales += turno.Turnos));
    setTurnosTotales(turnosTotales);

    console.log("result", DataTurnos);

    //cargo la cantidad de ventas por dia
    dias.map((dia) => {
      let ventasdia = result.data.filter((turno) => turno.fecha_concurrencia === dia);

      //sumo las ventas por dia
      let totalDia = 0;
      ventasdia.map((venta) => {
        return (totalDia += venta.precio);
      });
      return ventasXdia.push({ name: moment(dia).format("DD-MM-YYYY"), ventas: totalDia });
    });
    setDataVentasMes(ventasXdia);

    //cuento la cantidad de ventas totales
    let totalVentas = 0;
    ventasXdia.map((venta) => {
      return (totalVentas += venta.ventas);
    });
    setVentasTotales(totalVentas);
  };

  return (
    <>
      <div className=" flex mx-15 pt-12 pb-2"></div>

      <Grid container spacing={3} justifyContent="flex-start" alignItems="center">
        <Grid item xs={2}>
          <span className=" text-purple-900 ml-5 text-2xl font-bold">Fecha desde</span>
          <DatePicker
            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div
                style={{
                  margin: 10,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  className="border-purple-900 border-2 rounded-md  text-purple-900 text-xl hover:bg-purple-900 hover:text-white transition duration-500 ease-in-out"
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                >
                  <KeyboardDoubleArrowLeftIcon />
                </button>
                <select
                  className="border-purple-900 border-2 rounded-md text-purple-900 text-xl hover:bg-purple-900 hover:text-white transition duration-500 ease-in-out h-13 w-15"
                  value={getYear(date)}
                  onChange={({ target: { value } }) => changeYear(value)}
                >
                  {years.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <select
                  className=" border-purple-900 border-2 rounded-md  text-purple-900 text-xl hover:bg-purple-900 hover:text-white transition duration-500 ease-in-out"
                  value={months[getMonth(date)]}
                  onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
                >
                  {months.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <button
                  className="border-purple-900 border-2 rounded-md  text-purple-900 text-xl hover:bg-purple-900 hover:text-white transition duration-500 ease-in-out"
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                >
                  <KeyboardDoubleArrowRightIcon />
                </button>
              </div>
            )}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            startDate={startDate}
            
            dateFormat="dd-MM-yyyy"
            endDate={endDate}
            className="mx-2 border-purple-900 border-2 rounded-md p-3 font-bold text-purple-900 text-xl hover:bg-purple-900 hover:text-white transition duration-500 ease-in-out h-15 w-40"
          />
        </Grid>
        <Grid item xs={2}>
          <span className="text-purple-900 ml-5 text-2xl font-bold">Fecha hasta</span>
          <DatePicker
            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div
                style={{
                  margin: 10,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  className="border-purple-900 border-2 rounded-md  text-purple-900 text-xl hover:bg-purple-900 hover:text-white transition duration-500 ease-in-out"
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                >
                  <KeyboardDoubleArrowLeftIcon />
                </button>
                <select
                  className="border-purple-900 border-2 rounded-md text-purple-900 text-xl hover:bg-purple-900 hover:text-white transition duration-500 ease-in-out h-13 w-15"
                  value={getYear(date)}
                  onChange={({ target: { value } }) => changeYear(value)}
                >
                  {years.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <select
                  className=" border-purple-900 border-2 rounded-md  text-purple-900 text-xl hover:bg-purple-900 hover:text-white transition duration-500 ease-in-out"
                  value={months[getMonth(date)]}
                  onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
                >
                  {months.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <button
                  className="border-purple-900 border-2 rounded-md  text-purple-900 text-xl hover:bg-purple-900 hover:text-white transition duration-500 ease-in-out"
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                >
                  <KeyboardDoubleArrowRightIcon />
                </button>
              </div>
            )}
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            startDate={startDate}
            endDate={endDate}
            dateFormat="dd-MM-yyyy"
            minDate={startDate}
            className="mx-2 border-purple-900 border-2 rounded-md p-3 font-bold text-purple-900 text-xl hover:bg-purple-900 hover:text-white transition duration-500 ease-in-out h-15 w-40"
          />
        </Grid>
        <Grid item xs>
          <Button
            onClick={SelectDates}
            variant="extended"
            className=" text-white bg-gradient-to-r from-purple-800 to-orange-800 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            <SearchIcon sx={{ mr: 1 }} />
            Buscar Fechas
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} columns={12}>
          <Grid item xs={6}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                fontSize: 30,
                fontWeight: "bold",
                fontFamily: "Roboto",
                color: "white",
                textAlign: "center",
                marginTop: 2,
                marginBottom: 2,
                backgroundColor: purple[700],
                borderRadius: 1,
                padding: 1,
              }}
            >
              <span className="text-2xl font-bold">Cantidad de Turnos: {turnosTotales} </span>
            </Typography>
            <ResponsiveContainer width="100%" height="85%">
              <AreaChart
                width={500}
                height={400}
                data={dataTurnosMes}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis dataKey="" />
                <Tooltip />
                {/* <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} /> */}
                <Area type="monotone" color="purple[700]" dataKey="Turnos" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </Grid>
          <Grid item xs={6}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                fontSize: 30,
                fontWeight: "bold",
                fontFamily: "Roboto",
                color: "white",
                textAlign: "center",
                marginTop: 2,
                marginBottom: 2,
                backgroundColor: purple[700],
                borderRadius: 1,
                padding: 1,
              }}
            >
              <span className="text-2xl font-bold">Ventas Totales: ${ventasTotales}</span>
            </Typography>

            <ResponsiveContainer width="100%" height="85%">
              <AreaChart
                width={500}
                height={400}
                data={dataVentasMes}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis dataKey="" />
                <Tooltip />
                {/* <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} /> */}
                <Area type="monotone" dataKey="ventas" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
      </Box>

     
    </>
  );
}
