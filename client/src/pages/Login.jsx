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
import {useFileHandler, useInputValidation,useStrongPassword} from "6pp"
import { usernameValidator } from "../lib/validators.js";
function Login() {
  const [islogin, setIsLogin] = useState(true);
  const name=useInputValidation("");
  const bio=useInputValidation("");
  const username=useInputValidation("",usernameValidator);
  const password=useStrongPassword();
  const avatar=useFileHandler("single");
  const handleLogin=(e)=>{
    e.preventDefault();
  }
  const handleSignup=(e)=>{
    e.preventDefault();

  }
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
              <form style={{ width: "100%", marginTop: "1rem" }}  onSubmit={handleLogin}>
                <TextField
                  required
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  value={username.value}
                  onChange={username.changeHandler}

                />
                <TextField
                  required
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  value={password.value}
                  onChange={password.changeHandler}
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
              <form style={{ width: "100%", marginTop: "1rem" }} onSubmit={handleSignup}>
                <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                  <Avatar
                    sx={{
                      width: "10rem",
                      height: "10rem",
                      objectFit: "contain",
                    }}
                    src={avatar.preview}
                  />
                  {avatar.error&&  <Typography color="error" variant="caption">{avatar.error}</Typography>}
                  <IconButton
                    sx={{ position: "absolute", bottom: 0, right: 0,color:"white",bgcolor:"rgba(0,0,0,0.5)",":hover":{bgcolor:"rgba(0,0,0,0.7)"}}}
                    component="label"
                  >
                    <>
                      <CameraAltIcon />
                      <VisuallyHiddenInput type="file" onChange={avatar.changeHandler} />
                    </>
                  </IconButton>
                </Stack>
                <TextField
                  required
                  label="Name"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  value={name.value}
                  onChange={name.changeHandler}
                />
                <TextField
                  required
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  value={username.value}
                  onChange={username.changeHandler}
                />
                {
                  username.error &&   <Typography color="error" variant="caption">{username.error}</Typography>
                }
                <TextField
                  required
                  label="Bio"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  value={bio.value}
                  onChange={bio.changeHandler}
                />
                <TextField
                  required
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  value={password.value}
                  onChange={password.changeHandler}
                />
                {password.error &&  <Typography color="error" variant="caption">{password.error}</Typography>}
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