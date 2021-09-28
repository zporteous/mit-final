import React from 'react';
import Card from './card';
import {UserContext} from './usercontext';


export default function Deposit(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="warning"
      header="Deposit/Withdraw"
      status={status}
      body={show ? 
        <DepositForm setShow={setShow} setStatus={setStatus}/> :
        <DepositMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function DepositMsg(props){
  return (<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
          props.setShow(true);
          props.setStatus('');
      }}>
        Deposit again
    </button>
  </>);
} 

function DepositForm(props){
  const [amount, setAmount] = React.useState(0);
  const [user,setUser] = React.useContext(UserContext)
  const [account,setAccount] = React.useState('')

  function handle(){
    fetch(`${process.env.REACT_APP_API_URL}/account/update/${user.user.email}/${account}/${amount}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus(JSON.stringify(data.value));
            props.setShow(false);
            console.log('JSON:', data);
            
        } catch(err) {
            props.setStatus('Deposit failed')
            console.log('err:', text);
        }
    });
  }

  if (user.isAuthenticated){
  return(<>
      
    Select an existing account<br/>
    <select
      type='input'
      className="form-control" 
      placeholder="Enter name" 
      value={account} 
      onChange={e => setAccount(e.currentTarget.value)}>
          <option>Choose One</option>
         {user.user.accounts.map(({alias}) => (<option>{alias}</option>))}
    </select><br/>  

    Change Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Deposit</button>

  </>);} else {
    return (<>you must sign in </>)
  }
}