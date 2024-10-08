import React from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { Grid2 } from "@mui/material";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    return (
      <>
        <Title />
        <Header />
        <Grid2 container height={`calc(100vh - 4rem)`}>
          <Grid2 md={3} sm={4} sx={{display:{xs:'none',sm:'block'}}} size={4} height={"100%"}>
            First
          </Grid2>
          <Grid2 xs={12} sm={8} md={5} lg={6} size={4} height={"100%"} >
            {<WrappedComponent {...props} />}
          </Grid2>
          <Grid2  md={4} lg={6}  size={4} sx={{display:{xs:'none',md:'block'},padding:"2rem",bgcolor:"rgba(0,0,0,0.85)"}} height={"100%"}>
            Third
          </Grid2>
        </Grid2>
      </>
    );
  };
};

export default AppLayout;
