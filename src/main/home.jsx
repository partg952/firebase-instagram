import React from 'react'
import './home.css'
import image from './instagram.png'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import firebaseConfig from '../firebase';
import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';
import {useState,useEffect,useRef} from 'react'
import {useHistory} from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader";
import BounceLoader from 'react-spinners/BounceLoader';
export default function Home() {
  const [images,addImages] = useState([])
  const div_ref = useRef()
  const size_ref = useRef()
  const caption = useRef()
  const history = useHistory();
  const [isLoading,setLoading] = useState(true);
  var file = ''
    useEffect(()=>{
      if(firebase.auth().currentUser!=null){
        console.log(firebase.auth().currentUser.email)
      }
      const div = div_ref.current
      
      firebase.database().ref().on('value',(snapshot,err)=>{
        while(div.firstChild){
          div.removeChild(div.firstChild)
        }
        console.log(snapshot.val())
        snapshot.forEach(items=>{
          console.log(items.val().url,items.val().name) 
          addImages(prev=>[...prev,{name:items.val().name,url:items.val().url,caption:items.val().caption}])
        })
        
      })
    },[])
    return (
        <div>
          <nav>
          
          <img src={image} draggable='false' alt="" />
          <div>
          <input type="file" id='file' onChange={(e)=>{
             file = e.target.files[0]
            }} />
            <label htmlFor="file">
              Select a File
            </label>
            <br />
           <button id='upload-button' onClick={()=>{
             console.log(firebase.auth().currentUser)
             var name = uuidv4();
                console.log(name)
                var path = firebase.storage().ref().child(name)
                console.log(firebase.auth().currentUser.displayName)
               file.length!=0 && caption.current.value.length!=0 ? path.put(file).then(()=>{
                 path.getDownloadURL().then((url)=>{
                    console.log(url)
                    firebase.database().ref().child(name).set({
                      'name':firebase.auth().currentUser.email,
                      'url':url,
                      'caption':caption.current.value
                    })
                  })
                }):
                alert('please select a file')
              }}>
             Upload
           </button>
           <br />
           <input type="text" ref={caption} />
          </div>
          <ExitToAppIcon className='icon' style={{fontSize:'50px'}} onClick={()=>{
            firebase.auth().signOut()
            localStorage.removeItem('email')
            localStorage.removeItem('password')
            history.push('/')
          }}/>
          </nav>
          
          <div>
         <div ref={div_ref} className="🚀" >
           <BounceLoader color='blue' loading={isLoading} size={150} />
           {
             images.map(items=>{
               return(
                 <div>
                   <span>
                    <p  className='rounded'> {items.name[0]} </p>
                   <p> {items.name} </p>
                   </span>
                   <img src={items.url} alt="" />
                   
                   <p> <strong>{items.name}</strong> {items.caption} </p>
                 </div>
               )
              })
           }
         </div>
         
        </div>
        </div>
    )
}
