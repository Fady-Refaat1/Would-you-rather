import {applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {tracker } from './tracker'

export default applyMiddleware(
    thunk,
    tracker,
)
