const mongoose = require('mongoose');

const userModel = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        image: {
            type: String, required: false,
            default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
        },

    },
    { timestamps: true }
);


// //
// userModel.pre('save', async function (next){
//     if(!this.modified){
//         next();
//     }

//     const salt = 
// })

const User = mongoose.model("User", userModel);

module.exports = User;