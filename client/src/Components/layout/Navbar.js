import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'


const Navbar = ({auth : {isAuthenticated , loading} , logout}) => {


  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt"></i>
          <span className="hide-sm">Logout</span>
        </a>
      </li>

      <li>
        <Link to="/dashboard">
          <i className="fas fa-user"/>
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
    </ul>  
  )
    const guestLinks = (
      <ul>
         <li>
        <Link to="/profiles">Developers</Link>
      </li>
        <li>
          <Link to= "/register">Register</Link>
        </li>

        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    )
   // console.log(loading, "loading")
   // console.log(isAuthenticated , "isauthenticate")

    return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
            <i className="fas fa-code">DevConnector</i>
        </Link>
      </h1>
      {/* {!loading ? "" : null} */}
      {!loading && (<Fragment> {isAuthenticated ? authLinks : guestLinks} </Fragment>)}
    </nav>
    )
}

Navbar.prototype={
  logout : PropTypes.func.isRequired,
  auth : PropTypes.object.isRequired,
}

const mapStateToProps = state => {
   // console.log(state.auth.isAuthenticated)
   // console.log(state.auth)
  return {
    auth : state.auth
  }
}

export default connect( mapStateToProps , {logout} )(Navbar)
