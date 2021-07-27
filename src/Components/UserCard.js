import React,{Component} from 'react'
import { connect } from 'react-redux';
import {Row,Col, Card} from 'react-bootstrap';
class UserCard extends Component{
    calScore =(id)=>{
        const {users} =this.props
            const answeredQuestions = Object.keys(users[id].answers).length
            const createdQuestions = users[id].questions.length
            return{
                score:answeredQuestions+createdQuestions,
                answeredQuestions,
                createdQuestions,
            }
    }

    render(){
        const {users,id,score,answeredQuestions,createdQuestions,rank}=this.props
        return(
            <Card key={id} className='w-50  bg-light mx-auto rounded-3 border  shadow p-3 m-5  ' style={{color:'black' }}>
                    <Row >
                        <Col  className='col-sm-4 '>  
                        {rank === 1
                        ? <h6>First</h6>
                        : rank === 2
                            ? <h6>Second</h6>
                            :<h6>Third</h6>
                        }
                        <Card.Img src={users[id].avatarURL} fluid='true' className="rounded-circle p-3 "/>
                        </Col>
                        <Col className='col-sm-8'>
                        <Card.Body>
                            <Card.Title>
                            {users[id].name}
                            </Card.Title>
                            <br />
                            <Row className='border  rounded m-t-3' >
                                <Col className='col-sm-7 m-3  '>
                                <h6>Answered Questions : {answeredQuestions}</h6>
                                <br />
                                <h6>Created Questions : {createdQuestions}</h6>
                                </Col>
                                <Col className='col-sm-3 m-3 rounded  border '>
                                <h4>score</h4>
                                <hr/>
                                <span>{score}</span>
                                </Col>
                            </Row>
                        </Card.Body>
                        </Col>
                    </Row>
            </Card>
        );
    }
}


function mapStateToProps ({users},{id,score,answeredQuestions,createdQuestions,rank}) {
    return {
        users,
        id,
        score,
        answeredQuestions,
        createdQuestions,
        rank
    }
}
export default connect(mapStateToProps)(UserCard)