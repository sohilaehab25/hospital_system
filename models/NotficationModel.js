const mongoose = require('mongoose');
const notificationSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'users',
        required:true
    },
    massage:{
        type:String,
        require:true,

    },
    date:{
        type:Date,
        default: Date.now 
    },
    status:{
        type:String,
        enum:['read','unread'],
        default: 'unread'
    }
})
module.exports = mongoose.model('Notification', notificationSchema);