import { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Dashboard from "./Components/Dashboard"
import Interns from "./Components/Interns"
import IntDetails from "./Components/IntDetails";
import Edit from "./Components/Edit";
import ShowNavbar from "./Components/ShowNavbar";
import Login from "./Components/Login";
import Register from "./Components/login-Register/Register";
class App extends Component {
  
  render() 
  {  
    return (
    <div className="App">
      <BrowserRouter>
        <div className="content">
          <ShowNavbar>
          <Header />
          </ShowNavbar>
          
          <Routes>
            <Route path="/Dashboard" exact element={<Dashboard />}/>
            <Route path="/Interns" exact element={<Interns />}/>
            <Route path="/IntDetails/:id" exact element={<IntDetails />}/>
            <Route path="/Edit/:id" exact element={<Edit />}/>
            <Route path="/" exact element={<Login />} />
            <Route path="/Register" exact element={<Register />} />
          </Routes>
          
        </div>
        </BrowserRouter>
    </div>
  );
}
}

export default App;
