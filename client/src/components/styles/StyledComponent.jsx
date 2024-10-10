import { styled } from "@mui/material";
import { Link as LinkComponent } from 'react-router-dom'
export const VisuallyHiddenInput = styled("input")({
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    padding: 0,
    overflow: "hidden",
    position: "absolute",
    whitespace: "nowrap",
    width: 1
});
export const Link = styled(LinkComponent)({
    textDecoration:"none",
    color:"black",
    padidng:"1rem",
    ":hover":{
        "&:hover":{
            background: 'rgba(0,0,0,0.1)'
        }
    }
   
}
)

