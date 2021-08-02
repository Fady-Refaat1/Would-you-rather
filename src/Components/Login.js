import React,{useState} from 'react'
import { Button, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser';
import loginPhoto from '../utils/loginPhoto.png'

const Login = (props) => {  
    const [authedUser , setAuthedUserState] = useState('')
    const [toHome , setToHome] = useState(false)

    const {users ,setAuthedUser} = props
    const handelChange=(event)=>{
        setAuthedUserState(event.target.value)
    }
    const handleSubmit=(event)=>{
        event.preventDefault()
        authedUser !== null
        && setAuthedUser(authedUser)
        setToHome(true)
    }


        if (toHome) {
            return <Redirect to={(props.history.location.state || {from: {pathname: '/'}}).from}/>
        }
        return(
            <Container>
                <img src={loginPhoto} className='w-25 m-2' />
                <select className='form-select w-25 mx-auto m-2 border' value={authedUser} onChange={handelChange}>
                    <option value='' disabled>Login as...</option>
                    {Object.keys(users).map((index)=>{
                        return <option  
                        value={users[`${index}`].id} 
                        key={users[`${index}`].id} 
                        >{users[`${index}`].name}</option>
                    })}
                </select>
                <br />
                <Button className='mx-auto' onClick={handleSubmit} disabled={authedUser === ''}>
                    LOGIN 
                </Button>
            </Container>
        );
    }


const mapStateToProps =  ({ users },{location})=> {
    return {
        users,
        location
    }
}
const mapDispatchToProps = (dispatch) => {
        return {
        setAuthedUser : (id)=>{
            dispatch(setAuthedUser(id))
        }
    }
    }
// const mapDispatchToProps = ({
//     setAuthedUser 
//     })
    

Login.propTypes = {
    users: PropTypes.object.isRequired,
    location : PropTypes.object.isRequired,
    setAuthedUser: PropTypes.func.isRequired
  };


export default connect(mapStateToProps,mapDispatchToProps)(Login)