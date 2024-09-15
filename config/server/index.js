import { connectDB } from '../../database/index.js';
import { setupMiddleware } from './middleware.js';

export const setupApp = async (app) => {
    await connectDB();
    setupMiddleware(app);
}