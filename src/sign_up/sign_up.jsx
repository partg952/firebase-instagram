import React from 'react'
import './sign_up.css'
import firebase from 'firebase'
import firebaseConfig from '../firebase'
import {useRef,useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { TextField } from '@material-ui/core'
import ClipLoader from "react-spinners/ClipLoader";
import { BarLoader } from 'react-spinners'

export default function Sign_up() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const userNameRef = useRef();
    const history = useHistory();
    const [isRotating,setRotating] = useState(false)
   

    useEffect(()=>{
        if(localStorage.getItem('email') && localStorage.getItem('password') != null){
                firebase.auth().signInWithEmailAndPassword(localStorage.getItem('email'),localStorage.getItem('password'))
                .then(()=>{
                    history.push('/Home')
                })
        }
        
    })

    function signUpUser(){
      setRotating(true)
      emailRef.current.value.length!=0 && passwordRef.current.value.length!=0 && userNameRef.current.value!=0 ? firebase.auth().createUserWithEmailAndPassword(emailRef.current.value,passwordRef.current.value)
        .then(user=>{
          setRotating(false)  
            console.log(user.user.email)
            localStorage.setItem('email',user.user.email)
            localStorage.setItem('password',passwordRef.current.value)
            history.push('/Home')
        })
        :
        alert('Please Enter All The Required Credentials')
    }
    return (
        <div>
            <h1>Create An Account</h1>
            <div className='main'>
                <img src="https://post.healthline.com/wp-content/uploads/2018/12/How-to-Be-Happy_1200x628-facebook.jpg" alt="" draggable='false' />
                <form action="">
               
                <div>
                <input type="email" ref={emailRef} placeholder='Enter Your Email'/>
                <br /><br />
                <input type="password" ref={passwordRef} placeholder='Enter Your Password' />
                <br /><br />
                <input type="text" placeholder='Enter Your Username' ref={userNameRef} />
                <br /><br />
                <input type="button" value="Sign Up" onClick={()=>signUpUser()} />
                </div>
                </form>
            </div>     
                <BarLoader color='blue' width={100} height={4} loading={isRotating}/>
        </div>
    )
}
