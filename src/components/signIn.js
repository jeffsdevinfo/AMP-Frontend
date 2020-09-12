import React, { Component } from "react";
//import connect from "react-redux/lib/connect/connect";
//import mapStateToProps from "react-redux/lib/connect/mapStateToProps";
import {updateUser} from '../actions/ampActions'
import { connect } from 'react-redux';
import './css/signin.css'

class SignIn extends Component {
  constructor() {
  super();
  //this.URL = "http://localhost:3000/api/v1/";
  this.URL = "http://10.0.0.207:3000/api/v1/";
  this.state = {
    nameLogin: "",
    passwordLogin: "",
    info: ""
  };
}

  handleLogin = (event) => {
    event.preventDefault();
    const { nameLogin, passwordLogin } = this.state;
    //fetch("http://localhost:3000/api/v1/login", {
    fetch(`${this.URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user: {
          username: nameLogin,
          password: passwordLogin,
        },
      }),
    })
      .then((r) => r.json())
      .then((json) => {
        console.log(json);
        
        if (json.status == 200) {          
          localStorage.setItem("token", json.jwt);
          // this.storeToken(json)      
                            
          localStorage.setItem("user", JSON.stringify(json.user));                          
          this.setState({info: ""})
          this.props.onStoreUser(json.user)

          //debugger
          //REDUX SECTION
          this.props.updateUser(json.user);
          //REDUX SECTION
          
          if (json.user.admin) {
            this.props.history.push("/profile");
          } else {
            this.props.history.push("/profile");
          }
          }
          else
          {
            let failMessage = `${json.statusmessage}. Please try again.`
            this.setState({info: failMessage})
          }
      });
  };


  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  componentDidMount() {    
  }

  render() {
    return (
      <div className="col-md-6 login-form-1">
        <h3 className="signin-text" >AMP-Sign In</h3>
        <form onSubmit={this.handleLogin}>
          <div className="form-group">
            <input
              name="nameLogin"
              type="text"
              className="form-control username"
              placeholder="User Name"
              value={this.state.nameLogin}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              name="passwordLogin"
              type="password"
              className="form-control password"
              placeholder="Your Password *"
              value={this.state.passwordLogin}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input type="submit" className="btnSubmit" value="Sign In" />
          </div>

          <label style={{ color: 'red' }}>{this.state.info}</label>
        </form>
      </div>
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

// const mapDispatchToProps = dispatch => {
//   return {
//     addRestaurant: (restaurant) => dispatch(addRestaurant(restaurant))
//   }
// }

//export default SignIn;
export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
