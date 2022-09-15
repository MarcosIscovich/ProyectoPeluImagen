import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { ListItemButton } from "@mui/material";
import Divider from "@mui/material/Divider";
import {Link}from "react-router-dom";
//import { GiBarbedNails } from "react-icons/gi";
import { BsFillJournalBookmarkFill , BsCalendarCheck ,BsCalendar2Plus } from "react-icons/bs";
import { GiHairStrands} from "react-icons/gi";
import { MdStore }  from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { GiNotebook } from "react-icons/gi";



    


export default function ListIcons(props) {
    const open = props.open;
    return (
        <div>
        <List>
        <ListItem >
                <Link to="/" style={{ textDecoration: 'none' }}>
                <ListItemButton sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 1,
                }}>
                    <ListItemIcon sx={{
                    minWidth: 5,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color : 'primary.main',
                  }}>                   
                     <IoHome className='grid grid-cols-1 place-items-center' />    
                    </ListItemIcon>
                    <ListItemText primary="Pagina Principal" />   
                </ListItemButton>
                </Link> 
            </ListItem>
            <ListItem >
                <Link to="/servicios" style={{ textDecoration: 'none' }}>
                <ListItemButton sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 1,
                }}>
                    <ListItemIcon sx={{
                    minWidth: 5,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color : 'primary.main',
                  }}>                   
                     <GiHairStrands />    
                    </ListItemIcon>
                    <ListItemText primary="Servicios" />   
                </ListItemButton>
                </Link> 
            </ListItem>
            {/* <ListItem >
                <Link to="/productos" style={{ textDecoration: 'none' }}>
                <ListItemButton sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 1,
                }}>
                    <ListItemIcon sx={{
                    minWidth: 5,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}>                   
                     <GiBarbedNails />    
                    </ListItemIcon>
                    <ListItemText primary="Servicios Uñas" />   
                </ListItemButton>
                </Link> 
            </ListItem> */}
            <ListItem >
                <Link to="/productos" style={{ textDecoration: 'none' }}>
                <ListItemButton sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 1,
                }}>
                    <ListItemIcon sx={{
                    minWidth: 5,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color : 'primary.main',
                  }}>                   
                     <MdStore />    
                    </ListItemIcon>
                    <ListItemText primary="Productos" />   
                </ListItemButton>
                </Link> 
            </ListItem>
        </List>

        <Divider />

        <List className="mx-2" subheader="Clientes" dense>
          
            <ListItem >
                <Link to="/clientes" style={{ textDecoration: 'none' }}>
                <ListItemButton sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 1,
                }}>
                    <ListItemIcon sx={{
                    minWidth: 5,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color : 'primary.main',
                  }}>                   
                     <BsFillJournalBookmarkFill />    
                    </ListItemIcon>
                    <ListItemText primary="Agenda" />   
                </ListItemButton>
                </Link> 
            </ListItem>
            <ListItem >
                <Link to="/fichas" style={{ textDecoration: 'none' }}>
                <ListItemButton sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 1,
                }}>
                    <ListItemIcon sx={{
                    minWidth: 5,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color : 'primary.main',
                  }}>                   
                     <GiNotebook />    
                    </ListItemIcon>
                    <ListItemText primary="Ficha de Clientes" />   
                </ListItemButton>
                </Link> 
            </ListItem>
        </List>

        <Divider />

        <List className="mx-2" subheader="Turnos" dense>
            <ListItem >
                <Link to="/turnos" style={{ textDecoration: 'none' }}>
                <ListItemButton sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 1,
                }}>
                    <ListItemIcon sx={{
                    minWidth: 5,
                    mr: open ? 3 : 'auto',
                    color : 'primary.main',
                    justifyContent: 'center',
                  }}>                   
                     <BsCalendar2Plus />    
                    </ListItemIcon>
                    <ListItemText primary="Turnos" />   
                </ListItemButton>
                </Link> 
            </ListItem>
            <ListItem >
                <Link to="/clientes" style={{ textDecoration: 'none' }}>
                <ListItemButton sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 1,
                }}>
                    <ListItemIcon sx={{
                    minWidth: 5,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color : 'primary.main',
                    hover: 'su',
                  }}>                   
                     <BsCalendarCheck />    
                    </ListItemIcon>
                    <ListItemText primary="Ver Turnos" />   
                </ListItemButton>
                </Link> 
            </ListItem>
        
          {/* {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 1,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 5,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 5 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 5 }} />
              </ListItemButton>
            </ListItem>
          ))} */}
        </List>
      
        </div>

    )}