// {
//   "id": "PTD_12",
//   "kode_kelompok_ganjil": "KEL_formative-bark119",
//   "kode_kelompok_genap": "KEL_beefy-midwife3110",
//   "id_kelas": "KLS_6",
//   "createdAt": "2024-06-02T15:24:09.000Z",
//   "updatedAt": "2024-06-02T15:24:09.000Z",
//   "kelompokGanjil": {
//       "id": "KEL_formative-bark119",
//       "username": "formative-bark11",
//       "password": "IDVbq",
//       "nama_kelompok": null,
//       "status": "restory",
//       "ketua": null,
//       "anggota1": null,
//       "anggota2": null,
//       "anggota3": null,
//       "anggota4": null,
//       "id_kelas": "KLS_6",
//       "createdAt": "2024-06-02T15:24:09.000Z",
//       "updatedAt": "2024-06-02T15:24:09.000Z"
//   },
//   "kelompokGenap": {
//       "id": "KEL_beefy-midwife3110",
//       "username": "beefy-midwife31",
//       "password": "xnO9T",
//       "nama_kelompok": "Beefy",
//       "status": "story",
//       "ketua": "A",
//       "anggota1": "B",
//       "anggota2": "C",
//       "anggota3": "D",
//       "anggota4": "E",
//       "id_kelas": "KLS_6",
//       "createdAt": "2024-06-02T15:24:09.000Z",
//       "updatedAt": "2024-06-02T19:56:08.000Z"
//   }
// }

export type RivalResponse = {
  id: string;
  kode_kelompok_ganjil: string;
  kode_kelompok_genap: string;
  id_kelas: string;
  createdAt: string;
  updatedAt: string;
  kelompokGanjil: TeamResponse;
  kelompokGenap: TeamResponse;
};

export type TeamResponse = {
  id_kelas: string;
  id: string;
  nama_kelompok: string;
  username: string;
  password: string;
  status: string;
  ketua: string;
  anggota1: string;
  anggota2: string;
  anggota3: string;
  anggota4: string;
  updatedAt: string;
  createdAt: string;
};

type Team = {
  id: string;
  name: string;
  username: string;
  password: string;
  status: string;
  leader: string;
  member1: string;
  member2: string;
  member3: string;
  member4: string;
};

export default Team;
