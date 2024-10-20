import { Menu } from '@mui/material'
import React from 'react'

const FileMenu = ({anchor}) => {
  return (
    <Menu  anchorEl={anchor} open={false }>
        <div style={{width:'10rem'}}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure dignissimos amet distinctio inventore excepturi sit accusamus saepe exercitationem? Soluta numquam suscipit, maxime inventore modi alias consectetur libero est velit cupiditate.</div>
    </Menu>
  )
}

export default FileMenu