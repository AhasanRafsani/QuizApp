import React ,{useState} from "react";
import {InitUser} from "./Home";
import {useLocation,useHistory} from "react-router-dom"
import {Button,Typography,Container,Paper,Box,Grid} from "@mui/material"
import Question from "./Question";

import {multipleChoice,
    fillInTheBlank,
    multiSelect,
    trueFalse,
    followingMatch,
    InitQuestion,
    getQuestionByLang
    } from "../json/question";

interface InitAns {
    id:number,
    answer:string[]
};

const Exam:React.FC = ()=>{

    const {state}= useLocation<InitUser>();
    const history = useHistory();

    const questionByLang:InitQuestion[] = getQuestionByLang(state.lang);
    const [questionNo,setQuestionNo] = useState<number>(0);
    const currentQ:InitQuestion = questionByLang[questionNo];

    const [ ansList, setAnsList] = useState<InitAns[]>([]);
    
    
    const getQuestionNo= (index:number):void=>{
          setQuestionNo(index);
    }
    //console.log(questionByLang);
    //console.log(state);
    
    const handleOptionPick =(option:string ,check?:boolean)=>{

       const find = ansList.find((ans)=>ans.id===currentQ.id);

       if(find){
                 if([multipleChoice,fillInTheBlank,trueFalse].includes(currentQ.type)){
                     const _ansList = ansList.map((a)=>{
                         if(a.id === currentQ.id){
                             a={id:currentQ.id,answer:[option]}
                         }
                         return a;
                     })
                     setAnsList(_ansList)
                     return;
                 }
                 if( multiSelect===currentQ.type) {
                     const _ansList = ansList.map((a)=>{
                         if(a.id===currentQ.id){
                            if(check){
                                a={id:currentQ.id,answer:[...a.answer , option]}
                            }
                            else{
                                let _option = a.answer.filter((value)=>value ! == option);
                                a={ id:currentQ.id,answer: _option };
                            }
                         }
                         return a;
                     })
                     setAnsList(_ansList)
                     return;
                 }
                if(followingMatch===currentQ.type){
                    const _ansList = ansList.map((a)=>{
                        if(a.id===currentQ.id){
                         const _left = option.split("->")[0];
                         let _options=a.answer.filter( (val)=> !val.startsWith(_left));
                         a={ id:currentQ.id,answer: [..._options,option] };
                        }
                        return a;

                    })
                    setAnsList(_ansList)
                    return; 

                }
       }
       else{
           setAnsList([...ansList, {id:currentQ.id , answer:[option]}]);
       }
       
    }
    //console.log(ansList);

    const isChecked = (option:string):boolean=>{ // check checkBox option true or false
         const find = ansList.find((ans)=>ans.id===currentQ.id);
         if(find){
             return !! find.answer.find((val)=>val===option)
         }
         return false
    }

    const isAnsQuestion =(qId:number):boolean=>{
        
          const findId = ansList.find((ans)=> ans.id === qId); //check question id exist in the ansList  
          
          if(findId){  //if findId then return true
            return findId.answer.length>0 ;
          }
          return false

    }

    const handleSubmit=()=>{
        let count:number=0; //  initial count is 0
        ansList.forEach((ans)=>{ 
            for(let q of questionByLang){  
                if(ans.answer.toString()===q.ans.toString()){  /* At first convet array to string so that we can compare between them. 
                    
                                                                if ansList answer and question answer match then increase count value */

                    count++;
                }
                
            }

        });
        
        history.push("/Result",{ansCount:count , count:questionByLang.length}) // change path with value

    }

    return(
     <>
       <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={11} md={7}>
              <Paper sx ={{minHeight:"200px", marginTop:"40px",padding:"10px", background:"rgb(176,224,230)" }}>
          
                 <Typography textAlign="center" color="primary" variant="h6">{state.lang} Exam</Typography>

                    <Box>
                        <Grid container justifyContent="center" >
                          {
                            questionByLang.map((question,index)=>
                              <Button sx={{ background: `${isAnsQuestion(question.id) ? "red" : "gray"}`, margin:"10px"}} key={index}  onClick={()=>getQuestionNo(index)} variant="contained" >{index+1}</Button>
                           )
                          }
                        </Grid>
                    </Box>
              
                     <Box sx={{margin:"20px"}}>
                        <Question  currentQ={currentQ} handleOptionPick={handleOptionPick} isChecked={isChecked}  />
                     </Box>
           
                     <Button fullWidth onClick={handleSubmit} variant="contained" color="success">Submit</Button>
               </Paper>
            </Grid>
        </Grid>  
     </>

    );

}

export default Exam;