import {React} from 'react';
import {HashRouter, Route,Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavBar} from './components/navbar.js'
import Home from './components/home.js';
import Deposit from './components/deposit'
import CreateAccount from './components/createaccount';
import Login from './components/login';
import Withdraw from './components/withdraw';
import {Balance} from './components/balance';
import AllData from './components/alldata';
import  {UserContext}  from './components/usercontext.js';
import CreateBankAccount from './components/createbankaccount.js';
import {UserProvider} from "./components/usercontext.js";
import {useContext} from 'react';


function App() {
  const user = useContext(UserContext);
  console.log(user);
  return (
    <HashRouter>
        <div>       
        <UserProvider>
            <NavBar/>
            <div className="container" style={{padding: "10px"}}>
              <Route path="/" exact component={Home} />
              <Route path="/CreateAccount/" component={CreateAccount} />
              <Route path="/createbankaccount/" component={CreateBankAccount} />
              <Route path="/login/" component={Login} render={() => (user.isAuthenticated ? (<Redirect to='/'/>) : true)}/>;
              <Route path="/deposit/" component={Deposit} />
              <Route path="/withdraw/" component={Withdraw} />
              <Route path="/balance/" component={Balance} />
              <Route path="/alldata/" component={AllData} />
            </div>
          </UserProvider>
        </div>
    </HashRouter> 
  );
}

export default App;
