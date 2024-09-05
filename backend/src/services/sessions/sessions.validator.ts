import * as stringValidator from '../../common/utils/validations/string.validator';
import { LoginInput } from '../../controllers/sessions/sessions.controllers';

export const validateLogin = (loginRequest: LoginInput): void => {
    validateUsername(loginRequest.username);
    validatePassword(loginRequest.password);
}

export const validateUsername = (username: string): void => {
    stringValidator.throwExeptionIfEmptyString(username, 'username is required');
}

export const validatePassword = (password: string): void => {
    stringValidator.throwExeptionIfEmptyString(password, 'password is required');
}