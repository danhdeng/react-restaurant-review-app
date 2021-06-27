import React, {useState} from "react";
import {Switch, Link, Route} from "react-router-dom";
import Login from "./components/Login.js";
import AddReview from "./components/AddReview.js";
import Restaurant from "./components/Restaurant.js";
import RestaurantList from "./components/RestaurantsList.js";
import RestaurantNavbar from "./components/RestaurantNavbar.js";
//Bootstrap



function App() {
  const [user, setUser] = useState(null);

  async function login(user=null){
    setUser(user);
  }

  async function logout(){
    setUser(null);
  }

  return (
    <>
      <RestaurantNavbar user={user} logout={logout} />
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/restaurants"]} component={RestaurantList} />
          <Route 
            path="/restaurants/:id/review"
            render={(props) => (
              <AddReview {...props} user={user} />
            )}
          />
          <Route 
            path="/restaurants/:id"
            render={(props) => (
              <Restaurant {...props} user={user} />
            )}
          />
          <Route 
            path="/login"
            render={(props) => (
              <Login {...props} login={login} />
            )}
          />
        </Switch>
      </div>
    </>

  );
}

export default App;
