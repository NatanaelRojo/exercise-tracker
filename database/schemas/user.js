import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    exercises: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise',
    }],
});