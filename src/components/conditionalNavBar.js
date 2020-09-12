import React, { Fragment, PureComponent } from "react";
import NotLoggedInNav from "./notLoggedInNav";
import AdminNav from "./adminNav";
import RenterNav from "./renterNav";
import { connect } from 'react-redux';

class ConditionalNavBar extends PureComponent {
  renderNotLoggedInNav = () => {
    //let result = this.props.existingTokenCheck();

    // const {signOutHandler, user} = this.props
    // let result = localStorage.getItem("token")
    // console.log("The value of token check = ")
    // console.log(result);
    // console.log("End token check")
     
    //debugger
     
    return (
      <Fragment>
        <NotLoggedInNav />        
      </Fragment>
    );
  };

  renderLoggedInNav = () => {
    //orignal code    
    let localStorageUser = JSON.parse(localStorage.getItem('user'))
    //debugger
    if (this.props.user.admin) {
    //if(localStorageUser.admin){
      return (
        <Fragment>
          <AdminNav onSignOut={this.props.signOutHandler} />
        </Fragment>
      );
    }
    else
    {
      return (
          <Fragment>
            <RenterNav onSignOut={this.props.signOutHandler} />
          </Fragment>
        );
    }
  };

  tokenInStorage = () => {
    //debugger
    if(localStorage.getItem("token") && (localStorage.getItem("token") != "undefined" ))
    {
      return true
    }
    return false
  }

  render() {
    console.log("hello");
    return (
      <>
       {/* {this.props.user.id ? this.renderLoggedInNav() : this.renderNotLoggedInNav()} */}
       {/* {this.props.user ? this.renderLoggedInNav() : this.renderNotLoggedInNav()} */}
       {this.props.onUserInStore() ? this.renderLoggedInNav() : this.renderNotLoggedInNav() }
       

       {/*original code below this */}
       {/* {this.tokenInStorage() ? this.renderLoggedInNav() : this.renderNotLoggedInNav()} */}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {user: state.user}
}

export default connect(mapStateToProps) (ConditionalNavBar);
