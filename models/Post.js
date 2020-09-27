const mongoose=require('mongoose');
const schema=mongoose.Schema;
const postSchema=new schema({
    user:{
        type:schema.Types.ObjectId,
        ref:'users'
    },
    text:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    category:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});
module.exports=Post=mongoose.model('post',postSchema);