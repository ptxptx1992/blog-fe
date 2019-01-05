let HOST = 'http://127.0.0.1:3020';
const API={
    GET_COUNTRY_DATA:`${HOST}/test`,
    REGISTER:`${HOST}/user/register`,
    LOGIN:`${HOST}/user/login`,
    GET_ARTICLE_TYPE_LIST:`${HOST}/article_type/type-list`,
    SET_ARTICLE_TYPE:`${HOST}/article_type/type-add`,
    EDIT_ARTICLE_TYPE:`${HOST}/article_type/type-edit`,
    DELETE_ARTICLE_TYPE:`${HOST}/article_type/type-delete`

}
export default API;    