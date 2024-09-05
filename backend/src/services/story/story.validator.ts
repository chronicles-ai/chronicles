import * as stringValidators from '../../common/utils/validations/string.validator';
import { StoryInput } from '../../data-access/models/story/story';

export const validateStory = (newStory: StoryInput): void => {
    validateJudul(newStory.judul);
    validateOrientation(newStory.orientation);
    validateComplication(newStory.complication);
    validateResolution(newStory.resolution);
    validateReorientation(newStory.reorientation);
}

export const validateJudul = (judul: string): void => {
    stringValidators.throwExeptionIfEmptyString(judul, 'Judul cannot be empty');
    stringValidators.throwExceptionIfMinLength(judul, 5, 'Judul must be contain at least 5 letter');
};

export const validateOrientation = (orientation: string): void => {
    stringValidators.throwExeptionIfEmptyString(orientation, 'Orientation cannot be empty');
    stringValidators.throwExceptionIfMinLength(orientation, 5, 'Orientation must be contain at least 5 letter');
};

export const validateComplication = (complication: string): void => {
    stringValidators.throwExeptionIfEmptyString(complication, 'Complication cannot be empty');
    stringValidators.throwExceptionIfMinLength(complication, 5, 'Complication must be contain at least 5 letter');
};

export const validateResolution = (resolution: string): void => {
    stringValidators.throwExeptionIfEmptyString(resolution, 'Resolution cannot be empty');
    stringValidators.throwExceptionIfMinLength(resolution, 5, 'Resolution must be contain at least 5 letter');
};

export const validateReorientation = (reorientation: string): void => {
    stringValidators.throwExeptionIfEmptyString(reorientation, 'Reorientation cannot be empty');
    stringValidators.throwExceptionIfMinLength(reorientation, 5, 'Reorientation must be contain at least 5 letter');
}