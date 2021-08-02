import React , {useEffect} from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { setAuthedUser } from '../actions/authedUser';

const LogOut = (props) => {
    useEffect(()=>{
        const {dispatch} = props
        return ()=>{
            dispatch(setAuthedUser(null))
        }
    }) // = componentWillUnmount() 
    
        return(
            <Redirect to='/login'/> 
        );
    }


export default connect()(LogOut)