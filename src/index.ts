import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import * as clothingController from "./controllers/clothingController.js";
import * as model from "./models/clothesModelMongoDb.js";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(clothingController.routeRoot, clothingController.router);

// Default Route
app.get("/", (request, response) => {
    response.send("Welcome to the Wardrobe App!");
});

// Initialize Database and Start Server
async function startServer() {
    try {
        await model.initialize();
        console.log("Database initialized successfully");

        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Failed to initialize database:", error);
        process.exit(1);
    }
}

startServer();

export default app; // For testing
