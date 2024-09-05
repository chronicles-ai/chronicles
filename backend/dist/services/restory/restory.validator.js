"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateReorientation = exports.validateResolution = exports.validateComplication = exports.validateOrientation = exports.validateJudul = exports.validateRestory = void 0;
const stringValidators = __importStar(require("../../common/utils/validations/string.validator"));
const validateRestory = (newRestory) => {
    (0, exports.validateJudul)(newRestory.judul);
    (0, exports.validateOrientation)(newRestory.orientation);
    (0, exports.validateComplication)(newRestory.complication);
    (0, exports.validateResolution)(newRestory.resolution);
    (0, exports.validateReorientation)(newRestory.reorientation);
};
exports.validateRestory = validateRestory;
const validateJudul = (judul) => {
    stringValidators.throwExeptionIfEmptyString(judul, 'Judul cannot be empty');
    stringValidators.throwExceptionIfMinLength(judul, 5, 'Judul must be contain at least 5 letter');
};
exports.validateJudul = validateJudul;
const validateOrientation = (orientation) => {
    stringValidators.throwExeptionIfEmptyString(orientation, 'Orientation cannot be empty');
    stringValidators.throwExceptionIfMinLength(orientation, 5, 'Orientation must be contain at least 5 letter');
};
exports.validateOrientation = validateOrientation;
const validateComplication = (complication) => {
    stringValidators.throwExeptionIfEmptyString(complication, 'Complication cannot be empty');
    stringValidators.throwExceptionIfMinLength(complication, 5, 'Complication must be contain at least 5 letter');
};
exports.validateComplication = validateComplication;
const validateResolution = (resolution) => {
    stringValidators.throwExeptionIfEmptyString(resolution, 'Resolution cannot be empty');
    stringValidators.throwExceptionIfMinLength(resolution, 5, 'Resolution must be contain at least 5 letter');
};
exports.validateResolution = validateResolution;
const validateReorientation = (reorientation) => {
    stringValidators.throwExeptionIfEmptyString(reorientation, 'Reorientation cannot be empty');
    stringValidators.throwExceptionIfMinLength(reorientation, 5, 'Reorientation must be contain at least 5 letter');
};
exports.validateReorientation = validateReorientation;
