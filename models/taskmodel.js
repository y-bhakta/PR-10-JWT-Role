import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    status : {
        type : String,
        enum : ['Pending', 'In Progress' , 'Completed']
    },
    assignTo : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },

});

const Task = mongoose.model('taskTbl' , taskSchema);

export default Task;