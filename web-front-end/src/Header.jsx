import React, { Component, Fragment } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import RouteOne from './RouteOne'
import RouteTwo from './RouteTwo'
import Home from './Home'
import './common.css'

export default class Header extends Component {
  render() {
    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark shadow-sm fixed-top" style={{backgroundColor: "#FFFFFF"}}>

                    <Link className="navbar-brand text-dark d-flex align-items-center justify-content-center font-weight-bold" style={{letterSpacing: "2px"}} to="/" >  <i class="fas fa-play text-success mr-2" style={{fontSize: "28px"}}></i> Local Streamer</Link>

                    <button className="navbar-toggler " type="button" data-toggle="collapse" data-target="#basicExampleNav" aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon text-success bg-success"></span>
                    </button>

                    <div className="collapse navbar-collapse " id="basicExampleNav">
                        <form className="form-inline form-outline-success my-2 my-lg-0 ">
                            <input className="form-control form-control-green search-input" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success btn-md my-2 my-sm-0 ml-0 shadow-sm p-1 rounded pl-2 pr-2" type="submit"><i class="fab fa-searchengin text-success" style={{fontSize: "25px"}}></i></button>
                        </form>
                        <ul className="navbar-nav ml-auto">

                            <li className="nav-item">
                            <Link className="nav-link text-dark" to="/route1">routeOne</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link text-dark" to="/route2">routeTwo</Link>
                            </li> 
                            <li className="nav-item dropdown">
                                <span className="nav-link dropdown-toggle text-dark" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false" style={{cursor: "pointer"}} >Dropdown</span>
                                <div className="dropdown-menu dropdown-primary dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                    <Link className="dropdown-item" to="/route1">Action</Link>
                                    <Link className="dropdown-item" to="/route1">Another action</Link>
                                    <Link className="dropdown-item" to="/route1">Something else here</Link>
                                </div>
                            </li>


                        </ul>

                    </div>

                </nav>

            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/route1' component={RouteOne}/>
                <Route path='/route2' component={RouteTwo}/>
            </Switch>
        </Fragment>
    )
  }
}
