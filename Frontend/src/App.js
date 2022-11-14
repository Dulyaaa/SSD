import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import Profile from './pages/profile';
import Footer from './pages/footer';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="*" component={Error} />
            </Switch>
          </BrowserRouter>
        </div>
        <Footer />
      </div>
    )
  }
}
