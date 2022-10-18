import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Face } from "@mui/icons-material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MailIcon from "@mui/icons-material/Mail";
import Badge from "@mui/material/Badge";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Routes, Route } from "react-router-dom";
import Clientes from "../../pages/clientes/clientes";
import Productos from "../../pages/productos/productos";
import Servicios from "../../pages/tipoServicio/servicios";
import FichaClientes from "../../pages/fichaCliente/fichaCliente";
import Turnos from "../../pages/turnos/turnos";
import EventIcon from '@mui/icons-material/Event';
import Logo from "../../images/logo.jpg";
import { Button } from "@mui/material";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { ListItemButton } from "@mui/material";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { Link } from "react-router-dom";
//import { GiBarbedNails } from "react-icons/gi";
import { BsFillJournalBookmarkFill, BsCalendar2Plus } from "react-icons/bs";
import ContentCutIcon from '@mui/icons-material/ContentCut';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { IoHome } from "react-icons/io5";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';



const drawerWidth = 255;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  width: "drawerWidth",
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));



export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [openClientes, setOpenClientes] = React.useState(false);
  const [openTurnos, setOpenTurnos] = React.useState(false);
  const [openServicios, setOpenServicios] = React.useState(false);
  const [openProductos, setOpenProductos] = React.useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleClickClientes = () => {
    setOpenClientes(!openClientes);
  };
  const handleClickTurnos = () => {
    setOpenTurnos(!openTurnos);
  };
  const handleClickServicios = () => {
    setOpenServicios(!openServicios);
  };
  const handleClickProductos = () => {
    setOpenProductos(!openProductos);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ display: "flex" }} >
      <CssBaseline />
      <AppBar className="bg-zinc-900" position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Peluqueria Imagen
          </Typography>

          <Box sx={{ flexGrow: 1 }} className="bg-violet-100" />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader className="mx-0 px-0">
          <Button onClick={handleDrawerClose} className="mx-0 px-0 py-0">
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <img src={Logo} alt="" width={"100%"} />}
          </Button>
        </DrawerHeader>
        {/* <ListIcon open="open"/> */}
        <List
          sx={{
            backgroundColor: "#5b6290",
            height: "100%",
          }}
        >
          <ListItem>
            <Link to="/" style={{ textDecoration: "none" }}>
              <ListItemButton
                sx={{
                  ml: 4,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 5,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "#e82f34",
                  }}
                >
                  <IoHome className="grid grid-cols-1 place-items-center" />
                </ListItemIcon>
                <ListItemText primary="Pagina Principal" className="text-white border-zinc-900 " />
              </ListItemButton>
            </Link>
          </ListItem>

          <Divider
            sx={{
              backgroundColor: "#F15338",
            }}
          />
          <ListItemButton onClick={handleClickServicios} className="rounded-full border-purple-500  ">
        <ListItemIcon>
        <ContentCutIcon sx={{color : "#ef916d"}} />
        </ListItemIcon>
        <ListItemText primary="Servicios" className="ml-3 border-pink-600 text-white outline-black  " />
        {openServicios ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openServicios} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
          <ListItem>
            <Link to="/servicios" style={{ textDecoration: "none" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 5,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "#e82f34",
                  }}
                >
                  <LibraryAddIcon />
                </ListItemIcon>
                <ListItemText primary="Nuevo Servicio" className="text-white border-zinc-900" />
              </ListItemButton>
            </Link>
          </ListItem>
          </ListItemButton>
        </List>
      </Collapse>

      <Divider
            sx={{
              backgroundColor: "#F15338",
            }}
          />

      <ListItemButton onClick={handleClickProductos}>
        <ListItemIcon>
          <ProductionQuantityLimitsIcon sx={{color : "#ef916d"}} />
        </ListItemIcon>
        <ListItemText primary="Productos" className="ml-3 border-zinc-900 text-white " />
        {openProductos ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openProductos} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
          <ListItem>
            <Link to="/productos" style={{ textDecoration: "none" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 5,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "#e82f34",
                  }}
                >
                  <LibraryAddIcon />
                </ListItemIcon>
                <ListItemText primary="Nuevo Producto" className="text-white border-zinc-900" />
              </ListItemButton>
            </Link>
          </ListItem>
          <Divider
            sx={{
              backgroundColor: "#F15338",
            }}
          />
          </ListItemButton>
        </List>
      </Collapse>


      <Divider
            sx={{
              backgroundColor: "#F15338",
            }}
          />


<ListItemButton onClick={handleClickClientes}>
        <ListItemIcon>
          <Face sx={{color : "#ef916d"}} />
        </ListItemIcon>
        <ListItemText primary="Clientes" className=" ml-3 border-zinc-900 text-white " />
        {openClientes ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openClientes} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
          <ListItem>
            <Link to="/clientes" style={{ textDecoration: "none" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 5,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "#e82f34",
                  }}
                >
                  <BsFillJournalBookmarkFill />
                </ListItemIcon>
                <ListItemText primary="Agenda de Clientes" className="text-white border-zinc-900" />
              </ListItemButton>
            </Link>
          </ListItem>
          </ListItemButton>
        </List>
      </Collapse>


      




          <Divider
            sx={{
              backgroundColor: "#F15338",
            }}
          />

<ListItemButton onClick={handleClickTurnos}>
        <ListItemIcon>
          <EventIcon sx={{color : "#ef916d"}} />
        </ListItemIcon>
        <ListItemText primary="Turnos" className="ml-3 border-zinc-900 text-white " />
        {openTurnos ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openTurnos} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
          <ListItem>
            <Link to="/turnos" style={{ textDecoration: "none" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 5,
                    mr: open ? 3 : "auto",
                    color: "#e82f34",
                    justifyContent: "center",
                  }}
                >
                  <BsCalendar2Plus />
                </ListItemIcon>
                <ListItemText className="text-white border-zinc-900" primary="Ver Turnos" />
              </ListItemButton>
            </Link>
          </ListItem>
          </ListItemButton>
        </List>
      </Collapse>
          
          
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/fichas" element={<FichaClientes />} />
          <Route path="/turnos" element={<Turnos />} />
        </Routes>
      </Box>
    </Box>
  );
}
