import React, { Fragment, PureComponent } from "react";


class PropertyAddress extends PureComponent {
    constructor(){
        super()
        //this.URL = "http://localhost:3000/api/v1/";
        this.URL = "http://10.0.0.207:3000/api/v1/";
        this.state = {
          streetAddress: "",
          apartment: "",
          zip: "",
          city: "",
          state: "",
          info: ""
        };
      }
      
      handleProfileEdits = (event) => {
        event.preventDefault();
        console.log("Edited Property Address to Save")    
        let token = localStorage.getItem('token');    
        //debugger
        fetch(`${this.URL}update_property_address`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                updated_property_address_data: {
                    id: this.props.match.params.id,
                    street_address: this.state.streetAddress,
                    apartment: this.state.apartment,
                    zip: this.state.zip,
                    city: this.state.city,
                    state: this.state.state,
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
    
      requestPropertyAddressInfo = () => {        
        let token = localStorage.getItem('token');           
        fetch(`${this.URL}property_addresses/${this.props.match.params.id}`, {
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
    
      updateState = (propertyAddressData) => {
        
        if(propertyAddressData)
        {
            let streetAddress = propertyAddressData.property_address.street_address ? propertyAddressData.property_address.street_address : "";
            let apartment = propertyAddressData.property_address.apartment ? propertyAddressData.property_address.apartment : "";
            let zip = propertyAddressData.property_address.zip ? propertyAddressData.property_address.zip : "";
            let city = propertyAddressData.property_address.city ? propertyAddressData.property_address.city : "";
            let state = propertyAddressData.property_address.state ? propertyAddressData.property_address.state : "";

            this.setState({
                streetAddress: streetAddress,
                apartment: apartment,
                zip: zip,
                city: city,
                state: state
            })
        }
      }
    
      componentDidMount() {
        this.requestPropertyAddressInfo();
    
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
            <h3>Property Address Information</h3>
            <form onSubmit={this.handleProfileEdits}>
              <div className="form-group">
                <label>Street Address</label>
                <input
                  name="streetAddress"
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={this.state.streetAddress}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
              <label>Apartment Number</label>
                <input
                  name="apartment"
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={this.state.apartment}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
              <label>City</label>
                <input
                  name="city"
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={this.state.city}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
              <label>Zip</label>
                <input
                  name="zip"
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={this.state.zip}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
              <label>State</label>
                <input
                  name="state"
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={this.state.state}
                  onChange={this.handleChange}
                />
              </div>
              <br></br>
              <div className="form-group">
                <input type="submit" className="btnSubmit" value="Save Changes" />
              </div>
            </form>
            <label style={{ color: 'red' }}>{this.state.info}</label>
          </div>
          </Fragment>
        );
      }
    }

export default PropertyAddress
