import React ,{Component} from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleAddQuestion } from '../actions/questions';
import serializeForm from 'form-serialize'
import { Form ,Button} from 'react-bootstrap';

class NewQuestion extends Component{
    state={
        optionOne:'',
        optionTwo:'',
        toHome: false,
    }
    handleOptionOneChange=(event)=>{
        const option = event.target.value
        this.setState(()=>({
            optionOne : option
        }))
    }
    handleOptionTwoChange=(event)=>{
        const option = event.target.value
        this.setState(()=>({
            optionTwo : option
        }))
    }
    handleAddQuestion =(event)=>{
        event.preventDefault()
        const {dispatch} = this.props
        const values = serializeForm(event.target,{hash:true}) // we can do this by state it just for variety
        dispatch(handleAddQuestion (values.optionOne,values.optionTwo))
        this.setState(()=>({
            toHome : true
        }))
    }

    render(){
        const {optionOne ,optionTwo,toHome} =this.state
        if(toHome === true){
            return <Redirect to='/'/>
        }
        return (
            <div>
            <Form className='w-50  bg-light mx-auto rounded-3 border  shadow p-3  m-3 ' onSubmit={this.handleAddQuestion}>
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
                    onChange={this.handleOptionOneChange} />
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
                    onChange={this.handleOptionTwoChange} />
            </Form.Group>
            <Button  
            type='submit'
            disabled={this.state.optionOne === '' || this.state.optionTwo === ''}>
                Add Poll
            </Button>
    </Form>
            </div>
        );
    }
}

export default connect()(NewQuestion)