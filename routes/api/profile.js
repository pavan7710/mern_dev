const express = require("express")
const config = require("config")
const router = express.Router()
const auth = require('../../middleware/auth')
const {check , validationResult} = require("express-validator")



const Profile = require("../../models/Profile")
const User = require("../../models/User")



//  @route          GET api/profile/me
//  @des            get current users PROfile 
//  @access         Private


router.get('/me' , auth , async(req , res) => {
    try {
        const profile = await Profile.findOne({user : req.user.id}).populate('user' , ['name' , 'avatar'])
        if(!profile){
            return res.status(400).json({msg : "There is no Profile For This User"})
        }
        res.json(profile)
    }catch(err){
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})


//  @route          POST api/profile
//  @des            Create or Update Profile
//  @access         Private


router.post('/' , auth , [
    check('status' , "Status is required").not().isEmpty(),
    check("skills" , "Skills are Required").not().isEmpty()

] , async (req , res)=> {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body

    // Bild Profile Object 

    const profileFields = {}
    profileFields.user = req.user.id;
    if (company) profileFields.company = company
    if (website) profileFields.website = website
    if (location) profileFields.location = location
    if (bio) profileFields.bio = bio 
    if (status) profileFields.status = status
    if (githubusername) profileFields.githubusername =githubusername
    if (skills) profileFields.skills = skills.split(',').map(skill=> skill.trim())

    

    //Build social object 

    profileFields.social = {} 

    if (youtube) profileFields.social.youtube = youtube
    if (twitter) profileFields.social.twitter = twitter
    if (facebook) profileFields.social.facebook = facebook
    if (linkedin) profileFields.social.linkedin = linkedin
    if (instagram) profileFields.social.instagram = instagram
    console.log(profileFields)
    try {
        let profile = await Profile.findOne({user : req.user.id})
        if(profile){
            // update 
           // console.log(profile)
            profile = await Profile.findOneAndUpdate(
                {user : req.user.id}, 
                {$set : profileFields},
                {new : true}
            )
            return res.json(profile)
        }

        /// create 

        profile = new Profile(profileFields)

        await profile.save()
        return  res.json(profile)
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Server Error")
    }

})



//  @route          GET api/profile 
//  @des            get all profiles
//  @access         public

router.get('/' , async (req , res) => {
    try {
        const profiles = await Profile.find().populate('user' , ['name' , 'avatar'])
        res.json(profiles)
    } catch (error) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})



//  @route          GET api/profile/user/:user_id 
//  @des            get profile by user Id 
//  @access         public

router.get('/user/:user_id' , async (req , res) => {
    try {
        const profile = await Profile.findOne({user : req.params.user_id}).populate('user' , ['name' , 'avatar'])

        if(!profile) return res.status(400).json({msg : "Profile Not Found"})
        res.json(profile)
    } catch (error) {
        console.error(err.message)
        if(err.kind == "ObjectId"){
            return res.status(400).json({msg : "Profile Not found"})
        }
        res.status(500).send('Server Error')
    }
})



//  @route          DELETE api/profile 
//  @des            DELETE profile , user &post 
//  @access         private 

router.delete('/' , auth, async(req , res) => {
    try {
        //@todo - remove User Posts 

        //Remove Profile 

        await Profile.findOneAndRemove({user : req.user.id})

        //Remove User 

        await User.findOneAndRemove({_id : req.user.id})
        return res.json({msg : "User Deleted "})
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})


//  @route          PUT api/profile/experience
//  @des            Add Profile experience
//  @access         private 


router.put('/experience' , auth , [
    check('title' , "This is Required").not().isEmpty(),
    check('company' , "Company is Required").not().isEmpty()
]  , async (req ,res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors : errors.array()})
        }

    const {
        title,
        company,
        location,
        form,
        to,
        current,
        description
    } = req.body

    const newExp ={
        title,
        company,
        location,
        form,
        to,
        current,
        description
    }

    try {

        const profile = await Profile.findOne({user : req.user.id})
        profile.experience.unShift(req.body)
        await profile.save()
        res.json(profile)
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Server Error ")
    }
})



//  @route          PUT api/profile/experience
//  @des            Add Profile experience
//  @access         private 





module.exports  = router


