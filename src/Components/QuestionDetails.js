import React,{Component} from 'react'
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { handleAnswerQuestion } from '../actions/questions';
import { Button,Row,Col, Card} from 'react-bootstrap';

class QuestionDetails extends Component{
    state={
        answerOption:'',
    }

    handleChange=(event)=>{
        this.setState({answerOption: event.target.value})
    }

    handleSubmit=(event,id)=>{
        event.preventDefault()
        const answer = this.state.answerOption
        const {authedUser,dispatch} = this.props
        const qid = id
        this.state.answerOption !== ''&&
        dispatch(handleAnswerQuestion({authedUser, qid, answer}))
        this.props.history.push(`/questions/${id}`)
    }

    render(){
        const {users,authedUser,question} = this.props 

        if(question === 'notFound'){
            return <Redirect to='/notFound' />
        }

        const isAnswerd = question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)

        const numOfOption1Votes = question.optionOne.votes.length
        const numOfOption2Votes = question.optionTwo.votes.length
        return(
                <div  >
                    <ul>
                    { isAnswerd
                ? 
                <Card key={question.author} className='w-50  bg-light mx-auto rounded-3 border  shadow p-2 m-2  ' style={{color:'black' }}>
                                    <Row>
                                        <Card.Title>
                                        <h3> Asked by <em>{users[question.author].name}</em></h3>
                                        <hr/>
                                        </Card.Title>
                                    </Row>
                                    <Row  >
                                        <Col  className='col-sm-4 '>  
                                        <Card.Img src={users[question.author].avatarURL} fluid='true' className="rounded-circle p-3 "/>
                                        </Col>
                                        <Col className='col-sm-8 p-0'>
                                        <Card.Body className='m-2 ' >
                                            <Row className={question.optionOne.votes.includes(authedUser) ? 'mx-auto rounded-3 border m-1 p-0 alert alert-success' :'mx-auto rounded-3 border m-1 p-0 alert alert-danger'}>
                                            <p>Would you rather {question.optionOne.text} ? 
                                            {question.optionOne.votes.includes(authedUser) ? <b>    your vote</b> : null}</p>
                                            <p>{((numOfOption1Votes)/(numOfOption1Votes+numOfOption2Votes)*100).toFixed(1)} %</p>
                                            <p>{numOfOption1Votes} out of {numOfOption1Votes+numOfOption2Votes}</p>
                                            </Row>
                                            <Row className={question.optionTwo.votes.includes(authedUser) ? 'mx-auto  rounded-3 border m-1 p-0 alert alert-success' :'mx-auto rounded-3 border m-1 p-0 alert alert-danger'}>
                                            <p>Would you rather {question.optionTwo.text} ? 
                                            {question.optionTwo.votes.includes(authedUser) ? <b>    your vote</b>: null}</p>
                                            <p>{((numOfOption2Votes)/(numOfOption1Votes+numOfOption2Votes)*100).toFixed(1)} %</p>
                                            <p>{numOfOption2Votes} out of {numOfOption1Votes+numOfOption2Votes}</p>
                                            </Row>
                                        </Card.Body>
                                        </Col>
                                    </Row>
                            </Card>
                :
                <Card expand='lg' className='w-50  bg-light mx-auto rounded-3 border  shadow p-3 m-5  ' style={{color:'black' }}>
                                    <Row>
                                        <Card.Title>
                                        <em>{users[question.author].name}</em> asks:
                                        <hr/>
                                        </Card.Title>
                                    </Row>
                                    <Row >
                                        <Col  className='col-sm-4 '>  
                                        <Card.Img src={users[question.author].avatarURL} fluid='true' className="rounded-circle p-3 "/>
                                        </Col>
                                        <Col className='col-sm-8'>
                                        <Card.Body className='border rounded m-t-3 p-4 '>
                                                <Row>
                                                <b >Would you rather...</b>
                                                </Row>
                                                <Row className=' form-check'>
                                                <input
                                                                className="form-check-input  "
                                                                type="radio" 
                                                                value="optionOne" 
                                                                name="answer" 
                                                                checked={this.state.answerOption === "optionOne"}
                                                                onChange={this.handleChange}
                                                                />{question.optionOne.text}
                                                </Row>
                                                <Row className=' form-check'>
                                                <input 
                                                                className="form-check-input "
                                                                type="radio" 
                                                                value="optionTwo" 
                                                                name="answer" 
                                                                checked={this.state.answerOption === "optionTwo"}
                                                                onChange={this.handleChange}
                                                                />{question.optionTwo.text}
                                                </Row>
                                                <Row>
                                                <Button
                                                    className='mx-auto w-50 '
                                                    onClick={(e)=>this.handleSubmit(e,question.id)} 
                                                    disabled={this.state.answerOption === ''}
                                                    >
                                                    submit
                                                    </Button>
                                                </Row>
                                            
                                        </Card.Body>
                                        </Col>
                                    </Row>
                            </Card>
                }
                    </ul>
                </div>
        );
    }
}
function mapStateToProps ({authedUser, users, questions},props) {
    const {id} = props.match.params
    const question = questions[id]
     return {
        authedUser,
        users,
        question : question ? question : 'notFound' ,
    }
}
export default withRouter(connect(mapStateToProps)(QuestionDetails))