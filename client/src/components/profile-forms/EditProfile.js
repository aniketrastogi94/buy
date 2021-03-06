import React,{Fragment,useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {createProfile,getCurrentProfile} from '../../actions/profile'
import {Link,withRouter} from 'react-router-dom';
const EditProfile = ({profile:{profile,loading},createProfile,history,getCurrentProfile}) => {
    const [formData,setFormData] = useState({
        institute:"",
        branch: "",
        location: "",
        semester:"",
        bio:"",
        facebook:"",
        linkedin:""
    });
    const{
      institute,
      branch,
      location,
      semester,
      bio,
      facebook,
      linkedin
      } =  formData;
 
    const [displaySocialInputs,toggleSocialInputs] = useState(false);
    useEffect(()=>{
      getCurrentProfile();
      setFormData({
          institute:loading || !profile.institute ? '' :profile.institute,
          branch:loading || !profile.branch ? '' :profile.branch,
          location:loading || !profile.location ? '' :profile.location,
          semester:loading || !profile.semester ? '' :profile.semester,
          bio:loading || !profile.bio ? '' :profile.bio,
          facebook:loading || !profile.social ? '' :profile.social.facebook,
          linkedin:loading || !profile.social ? '' :profile.social.linkedin,
      })
  },[loading,getCurrentProfile]);
   
    const onChange = e => setFormData({...formData,[e.target.name]: e.target.value})
    const onSubmit = e => {
      e.preventDefault();
      createProfile(formData,history,true);
    }
    return (
        <Fragment>
        <h1 className="large text-primary">
   Create Your Profile
 </h1>
 <p className="lead">
   <i className="fas fa-user"></i> Let's get some information to make your
   profile stand out
 </p>
 <small>* = required field</small>
 <form className="form" onSubmit={e => onSubmit(e)}>
   <div className="form-group">
     <select name="status" value={semester} onChange={e => onChange(e)}>
       <option value="1st">* 1st</option>
       <option value="2nd">2nd</option>
       <option value="3rd">3rd</option>
       <option value="4th">4th</option>
       <option value="5th">5th</option>
       <option value="6th">6th</option>
       <option value="7th">7th </option>
       <option value="8th">8th</option>
     </select>
     <small className="form-text"
       >Give us an idea of where you are at in your career</small
     >
   </div>
   <div className="form-group">
     <input type="text" placeholder="Company"value={institute} onChange={e => onChange(e)} name="institute" />
     <small className="form-text"
       >Full Name Of Your Institute</small
     >
   </div>
   <div className="form-group">
     <input type="text" placeholder="Website" value={branch} onChange={e => onChange(e)} name="branch" />
     <small className="form-text"
       >Branch</small
     >
   </div>
   <div className="form-group">
     <input type="text" placeholder="Location" value={location} onChange={e => onChange(e)} name="location" />
     <small className="form-text"
       >City & state suggested (eg. Boston, MA)</small
     >
   </div>


   <div className="form-group">
     <textarea placeholder="A short bio of yourself"  onChange={e => onChange(e)} value={bio} name="bio"></textarea>
     <small className="form-text">Tell us a little about yourself</small>
   </div>

   <div className="my-2">
     <button onClick={() => toggleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">
       Add Social Network Links
     </button>
     <span>Optional</span>
   </div>
   {displaySocialInputs && <Fragment>
   <div className="form-group social-input">
     <i className="fab fa-facebook fa-2x"></i>
     <input type="text" value={facebook} onChange={e => onChange(e)} placeholder="Facebook URL" name="facebook" />
   </div>
   <div className="form-group social-input">
     <i className="fab fa-linkedin fa-2x"></i>
     <input type="text" value={linkedin} onChange={e => onChange(e)} placeholder="Linkedin URL" name="linkedin" />
   </div>
   </Fragment>}
   <input type="submit" className="btn btn-primary my-1" />
   <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
 </form>
   </Fragment>
           
    
    )
}

EditProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    createProfile : PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps,{createProfile,getCurrentProfile})(withRouter(EditProfile));
