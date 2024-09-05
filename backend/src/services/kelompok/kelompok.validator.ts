import * as stringValidators from '../../common/utils/validations/string.validator';
import { KelompokInput } from '../../data-access/models/kelompok/kelompok';

export const validateKelompok = (newKelompok: KelompokInput): void => {
    validateNamaKelompok(newKelompok.nama_kelompok);
    validateStatus(newKelompok.status);
}

export const validateNamaKelompok = (nama_kelompok: string): void => {
    stringValidators.throwExeptionIfEmptyString(nama_kelompok, 'Nama kelompok cannot be empty');
    stringValidators.throwExceptionIfMinLength(nama_kelompok, 5, 'Nama kelompok must be at least 5 characters long');
}

export const validateStatus = (status: string): void => {
    stringValidators.throwExeptionIfEmptyString(status, 'Status cannot be empty');
}