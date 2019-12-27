import React, { Component } from "react";
// import Header from "./components/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Spinner,
  Upload,
  Download,
  Home,
  Player,
  NotFound,
  Auth
} from "./components";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isAuthenticated: true,
      userDetails: {
        name: "RohitRaj P",
        id: "llkeh234ndfs",
        emailId: "rij7u7d@gmail.com"
      }
    };
    this.authLoginHandler = this.authLoginHandler.bind(this);
  }

  componentDidMount() {
    setTimeout(
      function() {
        this.setState({ isLoading: false });
      }.bind(this),
      1000
    );
  }

  authLoginHandler(userName, userPassword) {
    if (userName === "admin" && userPassword === "admin") {
      this.setState({ isAuthenticated: true });
    }
  }

  logoutHandler() {
    this.setState({ isAuthenticated: false });
  }

  render() {
    return this.state.isLoading ? (
      <Spinner size={{ size: "large" }} />
    ) : (
      <Router>
        {/* {this.state.isAuthenticated && <Header />} */}
        {!this.state.isAuthenticated && (
          <Auth authLoginHandler={this.authLoginHandler} />
        )}
        {this.state.isAuthenticated && (
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return <Home userDetails={this.state.userDetails} />;
              }}
            />
            <Route path="/upload" component={Upload} />
            <Route path="/download" component={Download} />
            <Route path="/player/:id/:subid" component={Player} />
            <Route path="/auth" component={Auth} />
            <Route path="*" component={NotFound} />
          </Switch>
        )}
      </Router>
    );
  }
}

export default App;
