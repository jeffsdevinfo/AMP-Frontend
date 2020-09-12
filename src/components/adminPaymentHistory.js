import React, { Fragment } from "react";
import './css/adminPaymentHistory.css';

class AdminPaymentHistory extends React.Component {

  constructor(props) {
    super(props);
    //this.URL = "http://localhost:3000/api/v1/";
    this.URL = "http://10.0.0.207:3000/api/v1/";
    this.state = {
      active: true,      
      payments: [],
      sortedPayments: [],
      selectedUser: {},
      users: []
    };    
  }

  adminGetAllUsers = () => {
      let token = localStorage.getItem('token');   
      let allUsers = []; 
      fetch(`${this.URL}admin_get_all_users`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, 
        }             
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)        
        if(data.users){
          allUsers = data.users.map((renter) =>
          {
            return renter;
          });
        }
        console.log(allUsers)
        this.setState({
          users: allUsers,
      });
      })
  }

  adminGetPaymentHistoryForUser = () => {
    let token = localStorage.getItem('token');   
    let allPayments = []; 
    fetch(`${this.URL}admin_get_payment_history_for_renter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        user_id: this.state.selectedUser
      })
    })
    .then(res => res.json())
    .then(data => {
       console.log(data) 
       if(data.payment_history){
        allPayments = data.payment_history.map((payment) =>
        {
          return payment;
        });
      }
      let sortCallback = () => {
        this.sortRows(this.state.payments, true)
      }          
      this.setState({
        payments: allPayments,
      }, sortCallback);      
    })
  }

  sortRows(data, direction) {        
    let sortedPaymentsTemp = data.sort((curr, nextIter) => {
        var a = Date.parse(curr.created_at);
        var b = Date.parse(nextIter.created_at);     
        if(direction) //decending
        {
          return a < b ? 1 : -1
        }
        else          //ascending
        {
          return a < b ? -1 : 1
        }
        })

    this.setState({
        sortedPayments: sortedPaymentsTemp,
    });
}

  populateUsers = () => {
    return this.state.users.map((user) => <option key={user.id} value={user.id}>{`${user.id}-${user.username}-${user.firstname} ${user.lastname}`}</option>)
  }

  handleUserSelection = (e) => {    
    this.setState({selectedUser:e.target.value}, this.adminGetPaymentHistoryForUser);    
  }

  renderTableHeader() {            
    if(this.state.sortedPayments.length > 0)
    {       
       let header = Object.keys(this.state.sortedPayments[0])
       return header.map((key, index) => {
          return <th key={index}>{key.toUpperCase()}</th>
       })
    }
  }


  renderTableData() {                  
      return this.state.sortedPayments.map((payment, index) => {       

       const {id,	lease_id,	amount, created_at, updated_at } = payment
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

  componentDidMount(){
    this.adminGetAllUsers();    
  }

  userCheck()
  {
    if(this.state.users)
    {
      return this.state.users.count > 0 ? true : false      
    }
    return false;
  }

  render() {
    return (
      <Fragment>  
        <div className="lease_container" display="flex" flex-direction="column">
          <h3 className="content-title" >Payment History</h3>                              
          <select className="userSelect" value={this.state.selected_user} onChange={this.handleUserSelection}>{this.populateUsers()}</select>    
          <br></br>     
          <br></br>   
          
          <table id='payments'>
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

export default AdminPaymentHistory
