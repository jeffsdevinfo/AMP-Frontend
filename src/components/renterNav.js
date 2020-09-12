import React, { PureComponent, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from 'react-router-dom';

class RenterNav extends PureComponent {

  handleSignOut = () => {
    this.props.onSignOut();    
    this.props.history.push("/logged_out");
  }

  handleMouseLeaveLabel(e) {    
    e.target.style.textDecoration = 'none';
  }

  handleHoverLabel(e) {    
    e.target.style.textDecoration = 'underline';
  }

  render() {

    const labelStyles = {
      color: 'white',
      underline: {textDecorationLine: 'underline'}
    }

    return (   
      <Fragment> 
      <nav className="navbar flex-column">
        <h3 className="navbar-brand" to="/">
          AMP!                             
        </h3>               
        <h5>
            <NavLink activeStyle={{color: "black"}} style={{ color: "white" }} to="/profile">
            My Profile
          </NavLink>
        </h5>
        <h5>
          <NavLink activeStyle={{color: "black"}} style={{ color: "white" }} to="/renter_lease">          
            Lease
          </NavLink>
        </h5>
        <h5>
          <NavLink activeStyle={{color: "black"}} style={{ color: "white" }} to="/renter_post_payment">          
            Payments
          </NavLink>
        </h5>
        <h5>
          <NavLink activeStyle={{color: "black"}} style={{ color: "white" }} to="/renter_service_requests">          
            Service Requests
          </NavLink>
        </h5>
        <h5>
          <NavLink activeStyle={{color: "black"}} style={{ color: "white" }} to="/community">
            Community
          </NavLink>
        </h5>        
        <h5>                      
          {/* <button onClick={this.handleSignOut}>SignOut</button> */}
          <label onMouseOver={this.handleHoverLabel} onMouseLeave={this.handleMouseLeaveLabel} onClick={this.handleSignOut} style={labelStyles}>Sign Out</label>
        </h5>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active"></li>
          </ul>
        </div>
      </nav>   
      {/* {this.renderLogin()} */}
      </Fragment> 
    );
  }
}

export default withRouter(RenterNav);
