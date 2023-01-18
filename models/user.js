import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        require:true,
        min:3,
        max:20,
        unique:true
    },
    email:{
        type:String,
        require:true,
        max:50,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    profilePicture:{
        type:String,
        default:""
    },
    coverPicture:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    desc: {
        type: String,
        max: 50,
      },
      city: {
        type: String,
        max: 50,
      },
      from: {
        type: String,
        max: 50,
      },
      relationship: {
        type: Number,
        enum: [1, 2, 3],
      },
      Admin:{
        type: Boolean,
        default: false,
      }
},
{ timestamps: true })


export default mongoose.model("User",userSchema);
