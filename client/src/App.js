import React, { Fragment , useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './Components/layout/Landing'
import Navbar from './Components/layout/Navbar'
import './App.css';
import Register from './Components/auth/Register';
import Login from './Components/auth/Login';
import store from './store'
import {Provider} from "react-redux"
import Alert from './Components/layout/Alert';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Dashboard from './Components/dashboard/Dashboard';
import PrivateRoute from './Components/routing/PrivateRoute';
import CreateProfile from './Components/profile-forms/CreateProfile';
import EditProfile from './Components/profile-forms/EditProfile';
import Profiles from './Components/profiles/Profiles';
import Profile from './Components/profile/Profile';



console.log(store.getState())

if(localStorage.token){
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(()=>{
    store.dispatch(loadUser())
  },[])
  return (
    <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar/>
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alert/>
            <Switch>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/profiles" component={Profiles}/>
              <Route exact path="/profile/:id" component={Profile}/>

              <PrivateRoute exact path="/dashboard" component={Dashboard}/>
              <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
              <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
            </Switch>
        </section>
      </Fragment>
    </Router>
    </Provider>
  )
}

export default App
