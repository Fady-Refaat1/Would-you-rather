import React from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { setAuthedUser } from '../actions/authedUser';

class LogOut extends React.Component {
    componentWillUnmount(){
        const {dispatch} = this.props
        dispatch(setAuthedUser(null))
    }
    render(){
        return(
            <Redirect to='/login'/> 
        );
    }
}

export default connect()(LogOut)