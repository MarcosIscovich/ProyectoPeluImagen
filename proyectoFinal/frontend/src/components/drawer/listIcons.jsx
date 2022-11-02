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
        <List   sx={{
          backgroundColor: "#5b6290",
          height: "100%",
        }}
        
        >
        <ListItem  >
                <Link to="/" style={{ textDecoration: 'none'}}>
                <ListItemButton sx={{     
                  px: 1,
                }}
                >
                    <ListItemIcon sx={{
                    minWidth: 5,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',                    
                    color: "#e82f34",
                    
                  }}
                  >                   
                     <IoHome className='grid grid-cols-1 place-items-center' />    
                    </ListItemIcon>
                    <ListItemText primary="Pagina Principal" className="text-white border-zinc-900 "/>   
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
                    color: "#e82f34",
                  }}
                  
                  >                   
                     <GiHairStrands />    
                    </ListItemIcon>
                    <ListItemText primary="Servicios" className="text-white border-zinc-900" />   
                </ListItemButton>
                </Link> 
            </ListItem>
            
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
                    color: "#e82f34",
                    
                  }}
                  >                   
                     <MdStore />    
                    </ListItemIcon>
                    <ListItemText primary="Productos" className="text-white border-zinc-900" />   
                </ListItemButton>
                </Link> 
            </ListItem>
            <ListItemText primary="Clientes" className=" ml-3 border-zinc-900 text-white " />
            <ListItem  >
                <Link to="/clientes" style={{ textDecoration: 'none' }}>
                <ListItemButton sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 1,
                }}
                
                >
                    <ListItemIcon sx={{
                    minWidth: 5,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: "#e82f34",
                  }}
                  >                   
                     <BsFillJournalBookmarkFill />    
                    </ListItemIcon>
                    <ListItemText primary="Agenda" className="text-white border-zinc-900" />   
                </ListItemButton>
                </Link> 
                
                
                
            </ListItem>
            <Divider sx={{
          backgroundColor: "#F15338",
        }}  />
            <ListItemText primary="Turnos" className="ml-3 border-zinc-900 text-white " />
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
                    color: "#e82f34",
                    justifyContent: 'center',
                  }}
                  >                   
                     <BsCalendar2Plus />    
                    </ListItemIcon>
                    <ListItemText className="text-white border-zinc-900" primary="Turnos" />   
                </ListItemButton>
                </Link> 
            </ListItem>
        </List>

        {/* <Divider sx={{
          backgroundColor: "#F15338",
        }}  />

        <List sx={{
          backgroundColor: "#5b6290",
          height: "663px"
        }}  >
          <ListItemText primary="Clientes" className=" ml-3 border-zinc-900 text-white " />
            <ListItem  >
                <Link to="/clientes" style={{ textDecoration: 'none' }}>
                <ListItemButton sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 1,
                }}
                
                >
                    <ListItemIcon sx={{
                    minWidth: 5,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: "#e82f34",
                  }}
                  >                   
                     <BsFillJournalBookmarkFill />    
                    </ListItemIcon>
                    <ListItemText primary="Agenda" className="text-white border-zinc-900" />   
                </ListItemButton>
                </Link> 
                
                
                
            </ListItem>
            <Divider sx={{
          backgroundColor: "#F15338",
        }}  />
            <ListItemText primary="Turnos" className="ml-3 border-zinc-900 text-white " />
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
                    color: "#e82f34",
                    justifyContent: 'center',
                  }}
                  >                   
                     <BsCalendar2Plus />    
                    </ListItemIcon>
                    <ListItemText className="text-white border-zinc-900" primary="Turnos" />   
                </ListItemButton>
                </Link> 
            </ListItem>
            
        </List> */}

      
        </div>

    )}