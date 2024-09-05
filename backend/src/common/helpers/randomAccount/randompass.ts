import { generate } from "generate-password-ts";

export class generateRandomPassword {
    static generateRandPass() {
        return generate({
            length: 5,
            numbers: true,
        });
    };
};


