import React from 'react'
import { connect } from 'react-redux';
import UserCard from './UserCard';

const LeaderBoard = (props) => {
        const { rankedUsers } = props
        return(
            <div>
                <h3 className='mt-3'>The leaderboard</h3>
                <ul style={{listStyleType: "none"}}>
                    {rankedUsers.map(
                        (rankeduser,index)=>(
                            <li key={rankeduser.id}>
                                <UserCard 
                                id ={rankeduser.id} 
                                score={rankeduser.score}
                                answeredQuestions={rankeduser.answeredQuestions}
                                createdQuestions={rankeduser.createdQuestions}
                                rank={index+1}
                                />
                            </li>
                        )
                    )}
                </ul>
            </div>
        );
}


function mapStateToProps ({users}) {
    let usersScore =[]
        Object.keys(users).map((id)=>{
            const answeredQuestions = Object.keys(users[id].answers).length
            const createdQuestions = users[id].questions.length
            usersScore= usersScore.concat([{
                id,
                score:answeredQuestions+createdQuestions,
                answeredQuestions,
                createdQuestions,
            }])
        })
    return {
        rankedUsers : usersScore.sort((a, b) =>b.score - a.score)
    }
}
export default connect(mapStateToProps)(LeaderBoard)