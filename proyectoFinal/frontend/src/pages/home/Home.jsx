import React from 'react'
import './home.css'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';


export default function home() {
  return (
    <>
      <div className=" flex mx-15 pt-12 pb-2">

      <Button
          
          variant="extended"
          className="text-white bg-gradient-to-r from-purple-800 to-orange-800 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          <AddIcon sx={{ mr: 1 }} />
         Este es el HOME
        </Button>
      </div>
    
    </>
  )
}
