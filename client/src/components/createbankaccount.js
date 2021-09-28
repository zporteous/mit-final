import React from 'react';
import Card from './card';
import {UserContext} from './usercontext';
import { useContext } from 'react';
require('dotenv').config()



export default function CreateBankAccount(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <Card
      bgcolor="primary"
      header="Create Bank Account"
      status={status}
      body={show ? 
        <CreateBAForm setShow={setShow}/> : 
        <CreateBAMsg setShow={setShow}/>}
    />
  )
}

function CreateBAMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>Add another account</button>
  </>);
}

function CreateBAForm(props){
  const [alias, setAlias]         = React.useState('');
  const [accttype, setAccttype] = React.useState('');
  const [balance, setBalance] = React.useState(0);
  const [user,setUser] = useContext(UserContext)

  function handle(){
    
    const url = `${process.env.REACT_APP_API_URL}/bankaccount/create/${user.user.name}/${accttype}/${alias}/${balance}`;
    (async () => {
        var res  = await fetch(url);
        var data = await res.json(); 

        setUser({user:
                  {accounts:
                    [...user.user.accounts,{accttype:accttype, alias:alias,balance:balance}],
                  email:user.user.email,
                  name:user.user.name},isAuthenticated:true});

    })();
    props.setShow(false);
  }    

  return (<>

    Select an account type<br/>
    <select 
      className="form-control" 
      placeholder="Enter name" 
      value={accttype} 
      onChange={e => setAccttype(e.currentTarget.value)}>
        <option>Choose One</option>
        <option>Checking</option>
        <option>Saving</option>
    </select><br/>

    Account Alias<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter an account alias" 
      value={alias} 
      onChange={e => setAlias(e.currentTarget.value)}/><br/>

    Initial Balance<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter initial balance" 
      value={balance} 
      onChange={e => setBalance(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Create Bank Account</button>

  </>);
}

