import * as type  from './actionType'
export const saveUserInfo = data =>{
    return {
        type:type.SAVEUSERINFO,
        payload:data
    }
}