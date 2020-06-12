import axios from 'axios';
import TMessage from "../components/TMessage/TMessage";

axios.defaults.baseURL = process.env.VUE_APP_SERVER_API_PATH;

axios.interceptors.response.use( response => {
    return response;
}, error => {

    let message = error.response.data.message;
    if (error.response.data.errorDetails) {
        message += ' : ' + error.response.data.errorDetails;
    }

    TMessage.error(message);
} );

/*
* 注册
* */
export const register = data => {
    return axios({
        method: 'post',
        url: '/user/register',
        data
    });
};