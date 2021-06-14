import React from 'react'
import './sign_up.css'
import firebase from 'firebase'
import firebaseConfig from '../firebase'
import {useRef} from 'react'
import { useHistory } from 'react-router-dom'
import { TextField } from '@material-ui/core'

export default function Sign_up() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const history = useHistory();

   
    function signUpUser(){

      emailRef.current.value.length!=0 && passwordRef.current.value.length!=0 ? firebase.auth().createUserWithEmailAndPassword(emailRef.current.value,passwordRef.current.value)
        .then(user=>{
            console.log(user.user.email)
            history.push('/Home')
        })
        :
        alert('Please Enter All The Required Credentials')
    }
    return (
        <div>
            <div className='main'>
                <img src="https://post.healthline.com/wp-content/uploads/2018/12/How-to-Be-Happy_1200x628-facebook.jpg" alt="" draggable='false' />
                <form action="">
                <div>
                <input type="email" ref={emailRef}/>
                <br /><br />
                <input type="password" ref={passwordRef} />
                <br /><br />
                <input type="button" value="Sign Up" onClick={()=>signUpUser()} />
                </div>
                </form>
            </div>     
        </div>
    )
}
