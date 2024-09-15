import { exerciseSchema } from '../schemas/exercise.js';
import mongoose from 'mongoose';

export const Exercise = mongoose.model('Exercise', exerciseSchema)