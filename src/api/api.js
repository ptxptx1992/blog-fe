let HOST = 'http://127.0.0.1:3020';
const API={
    GET_COUNTRY_DATA:`${HOST}/test`,
    REGISTER:`${HOST}/user/register`,
    LOGIN:`${HOST}/user/login`,
    GET_ARTICLE_TYPE_LIST:`${HOST}/article_type/type-list`,
    GET_ARTICLE_TYPE_LIST_NOPAGE:`${HOST}/article_type/type-list-nopage`,
    SET_ARTICLE_TYPE:`${HOST}/article_type/type-add`,
    EDIT_ARTICLE_TYPE:`${HOST}/article_type/type-edit`,
    DELETE_ARTICLE_TYPE:`${HOST}/article_type/type-delete`,
    SAVE_ARTICLE:`${HOST}/article_type/type-delete`,
    GET_ARTICLE_LIST:`${HOST}/article_list/article-list`,
    GET_ARTICLE_LIST_NOPAGE:`${HOST}/article_list/article-list-nopage`,
    ADD_ARTICLE:`${HOST}/new_article/add-article`,
    GET_ARTICLE_DETAIL:`${HOST}/new_article/get-article`,
    EDIT_ARTICLE:`${HOST}/new_article/edit-article`,
    EDIT_ARTICLE_STATUS:`${HOST}/new_article/edit-article-status`,
    DOWNLOAD_ARTICLE_LIST:`${HOST}/new_article/export-article-list`,
    GET_MESSAGE_LIST:`${HOST}/message_list/message-list`,
    UPDATE_MESSAGE_LIST:`${HOST}/message_list/update-status`,
}
export default API;    