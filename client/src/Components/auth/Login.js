import React ,{ Fragment, useState }  from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import { login } from '../../actions/auth'


const Login = ({login , isAuthenticated}) => {
    const [formData, setformData] = useState({
        email : "pavan@gmail.com",
        password : "1234567",
    })


    const {email , password} = formData

    const handleChange = (e) => {
        setformData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        //console.log(formData)
        login(email , password)
    }; 

    // Redirect if logged in 

    if(isAuthenticated){
        return <Redirect to="/dashboard" /> 
    }
    return (
       <Fragment>
           <h1 className="large text-primary">Sign In</h1>
           <p className="lead">
                <i className="fas fa-user"/> Sign Into Your Account
           </p>

           <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <input value={email} onChange={handleChange} type="text" placeholder="Email" name="email"/>
                <small className="form-text">
                    This site uses Gravatar so if you want a profile image, use a
                    Gravatar email
                </small>
                </div>

                <div className="form-group">
                    <input value={password} onChange={handleChange} type="password" placeholder="password" name="password"/>
                </div>


                <input type="submit" className="btn btn-primary"/>
           </form>
           <p className="my-1">
                Don't hava an account <Link to="/register">Sign Up</Link>
           </p>
       </Fragment>
    )
}

Login.propTypes = {
login : PropTypes.func.isRequired,   //ptfr
isAuthenticated : PropTypes.bool,   // ptb
}

const mapStateToProps = state => {
    return {
        isAuthenticated : state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps , {login})(Login)
