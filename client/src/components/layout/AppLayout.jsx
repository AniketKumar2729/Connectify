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
          <Grid2  size={4} height={"100%"}>
            First
          </Grid2>
          <Grid2 size={4} height={"100%"} bgcolor="primary.main">
            {<WrappedComponent {...props} />}
          </Grid2>
          <Grid2 size={4} height={"100%"}>
            Third
          </Grid2>
        </Grid2>
        {/* <Grid2 container spacing={2} bgcolor={"error.main"} height={`calc(100vh - 4rem)`}>
          <Grid2 size={8}>
            size=8
          </Grid2>
          <Grid2 size={4}>
           size 4
          </Grid2>
          <Grid2 size={4}>
            size 4
          </Grid2>
          <Grid2 size={8}>
            size 8
          </Grid2>
        </Grid2> */}
      </>
    );
  };
};

export default AppLayout;
