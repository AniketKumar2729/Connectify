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
import { useFileHandler, useInputValidation, useStrongPassword } from "6pp"
import { usernameValidator } from "../lib/validators.js";
import { server } from '../constants/config.js';
import { useDispatch } from "react-redux";
import { userExist } from "../redux/reducers/auth.reducer.js";
import toast from "react-hot-toast";
function Login() {
  const [islogin, setIsLogin] = useState(true);
  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useStrongPassword();
  const avatar = useFileHandler("single");
  const dispatch = useDispatch()
  const handleLogin = (e) => {
    e.preventDefault();
    const login = async () => {
      try {
        const loginResponse = await fetch(`${server}/user/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: username.value,
            password: password.value
          })
        });

        if (!loginResponse.ok) {
          throw new Error(`HTTP error! Status: ${loginResponse.status}`);
        }
        const data = await loginResponse.json(); // Await the parsed JSON
        console.log("Response:", loginResponse, "\nData:", data);
        dispatch(userExist(true))
        if (!loginResponse.ok)
          toast.error(data?.message || "Something went wrong")
        else
          toast.success(data.message)
      } catch (err) {
        console.log("Error message coming for login.jsx:", err);
        // toast.error(error?.response?.data?.message || "Something went wrong")
      }
    };
    login();
  };

  // const handleSignup = (e) => {
  //   e.preventDefault();
  // const signup=async()=>{
  //   try {
  //     const signupResponse=await fetch(`${server}/api/user/v1/signup`,{
  //       method:"POST",
  //       headers:{
  //        "Content-Type": "application/json"
  //       },
  //       body:JSON.stringify({
  //         name:name.value,
  //         username:username.value,
  //         bio:bio.value,
  //         password:password.value
  //       })
  //     })
  //     const data= await signupResponse.json()
  //     console.log("Response\t"+signupResponse+"Data\t"+data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // signup()
  // }
  const handleSignup = (e) => {
    e.preventDefault();

    const signup = async () => {
        try {
            const signupResponse = await fetch(`${server}/api/user/v1/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name.value, // Ensure these are valid inputs or state variables
                    username: username.value,
                    bio: bio.value,
                    password: password.value,
                }),
            });            
            // Check for HTTP response status
            if (!signupResponse.ok) {
                throw new Error(`Signup failed with status: ${signupResponse.status} ${signupResponse.statusText}`);
            }

            // Parse response JSON
            const data = await signupResponse.json();
            console.log("Response:", signupResponse);
            console.log("Data:", data);
            // dispatch(userExist(true))
            toast.success(data.message)
        } catch (error) {
            console.error("Error during signup:", error.message);
            toast.error(error?.response?.data?.message||"Something went wrong")
        }
    };

    signup();
};

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
              <form style={{ width: "100%", marginTop: "1rem" }} onSubmit={handleLogin}>
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
                  {avatar.error && <Typography color="error" variant="caption">{avatar.error}</Typography>}
                  <IconButton
                    sx={{ position: "absolute", bottom: 0, right: 0, color: "white", bgcolor: "rgba(0,0,0,0.5)", ":hover": { bgcolor: "rgba(0,0,0,0.7)" } }}
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
                  username.error && <Typography color="error" variant="caption">{username.error}</Typography>
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
                {password.error && <Typography color="error" variant="caption">{password.error}</Typography>}
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