import React, { Component } from 'react';
import Header from './components/Header';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import {
  Spinner,
  Upload,
  Download,
  Home,
  Player,
  NotFound
} from './components';


class App extends Component {

    constructor(props) {
      super(props)
      this.state = { isLoading: true }
    }

    componentDidMount() {
      setTimeout(function () {
        this.setState({ isLoading: false })
      }.bind(this), 1000)
    }


    render() {
      return (
        this.state.isLoading ? <Spinner size={{ size: "large" }} /> :
          <Router>
            <Header />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/upload' component={Upload} />
              <Route path='/download' component={Download} />
              <Route path='/player/:id' component={Player} />
              <Route path='*' component={NotFound} />
            </Switch>
          </Router>


      );
    }
  }

export default App;
