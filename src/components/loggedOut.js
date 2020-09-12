import React, { Fragment, PureComponent } from "react";

class LoggedOut extends PureComponent {

  render() {
    return (
      <Fragment>          
          <h3>Please Sign In or Create an Account</h3>
      </Fragment>
    );
  }
}

export default LoggedOut//withRouter(SignOut);
