import Mock from 'mockjs'
import Api from '../../api/api'

Mock.setup({
    timeout:'300-1000',
})
const countryData=Mock.mock(
    Api.GET_COUNTRY_DATA,{
        'message':'success',
        'code':0,
        'totalView|200-300':222,
        'todayView|0-15':10,
        'list|8': [{
            'id|+1': 1001,
            'country':'@city',
            'view|1-80':20
        }],
    }
)
export {
    countryData,
}