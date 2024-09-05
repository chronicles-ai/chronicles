import * as stringValidators from '../../common/utils/validations/string.validator';
import * as numberValidators from '../../common/utils/validations/number.validator';
import { NilaiInput } from '../../data-access/models/nilai/nilai';

export const validateNilaiKelompokProcess = (newNilai: NilaiInput): void => {
    validateNilaiKelompok(newNilai.nilai_kelompok);
};

export const validateNilaiSimilaritasProcess = (newNilai: NilaiInput): void => {
    validateNilaiSimilaritas(newNilai.nilai_similaritas);
};

export const validateKomentarProcess = (newNilai: NilaiInput): void => {
    validateKomentar(newNilai.komentar);
};

export const validateNilaiKelompok = (nilai_kelompok: number): void => {
    numberValidators.throwExceptionIfNotNumber(nilai_kelompok, 'Nilai kelompok cannot be empty');
    numberValidators.throwExceptionIfNumberLessThan(nilai_kelompok, 0, 'Nilai kelompok must be greater than 0');
    numberValidators.throwExceptionIfNumberGreaterThan(nilai_kelompok, 100, 'Nilai kelompok must be less than 100');
}

export const validateNilaiSimilaritas = (nilai_similaritas: number): void => {
    numberValidators.throwExceptionIfNotNumber(nilai_similaritas, 'Nilai simllaritas cannot be empty');
    numberValidators.throwExceptionIfNumberLessThan(nilai_similaritas, 0, 'Nilai simllaritas must be greater than 0');
    numberValidators.throwExceptionIfNumberGreaterThan(nilai_similaritas, 100, 'Nilai simllaritas must be less than 100');
}

export const validateKomentar = (komentar: string): void => {
    stringValidators.throwExeptionIfEmptyString(komentar, 'Komentar cannot be empty');
    stringValidators.throwExceptionIfMinLength(komentar, 10, 'Komentar must be more than 10 characters');
}