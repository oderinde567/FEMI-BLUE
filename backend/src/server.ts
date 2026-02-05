import 'dotenv/config';
import { createApp } from './app.js';
import { connectDB, env } from './config/index.js';

const startServer = async (): Promise<void> => {
    try {
        // Connect to MongoDB
        await connectDB();

        // Create Express app
        const app = createApp();

        // Start server
        app.listen(env.PORT, () => {
            console.log(`
🚀 BlueArnk API Server Started
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 Environment: ${env.NODE_ENV}
🔗 URL: http://localhost:${env.PORT}
📚 API Version: ${env.API_VERSION}
⏰ Started at: ${new Date().toISOString()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            `);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason) => {
    console.error('❌ Unhandled Rejection:', reason);
    process.exit(1);
});

startServer();
