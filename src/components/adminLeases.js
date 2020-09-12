import React, { Fragment } from "react";
import './css/adminLeases.css';

import { Link } from 'react-router-dom';

class AdminLeases extends React.Component {
  constructor(props) {
    super(props);
    //this.URL = "http://localhost:3000/api/v1/";
    this.URL = "http://10.0.0.207:3000/api/v1/";
    this.state = {
      active: true,
      numberOfGuests: 2,
      leases: [

        // { id: 1, name: 'Wasif', age: 21, email: 'wasif@email.com' },
        // { id: 2, name: 'Ali', age: 19, email: 'ali@email.com' },
        // { id: 3, name: 'Saad', age: 16, email: 'saad@email.com' },
        // { id: 4, name: 'Asad', age: 25, email: 'asad@email.com' }
      ],
      filteredLeases: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.name === 'active' ? target.checked : target.value;
    const name = target.name;

    this.filterTables(value)
    
    this.setState({
      [name]: value
    });    
  }

  filterHandler = (event) => {
    this.filterTables(true);
  }

  filterTables(currValue)
  {
    let sortHandlerAsc = () => {
      this.sortRows(this.state.filteredLeases, true)
    }
    let sortHandlerDesc = () => {
      this.sortRows(this.state.filteredLeases, false)
    }
    //debugger
    if(currValue == true)
    {
      let filteredLeasesTemp = this.state.leases.filter(lease => lease.status == true)
      this.setState({
        filteredLeases: filteredLeasesTemp        
      }, sortHandlerAsc)
    }
    else
    {      
      let filteredLeasesTemp = this.state.leases.filter(lease => lease.status == false)
      this.setState({
        filteredLeases: filteredLeasesTemp        
      }, sortHandlerDesc)
    }
  }

  sortRows(data, direction) {  
    //debugger
    let sortedLeasesTemp = data.sort((curr, nextIter) => {
        var a = curr.balance
        var b = nextIter.balance
        if(direction) //decending
        {
          return a < b ? 1 : -1
        }
        else          //ascending
        {
          return a < b ? -1 : 1
        }
        })
        //debugger
    this.setState({
      filteredLeases: sortedLeasesTemp,
    });
  }

  renderTableHeader() {      
      
    if(this.state.filteredLeases.length > 0)
    {
       
       let header = Object.keys(this.state.filteredLeases[0])
       return header.map((key, index) => {
          return <th key={index}>{key.toUpperCase()}</th>
       })
    }
  }


  renderTableData() {            
    //return this.state.leases.map((lease, index) => {
       
      return this.state.filteredLeases.map((lease, index) => {
       //const { id, name, age, email } = lease //destructuring
       //const { id, balance, lease_type_id, monthly_rent_price, property_security_deposit } = lease //destructuring

       const {id,	user_id,	lease_type_id,	status, monthly_rent_price, balance, property_address_id,
         created_at, updated_at, start_date, end_date, first_month_rent, last_month_rent, security_deposit } = lease
       return (
           <tr key={id}>
              <td><Link to={`/lease/${id}`} >{id}</Link></td>
              <td><Link to={`/user/${user_id}`} >{user_id}</Link></td>       
              <td>{lease_type_id}</td>
              <td>{status.toString()}</td>
              <td>{monthly_rent_price}</td>
              <td>{balance}</td>
              <td><Link to={`/property_address/${property_address_id}`} >{property_address_id}</Link></td>                 
              <td>{created_at}</td>
              <td>{updated_at}</td>
              <td>{start_date}</td>
              <td>{end_date}</td>
              <td>{first_month_rent}</td>
              <td>{last_month_rent}</td>              
              <td>{security_deposit}</td>
           </tr>
       )
    })
    }

    getAllLeases = () => {
      let token = localStorage.getItem('token');   
      let allLeases = []; 
      fetch(`${this.URL}admin_get_all_leases`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, 
        }             
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)        
        if(data.leases){
          allLeases = data.leases.map((lease) =>
          {
            return lease;
          });
        }
        //debugger
        console.log(allLeases)
        //debugger
        this.setState({ leases: allLeases }, this.filterHandler);      
      })
    }

    componentDidMount(){
      this.getAllLeases()
    }

    handleNewLease = () => {           
      this.props.history.push("/admin_new_lease");
    }


  render() {
    return (
      <Fragment>          
        <div className="lease_container" display="flex">
          <h3 className="tableHeader" >Admin Leases</h3>                           
            <label className="activeCB" >Active/Terminated   </label>            
          <input
            name="active"
            type="checkbox"
            checked={this.state.active}
            onChange={this.handleInputChange} />         
        <button className="newLeaseButton" onClick={this.handleNewLease}>New Lease</button>
          <table id='filteredLeases'>
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

export default AdminLeases
