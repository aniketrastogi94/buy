import axios from 'axios';
import  setAlert from './alert';



import{
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    ACCOUNT_DELETED
} from './types';

//get current user profiles
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload: { msg: err.response.statusText,status: err.response.status}
        });
    }
}
//get profile by id
export const getProfileById = (userId) => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload: { msg: err.response.statusText,status: err.response.status}
        });
    }
}

//get all profiles
export const getProfiles = () => async dispatch => {
    dispatch({
        type:CLEAR_PROFILE
    });
    try {
        const res = await axios.get('api/profile');
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload: { msg: err.response.statusText,status: err.response.status}
        });
    }
}

//create or update profle
export const createProfile = (formData,history,edit = false)  => async dispatch => {
  try {
      const config = {
          headers: {
              'Content-Type' : 'application/json'
          }

      }
      
      const res = await axios.post('/api/profile',formData,config);
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });

      dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created'));

      if(!edit){
          history.push('/dashboard');
      }
  } catch (err) {
    const errors = err.response.data.errors;
        
    if(errors){
        errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
    }
     
    dispatch({
        type:PROFILE_ERROR,
        payload: { msg: err.response.statusText,status: err.response.status}
    });
      
  }  

}

//delete account &bprofile
export const deleteAccount =  () => async dispatch => {
    if(window.confirm('Are you sure? This can not be undone.')){
        try{
            await axios.delete('/api/profile');
            dispatch({
                type: CLEAR_PROFILE,
            })
            dispatch({
                type: ACCOUNT_DELETED,
            })
            dispatch(setAlert('Profile Deleted' ));
               // history.push('/dashboard');
        }
        catch (err) {
            dispatch({
                type:PROFILE_ERROR,
                payload: { msg: err.response.statusText,status: err.response.status}
            });
              
          } 

    }
}

