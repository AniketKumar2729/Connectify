import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'
const DeleteDialog = ({ open, handleClose, deleteHandler }) => {
    return (

        <Dialog open={open} onClose={handleClose} sx={{position:'absolute',bottom:'10%',left:'27%'}}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this group
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button color='error' onClick={deleteHandler}>Yes</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteDialog