import React, { Fragment, PureComponent } from "react";

class User extends PureComponent {
    constructor(){
        super()
        //this.URL = "http://localhost:3000/api/v1/users/";
        this.URLshow = "http://10.0.0.207:3000/api/v1/users/";
        this.URLedit = "http://10.0.0.207:3000/api/v1/";
        this.state = {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          info: ""
        };
      }
      
      handleProfileEdits = (event) => {
        event.preventDefault();
        console.log("Edited Profile to Save")    
        let token = localStorage.getItem('token');    
        
        fetch(`${this.URLedit}admin_update_profile`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                updated_profile_data: {
                    id: this.props.match.params.id,
                    first_name: this.state.firstName,
                    last_name: this.state.lastName,
                    email: this.state.email,
                    phone: this.state.phone,
                }
            })
        })
        .then(res => res.json())
        .then(data => {
          
          console.log(data)
          if(data.status == 204)
          {
            this.updateState(data);
            let successMessage = `${data.statusmessage}.`
            this.setState({info: successMessage})
          }
          else
          {
            let failMessage = `${data.statusmessage}. Please try again.`
            this.setState({info: failMessage})
          }
        })
      }
    
      requestProfileInfo = () => {        
        let token = localStorage.getItem('token');   
        let allPayments = []; 
        fetch(`${this.URLshow}${this.props.match.params.id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, 
          }             
        })
        .then(res => res.json())
        .then(data => {            
          console.log(data)      
          if(data.status == 200)
          {
            this.updateState(data);
          }    
        })
      }
    
      updateState = (userData) => {
        //debugger
        if(userData)
        {
          let firstName = userData.user.firstname ? userData.user.firstname : ""
          let lastName = userData.user.lastname ? userData.user.lastname : ""
          let phone_number = userData.user_contact ? (userData.user_contact.phone ? userData.user_contact.phone : "") : ""        
          let email = userData.user_contact ? (userData.user_contact.email ? userData.user_contact.email : "") : ""       
    
          this.setState({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone_number
          })
        }
      }
    
      componentDidMount() {
        this.requestProfileInfo();
    
      }
    
      handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
        });
      };
    
      render() {
        return (
          <Fragment>          
             <div className="col-md-6 login-form-1">
            <h3 className="content-title">Renter's Contact Information</h3>
            <div className="profile-body">
            <form onSubmit={this.handleProfileEdits}>
              <div className="form-group">
                <label>First Name *</label>
                <input
                  name="firstName"
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
              <label>Last Name *</label>
                <input
                  name="lastName"
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
              <label>Email *</label>
                <input
                  name="email"
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
              <label>Phone</label>
                <input
                  name="phone"
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={this.state.phone}
                  onChange={this.handleChange}
                />
              </div>
              <br></br>
              <div className="form-group">
                <input type="submit" className="btnSubmit" value="Save Changes" />
              </div>
            </form>
            </div>
            <label style={{ color: 'red' }}>{this.state.info}</label>
          </div>
          </Fragment>
        );
      }
    }

export default User
