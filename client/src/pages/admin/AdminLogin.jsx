import { useInputValidation } from "6pp";
import LoginIcon from "@mui/icons-material/Login";
import {
    Button,
    Container,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import React from "react";
import { Navigate } from "react-router-dom";
const isAdmin=false;
const AdminLogin = () => {
    const secretKey = useInputValidation("")
    const submitLogin = (e) => {
        e.preventDefault();
        console.log("submit");
    }
    if(isAdmin) return <Navigate to={'/admin/dashboard'} />
    return (
        <Container
            component={"main"}
            maxWidth="xs"
            sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography variant="h4">Admin Login</Typography>
                <form style={{ width: "100%", marginTop: "1rem" }} onSubmit={submitLogin}>
                    <TextField
                        required
                        label="Secret Key"
                        type="password"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        value={secretKey.value}
                        onChange={secretKey.changeHandler}
                    />
                    <Button
                        variant="text"
                        color="success"
                        type="submit"
                        startIcon={<LoginIcon />}
                        fullWidth
                    >
                        Login
                    </Button>
                </form>
            </Paper>
        </Container>
    )
}

export default AdminLogin