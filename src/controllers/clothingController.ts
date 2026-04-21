import type { Request, Response } from "express";
import express from "express";
import * as model from "../models/clothesModelMongoDb.js";
import { DatabaseError } from "../models/DatabaseError.js";
import { InvalidInputError } from "../models/InvalidInputError.js";

const router = express.Router();
const routeRoot = "/clothing";

/**
 * Adds a new clothing piece to the database.
 * 
 * @async
 * @param {Request} request - The Express request object, containing type, colour, and size in the body.
 * @param {Response} response - The Express response object used to send the status and result message.
 * @returns {Promise<void>}
 */
router.post("/", addClothing);
async function addClothing(request: Request, response: Response): Promise<void> {
    try {
        const { type, colour, size } = request.body;
        const result: model.clothingPiece = await model.addClothing(type, colour, size);
        response.status(200).send(`Clothing piece added: type=${result.type}, colour=${result.colour}, size=${result.size}`);
    }
    catch (error) {
        handleError(error, response);
    }
}

/**
 * Retrieves a single clothing piece from the database based on the 'type' query parameter.
 * 
 * @async
 * @param {Request} request - The Express request object, containing 'type' in the query string.
 * @param {Response} response - The Express response object used to send the clothing detail or an error.
 * @returns {Promise<void>}
 */
router.get("/one", getOneClothingPiece);
async function getOneClothingPiece(request: Request, response: Response) {
    try {
        const type = request.query.type as string;
        const result: model.clothingPiece = await model.getSingleClothing(type);
        response.status(200).send(`Clothing piece found: type=${result.type}, colour=${result.colour}, size=${result.size}`);
    }
    catch (error) {
        handleError(error, response);
    }
}

/**
 * Retrieves all clothing pieces stored in the database.
 * 
 * @async
 * @param {Request} request - The Express request object.
 * @param {Response} response - The Express response object used to send the array of clothing pieces.
 * @returns {Promise<void>}
 */
router.get("/all", getAllClothingPieces);
async function getAllClothingPieces(request: Request, response: Response) {
    try {
        const result = await model.getAllClothingPieces();
        response.status(200).send(result);
    }
    catch (error) {
        handleError(error, response);
    }
}

/**
 * Updates an existing clothing piece in the database with new values.
 * 
 * @async
 * @param {Request} request - The Express request object, containing type, newType, newColour, and newSize in the body.
 * @param {Response} response - The Express response object used to send the update confirmation.
 * @returns {Promise<void>}
 */
router.put("/", updateClothingPiece);
async function updateClothingPiece(request: Request, response: Response) {
    try {
        const { type, newType, newColour, newSize } = request.body;
        const result = await model.updateClothingPiece(type, newType, newColour, newSize);

        response.status(200).send(`Updated the ${type} to ${result.colour} ${result.type}, size: ${result.size}`);
    }
    catch (error) {
        handleError(error, response);
    }
}

/**
 * Deletes a clothing piece from the database based on the 'type' query parameter.
 * 
 * @async
 * @param {Request} request - The Express request object, containing 'type' in the query string.
 * @param {Response} response - The Express response object used to send the deletion confirmation.
 * @returns {Promise<void>}
 */
router.delete("/", deleteClothing);
async function deleteClothing(request: Request, response: Response) {
    try {
        const type = request.query.type as string;
        await model.deleteClothing(type);
        response.status(200).send(`Deleted clothing item: ${type}`);
    }
    catch (error) {
        handleError(error, response);
    }
}

/**
 * Handles errors thrown by the model or other internal logic, sending appropriate HTTP status codes and messages.
 * 
 * @param {any} error - The error object to be handled.
 * @param {Response} response - The Express response object used to send the error status.
 */
function handleError(error: any, response: Response) {
    if (error instanceof InvalidInputError) {
        response.status(400).send("Invalid input: " + error.message);
    }
    else if (error instanceof DatabaseError) {
        response.status(500).send("Database error: " + error.message);
    }
    else {
        response.status(500).send("An unexpected error occurred");
    }
}

export {
    router,
    routeRoot
};
