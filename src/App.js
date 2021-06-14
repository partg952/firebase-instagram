import logo from './logo.svg';
import './App.css';
import firebaseConfig from './firebase';
import firebase from 'firebase';
import {useEffect,useRef,useState} from 'react'
import { v4 as uuidv4 } from 'uuid';
import {BrowserRouter as Router,Link,Route} from 'react-router-dom'
import SignUp from './sign_up/sign_up'
import Home from './main/home'
function App() {
  useEffect(()=>{
    console.log(localStorage.getItem('name'))
  },[])
  return (
    <div className="App">
      <Router>
        <Route path='/' exact>
        <SignUp/>
        </Route>
        <Route path='/Home'>
          <Home/>
        </Route>
      </Router>
    </div>
  );
}

export default App;
