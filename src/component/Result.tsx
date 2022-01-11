import react from "react";
import {useLocation} from "react-router-dom"
import {Typography,Box} from "@mui/material";


const Result:React.FC = ()=>{
    const {state} = useLocation<{ansCount:number,count:number}>();

    const deg = (a: number, b: number) => {
        return (360 * a) / (a + b);
    }

    return(
     <>
        <Typography color="secondary" variant="h6">Wrong Answer :{state.count - state.ansCount}</Typography>
        <Typography color="primary" variant="h6">Right Answer :{state.ansCount}</Typography>
         <div style={{ height:"300px",
                    width:"300px",
                    border:"1px solid red",
                    backgroundImage: `conic-gradient(
                        green 0deg ${deg(state.ansCount, state.count - state.ansCount)}deg, 
                        red ${deg(state.ansCount, state.count - state.ansCount)}deg 360deg)
                        `,
                    borderRadius:"50%",
                    margin:"auto"
                    }}>


         </div>
         
     </>

    );

}
export default Result;
