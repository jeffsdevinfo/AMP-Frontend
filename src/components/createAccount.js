import React, { Component, Fragment } from "react";
import './css/createAccount.css'

export default class CreateAccount extends Component {
    constructor(){
        super()
        //this.URL = "http://localhost:3000/api/v1/";
        this.URL = "http://10.0.0.207:3000/api/v1/";
        this.state = {
            nameSignup: "",
            passwordSignup: "",
            info: ""
        };
      }

  handleCreateUser = (event) => {
    event.preventDefault();
    fetch(`${this.URL}users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user: {
          username: this.state.nameSignup,
          password: this.state.passwordSignup,
          admin: false
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
          
          this.props.onStoreUser(json.user)
          if (json.user.admin) {
            this.props.history.push("/profile");
          } else {
            this.props.history.push("/profile");
          }
        }
        else{
          let failMessage = `${json.statusmessage}. Please try again.`
          this.setState({info: failMessage})
        }
      });//(json) => this.storeToken(json));
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <div className="col-md-6 login-form-1">
        <h3 className="createAccount-text" >AMP-Create Account</h3>
        <form onSubmit={this.handleCreateUser}>
          <div className="form-group">
            <input
              name="nameSignup"
              type="text"
              className="form-control username"
              placeholder="User Name"
              value={this.state.nameSignup}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <input
              name="passwordSignup"
              type="password"
              className="form-control password"
              placeholder="Your Password *"
              value={this.state.passwordSignup}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input type="submit" className="btnSubmit" value="Create Account" />
          </div>
          <label style={{ color: 'red' }}>{this.state.info}</label>
        </form>
      </div>
    );
  }
}
