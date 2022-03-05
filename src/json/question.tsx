

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
        title:" How many number of elements a valid react component return  ______ ?",
        options:["1","4","2","3"],
        ans:["1"],
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
        title:"Match the following",
        options:["js","ts"],
        matchAns:["react","angular"],
        ans:["js->react","ts->angular"],
        lang:"React"

    },
    {
        id:5,
        type: trueFalse ,
        title:"Does React.js creact a VIRTUAL DOM in the memory?",
        options:["True","False"],
        ans:["True"],
        lang:"React"

    },
    {
        id:6,
        type: multipleChoice,
        title:"CSS stands for ?" ,
        options:["Cascade style sheets","color and style sheet","Cascading style sheets","None of the above"],
        ans:["Cascading style sheets"],
        lang:"HTML & CSS"

    },
    {
        id:7,
        type: fillInTheBlank,
        title:"In css what does h1 can be called as _____?" ,
        options:["selector","Attribute","value","Tag"],
        ans:["selector"],
        lang:"HTML & CSS"

    },
    {
        id:8,
        type: multiSelect ,
        title:"What other tag makes text bold ?" ,
        options:["<fat>","<strong>","<black>","<b>"],
        ans:["<strong>","<b>"],
        lang:"HTML & CSS"

    },
    {
        id:9,
        type: trueFalse ,
        title:"Display a photo in a Html page using <img/> ?" ,
        options:["True","False"],
        ans:["True"],
        lang:"HTML & CSS"

    },
    {
        id:10,
        type: multipleChoice,
        title:"What should be the first tag in any HTML document ?" ,
        options:["head","title","html","document"],
        ans:["html"],
        lang:"HTML & CSS"

    },


];

export const getQuestionByLang = (lang:string):InitQuestion[] => {
    const result = questionList.filter((q)=>q.lang===lang);

    return result;
}