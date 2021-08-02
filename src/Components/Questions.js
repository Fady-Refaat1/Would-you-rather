import React,{Component} from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {Button,Row,Col, Card} from 'react-bootstrap';
import PropTypes from 'prop-types';
class Questions extends Component{

    questionDetails = (e, id) => {
        e.preventDefault()
        this.props.history.push(`/questions/${id}`)
        }

    render(){
        const {questions,users,authedUser,questionsIds,view} = this.props
        const answerQuestions =[]
        const unAnswerQuestions =[]
        questionsIds.map((index)=>{
            return(
                questions[`${index}`].optionOne.votes.includes(authedUser)
                ||
                questions[`${index}`].optionTwo.votes.includes(authedUser)
            ?   answerQuestions.push([index])
            :   unAnswerQuestions.push([index]))
            })
            let Questions =[]
            
                view === 'Answerd'
                ? Questions = answerQuestions
                : Questions = unAnswerQuestions
            
        return(
            <div >
                        <ul>
                            <Card className=' bg-light mx-auto rounded-3 border  shadow p-3  m-3  ' style={{color:'black' }}>
                            <h4>{view} Questions</h4>
                            </Card>
                            {Questions.length === 0
                            ?<Card className=' bg-light mx-auto rounded-3 border  shadow p-3 m-5  ' style={{color:'black' }}>
                                <em><b>No {view} questions available</b></em>
                            </Card>
                            :
                            Questions.map((index)=>{
                                return (
                                <Card key= {index} className='bg-light mx-auto rounded-3 border  shadow p-3 m-2  ' style={{color:'black' }}>
                                    <Row>
                                        <Card.Title>
                                        Asked By <em>{users[questions[`${index}`].author].name}</em>
                                        <hr/>
                                        </Card.Title>
                                    </Row>
                                    <Row >
                                        <Col  className='col-sm-4 '>  
                                        <Card.Img src={users[questions[`${index}`].author].avatarURL} fluid='true' className="rounded-circle p-3 "/>
                                        </Col>
                                        <Col className='col-sm-8'>
                                        <Card.Body>
                                            <Card.Text className='border  rounded m-t-3 p-3' >
                                                    <b>Would you rather...</b>
                                                    <br/>
                                                    ...{questions[`${index}`].optionOne.text}...
                                                    <br/>
                                                    <Button
                                                    className='mx-auto'
                                                    onClick={(e)=>{this.questionDetails(e,index)}}
                                                    >
                                                    view poll
                                                    </Button>
                                            </Card.Text>
                                        </Card.Body>
                                        </Col>
                                    </Row>
                            </Card>
                                )
                            })
                            }
                        </ul>
            </div>      
        );
    }
}

function mapStateToProps ({ users, questions, authedUser },{view}) {
    return {
        users,
        questionsIds : Object.keys(questions).sort((a,b) => questions[b].timestamp - questions[a].timestamp),
        questions,
        authedUser,
        view,
    }
}
Questions.propTypes = {
    authedUser : PropTypes.string.isRequired,
    users: PropTypes.object.isRequired,
    questions: PropTypes.object.isRequired,
    view :PropTypes.string.isRequired
  };

export default withRouter(connect(mapStateToProps)(Questions ))