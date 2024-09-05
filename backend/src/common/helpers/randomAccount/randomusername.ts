import { generateUsername } from "unique-username-generator";

export class generateRandomUsername {
    static generateRandUname() {
        return generateUsername("-", 2, 20);
    };
};