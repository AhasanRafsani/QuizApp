

export const multipleChoice = "multipleChoice";
export const fillInTheBlank = "fillInTheBlank";
export const multiSelect = "multiSelect";
export const trueFalse = " trueFalse";
export const followingMatch = "followingMatch";


export interface InitQuestion{

    id:number;
    type:string,
    title:string,
    options:string[],
    ans:string[]
    matchAns?:string[],
    lang:string
    
}

export const questionList: InitQuestion[] = [

    {
        id:1,
        type: multipleChoice,
        title:"React is based on ?",
        options:[ "Module" , "Service" , "Component","Microservice"],
        ans:["Component"],
        lang:"React"

    },

    {
        id:2,
        type:fillInTheBlank  ,
        title:" How many elements does a React Component Return ______ ?",
        options:["Single","Both","Double","Multiple"],
        ans:["Single"],
        lang:"React"

    },

    {
        id:3,
        type: multiSelect,
        title:"Props are other components ?" ,
        options:["Injected","Methods","Props","State"],
        ans:["Injected","Methods"],
        lang:"React"

    },
    {
        id:4,
        type: followingMatch ,
        title:"Match the following" ,
        options:["js","ts"],
        matchAns:["react","angular"],
        ans:["js->react","ts->angular"],
        lang:"React"

    },
    {
        id:5,
        type: trueFalse ,
        title:"Bable is js Compiler ?" ,
        options:["True","False"],
        ans:["True"],
        lang:"React"

    },
    {
        id:6,
        type: multipleChoice  ,
        title:"HTML uses ?" ,
        options:["Defined tags","Specified tags","Fixed Tag","All above"],
        ans:["Fixed Tag"],
        lang:"Html"

    },
    {
        id:7,
        type: fillInTheBlank ,
        title:"Html block is known as _____?" ,
        options:["Body","Tag","Attribute","Element"],
        ans:["Tag"],
        lang:"Html"

    },
    {
        id:8,
        type: multiSelect ,
        title:"What other tag makes text bold ?" ,
        options:["<fat>","<strong>","<black>","<b>"],
        ans:["<strong>","<b>"],
        lang:"Html"

    },
    {
        id:9,
        type: trueFalse ,
        title:"Display a photo in a Html page using <img/> ?" ,
        options:["True","False"],
        ans:["True"],
        lang:"Html"

    },
    {
        id:10,
        type: multipleChoice ,
        title:"What should be the first tag in any HTML document ?" ,
        options:["head","title","html","document"],
        ans:["html"],
        lang:"Html"

    },


];

export const getQuestionByLang = (lang:string):InitQuestion[] => {
    const result = questionList.filter((q)=>q.lang===lang);

    return result;
}