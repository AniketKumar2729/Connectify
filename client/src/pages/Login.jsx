import React, { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Typography,
  Button,
  Stack,
  Avatar,
  IconButton,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { VisuallyHiddenInput } from "../components/styles/StyledComponent";

function Login() {
  const [islogin, setIsLogin] = useState(true);
  return (
    <>
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
          {islogin ? (
            <>
              <Typography variant="h4">Login</Typography>
              <form style={{ width: "100%", marginTop: "1rem" }}>
                <TextField
                  required
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  required
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  fullWidth
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
                <Typography textAlign={"center"} m={"1rem"}>
                  Or
                </Typography>
                <Button
                  variant="text"
                  color="secondary"
                  onClick={() => setIsLogin(false)}
                  startIcon={<HowToRegIcon />}
                  fullWidth
                >
                  Signup
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography variant="h4">Signup </Typography>
              <form style={{ width: "100%", marginTop: "1rem" }}>
                <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                  <Avatar
                    sx={{
                      width: "10rem",
                      height: "10rem",
                      objectFit: "contain",
                    }}
                  />
                  <IconButton
                    sx={{ position: "absolute", bottom: 0, right: 0,color:"white",bgcolor:"rgba(0,0,0,0.5)",":hover":{bgcolor:"rgba(0,0,0,0.7)"}}}
                    component="label"
                  >
                    <>
                      <CameraAltIcon />
                      <VisuallyHiddenInput type="file" />
                    </>
                  </IconButton>
                </Stack>
                <TextField
                  required
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  required
                  label="Name"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  required
                  label="Bio"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  required
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
                <Button
                  variant="text"
                  color="secondary"
                  type="submit"
                  startIcon={<LoginIcon />}
                  fullWidth
                >
                  Signup
                </Button>
                <Typography textAlign={"center"} m={"1rem"}>
                  Or
                </Typography>
                <Button
                  variant="text"
                  color="success"
                  onClick={() => setIsLogin(true)}
                  startIcon={<HowToRegIcon />}
                  fullWidth
                >
                  Login
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </>
  );
}

export default Login;
