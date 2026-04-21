import { MongoClient, Collection } from "mongodb";
import { validateClothing } from "./validateUtils.js";
import { InvalidInputError } from "./InvalidInputError.js";
import { DatabaseError } from "./DatabaseError.js";
import pino from "pino";

let client: MongoClient | undefined;
let clothingsCollection: Collection<clothingPiece> | undefined;
let dbName: string = "pokemon_db";

const logger = pino();

interface clothingPiece {
    type: string;
    colour: string;
    size: string;
}

/**
 * Adds a new clothing piece to the database.
 * 
 * @async
 * @param {string} type - The type of the clothing piece (e.g., "t-shirt").
 * @param {string} colour - The colour of the clothing piece.
 * @param {string} size - The size of the clothing piece (must be XS, S, M, L, XL, or XXL).
 * @returns {Promise<clothingPiece>} A promise that resolves to the newly added clothing piece.
 * @throws {DatabaseError} If the database is not initialized.
 * @throws {InvalidInputError} If the provided input is invalid.
 */
async function addClothing(type: string, colour: string, size: string): Promise<clothingPiece> {
    try {
        if (!clothingsCollection) {
            throw new DatabaseError("Database not initialized");
        }
        if (!(await validateClothing(type, colour, size))) {
            throw new InvalidInputError("Invalid input: Strings must be non-empty and size must be valid (XS, S, M, L, XL, XXL)");
        }

        const newClothing: clothingPiece = { type, colour, size };
        await clothingsCollection.insertOne(newClothing);
        return newClothing;
    }
    catch (error) {
        if (error instanceof DatabaseError) {
            logger.warn("Database error, was not initialized in addClothing: " + error.message)
        }
        else if (error instanceof InvalidInputError) {
            logger.warn("Invalid input error in addClothing: " + error.message)
        }
        else {
            logger.error("Unknown error in addClothing: " + error)
        }
        throw error;
    }
}

/**
 * Closes the MongoDB client connection and resets the internal state.
 * 
 * @async
 * @returns {Promise<void>}
 */
async function close() {
    try {
        if (!client) return;
        await client.close();
        clothingsCollection = undefined;
        client = undefined;
        console.log("MongoDb connection closed");
    }
    catch (error) {
        if (error instanceof DatabaseError) {
            logger.warn("Database error in close: " + error.message)
        }
        else if (error instanceof InvalidInputError) {
            logger.warn("Invalid input error in close: " + error.message)
        }
        else {
            logger.error("Unknown error in close: " + error)
        }
        throw error;
    }
}

/**
 * Retrieves a single clothing piece from the database by its type.
 * 
 * @async
 * @param {string} type - The type of clothing piece to find.
 * @returns {Promise<clothingPiece>} A promise that resolves to the found clothing piece.
 * @throws {DatabaseError} If the database is not initialized or the item is not found.
 */
async function getSingleClothing(type: string): Promise<clothingPiece> {
    try {
        if (!clothingsCollection) {
            throw new DatabaseError("Database not initialized");
        }
        const foundOne = await clothingsCollection.findOne<clothingPiece>({ type });
        if (!foundOne) {
            throw new DatabaseError("Clothing item not found");
        }
        return foundOne;
    }
    catch (error) {
        if (error instanceof DatabaseError) {
            logger.warn("Database error in getSingleClothing: " + error.message)
        }
        else if (error instanceof InvalidInputError) {
            logger.warn("Invalid input error in getSingleClothing: " + error.message)
        }
        else {
            logger.error("Unknown error in getSingleClothing: " + error)
        }
        throw error;
    }
}

/**
 * Retrieves all clothing pieces from the database.
 * 
 * @async
 * @returns {Promise<clothingPiece[]>} A promise that resolves to an array of all clothing pieces.
 * @throws {DatabaseError} If the database is not initialized.
 */
async function getAllClothingPieces(): Promise<clothingPiece[]> {
    try {
        if (!clothingsCollection) {
            throw new DatabaseError("Database not initialized");
        }
        return await clothingsCollection.find<clothingPiece>({}).toArray();
    }
    catch (error) {
        if (error instanceof DatabaseError) {
            logger.warn("Database error in getAllClothingPieces: " + error.message)
        }
        else if (error instanceof InvalidInputError) {
            logger.warn("Invalid input error in getAllClothingPieces: " + error.message)
        }
        else {
            logger.error("Unknown error in getAllClothingPieces: " + error)
        }
        throw error;
    }
}

/**
 * Updates an existing clothing piece in the database with new values.
 * 
 * @async
 * @param {string} type - The current type of the clothing piece to update.
 * @param {string} newType - The new type for the clothing piece.
 * @param {string} newColour - The new colour for the clothing piece.
 * @param {string} newSize - The new size for the clothing piece.
 * @returns {Promise<clothingPiece>} A promise that resolves to the updated clothing piece data.
 * @throws {DatabaseError} If the database is not initialized or the item is not found.
 * @throws {InvalidInputError} If the new input values are invalid.
 */
async function updateClothingPiece(type: string, newType: string, newColour: string, newSize: string): Promise<clothingPiece> {
    try {
        if (!clothingsCollection) {
            throw new DatabaseError("Database not initialized");
        }
        if (!await validateClothing(newType, newColour, newSize)) {
            throw new InvalidInputError("Invalid Input: Strings must be non-empty and size must be valid (XS, S, M, L, XL, XXL)");
        }
        const result = await clothingsCollection.updateOne({ type }, { $set: { type: newType, colour: newColour, size: newSize } });
        if (result.matchedCount === 0) {
            throw new DatabaseError("The specified clothing item was not found");
        }
        return { type: newType, colour: newColour, size: newSize };
    }
    catch (error) {
        if (error instanceof DatabaseError) {
            logger.warn("Database error in updateClothingPiece: " + error.message)
        }
        else if (error instanceof InvalidInputError) {
            logger.warn("Invalid input error in updateClothingPiece: " + error.message)
        }
        else {
            logger.error("Unknown error in updateClothingPiece: " + error)
        }
        throw error;
    }
}

/**
 * Deletes a clothing piece from the database by its type.
 * 
 * @async
 * @param {string} type - The type of the clothing piece to delete.
 * @returns {Promise<boolean>} A promise that resolves to true if the deletion was successful.
 * @throws {DatabaseError} If the database is not initialized or the item is not found.
 */
async function deleteClothing(type: string): Promise<boolean> {
    try {
        if (!clothingsCollection) {
            throw new DatabaseError("Database is not initialized");
        }
        const result = await clothingsCollection.deleteOne({ type });
        if (result.deletedCount === 0) {
            throw new DatabaseError("Clothing item not found");
        }
        return true;
    }
    catch (error) {
        if (error instanceof DatabaseError) {
            logger.warn("Database error in deleteClothing: " + error.message)
        }
        else if (error instanceof InvalidInputError) {
            logger.warn("Invalid input error in deleteClothing: " + error.message)
        }
        else {
            logger.error("Unknown error in deleteClothing: " + error)
        }
        throw error;
    }
}

/**
 * Connects to the MongoDB database and ensures the required collection exists.
 * 
 * @async
 * @param {string} [dbNameParam="pokemon_db"] - The name of the database to connect to.
 * @param {boolean} [resetFlag=false] - If true, clears all existing data in the collection.
 * @param {string} [urlParam] - Optional MongoDB connection string. Defaults to environment variables if not provided.
 * @returns {Promise<void>}
 */
async function initialize(dbNameParam: string = "pokemon_db", resetFlag: boolean = false, urlParam?: string): Promise<void> {
    try {
        dbName = dbNameParam;
        const url = urlParam ?? `${process.env.URL_PRE}${process.env.MONGODB_PWD}${process.env.URL_POST}`;

        client = new MongoClient(url);
        await client.connect();

        const db = client.db(dbName);

        // ensure collection exists
        const exists = await db.listCollections({ name: "pokemons" }).toArray();
        if (exists.length === 0) {
            await db.createCollection("pokemons", {
                collation: { locale: "en", strength: 1 },
            });
        }

        clothingsCollection = db.collection<clothingPiece>("pokemons");

        if (resetFlag) {
            await clothingsCollection.deleteMany({});
        }
    }
    catch (error) {
        if (error instanceof DatabaseError) {
            logger.warn("Database error in initialize: " + error.message)
        }
        else if (error instanceof InvalidInputError) {
            logger.warn("Invalid input error in initialize: " + error.message)
        }
        else {
            logger.error("Unknown error in initialize: " + error)
        }
        throw error;
    }
}

export {
    initialize,
    addClothing,
    getSingleClothing,
    getAllClothingPieces,
    updateClothingPiece,
    deleteClothing,
    close
};
export type { clothingPiece };
