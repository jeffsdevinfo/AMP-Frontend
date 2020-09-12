import React, { Fragment, PureComponent } from "react";
import "./css/community.css";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Community extends PureComponent {
  constructor() {
    super();
    //this.URL = "http://localhost:3000/api/v1/";
    this.URL = "http://10.0.0.207:3000/api/v1/";
    this.state = {
      comment: "",
      sortedComments: [],
      info: "",
      setIntervalStarted: false,
      interval: 0,
      comments: [],
      latestTimeStamp: ""
    };
  }

  handlePostComment = (event) => {
    event.preventDefault();
    console.log("Post a comment");
    let curDate = new Date();
    let month = curDate.getMonth();
    let year = curDate.getFullYear();
    let token = localStorage.getItem("token");
    fetch(`${this.URL}/create_comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        comment: this.state.comment,
      }),
    })
      .then((r) => r.json())
      .then((json) => {
        console.log(json);
        
        this.setState({comment: ""})
        if (json.status == 201) {          
          this.getComments();
        } else {
          this.setState({
            info: json.statusmessage,
          });
        }
      });
  };

  getComments() { 
    //debugger   
    let curDate = new Date();
    let month = curDate.getMonth();
    let year = curDate.getFullYear();
    let token = localStorage.getItem("token");
    let allComments = [];

    let sortTablesCallback = () => {      
      this.sortTables(true);
    }

    
    fetch(`${this.URL}/comment_subset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        comments_query_params: {
          month: month,
          year: year,
          latest_time_stamp: this.state.latestTimeStamp
        },
      }),
    })
      .then((r) => r.json())
      .then((json) => {
        console.log(json);
        
        if (json.status == 200) {
            if (json.comments) {
                allComments = json.comments.map((comment) => {
                return comment;
              });
            } 
          this.setState({
            comments: allComments,
            latestTimeStamp: json.latest_time_stamp
          }, sortTablesCallback);          
        }
      });
  }

  sortTables(currValue) {        
    const isFirefox = typeof InstallTrigger !== 'undefined';
    if(isFirefox)
    {      
      currValue = currValue * -1
    }
    if(this.state.comments)
    {
      let sortedCommentsTemp = this.state.comments.sort((curr, nextIter) => {
        var a = Date.parse(curr.date);
        var b = Date.parse(nextIter.date);
        if(currValue)
        {       
          return a < b ? 1 : -1
        }
        else{
          return a < b ? -1 : 1
        }
      });
      
      this.syncComments(sortedCommentsTemp);    
    }
  }

  syncComments(returnedComments) {
    //let sortTemp = returnedComments.map((comment) => {return ( <li key={comment.id} ><div>{comment.date}:::|{comment.firstname} {comment.lastname}| - "{comment.comment}"</div></li>); })

    let sortedMappedCommentsTemp = returnedComments.map((comment) => {return (<li key={comment.id}>
          
        <div className="comment-body">
          <div className="text">
            <p>{comment.comment}</p>
          </div>
      <p className="attribution">by: {this.adminChecker(comment)} at {comment.date}</p>
      </div>
    
    </li>
    )})

    this.setState({ sortedComments: sortedMappedCommentsTemp });    
  }

  adminChecker(comment) {    
    if (this.props.user.admin) 
    {
      return (<Link to={`/user/${comment.user_id}`} >{comment.firstname} {comment.lastname}</Link>)
    }
    else
    {
      return (<>{comment.firstname} {comment.lastname}</>)
    }
  }

  handleChange = (event) => {
    console.log("Added more text");
    this.setState({
      comment: event.target.value,
    });
  };

  componentDidMount() {
    this.getComments();
    let timerCallback = () =>  {
      this.getComments();
    }

    let setIntervalCallback = () => {
      let intervalTemp = setInterval(timerCallback, 3000)
      this.setState({interval: intervalTemp})
      console.log("Called setIntervalCallback")
    }    
    if(!this.state.setIntervalStarted)
      {
        this.setState({setIntervalStarted: true},
          setIntervalCallback())
      }
  }

  componentWillUnmount() {    
    if(this.state.interval > 0)
    {
      clearInterval(this.state.interval);
    }
  }

  render() {
    return (
      <Fragment>
        <div className="pageBody">
          <h3 className="content-title">Community comments</h3>
          <br></br>
          
          <form onSubmit={this.handlePostComment}>
            <div className="form-group">
              <input
                name="comment"
                type="text"
                className="form-control inputResizer"
                placeholder="Comment..."
                value={this.state.comment}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Post Comment" />
            </div>

            <label style={{ color: "red" }}>{this.state.info}</label>
          </form>

          <div>
                <ul>{this.state.sortedComments}</ul>
          </div>    
        </div>            
      </Fragment>
    );
  }
}


const mapStateToProps = state => {
  return {user: state.user}
}

export default connect(mapStateToProps) (Community);
