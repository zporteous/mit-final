import React from 'react';
import Card from './card';
import  {UserContext}  from './usercontext';

export function Balance(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    
    <Card
      bgcolor="info"
      header="Account Balances"
      status={status}
      body={<BalanceReading setShow={setShow} setStatus={setStatus}/>}
    />
  )

};

function BalanceReading(props){
  const [account, setAccount]   = React.useState('');
  const [balance, setBalance] = React.useState(''); 
  const [user,setUser] = React.useContext(UserContext); 
  let test = [1,2,3];

  if (user.isAuthenticated) {user.user.accounts.map((piece)=> {
      console.log(`${piece.accttype} - ${piece.alias}`)
  });}
      
  
  if (user.isAuthenticated) {
    return (<>

      {user.user.accounts.map(({accttype,alias,balance}) => (
        <div>
          <h4>{alias} - {accttype}</h4>
          <li>{balance}</li><br/>
        </div>
      ))}
      
   </> )
  } else {
    return(<>

      <div>You need to sign in</div>
  
    </>);
  }

  
  
}





