import axios from 'axios';
import TMessage from "../components/TMessage/TMessage";

axios.defaults.baseURL = process.env.VUE_APP_SERVER_API_PATH;

axios.interceptors.request.use( configs => {

    try {
        let data = JSON.parse(localStorage.getItem('user'));

        if (data.authorization) {
            configs.headers.common.authorization = data.authorization;
        }
    } catch (e) {

    }

    return configs;
} );
axios.interceptors.response.use( response => {
    return response;
}, error => {
    let {message, errorDetails} = error.response.data;
    if (errorDetails) {
        message += ' : ' + errorDetails;
    }

    TMessage.error(message);

    throw error;

} );

// 注册
export const register = data => {
    return axios({
        method: 'post',
        url: '/user/register',
        data
    })
};

// 登录
export const login = data => {
    return axios({
        method: 'post',
        url: '/user/login',
        data
    });
};

// 面板
// 获取所有面板
export const getBoards = () => {
    return axios({
        url: '/board'
    });
};
// 获取一个面板
export const getBoard = id => {
    return axios({
        url: '/board/' + id
    })
};
// 提交一个新的面板
export const postBoard = data => {
    return axios({
        method: 'post',
        url: '/board',
        data
    });
};

// 获取一个指定面板下的所有列表集合
export const getLists = boardId => {
    return axios({
        url: '/list',
        params: {
            boardId
        }
    })
};
// 添加一个新的列表
export const postList = data => {
    return axios({
        method: 'post',
        url: '/list',
        data
    })
};
// 编辑一个指定的列表
export const putList = data => {
    return axios({
        method: 'put',
        url: '/list/' + data.id,
        data: {
            boardId: data.boardId,
            name: data.name,
            order: data.order
        }
    })
};


// 获取一个指定列表下的所有卡片
export const getCards = boardListId => {
    return axios({
        url: '/card',
        params: {
            boardListId
        }
    })
};
// 添加一张卡片
export const postCard = data => {
    return axios({
        method: 'post',
        url: '/card',
        data
    })
};
// 编辑一个指定的卡片
export const putCard = data => {
    return axios({
        method: 'put',
        url: '/card/' + data.id,
        data: {
            boardListId: data.boardListId,
            name: data.name,
            description: data.description,
            order: data.order
        }
    })
};