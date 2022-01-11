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
    options:string[]
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
                     const _ansList= ansList.map((ans)=>{
                         if(ans.id===currentQ.id){
                             ans={id:currentQ.id,options:[option]}
                         }
                         return ans;
                     })
                     setAnsList(_ansList)
                     return;
                 }
                 if( multiSelect===currentQ.type) {
                     const _ansList = ansList.map((ans)=>{
                         if(ans.id===currentQ.id){
                            if(check){
                                ans={id:currentQ.id,options:[...ans.options , option]}
                            }
                            else{
                                let _option = ans.options.filter((op)=>op ! == option);
                                ans={ id:currentQ.id,options: _option };
                            }
                         }
                         return ans;
                     })
                     setAnsList(_ansList)
                     return;
                 }
                if(followingMatch===currentQ.type){
                    const _ansList = ansList.map((ans)=>{
                        if(ans.id===currentQ.id){
                         const _left = option.split("->")[0];
                         let _options=ans.options.filter(op=> !op.startsWith(_left));
                         ans={ id:currentQ.id,options: [..._options,option] };
                        }
                        return ans;

                    })
                    setAnsList(_ansList)
                    return; 

                }
       }
       else{
           setAnsList([...ansList, {id:currentQ.id , options:[option]}]);
       }
       
    }
    console.log(ansList);

    const isChecked = (option:string):boolean=>{
         const find = ansList.find((ans)=>ans.id===currentQ.id);
         if(find){
             return !! find.options.find((op)=>op===option)
         }
         return false
    }

    const isAnsQuestion =(index:number):boolean=>{
          const find = ansList.find((ans)=>ans.id===index);
          if(find){
            return  find.options.length >0 ;
          }
          return false

    }

    const handleSubmit=()=>{
        let count:number=0;
        ansList.forEach((ans)=>{
            for(let q of questionByLang){
                if(ans.options.toString()===q.ans.toString()){
                    count++;
                }
                
            }

        });
        
        history.push("/Result",{ansCount:count,count:questionByLang.length})

    }

    return(
     <>
        <Container maxWidth="md" component={Paper} sx ={{minHeight:"200px",marginTop:"40px",background:"rgb(176,224,230)" }}>
          
             
          <Typography align="center" color="primary" variant="h6">{state.lang} Exam</Typography>

                  <Box sx={{height:"20px",width:"450px",margin:"10px auto"}}>
                     {
                        questionByLang.map((question,index)=>
                          <Button sx={{ background: `${isAnsQuestion(index+1) ? "red" : "gray"}`, margin:"10px"}} key={index}  onClick={()=>getQuestionNo(index)} variant="contained" >{index+1}</Button>
                       )
                     }
                  </Box>
              
                  <Box sx={{marginTop:"30px "}}>
                     <Question  currentQ={currentQ} handleOptionPick={handleOptionPick} isChecked={isChecked}  />
                  </Box>
           
                  <Button onClick={handleSubmit} variant="contained" color="success" sx={{margin:"20px",width:"95%"}}>Submit</Button>

        
        </Container>
     </>

    );

}

export default Exam;