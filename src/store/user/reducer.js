import * as type from './actionType'
let defaultState={
    name:'',
    id:''
}
const reducerMap={
    [type.SAVEUSERINFO]:(state,payload)=>{
      return {...state,...payload}
    }
}

const reducer =(state = defaultState, action = {})=>{
    const { type, payload } = action;
    const reducer = reducerMap[type];
    if (reducer) {
        return reducer(state, payload);
    } else {
        return state;
    }
}
export default reducer;