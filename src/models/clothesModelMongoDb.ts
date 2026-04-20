import { MongoClient, Collection } from "mongodb";
import { validateClothing } from "./validateUtils.js";
import { InvalidInputError } from "./InvalidInputError.js";
import { DatabaseError } from "./DatabaseError.js";

let client: MongoClient | undefined;
let clothingsCollection: Collection<clothingPiece> | undefined;
let dbName: string = "pokemon_db"; // Legacy name from Switchover

interface clothingPiece {
  type: string;
  colour: string;
  size: string;
}

/**
 * Adds a clothing piece to the database
 */
async function addClothing(type: string, colour: string, size: string): Promise<clothingPiece> {
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

/**
 * Closes the database connection
 */
async function close() {
  try {
    if (!client) return;
    await client.close();
    clothingsCollection = undefined;
    client = undefined;
    console.log("MongoDb connection closed");
  } catch (err: unknown) {
    console.log(err instanceof Error ? err.message : "Unknown error occurred");
  }
}

/**
 * Gets a single clothing piece from the database
 */
async function getSingleClothing(type: string): Promise<clothingPiece> {
  if (!clothingsCollection) {
    throw new DatabaseError("Database not initialized");
  }
  const foundOne = await clothingsCollection.findOne<clothingPiece>({ type });
  if (!foundOne) {
    throw new DatabaseError("Clothing item not found");
  }
  return foundOne;
}

/**
 * Gets all clothing pieces from the database
 */
async function getAllClothingPieces(): Promise<clothingPiece[]> {
  if (!clothingsCollection) {
    throw new DatabaseError("Database not initialized");
  }
  return await clothingsCollection.find<clothingPiece>({}).toArray();
}

/**
 * Updates a clothing piece in the database
 */
async function updateClothingPiece(type: string, newType: string, newColour: string, newSize: string): Promise<clothingPiece> {
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

/**
 * Deletes a clothing piece from the database
 */
async function deleteClothing(type: string): Promise<boolean> {
  if (!clothingsCollection) {
    throw new DatabaseError("Database is not initialized");
  }
  const result = await clothingsCollection.deleteOne({ type });
  if (result.deletedCount === 0) {
    throw new DatabaseError("Clothing item not found");
  }
  return true;
}

/**
 * Connect to the MongoDb database
 */
async function initialize(dbNameParam: string = "pokemon_db", resetFlag: boolean = false, urlParam?: string): Promise<void> {
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
