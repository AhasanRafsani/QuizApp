import react, { useState } from "react";
import {useHistory} from "react-router-dom";

import {Container,Paper,Box,Typography,TextField,MenuItem,Button} from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStyle = makeStyles({
  root:{
    height:"400px",
    width:"400px",
    marginTop:"20px"

  },
  
});

export interface InitUser{
  name:string,
  gender:string,
  lang:string,
}
const Home:React.FC = ()=>{

    const [user,setUser] = useState<InitUser>({
      name:"",
      gender:"",
      lang:""
    });
   
    const history = useHistory();


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>):void=>{
        setUser({...user,[e.target.name]:e.target.value})
    }
     const handleSubmit = ():void=>{
       console.log(user);
       history.push("/Exam",user)
     }
     const classes = useStyle(); 
    return (
     <>
       <Container maxWidth="sm" component={Paper} className={classes.root}>
              <Typography color="primary" align="center" variant="h6">User Input</Typography>
                  <Box pt="15px">
                     <form onSubmit={handleSubmit}>
                     <TextField fullWidth variant="outlined" label="Enter Your Name" value={user.name} name="name"  onChange={handleInputChange} />

                     <TextField fullWidth label="Select Gender" name="gender" onChange={handleInputChange} value={user.gender} sx={{marginTop:"10px"}} select >
                         <MenuItem value="male">Male</MenuItem>
                         <MenuItem value="female">Female</MenuItem>
                     </TextField>

                     <TextField fullWidth label="Select language"  name="lang" onChange={handleInputChange} value={user.lang} sx={{marginTop:"10px"}} select >
                         <MenuItem value="React">React</MenuItem>
                         <MenuItem value="Html">Html</MenuItem>
                     </TextField>
                      <Button fullWidth type="submit" variant="contained" sx={{marginTop:"10px"}}>Submit</Button>
                      </form>
                  </Box>
               
      </Container>
     </>

    );

}

export default Home;