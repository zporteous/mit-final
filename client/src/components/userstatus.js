import React, {useContext} from 'react';
import {UserContext} from './usercontext.js';

export default function UserStatus(){
  const [show, setShow]     = React.useState(true);
     
  const [user,setUser] = useContext(UserContext)
  console.log(user)

  return (
    <div style={{paddingRight:"25px"}}>
        <span class="navbar-text">{user.isAuthenticated ? (user.user.name): '' }</span><br/>
        <Logout/>
    </div>
  ) 
}

function Logout(props){
  const [user,setUser] = useContext(UserContext)

  function handle(){
    setUser({user:null,isAuthenticated:false})
  }


  return (<>

        <button type="submit" className="btn btn-sm btn-outline-secondary" onClick={handle}>Logout</button>
   
  </>);
}