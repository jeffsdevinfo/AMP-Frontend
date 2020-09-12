import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CurrencyInput from "react-currency-input";

class AdminNewLease extends React.Component {
  constructor() {
    super();
    //this.URL = "http://localhost:3000/api/v1/";
    this.URL = "http://10.0.0.207:3000/api/v1/";

    this.defaultUser = {
      id: 0,
      username: "No Selection",
      firstname: "",
      lastname: "",
    };
    this.defaultLeaseType = { id: 0, lease_type: "No Selection" };
    this.defaultPropertyAddress = { id: 0, apartment: "No Selection" };
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      ssn: "",
      apartment: "",
      nameOnCard: "",
      ccn: "",
      ccv: "",
      exp_date: "",
      monthlyRent: 0.0,
      firstMonthRent: 0.0,
      securityDeposit: 0.0,
      lastMonthRent: 0.0,
      total: 0.0,
      users: [],
      selectedUser: "0",
      selectedPropertyAddress: "0",
      selectedLeaseType: "0",
      properties: [],
      leaseTypes: [],
      start_date: new Date(),
      end_date: new Date(),
      info: "",
    };
  }

  handleCurrencyChange = (event, maskedvalue, floatvalue) => {
    this.setState({ [event.target.name]: floatvalue }, this.generateTotal);
  };

  populateUsers = () => {
    return this.state.users.map((user) => (
      <option
        key={user.id}
        value={user.id}
      >{`${user.id}-${user.username}-${user.firstname} ${user.lastname}`}</option>
    ));
  };

  handleUserSelection = (e) => {    
    this.setState({ selectedUser: e.target.value });
  };

  populateLeaseTypes = () => {
    return this.state.leaseTypes.map((leaseType) => (
      <option
        key={leaseType.id}
        value={leaseType.id}
      >{`LeaseTypeId#${leaseType.id}-LeaseType#${leaseType.lease_type}`}</option>
    ));
  };

  handleLeaseTypeSelection = (e) => {
    this.setState({ selectedLeaseType: e.target.value });
  };

  populateProperties = () => {
    return this.state.properties.map((property) => (
      <option
        key={property.id}
        value={property.id}
      >{`PropertyId#${property.id}-APT#${property.apartment}`}</option>
    ));
  };

  handlePropertyAddressSelection = (e) => {
    this.setState({ selectedPropertyAddress: e.target.value });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleStartDateChange = (date) => {
    this.setState({
      start_date: date,
    });
  };

  handleEndDateChange = (date) => {
    this.setState({
      end_date: date,
    });
  };

  handleDateChange = (date, event) => {
    this.setState({
      [event.target.name]: date,
    });
  };

  generateTotal() {
    const { firstMonthRent, lastMonthRent, securityDeposit } = this.state;
    let temp_total = firstMonthRent + lastMonthRent + securityDeposit;
    this.setState({ total: temp_total });
  }

  adminGetAllUsers = () => {
    let token = localStorage.getItem("token");
    let allUsers = [];
    fetch(`${this.URL}admin_get_all_users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.users) {
          allUsers = data.users.map((renter) => {
            return renter;
          });
        }
        console.log(allUsers);
        this.setState({
          users: [this.defaultUser, ...allUsers],
        });
      });
  };

  adminGetAllLeaseTypes = (event) => {
    this.setState({ textAreaValue: "handleAdminGetAllLeaseTypes" });
    let token = localStorage.getItem("token");
    let allLeasesTypes = [];
    fetch(`${this.URL}admin_get_all_lease_types`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.lease_types) {
          allLeasesTypes = data.lease_types.map((leaseType) => {
            return leaseType;
          });
        }
        console.log(allLeasesTypes);
        this.setState({        
          leaseTypes: [this.defaultLeaseType, ...allLeasesTypes],
        });
      });
  };

  adminGetAllProperties = () => {
    let token = localStorage.getItem("token");
    let allProperties_temp = [];
    fetch(`${this.URL}admin_get_all_properties`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.properties) {
          allProperties_temp = data.properties.map((property) => {
            return property;
          });
        }
        console.log(allProperties_temp);
        this.setState({          
          properties: [this.defaultPropertyAddress, ...allProperties_temp],
        });
      });
  };

  returnToLeases() {
    this.props.history.push("/admin_leases");
  }

  setInfoBox(input) {
    this.setState({ info: input });
  }

  handleAdminCreateLease = (event) => {
    event.preventDefault();
    let bFail = false;
    if (this.state.selectedUser == "0") {
      this.setInfoBox("Must select a user");
      bFail = true;
    } else if (this.state.selectedLeaseType == "0") {
      this.setInfoBox("Must select a lease type");
      bFail = true;
    } else if (this.state.selectedPropertyAddress == "0") {
      this.setInfoBox("Must select a property address");
      bFail = true;
    } else {
      this.setInfoBox("");
    }

    if (bFail) {
      return;
    }

    let token = localStorage.getItem("token");
    fetch(`${this.URL}admin_create_lease`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        leaseToCreate: {
          property_id: this.state.selectedPropertyAddress,
          user_id: this.state.selectedUser,
          lease_type_id: this.state.selectedLeaseType,
          monthly_rent_price: this.state.monthlyRent,
          start_date: this.state.start_date.toString(),
          end_date: this.state.end_date.toString(),
          first_month_rent: this.state.firstMonthRent,
          last_month_rent: this.state.lastMonthRent,
          security_deposit: this.state.securityDeposit,
          balance: this.state.total,
        },
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);

        let resultMessage = `${data.statusmessage}`;
          this.setState({ info: resultMessage });
         if (data.status != 200) {
            this.setState({info: data.statusmessage})
         }
      });
  };

  componentDidMount() {    
    this.adminGetAllUsers();
    this.adminGetAllProperties();
    this.adminGetAllLeaseTypes();
  }

  render() {
    return (
      <Fragment>
        <div className="col-md-6 login-form-1">
          <div class="row">
            {" "}
            <h3>New Lease</h3>
          </div>
          <label>Select Account *</label>
          <form onSubmit={this.handleAdminCreateLease}>
            <div className="form-group">
              <select
                value={this.state.selected_user}
                onChange={this.handleUserSelection}
              >
                {this.populateUsers()}
              </select>{" "}
              <button onClick={this.handleNewLease} disabled="true">
                New User
              </button>
              <br></br>
              <label>Select Property *</label>
              <br></br>
              <select
                value={this.state.selectedPropertyAddress}
                onChange={this.handlePropertyAddressSelection}
              >
                {this.populateProperties()}
              </select>
              <br></br>
              <label>Lease Type *</label>
              <br></br>
              <select
                value={this.state.selectedLeaseType}
                onChange={this.handleLeaseTypeSelection}
              >
                {this.populateLeaseTypes()}
              </select>
              <br></br>
              <br></br>
              <label>Monthly Rental Rate *</label>
              <br></br>
              <CurrencyInput
                name="monthlyRent"
                prefix="$"
                value={this.state.monthlyRent}
                onChangeEvent={this.handleCurrencyChange}
              />
              <br></br>
              <br></br>
              <label>Lease Start Date *</label>
              <br></br>
              <DatePicker
                name="start_date"
                selected={this.state.start_date}
                onChange={this.handleStartDateChange}
              />
              <br></br>
              <label>Lease End Date *</label>
              <br></br>
              <DatePicker
                name="end_date"
                selected={this.state.end_date}
                onChange={this.handleEndDateChange}
              />
              <br></br>
              <br></br>
              <label>First Month Rent *</label>
              <br></br>
              <CurrencyInput
                name="firstMonthRent"
                prefix="$"
                value={this.state.firstMonthRent}
                onChangeEvent={this.handleCurrencyChange}
              />
              <br></br>
              <br></br>
              <label>Security Deposit *</label>
              <br></br>
              <CurrencyInput
                name="securityDeposit"
                prefix="$"
                value={this.state.securityDeposit}
                onChangeEvent={this.handleCurrencyChange}
              />
              <br></br>
              <br></br>
              <label>Last Months Rent *</label>
              <br></br>
              <CurrencyInput
                name="lastMonthRent"
                prefix="$"
                value={this.state.lastMonthRent}
                onChangeEvent={this.handleCurrencyChange}
              />
              <br></br>
              <br></br>
              <label>Total: ${this.state.total.toFixed(2)}</label>
            </div>
            <br></br>
            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Create Lease" />
            </div>
            <label style={{ color: "red" }}>{this.state.info}</label>
          </form>
          {/* <button onClick={this.returnToLeases} disabled="true">
            Cancel
          </button> */}
        </div>
      </Fragment>
    );
  }
}

export default withRouter(AdminNewLease);
