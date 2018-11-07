import {createStore,combineReducers,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk';
import userReducer from './user/reducer.js'
export default createStore(
    combineReducers({
        user:userReducer,
    }),
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension?window.devToolsExtension():()=>{}
    )
)