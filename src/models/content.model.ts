import mongoose,{Schema} from 'mongoose';



interface IContent extends Document {
    link: string;
    type: string;
    title: string;
    userId: mongoose.Types.ObjectId; // Ensure it's an ObjectId
    tags: mongoose.Types.ObjectId[]; // Ensure tags are ObjectIds
}

const contentScehma = new mongoose.Schema({

    link:{
        type:String,
    },
    type:{
        type:String,
        // enum:["image","video","article","audio"],
        // default:'article',
        required:true
    },
    title:{
        type:String,
        required:true,
    },
    tags:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tag"
    }],
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})

export const Content= mongoose.model('Content',contentScehma);