import React, { Fragment } from "react";
import DatePicker from "react-datepicker";
import './css/tables.css'
import "react-datepicker/dist/react-datepicker.css";
import CurrencyInput from 'react-currency-input';
import './css/renterPostPayment.css'

class RenterPostPayment extends React.Component {
  constructor() {
    super();
    //this.URL = "http://localhost:3000/api/v1/";
    this.URL = "http://10.0.0.207:3000/api/v1/";
    this.state = {
      fullNameOnCC: "",
      ccn: "",
      expirationDate: new Date(),
      ccv: "",
      balance: 0.0,
      lease_id: -1,
      payments: [],
      sortedPayments: [],
      amountToPay: 0.00
    };
  }

  getRenterPaymentHistory() {
    let token = localStorage.getItem("token");
    let allPayments = [];
    fetch(`${this.URL}renter_get_payment_history`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);        
        if (data.payment_history) {
            allPayments = data.payment_history.map((lease) => {
            return lease;
          });
        }        
        console.log(allPayments);
        this.setState({
          payments: allPayments,
        });
        this.sortTables(true);
      });
  }

  handleNewLease = () => {
    this.props.history.push("/admin_new_lease");
  };

  sortTables(currValue) {        
    let sortedPaymentsTemp = this.state.payments.sort((curr, nextIter) => {
        var a = Date.parse(curr.created_at);
        var b = Date.parse(nextIter.created_at); 
        if(currValue)
        {       
        return a < b ? 1 : -1
        }
        else{
          return a < b ? -1 : 1
        }
        })

    this.setState({
        sortedPayments: sortedPaymentsTemp,
    });
}
  

    renderTableHeader() {
        if (this.state.payments.length > 0) {
        let header = Object.keys(this.state.payments[0]);
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>;
        });
        }
    }

    renderTableData() {                       
        return this.state.payments.map((payment, index) => {        
            const {id, lease_id, amount, created_at, updated_at } = payment
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{lease_id}</td>
                    <td>{amount}</td>
                    <td>{created_at}</td>
                    <td>{updated_at}</td>
                </tr>
            )
        })
    }

  getLeaseInfo = () => {
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
      });
  };

  parseLeaseInformation = (json) => {
    if (json.primary_lease) {
      this.setState({
        balance: json.primary_lease.balance,
        leaseId: json.primary_lease.id,
      });
    }
  };

  renterPostPayment = () => {          
    let token = localStorage.getItem('token');   
    fetch(`${this.URL}renter_create_payment`, {
      method: 'POST',
      headers: {        
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`, 
      },
      body: JSON.stringify({
        payment: {
          lease_id: this.state.leaseId,    
          amount: this.state.amountToPay,    
        }
      })
    })
    .then(r => r.json())
    .then(data => {
      console.log(data)
      if (data.status == 201) {
        this.getRenterPaymentHistory();
      }
    })
  }

  handlePayment = (e) => {
    e.preventDefault();
    this.renterPostPayment();    
  };

  handleDateChange = (date) => {
    this.setState({
      startDate: date,
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleCurrencyChange = (event, maskedvalue, floatvalue) => {    
    this.setState({[event.target.name]: floatvalue});    
  }

  componentDidMount() {
    this.getLeaseInfo();
    this.getRenterPaymentHistory();
  }

  render() {
    return (
      <Fragment>
        <div className="col-md-6 login-form-1">
          <h3>Payments</h3>
          <h3>Balance on lease: ${this.state.balance}</h3>
          <form onSubmit={this.handlePayment}>
            <div className="form-group">
            <br></br>
            <label>Amount to Pay *</label>
            <br></br>
            <CurrencyInput className="Currency" name="amountToPay" prefix="$" value={this.state.amountToPay} onChangeEvent={this.handleCurrencyChange}/>
            <br></br>

              <label>Full Name *</label>
              <input
                name="fullNameOnCC"
                type="text"
                className="form-control"
                placeholder=""
                value={this.state.nameLogin}
                onChange={this.handleChange}
              />
              <label>Credit Card Number *</label>
              <input
                name="ccn"
                type="text"
                className="form-control"
                placeholder=""
                value={this.state.ccn}
                onChange={this.handleChange}
              />
              <br></br>
              <label>Expiration Date*</label>
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleDateChange}
              />
              <br></br>
              <label>CCV *</label>
              <input
                name="ccv"
                type="text"
                className="form-control"
                placeholder=""
                value={this.state.ccv}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Make Payment" />
              {/* <input type="submit" name="submitted" value="Cancel" /> */}
            </div>
          </form>

            <br></br>
          <label>Payment History</label>
          <table id="ampTable">
              
            <tbody>
              <tr>{this.renderTableHeader()}</tr>
              {this.renderTableData()}
            </tbody>
          </table>
        </div>
      </Fragment>
    );
  }
}

export default RenterPostPayment;
