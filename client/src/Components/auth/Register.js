import React ,{ Fragment, useState }  from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert'
import { register } from '../../actions/auth'




const Register = ({setAlert , register }) => {

    

    const [formData, setformData] = useState({
        name : "",
        email: "",
        password : "",
        password2:"",
    })

    const {name , email , password , password2} = formData

    const handleChange = (e) => {
        setformData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(password !== password2 ){
           setAlert("password do not match" , "danger")
        } else {
          //  console.log(formData)
          register({name , email , password })
        }
    }

    return (
       <Fragment>
           <h1 className="large text-primary">Sign In</h1>
           <p className="lead">
                <i className="fas fa-user"/> Sign Into Your Account
           </p>

           <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <input onChange={handleChange}  value={name} type="text" placeholder="Name" name="name"/>
                </div>

                <div className="form-group">
                    <input value={email} onChange={handleChange}  type="text" placeholder="Email" name="email"/>
                <small className="form-text">
                    This site uses Gravatar so if you want a profile image, use a
                    Gravatar email
                </small>
                </div>

                <div className="form-group">
                    <input value={password} onChange={handleChange}  type="password" placeholder="password" name="password"/>
                </div>

                <div className="form-group">
                    <input value={password2}  onChange={handleChange}  type="password" placeholder="Confirm password" name="password2"/>
                </div>
                <input type="submit" className="btn btn-primary"/>
           </form>
           <p className="my-1">
                Alreadt have an account <Link to="/login">Sign In</Link>
           </p>
       </Fragment>
    )
}

Register.propTypes = {
    setAlert : PropTypes.func.isRequired,
    register : PropTypes.func.isRequired,
}



export default connect(null , {setAlert ,register})(Register)
