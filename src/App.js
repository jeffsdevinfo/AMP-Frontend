import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import ConditionalNavBar from "./components/conditionalNavBar";

import SignIn from "./components/signIn";
import CreateAccount from "./components/createAccount";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import Profile from './components/profile'
import LoggedOut from './components/loggedOut'
import AdminLease from './components/adminLeases'
import RenterLease from './components/renterLease'
import RenterPostPayment from './components/renterPostPayment'
import AdminPaymentHistory from './components/adminPaymentHistory'
import AdminNewLease from './components/adminNewLease'
import 'bootstrap/dist/css/bootstrap.min.css';
import {updateUser} from './actions/ampActions'
import User from './components/user'
import Lease from './components/lease'
import PropertyAddress from './components/propertyAddress'
import { connect } from 'react-redux';
import Community from "./components/community";

class App extends Component {
  state = {
    nav_panel: "",
    content_panel: "",
    admin: false,
    //user: {},
    token: {}
  };

  signOutHandler = (e) => {
    console.log("signOut reached");
    this.storeUser(null);
    localStorage.clear();
    
  };

  storeUser = (userToStore, token) => {    
    
    this.props.updateUser(userToStore);
    //this.setState({user: userToStore})
    //debugger
  }

  userInStore = (e) =>{    
    console.log("App userInStore called")
    if (!this.props.user) {return false}
    let value =  Object.keys(this.props.user).length === 0 && this.props.user.constructor === Object
    return !value
  }


  render() {
    return (
      <Router>
        <div className="flex-container-row app-main-row">
          <div className="link-panel">
            {/* <ConditionalNavBar user={this.state.user} signOutHandler={this.signOutHandler}/> */}
            <ConditionalNavBar signOutHandler={this.signOutHandler} onUserInStore={this.userInStore}/>
          </div>
          <Switch>
            {/* <Route exact path="/sign_out" render={(props) => <SignOut {...props} /> } /> */}
            {/* <Route exact path="/"> {this.state.user ? <Redirect to="/login" /> : <Redirect to="/home"/>}</Route> */}
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/renter_lease" component={RenterLease} />
            <Route exact path="/admin_leases" component={AdminLease} />
            <Route exact path="/renter_post_payment" component={RenterPostPayment} />
            <Route exact path="/admin_payment_history" component={AdminPaymentHistory} />
            <Route exact path="/logged_out" component={LoggedOut} />
            <Route exact path="/user/:id" component={User} />
            <Route exact path="/Lease/:id" component={Lease} />
            <Route exact path="/property_address/:id" component={PropertyAddress} />
            <Route exact path="/admin_new_lease" render={(props) => <AdminNewLease {...props} /> }/>
            <Route exact path="/community" component={Community}/>
            {/* <Route exact path="/"> <Redirect to="/login" /></Route> */}
            {/* <Route path="/login" component={Login} /> */}
            
            <Route exact path="/signin" render={(props) => <SignIn {...props} onStoreUser={this.storeUser} />} />
            <Route exact path="/create_account" render={(props) => <CreateAccount {...props} onStoreUser={this.storeUser} />} />

            {/* <Route exact path="/signin" component={SignIn} /> */}
            
            {/*<Route exact path="/create_account" component={CreateAccount} />     */}
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {user: state.user}
}

const mapDispatchToProps = dispatch => {
  return {
    updateUser: (user) => dispatch(updateUser(user))
          
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)