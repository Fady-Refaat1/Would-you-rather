import  React from  "react";
import { connect } from "react-redux";
import { Route, Redirect} from  "react-router-dom";

function PrivateRoute({component:Component,authedUser, exact,path}) {
    const condition  =  authedUser === null
    return (
        <Route
        exact={exact} path={path} // you can {...rest}
        render={({history}) => (//{history,location,match} === props
                condition
                ?  <div>
                    <Redirect to={{
                    state: {from:history.location.pathname},
                    pathname: '/login'
                    }}/>
                    {console.log('path' ,location.pathname)}
                    {console.log('props',{history})}
                    </div> 
                : <Component />
        )}
    />
    )
  }

function mapStateToProps ({ authedUser }) {
    return {
        authedUser,
    }
}
export  default connect(mapStateToProps)(PrivateRoute)