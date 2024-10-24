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

export const SearchField=styled('input')`
padding:1rem 2rem;
width:20vmax;
border:none;
outline:none;
border-radius:1rem;
background-color:#f1f1f1;
font-size:1.1rem
`
export const CurveBtn=styled('button')`
border-radius:1rem;
padding:1rem 2rem;
border: none;
outline: none;
cursor: pointer;
background-color: black;
color: white;
font-size:1rem;
&:hover{
    background-color:rgba(0,0,0,0.8);
}
`