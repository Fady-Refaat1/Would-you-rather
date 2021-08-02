import { createStore } from 'redux';
import reducer from '../Reducers'
import middleWare from '../middleware'


const store = createStore(reducer,middleWare)

export default store