import { Grid2,Skeleton, Stack } from '@mui/material'
import React from 'react'

export const LayoutLoader = () => {
  return (
    <>
          <Grid2 container height={`calc(100vh - 4rem)`} spacing={"1rem"}>
          <Grid2 md={3} sm={4} sx={{display:{xs:'none',sm:'block'}}} size={4} height={"100%"}>
          <Skeleton variant='rectangular' height={"100vh"}/>
          </Grid2>
          <Grid2 xs={12} sm={8} md={5} lg={6} size={4} height={"100%"} >
          <Stack spacing={"1rem"}>

          {
            Array.from({length:10}).map((_,idx)=>(
              <Skeleton key={idx} variant='rounded' height={"5rem"}/>
            ))
          }
          </Stack>
          <Skeleton variant='rectangular' height={""}/>
          </Grid2>
          <Grid2  md={4} lg={6}  size={4} sx={{display:{xs:'none',md:'block'}}} height={"100%"}>
          <Skeleton variant='rectangular' height={"100vh"}/>
          </Grid2>
        </Grid2>
    </>
  )
}