import axios from 'axios';
import setAlert from './alert';
import {ADD_POST, DELETE_POST, GET_POST, GET_POSTS, POST_ERROR, UPDATE_LIKES,ADD_COMMENT,REMOVE_COMMENT} from './types';


//get posts

export const getPosts=()=>async dispatch=>{
    try {
        const res=await axios.get('/api/sell');
        dispatch({
            type:GET_POSTS,
            payload:res.data
        });

    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
};


export const deletePost=id=>async dispatch=>{
    try {
        await axios.delete(`/api/sell/${id}`);
        dispatch({
            type:DELETE_POST,
            payload:id
        });
        dispatch(setAlert('Post removed','success'));
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
}

export const addPost=formdata=>async dispatch=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    };
    try {  
        const res=await axios.post('/api/sell',formdata,config);
        dispatch({
            type:ADD_POST,
            payload:res.data
        });
        dispatch(setAlert('Post created','success'));
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
}

export const getPost=(id)=>async dispatch=>{
    try {
        const res=await axios.get(`/api/sell/${id}`);
        dispatch({
            type:GET_POST,
            payload:res.data
        });
    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
}

