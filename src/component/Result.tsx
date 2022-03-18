import React from "react";
import {useLocation} from "react-router-dom"
import {Typography,Grid} from "@mui/material";

interface IState{
    ansCount:number,
    count:number  
}

const Result:React.FC = ()=>{
    const {state} = useLocation<IState>();

    const deg = (a: number, b: number) => {
        return (360 * a) / (a + b);
    }

    return(
     <>
        <Grid container direction="column" justifyContent="center">
           <Typography color="red" variant="h5" sx={{margin:"10px"}}>Wrong Answer : 0{state.count - state.ansCount}</Typography>
           <Typography color="green" variant="h5" sx={{margin:"10px"}}>Right Answer : 0{state.ansCount}</Typography>
           <div style={{ height:"300px",
                         width:"300px",
                         border:"1px solid red",
                         backgroundImage: `conic-gradient(
                           green 0deg ${deg(state.ansCount, state.count - state.ansCount)}deg, 
                           red ${deg(state.ansCount, state.count - state.ansCount)}deg 360deg)
                           `,
                         borderRadius:"50%",
                         margin:"30px auto"
                        }}>


            </div>
        </Grid>
     </>

    );

}
export default Result;
