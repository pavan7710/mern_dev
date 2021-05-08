import React , {Fragment , useEffect } from 'react'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import {getProfiles} from '../../actions/profile'
import { connect } from 'react-redux'
import ProfileItem from './ProfileItem'

const Profiles = ({profile: {profiles, loading} , getProfiles}) => {

    useEffect(()=> {
        getProfiles()
    }, [getProfiles])


    return <Fragment>
        {loading ? (<Spinner/>) : ( <Fragment>
            <h1>Developers</h1>
            <p className="lead">
                <i className="fab fa-connectdevelop"/>Browsr and connect with Developers
            </p>
            <div className="profiles">
                {profiles.length > 0 ? (
                    profiles.map(profile => (
                        <ProfileItem key={profile._id} profile={profile}/>
                    ))
                ) : <Spinner/>}
            </div>
        </Fragment>) }
    </Fragment>
}

Profiles.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfiles : PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        profile : state.profile
    }
}

export default connect(mapStateToProps , {getProfiles}) (Profiles)
