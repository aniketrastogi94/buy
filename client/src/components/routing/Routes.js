import React from 'react';
import {Route,Switch} from 'react-router-dom';
import EditProfile from '../profile-forms/EditProfile';
 import Register from '../auth/Register';
 import Login from '../auth/Login';
import Alert from '../layout/Alert';
 import Dashboard from '../dashboard/Dashboard'; 
// import AddExperience from '../profile-forms/AddExperience';
import PrivateRoute from '../routing/PrivateRoute';
// import Profile from '../profile/Profile';
import Posts from '../posts/Posts'; 
import Post from '../post/Post';
// import AddEducation from '../profile-forms/AddEducation';
 import CreateProfile from '../profile-forms/CreateProfile';
import { POST_ERROR } from '../../actions/types';
// import Profiles from '../profiles/Profiles';
// import NotFound from '../layout/NotFound';

 const Routes = () => {
    return (
        <section className='container'>
        <Alert/>
        <Switch>
          <Route exact path="/register" component={Register}/>
          <Route exact path='/login' component={Login}/>
          {/* <Route exact path='/profiles' component={Profiles}/>*/}
          <Route exact path='/sell/:id' component={Post}/>
          <PrivateRoute exact path='/dashboard' component={Dashboard}/> 
          <PrivateRoute exact path='/edit-profile' component={EditProfile} />
          <PrivateRoute exact path='/create-profile' component={CreateProfile}/>
          <PrivateRoute exact path='/sell' component={Posts} /> 
         {/* <Route component={NotFound}/> */}
        </Switch>
      </section>
    )
}
export default Routes;
