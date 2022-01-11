import React from 'react';
import {lazy,Suspense} from "react"
import {BrowserRouter,Switch,Route} from "react-router-dom";

const Home = lazy(()=>import("./component/Home"));
const Exam = lazy(()=>import("./component/Exam"));
const Result = lazy(()=>import("./component/Result"));


const App:React.FC = ()=> {
  return (
    <>
     <Suspense fallback={<p>Loading...</p>}>
       <BrowserRouter>
           <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/Exam" component={Exam}/>
              <Route path="/Result" component={Result}/>
            </Switch>
       </BrowserRouter>
    </Suspense>
    </>
  );
}

export default App;
