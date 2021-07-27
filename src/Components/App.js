import React, { Component,Fragment } from 'react'
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom'
import { connect } from 'react-redux';
import  LoadingBar  from 'react-redux-loading';
import { handleIntilData } from '../actions/shared';
import Home from './Home';
import Login from './Login';
import NewQuestion from './NewQuestion';
import LeaderBored from './LeaderBored';
import HomeNav from './HomeNav';
import LogOut from './LogOut';
import PrivateRoute from './PrivetRoutes';
import Page404 from './Page404';
import QuestionDetails from './QuestionDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
class App extends Component{
componentDidMount(){
    this.props.dispatch(handleIntilData())
}
  render(){ 
    return (
      <div className="App">
            <LoadingBar />
            <Router >
            <header className=" d-flex justify-content-center navbar navbar-expand-sm bg-dark p-0 m-0 navbar-dark">
            <HomeNav />
            </header>
            <Switch>
              <PrivateRoute  path='/' exact component={Home} />
              <PrivateRoute  path='/add' exact component={NewQuestion} />
              <PrivateRoute  path='/leaderBoard' exact component={LeaderBored} />
              <PrivateRoute  path='/questions/:id' exact component={QuestionDetails} />
              <Route path='/login' exact  component={Login}/>
              <Route path='/logout' exact component={LogOut} />
              <PrivateRoute  component={ Page404 }/>
            </Switch>
        </Router>
      </div>
    );
  }
}
export default connect()(App)
