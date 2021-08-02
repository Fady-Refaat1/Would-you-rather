import React , {useState } from 'react'
import Questions from './Questions';
import {Button ,Container} from 'react-bootstrap';

const Home = ()  => {
    const [view , setView] = useState('unAnswerd')

    const handleView = (e,view)=>{
        e.preventDefault()
        setView(view)
    }
        return(
            <div >
                <Container className='w-50 '>
                    <Button 
                        className=' rounded-3 border  shadow p-3 mt-2 '
                        onClick={(e)=>handleView(e,'Answerd')}>
                            Answerd Questions
                        </Button>
                        <Button
                        className='  rounded-3 border  shadow p-3 mt-2'
                        onClick={(e)=>handleView(e,'unAnswerd')}>
                            UnAnswerd Questions
                        </Button>
                        <Questions view={view} />
                </Container>
            </div>      
        );
    
}


export default Home