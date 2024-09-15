import mongoose from 'mongoose';
import { userSchema } from '../schemas/user.js';

export const User = mongoose.model('User', userSchema);