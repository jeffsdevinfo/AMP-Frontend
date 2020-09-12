import React, { Fragment } from "react";
import './css/renterLease.css'

class RenterLease extends React.Component {
  constructor() {
    super();
    //this.URL = "http://localhost:3000/api/v1/";
    this.URL = "http://10.0.0.207:3000/api/v1/";
    this.state = {
      info: "",
      firstNameOnLease: "",
      lastNameOnLease: "",
      apartment: "",
      start_date: "",
      end_date: "",
      firstMonthsRent: 0.0,
      securityDeposit: 0.0,
      lastMonthsRent: 0.0,
      balance: 0.0,
    };
  }

  handleGetLease = () => {
    let token = localStorage.getItem("token");
    let allPayments = [];
    fetch(`${this.URL}renter_get_lease`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == 200) {
          this.parseLeaseInformation(data);
        }
        //let infoPanel = `Request {profile-detail} = firstname{${data.user.firstname}} lastname{${data.user.lastname}} phone{${data.user_contact[0].phone}} email {${data.user_contact[0].email}} `
        //  let infoPanel = `Request{renter_get_lease} = primary_lease{${JSON.stringify(data.primary_lease)}}`
        //  this.setState({textAreaValue: `${infoPanel}`});
      });
  };

  parseLeaseInformation = (json) => {
    if (json.primary_lease) {
      this.setState({
        firstNameOnLease: json.user_on_lease.firstname,
        lastNameOnLease: json.user_on_lease.lastname,
        apartment: json.property_on_lease.apartment,
        start_date: json.primary_lease.start_date,
        end_date: json.primary_lease.end_date,
        firstMonthsRent: json.primary_lease.first_month_rent,
        lastMonthsRent: json.primary_lease.last_month_rent,
        securityDeposit: json.primary_lease.security_deposit,
        balance: json.primary_lease.balance,
      });
    }
  };

  componentDidMount() {
    this.handleGetLease();
  }

  render() {
    return (
      <Fragment>
        <div className="lease_container" display="flex">
          <h3 className="content-title">Renter Lease</h3>
          
          <div className="profile-body">
            <label>Name on Lease: {`${this.state.firstNameOnLease} ${this.state.lastNameOnLease}`}</label>
            <br></br>
            <label>Unit Number: {`${this.state.apartment}`}</label>
            <br></br>
            <label>Date Signed: {`${this.state.start_date}`}</label>
            <br></br>
            <label>Lease Ends: {`${this.state.end_date}`}</label> 
            <br></br>
            <label>First Month's Rent: {`${this.state.firstMonthsRent}`}</label>
            <br></br>
            <label>Last Month's Rent: {`${this.state.lastMonthsRent}`}</label>
            <br></br>
            <label>Security Deposit: {`${this.state.securityDeposit}`}</label>         
            <br></br>
            <label>Balance: {`${this.state.balance}`}</label>     

            </div>
        </div>
      </Fragment>
    );
  }
}

export default RenterLease;
