import { styled } from "@mui/material";
import { Link as LinkComponent } from 'react-router-dom'
import { gray } from "../../constants/color.js";
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
    textDecoration: "none",
    color: "black",
    padidng: "1rem",
    ":hover": {
        "&:hover": {
            background: 'rgba(0,0,0,0.1)'
        }
    }

}
)
export const InputBox = styled('input')({
    width: "100%",
    height: "100%",
    border: "none",
    outline: "none",
    padding:"0 3rem",
    borderRadius:"1.5rem",
    backgroundColor:`#F3F7EC`

})

