import React from 'react'
import { connect } from 'react-redux'
import { Nav} from 'react-bootstrap';
import { LinkContainer} from 'react-router-bootstrap'
import loginPhoto from '../utils/loginPhoto.png'
const HomeNav = (props) => {
        const {authedUser,users} =props
        return (
            <div>
            {authedUser === null
            ?
            <nav className=" navbar  navbar-expand-sm  bg-dark p-3 m-0 navbar-dark  " >
                <ul className="navbar-nav ">
                        <li className="nav-item p-3 h3" style={{color:'white'}}>
                            welcome to Would rather game 
                        </li>
                </ul>
            </nav>
            :
            <nav className=" navbar navbar-expand-sm bg-dark p-0 m-0 navbar-dark " >
            <ul className="navbar-nav ">
                <li className="nav-item p-3 ">
                <LinkContainer to='/' className="navbar-brand p-0 m-0  mx-auto" activeClassName="nav-link" >
                    <Nav.Link><img src={loginPhoto}  width="90" height="60" className=" p-0"/></Nav.Link>
                </LinkContainer>
                </li>
                <li className="nav-item pt-4 ">
                <LinkContainer to='/'activeClassName="nav-link" >
                    <Nav.Link >Home</Nav.Link>
                </LinkContainer>
                </li>
                <li className="nav-item pt-4 ">
                <LinkContainer exact to='/add' activeClassName="nav-link" >
                    <Nav.Link >New poll</Nav.Link>
                </LinkContainer>
                </li>
                <li className="nav-item pt-4">
                <LinkContainer to="/leaderboard" activeClassName="nav-link">
                    <Nav.Link >leader board </Nav.Link>
                </LinkContainer>
                </li>
                <li className='mx-auto pt-5 p-0 navbar-text align-middle' style={{color:'white'}}>
                Hello <em>{users[authedUser].name}</em>
                </li>
                <li className="nav-item mx-auto  p-3">
                <img src={users[authedUser].avatarURL} fluid='true' width="50" height="50" className="rounded-circle p-0"/>
                </li>
                <li className="nav-item mr-sm-2 pt-4">
                <LinkContainer exact to='/logout' activeClassName="nav-link">
                    <Nav.Link >log out</Nav.Link>
                </LinkContainer>
                </li>
            </ul>
            </nav>
        }
            </div>
        )
    
    }

function mapStateToProps ({ users,authedUser }) {
    return {
        users,
        authedUser
    }
}

export default connect(mapStateToProps)(HomeNav)