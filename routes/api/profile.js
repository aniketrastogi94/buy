const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');
const { json } = require('express');


//@route   GET api/profile/me
//@desc    get current user profile
//@access  Private
router.get('/me',auth,async (req,res) => {
    try {
        const profile = await (await Profile.findOne({user: req.user.id})).populate('user',['name','avatar',])
        if(!profile){
            return res.status(400).json({msg: 'Profile Not Found'});
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//@route   Post api/profile
//api/profile/me
//@dec     create or update user profile 
//@access  Private

router.post('/',[auth,[
    check('institute', 'Institute is required')
    .not()
    .isEmpty(),
    check('branch', 'Branch is required')
    .not()
    .isEmpty()
]
],async (req,res) => {
    const errors =  validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {
        institute,
        branch,
        semester,
        bio,
        location,
        facebook,
        linkedin
    } = req.body;

    //build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if(institute) profileFields.institute = institute;
    if(branch) profileFields.branch = branch;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(semester) profileFields.semester = semester;

    ///build social object
    profileFields.social ={}
    if(facebook) profileFields.social.facebook = facebook;
    if(linkedin) profileFields.social.linkedin = linkedin;
  

    try {
        let profile = await Profile.findOne({user: req.user.id});

        if(profile){
            //update
            profile = await Profile.findOneAndUpdate({user : req.user.id},{$set: profileFields},
                {new: true}
                )
                return res.json(profile);
        }
        //create
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);


    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error');
        
    }
});

//@route   get  api/profile/user/:user_id
//api/profile/me
//@dec     get profile by user id 
//@access  Public
router.get('/user/:user_id', async (req,res) =>  {
    try {
        const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name','avatar']);
        
        if(!profile){
            return res.status(400).json({msg: 'There is no profile for this user'})
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg: 'Profile Not Found'});
        }
        res.status(500).send('server error');
    }
});

//@route   DELETE  api/profile
//api/profile/me
//@dec     delete profile  ,user,posts
//@access  Private
router.delete('/',auth, async (req,res) =>  {
    try {
        //remove posts
        await Post.deleteMany({ user: req.user.id});
        //remove profile
        await Profile.findOneAndDelete({user: req.user.id});
        //Remove user
        await User.findOneAndDelete({_id: req.user.id});
        res.json({msg : "Deleted"});
    } catch (err) {
        console.error(err.message);  
        res.status(500).send('server error');
    }
});



module.exports = router;