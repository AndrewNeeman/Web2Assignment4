/**
 * Validates clothing piece data
 * @param type - The type of clothing
 * @param colour - The colour of clothing
 * @param size - The size of clothing
 * @returns True if the input is valid
 */
export async function validateClothing(type: string, colour: string, size: string): Promise<boolean> {
    // Check for non-empty strings
    if (!type || !colour || !size) {
        return false;
    }

    if (type.trim().length === 0 || colour.trim().length === 0 || size.trim().length === 0) {
        return false;
    }

    // Check for valid sizes
    const validSizes = ["XS", "S", "M", "L", "XL", "XXL"];
    if (!validSizes.includes(size.toUpperCase())) {
        return false;
    }

    return true;
}
