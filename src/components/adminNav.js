import React, { PureComponent, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class AdminNav extends PureComponent {

//   renderLogin = () => {
//     const { history } = this.props;
//     history.push("/login")
//   }

  handleSignOut = () => {
    this.props.onSignOut();    
    this.props.history.push("/logged_out");
  }

  handleMouseLeaveLabel(e) {
    //e.target.style.color = 'red';
    e.target.style.textDecoration = 'none';
  }

  handleHoverLabel(e) {
    //e.target.style.color = 'red';
    e.target.style.textDecoration = 'underline';
  }

  render() {

    const labelStyles = {
      color: 'white',
      underline: {textDecorationLine: 'underline'}
    }

    console.log("AdminNav render reached")
    return (   
      <Fragment> 
      <nav className="navbar flex-column">
        <h3 className="navbar-brand" to="/">
          AMP! <label>ADMIN</label>                             
        </h3>               
        <h5>
          <NavLink activeStyle={{color: "black"}} style={{ color: "white" }} to="/profile">
            My Profile
          </NavLink>
        </h5>
        <h5>
          <NavLink activeStyle={{color: "black"}} style={{ color: "white" }} to="/admin_leases">
            Leases
          </NavLink>
        </h5>
        <h5>
          <NavLink activeStyle={{color: "black"}} style={{ color: "white" }} to="/admin_payment_history">
            Payment History
          </NavLink>
        </h5>
        <h5>
          <NavLink activeStyle={{color: "black"}} style={{ color: "white" }} to="/admin_servce_requests">
            Service Requests
          </NavLink>
        </h5>
        <h5>
          <NavLink activeStyle={{color: "black"}} style={{ color: "white" }} to="/admin_documents">
            Documents
          </NavLink>
        </h5>
        <h5>
          <NavLink activeStyle={{color: "black"}} style={{ color: "white" }} to="/community">
            Community
          </NavLink>
        </h5>
        <h5>        
              {/* <button onClick={this.props.onSignOut}>SignOut</button> */}
              <label onMouseOver={this.handleHoverLabel} onMouseLeave={this.handleMouseLeaveLabel} onClick={this.handleSignOut} style={labelStyles}>Sign Out</label>
              {/* <button onClick={this.handleSignOut}>SignOut</button> */}
          {/* <NavLink style={{ color: "red" }} to="/sign_out" >
            Sign Out
          </NavLink> */}
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

export default withRouter(AdminNav);
//export default withState(withLabel(withTheme(MyComponent)))
//export default connect(mapStateToProps) (ConditionalNavBar);
