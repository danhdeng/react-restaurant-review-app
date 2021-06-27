import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";


export default function Login(props) {
    const initialUserState={
      name: "",
      id:"",
    }
    const [user, setUser]=useState(initialUserState);

    const handleInputChange=event=>{
      const {name, value}=event.target;
      setUser({...user, [name]:value});
    }

    const login=()=>{
      props.login(user);
      props.history.push("/");
    }
    return (
     <div className="submit-form">
        <div>
          {/* user name */}
          <div className="form-group">
            <label htmlFor="user">Username</label>
            <input 
              type="text"
              className="form-control"
              id="name"
              name="name"
              required
              value={user.name}
              onChange={handleInputChange}
            />
          </div>
          {/* end user name */}

          {/* user id */}
          <div className="form-group">
            <label htmlFor="id">ID</label>
            <input 
              type="text"
              className="form-control"
              id="id"
              name="id"
              required
              value={user.id}
              onChange={handleInputChange}
            />
          </div>
          {/* end user id */}
          <button onClick={login} className="btn btn-success">Login</button>
        </div>
    </div>
     
    )
}
