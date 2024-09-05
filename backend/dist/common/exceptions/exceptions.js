"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evalException = exports.ElementAlreadyExists = exports.InvalidCredentials = exports.ElementInvalidException = exports.ElementNotFoundException = exports.NotAuthorizedException = exports.DatabaseException = exports.HttpErrorCodes = void 0;
exports.HttpErrorCodes = {
    HTTP_OK: 200,
    HTTP_CREATED: 201,
    ERROR_BAD_REQUEST: 400,
    ERROR_UNAUTHORIZED: 401,
    ERROR_FORBIDDEN: 403,
    ERROR_NOT_FOUND: 404,
    ERROR_CONFLICT: 409,
    ERROR_SERVER_ERROR: 500,
};
class DatabaseException extends Error {
    constructor(message) {
        super(message);
    }
}
exports.DatabaseException = DatabaseException;
class NotAuthorizedException extends Error {
    constructor(message) {
        super(message);
    }
}
exports.NotAuthorizedException = NotAuthorizedException;
class ElementNotFoundException extends Error {
    constructor(message) {
        super(message);
    }
}
exports.ElementNotFoundException = ElementNotFoundException;
class ElementInvalidException extends Error {
    constructor(message) {
        super(message);
    }
}
exports.ElementInvalidException = ElementInvalidException;
class InvalidCredentials extends Error {
    constructor(message) {
        super(message);
    }
}
exports.InvalidCredentials = InvalidCredentials;
class ElementAlreadyExists extends Error {
    constructor(message) {
        super(message);
    }
}
exports.ElementAlreadyExists = ElementAlreadyExists;
const evalException = (err, res) => {
    if (err instanceof ElementInvalidException) {
        return res.status(exports.HttpErrorCodes.ERROR_BAD_REQUEST).send(err.message);
    }
    else if (err instanceof InvalidCredentials) {
        return res.status(exports.HttpErrorCodes.ERROR_UNAUTHORIZED).send(err.message);
    }
    else if (err instanceof NotAuthorizedException) {
        return res.status(exports.HttpErrorCodes.ERROR_FORBIDDEN).send(err.message);
    }
    else if (err instanceof ElementNotFoundException) {
        return res.status(exports.HttpErrorCodes.ERROR_NOT_FOUND).send(err.message);
    }
    else if (err instanceof ElementAlreadyExists) {
        return res.status(exports.HttpErrorCodes.ERROR_CONFLICT).send(err.message);
    }
    else if (err instanceof DatabaseException) {
        return res.status(exports.HttpErrorCodes.ERROR_SERVER_ERROR).send(err.message);
    }
    else {
        return res.status(exports.HttpErrorCodes.ERROR_SERVER_ERROR).send(err.message);
    }
};
exports.evalException = evalException;
