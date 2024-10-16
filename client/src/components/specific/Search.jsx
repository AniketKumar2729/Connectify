import React from 'react'
import {Dialog, DialogTitle, InputAdornment, List, Stack, TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {useInputValidation} from "6pp";

const Search = () => {
  const search=useInputValidation("")
  return (
    <Dialog open>
      <Stack p={'2rem'} direction={'column'}alignItems={'center'} width={'25rem'}>
      <DialogTitle textAlign={'center'}>Find People</DialogTitle>
      <TextField label="" value={search.value} onChange={search.changeHandler} variant='outlined' size='small' slotProps={{input:{
        startAdornment:(
          <InputAdornment position="start">
          <SearchIcon/>
        </InputAdornment>
        )
      }}}
      />
      
      </Stack>
    </Dialog>
  )
}

export default Search