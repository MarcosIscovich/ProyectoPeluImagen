import React, { useState, useEffect } from "react";
import "./home.css";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { turnosWeek, turnosMonth } from "../../services/turnos";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart, Bar, Brush, ReferenceLine, Legend } from "recharts";
import moment from "moment";
import Typography from "@mui/material/Typography";
import { purple } from "@mui/material/colors";
import ButtonPurple from "../../components/ButtonPurple";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Home() {
  const [turnosMonthData, setTurnosMonthData] = useState([]);
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
  /* moment().subtract(7, "days").format("DD/MM/YYYY"),
    moment().subtract(6, "days").format("DD/MM/YYYY"),
    moment().subtract(5, "days").format("DD/MM/YYYY"),
    moment().subtract(4, "days").format("DD/MM/YYYY"),
    moment().subtract(3, "days").format("DD/MM/YYYY"),
    moment().subtract(2, "days").format("DD/MM/YYYY"),
    moment().subtract(1, "days").format("DD/MM/YYYY"),
    moment().format("DD/MM/YYYY"), */
  const [lastMonth, setLastMonth] = useState([...new Array(31)].map((_, i) => moment().subtract(i, "days").format("DD/MM/YYYY")));

  useEffect(() => {
    turnosSemana();
    turnosMes();
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
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

  return (
    <>
      <div className=" flex mx-15 pt-12 pb-2"></div>

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
              <span className="text-2xl font-bold">Turnos en los ultimos 7 dias</span>
            </Typography>
            <ResponsiveContainer width="90%" height="80%">
              <AreaChart
                width={500}
                height={400}
                data={dataTurnos}
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
                <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
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
              <span className="text-2xl font-bold">Ventas en los ultimos 7 dias</span>
            </Typography>

            <ResponsiveContainer width="90%" height="80%">
              <AreaChart
                width={500}
                height={400}
                data={dataVentas}
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
                <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
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
                <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
                <Area type="monotone" color="purple[700]" dataKey="Turnos" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
   

      <ButtonPurple aria-describedby={id} onClick={turnosMes}>
        Ventas en la ultima semana
      </ButtonPurple>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>${ventasSemanales}</Box>
      </Popper>
    </>
  );
}
