import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Home from "./pages/home";
import Profile from "./pages/profile";
import NewUser from "./pages/newUser";
// import Footer from './pages/footer';
import "./App.css";
import SendMessage from "./pages/sendMessage/sendMessage";
import AccessDenied from "./pages/home/accessDenied";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/add-employee" component={NewUser} />
              {/* TODO Replace with message posting UI */}
              <PrivateRoute
                Component={SendMessage}
                path="/msg"
                allowed={[1, 2]}
              />
              <Route exact path="*" component={Error} />
            </Switch>
          </BrowserRouter>
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
}

const PrivateRoute = ({ Component, path, allowed, ...rest }) => {
  const userToken = localStorage.getItem("userToken");

  if (userToken != null) {
    const decodedToken = jwt_decode(userToken, { complete: true });

    if (allowed.includes(decodedToken.role)) {
      return (
        <Route
          {...rest}
          path={path}
          render={(props) => {
            return <Component {...props} />;
          }}
        />
      );
    } else {
      // Not allowed
      return <Route path={path} component={AccessDenied} />;
    }
  } else {
    // Not allowed
    return <Route path={path} component={AccessDenied} />;
  }
};
