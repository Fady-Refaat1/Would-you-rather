import React,{Component} from 'react'
import { connect } from 'react-redux';
import Questions from './Questions';
import {Button ,Container} from 'react-bootstrap';
class Home extends Component{
    state={
        view:'unAnswerd',
    }
    handleView = (e,view)=>{
        e.preventDefault()
        this.setState(()=>({view}))
    }

    render(){
        const {view} = this.state
        return(
            <div >
                <Container className='w-50 '>
                    <Button 
                        className=' rounded-3 border  shadow p-3 mt-2 '
                        onClick={(e)=>this.handleView(e,'Answerd')}>
                            Answerd Questions
                        </Button>
                        <Button
                        className='  rounded-3 border  shadow p-3 mt-2'
                        onClick={(e)=>this.handleView(e,'unAnswerd')}>
                            UnAnswerd Questions
                        </Button>
                        <Questions view={view} />
                </Container>
            </div>      
        );
    }
}
function mapStateToProps ({authedUser }) {
    return {
        authedUser,
    }
}
export default connect(mapStateToProps)(Home)