import * as stringValidators from '../../common/utils/validations/string.validator';
import { Kelas, KelasInput } from '../../data-access/models/kelas/kelas';

export const validateKelas = (newKelas: KelasInput): void => {
    validateNamaKelas(newKelas.nama_kelas);
}

export const validateNamaKelas = (nama_kelas: string): void => {
    stringValidators.throwExeptionIfEmptyString(nama_kelas, 'Nama kelas cannot be empty');
    stringValidators.throwExceptionIfMinLength(nama_kelas, 3, 'Nama kelas must be at least 3 characters long');
}