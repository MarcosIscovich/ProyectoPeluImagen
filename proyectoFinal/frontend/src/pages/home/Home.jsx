import React, { useState, useEffect } from "react";
import "./home.css";
import { turnosWeek, turnosMonth } from "../../services/turnos";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import moment from "moment";
import Typography from "@mui/material/Typography";
import { purple } from "@mui/material/colors";
import ButtonPurple from "../../components/ButtonPurple";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
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

const MySwal = withReactContent(Swal);

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Home() {
  const todayDate = moment().format("YYYY-MM-DD HH:mm:ss");
  const WeekDate = moment().subtract(8, "days").format("YYYY-MM-DD HH:mm:ss");
  const MonthDate = moment().subtract(31, "days").format("YYYY-MM-DD HH:mm:ss");
  const [ventasSemanales, setVentasSemanales] = useState(0);
  const [ventasMensuales, setVentasMensuales] = useState(0);
  const [dataTurnos, setDataTurnos] = useState([]);
  const [dataVentas, setDataVentas] = useState([]);
  const [dataTurnosMes, setDataTurnosMes] = useState([]);
  const [dataVentasMes, setDataVentasMes] = useState([]);
  const [lastWeek, setLastWeek] = useState([...new Array(8)].map((_, i) => moment().subtract(i, "days").format("DD/MM/YYYY")));
  const [lastMonth, setLastMonth] = useState([...new Array(31)].map((_, i) => moment().subtract(i, "days").format("DD/MM/YYYY")));

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const years = range(1990, getYear(new Date()) + 1, 1);
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  /*  useEffect(() => {
    turnosSemana();
    turnosMes();
  }, ); */

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const OpenDatePicker = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const turnosSemana = async () => {
    let infoSemana = [];
    let infoVentasSemana = [];
    let fechasBack = {
      fechahoy: todayDate,
      fechaSemana: WeekDate,
    };
    const semanaTurnos = await turnosWeek(fechasBack);

    console.log("LASTWEEK", lastWeek);
    //transformo fecha de BD a formato DD/MM/YYYY
    semanaTurnos.data.map((turno) => {
      return (turno.fecha_concurrencia = moment(turno.fecha_concurrencia).format("DD/MM/YYYY"));
    });

    console.log("semanaTurnos", semanaTurnos.data);

    lastWeek.map((dia) => {
      let turnosDia = semanaTurnos.data.filter((turno) => turno.fecha_concurrencia === dia);

      return infoSemana.push({ name: dia, Turnos: turnosDia.length });
    });

    setDataTurnos(infoSemana);

    //calculo ventas por dia
    lastWeek.map((dia) => {
      let ventasDia = semanaTurnos.data.filter((turno) => turno.fecha_concurrencia === dia);

      let totalDia = 0;
      ventasDia.map((venta) => {
        return (totalDia += venta.precio);
      });
      return infoVentasSemana.push({ name: dia, ventas: totalDia });
    });
    setDataVentas(infoVentasSemana);
    console.log("infoVentasSemana", infoVentasSemana);

    //calculo ventas total en 7 dias
    let totalSemana = 0;
    infoVentasSemana.map((venta) => {
      return (totalSemana += venta.ventas);
    });
    setVentasSemanales(totalSemana);
  };

  const turnosMes = async () => {
    let infoMes = [];
    let infoVentasMes = [];
    try {
      let fechasBackMonth = {
        fechahoy: todayDate,
        fechaMes: MonthDate,
      };

      const mesTurnos = await turnosMonth(fechasBackMonth);
      //transformo fecha de BD a formato DD/MM/YYYY

      mesTurnos.data.map((turno) => {
        return (turno.fecha_concurrencia = moment(turno.fecha_concurrencia).format("DD/MM/YYYY"));
      });
      console.log("mesTurnos", mesTurnos);

      lastMonth.map((dia) => {
        let turnosDia = mesTurnos.data.filter((turno) => turno.fecha_concurrencia === dia);
        return infoMes.push({ name: dia, Turnos: turnosDia.length });
      });
      console.log("infoMes", infoMes);
      setDataTurnosMes(infoMes);

      //calculo ventas por dia
      lastMonth.map((dia) => {
        let ventasDia = mesTurnos.data.filter((turno) => turno.fecha_concurrencia === dia);

        let totalDia = 0;
        ventasDia.map((venta) => {
          return (totalDia += venta.precio);
        });
        return infoVentasMes.push({ name: dia, ventas: totalDia });
      });
      setDataVentasMes(infoVentasMes);
      console.log("infoVentasMes", infoVentasMes);
    } catch (error) {
      console.log(error);
    }
  };

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
    } else if (fechainicio > fechafin) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "La fecha de inicio debe ser menor a la fecha de fin",
      });
    } else {
      daycount = moment(fechafin).diff(moment(fechainicio), "days");
    }

    console.log("daycount", daycount);

    console.log("fechasBack", fechasBack);

    const result = await turnosMonth(fechasBack);

    console.log("result", result.data);

    let dias = [...new Array(daycount + 1)].map((_, i) => moment(fechainicio).add(i, "days").format("YYYY-MM-DD"));
    console.log("DIAS", dias);

    dias.map((dia) => {
      let turnosdia = result.data.filter((turno) => turno.fecha_concurrencia === dia);
      return DataTurnos.push({ name: dia, Turnos: turnosdia.length });
    });

    setDataTurnosMes(DataTurnos);

    console.log("result", DataTurnos);

    dias.map((dia) => {
      let ventasdia = result.data.filter((turno) => turno.fecha_concurrencia === dia);

      let totalDia = 0;
      ventasdia.map((venta) => {
        return (totalDia += venta.precio);
      });
      return ventasXdia.push({ name: dia, ventas: totalDia });
    });
    setDataVentasMes(ventasXdia);
  };

  return (
    <>
      <div className=" flex mx-15 pt-12 pb-2"></div>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "no-wrap",
          width: "30%",
        }}
      >
        {/*                         className="mx-2 border-purple-900 border-2 rounded-md p-3 text-purple-900 text-xl hover:bg-purple-900 hover:text-white transition duration-500 ease-in-out h-13 w-15"
         */}
        <DatePicker
          renderCustomHeader={({ date, changeYear, changeMonth, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
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
                <KeyboardDoubleArrowLeftIcon/>
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
          endDate={endDate}
          className="mx-2 border-purple-900 border-2 rounded-md p-3 font-bold text-purple-900 text-xl hover:bg-purple-900 hover:text-white transition duration-500 ease-in-out h-15 w-40"
        />

        <DatePicker
          renderCustomHeader={({ date, changeYear, changeMonth, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
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
                <KeyboardDoubleArrowLeftIcon/>
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
          minDate={startDate}
          className="mx-2 border-purple-900 border-2 rounded-md p-3 font-bold text-purple-900 text-xl hover:bg-purple-900 hover:text-white transition duration-500 ease-in-out h-15 w-40"
        />
        <Button className="mx-2 border-purple-900 border-2 rounded-md p-3 text-purple-900  hover:bg-purple-900 hover:text-white transition duration-500 ease-in-out h-13 w-15" aria-describedby={id} onClick={SelectDates}>
          Buscar Fechas
        </Button>
      </Box>

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
              <span className="text-2xl font-bold">Cantidad de Turnos</span>
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
              <span className="text-2xl font-bold">Ventas por dia</span>
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

      <Grid className="mt-10" container spacing={2} columns={12} justifyContent="center">
        <ButtonPurple aria-describedby={id} onClick={handleClick}>
          Ventas en la ultima semana
        </ButtonPurple>
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>${ventasSemanales}</Box>
        </Popper>
      </Grid>

      {/* <Typography
        gutterBottom
        variant="h5"
        component="div"
        sx={{
          fontSize: 30,
          fontWeight: "bold",
          fontFamily: "Roboto",
          color: "white",
          textAlign: "center",
          marginTop: 10,
          marginBottom: 2,
          backgroundColor: purple[700],
          borderRadius: 1,
          padding: 1,
        }}
      >
        <span className="text-2xl font-bold">Turnos en los ultimos 30 dias</span>
      </Typography>
      <ResponsiveContainer width="90%" height="40%">
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
          <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "40px" }} />
          <Area type="monotone" dataKey="Turnos" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>

      <ButtonPurple aria-describedby={id} onClick={turnosMes}>
        Ventas en la ultima semana
      </ButtonPurple>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>${ventasSemanales}</Box>
      </Popper> */}
    </>
  );
}
