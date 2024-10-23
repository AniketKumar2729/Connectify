import React from 'react'
import Container from '@mui/material/Container';
import { DataGrid } from "@mui/x-data-grid";
import { Paper, Typography } from '@mui/material';
const Table = ({rows,columns,heading,rowHeight=52}) => {
    return (
        <Container sx={{border:'2px solid green',height:'100vh'}}>
            <Paper elevation={3} sx={{padding:'1rem 4rem',width:'100%',height:'100%',borderRadius:'1rem',margin:'auto',boxShadow:'none',overflow:'hidden'}}>
                <Typography textAlign={'center'} variant='h4' sx={{margin:'2rem',textTransform:'uppercase'}}>{heading}</Typography>
                <DataGrid rows={rows} columns={columns} rowHeight={rowHeight} style={{height:"80%",backgroundColor:"lightblue"}} sx={{border:'none',".table-header":{bgcolor:"blueviolet",color:'white'}}}/>
            </Paper>
        </Container>
  )
}

export default Table