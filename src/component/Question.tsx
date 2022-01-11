import React from "react";
import {multipleChoice,
       fillInTheBlank,
       multiSelect,
       trueFalse,
       followingMatch,
       InitQuestion,
       } from "../json/question";

import {FormControl,FormControlLabel,Radio,Checkbox,Box,Typography,RadioGroup ,Table,TableBody,TableRow,TableCell} from "@mui/material"
interface Iprop{
    currentQ:InitQuestion,
    handleOptionPick(option:string,check?:boolean):void,
    isChecked(option:string):boolean
    
} 

const Question:React.FC<Iprop> = ({currentQ , handleOptionPick, isChecked})=>{

    return(
     <>
     {
        currentQ ? ( <Box>

                    <Typography variant="h6">{ currentQ.title }</Typography>
                    
                    {
                       [multipleChoice,fillInTheBlank,trueFalse].includes(currentQ.type) &&
                       <FormControl>

                          <RadioGroup name={currentQ.id.toString()} onChange={ (e)=>handleOptionPick(e.target.value) }  >
                           {
                               currentQ.options.map((op,index)=>(
                                   <FormControlLabel key={index} label={op} value={op} control={ <Radio  checked = { isChecked(op) }/> } />
                               ))
                           }
                                                     
                          </RadioGroup>
                      </FormControl>
                    }

                    {

                    multiSelect===currentQ.type &&
                      <FormControl>
                          {currentQ.options.map((op,index)=>(
                              <FormControlLabel key={index} label={op} control={<Checkbox checked={isChecked(op)} onChange={(e)=>handleOptionPick(op,e.target.checked)} />}/>
                          ))}
                      </FormControl>
                         
                    }

                    {

                        followingMatch===currentQ.type && 

                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell></TableCell>
                                     {
                                         currentQ.matchAns?.map((ans,index)=>(
                                             <TableCell key={index}>{ans}</TableCell>
                                         ))
                                     }
                                 </TableRow>

                                     {
                                         currentQ.options.map((op,index)=>(
                                            <TableRow key={index}>
                                                <TableCell>{op}</TableCell>
                                                {
                                                     currentQ.matchAns?.map((ans)=>(

                                                        <TableCell key={ans}>

                                                            <input type="radio" name={op} value={op} onChange={(e)=>handleOptionPick(`${op} -> ${e.target.value}`)}/>
                                                            
                                                        </TableCell>
                                                        
                                                    ))
                                                }



                                            </TableRow>    

                                         ))
                                     }
                             
                            </TableBody>
                        </Table>

                    }
                    </Box> ) : 
                   
                   <Typography>No Question Fodund</Typography>
     }
     </>

    );

}
export default Question;