import React , {Fragment , useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import { getProfileById } from '../../actions/profile'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'



const Profile = ({match , getProfileById , profile : {profile , loading } , auth }) => {
   // console.log(match.params.id)
    useEffect(()=>{
        getProfileById(match.params.id)
    },[getProfileById])
    return (
        <Fragment>
            {profile === null  || loading ? (
                <Spinner/>
            ) : (
                <Fragment>
                    <Link to="/profiles" className="bnt btn-light">
                        Back To Profiles
                    </Link>
                    {auth.isAuthenticated && loading=== false && auth.user._id === profile.user._id && (
                        <Link to='/edit-profile' className="btn btn-dark">
                             Edit Profile
                        </Link>
                    )}

                    <div className="profile-grid my-1">
                        <ProfileTop profile={profile}/>
                        <ProfileAbout profile={profile}/>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

Profile.propTypes = {
    getProfileById : PropTypes.func.isRequired,
    profile : PropTypes.object.isRequired,
    auth :PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return {
        profile : state.profile,
        auth : state.auth 
    }
}


export default  connect(mapStateToProps , {getProfileById})(Profile)