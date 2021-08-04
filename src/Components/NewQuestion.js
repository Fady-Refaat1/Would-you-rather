import React ,{useState} from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleAddQuestion } from '../actions/questions';
import serializeForm from 'form-serialize'
import { Form ,Button} from 'react-bootstrap';

const NewQuestion = (props) => {
    
    const [optionOne,setOptionOne] = useState('')
    const [optionTwo,setOptionTwo] = useState('')
    const [toHome,setToHome] = useState(false)

    const handleOptionOneChange=(event)=>{
        const option = event.target.value
        setOptionOne(option)
    
    }
    const handleOptionTwoChange=(event)=>{
        const option = event.target.value
        setOptionTwo(option)
    }
    const handleAddQuestionForm =(event)=>{
        event.preventDefault();
        const values = serializeForm(event.target,{hash:true}) // we can do this by state it just for variety
        props.handleAddQuestion(values.optionOne,values.optionTwo)
        setToHome(true)
    }
        if(toHome === true){
            return <Redirect to='/'/>
        }

        return (
            <div>
            <Form className='w-50  bg-light mx-auto rounded-3 border  shadow p-3  m-3 ' onSubmit={handleAddQuestionForm}>
            <Form.Label className='h3'>Create New Question</Form.Label>
            <br/>
            <Form.Label
            className='text-muted'
            >
            Compleate the question</Form.Label>
            <Form.Group className="mb-3 w-75  mx-auto" controlId="formBasicEmail">
                <Form.Control 
                    name='optionOne'
                    value={optionOne}
                    placeholder='Enter option one text here'
                    onChange={handleOptionOneChange} />
            </Form.Group>
            <Form.Label
            className='text-muted mx-auto '
            >
            OR</Form.Label>
            <Form.Group className="mb-3 w-75 mx-auto" controlId="formBasicPassword">
                <Form.Control 
                    name='optionTwo'
                    value={optionTwo}
                    placeholder='Enter option Two text here'
                    onChange={handleOptionTwoChange} />
            </Form.Group>
            <Button  
            type='submit'
            disabled={optionOne === '' || optionTwo === ''}>
                Add Poll
            </Button>
    </Form>
            </div>
        );
    
}
const mapDispatchToProps = (dispatch) => {
    return {
        handleAddQuestion : (optionOne,optionTwo)=>{
        dispatch(handleAddQuestion(optionOne,optionTwo))
    }
  }
}

export default connect(null,mapDispatchToProps)(NewQuestion)