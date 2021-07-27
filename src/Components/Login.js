import React,{Component} from 'react'
import { Button, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser';
import loginPhoto from '../utils/loginPhoto.png'
class Login extends Component{   
    state={
            authedUser : '',
            toHome : false,
            next: this.props.history.location.state || {from: {pathname: '/'}},
        }

    handelChange=(event)=>{
        this.setState({authedUser: event.target.value})
    }
    handleSubmit=(event)=>{
        event.preventDefault()
        const {dispatch} = this.props
        const {authedUser} =this.state
        authedUser !== null
        && dispatch(setAuthedUser(authedUser)) 
        this.setState(()=>({
            toHome:true
        }))
    }
    render(){
        const {users} = this.props
        const {toHome , next} = this.state
        console.log( this.props)
        if (toHome) {
            return <Redirect to={next.from}/>
        }
        return(
            <Container>
                <img src={loginPhoto} className='w-25 m-2' />
                <select className='form-select w-25 mx-auto m-2 border' value={this.state.authedUser} onChange={this.handelChange}>
                    <option value='' disabled>Login as...</option>
                    {Object.keys(users).map((index)=>{
                        return <option  
                        value={users[`${index}`].id} 
                        key={users[`${index}`].id} 
                        selected={this.state.authedUser === users[`${index}`].id}
                        >{users[`${index}`].name}</option>
                    })}
                </select>
                <br />
                <Button className='mx-auto' onClick={this.handleSubmit} disabled={this.state.authedUser === ''}>
                    LOGIN 
                </Button>
            </Container>
        );
    }
}
function mapStateToProps ({ users },{location}) {
    return {
        users,
        location
    }
}

export default connect(mapStateToProps)(Login)