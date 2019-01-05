import axios from 'axios'

export default (url,method='GET',data={},headers={},credentials)=>{
    const options={
        url,
        method,
        headers,
        withCredentials: true
    }
    if(method==='GET'){
        options.params=data;
    }else{
        options.data = data;
    }
    return axios(options).then(res=>{
                if(res.status >= 200 && res.status < 300) {
                    return res.data;
                } else {
                    return {
                        code: res.status,
                        msg: res.statusText,
                        data: []
                    };
                }
           })
}