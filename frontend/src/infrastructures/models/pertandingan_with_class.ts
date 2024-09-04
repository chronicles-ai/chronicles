// [
//   {
//       "id": "PTD_19",
//       "kode_kelompok_ganjil": "KEL_received-saleslady6717",
//       "kode_kelompok_genap": "KEL_microscopic-fiend8918",
//       "id_kelas": "KLS_6",
//       "createdAt": "2024-06-06T10:28:22.000Z",
//       "updatedAt": "2024-06-06T10:28:22.000Z",
//       "kelompokGanjil": {
//           "id": "KEL_received-saleslady6717",
//           "username": "received-saleslady67",
//           "password": "vMlEX",
//           "nama_kelompok": "Salad",
//           "status": "restory",
//           "ketua": "A",
//           "anggota1": "B",
//           "anggota2": "C",
//           "anggota3": "D",
//           "anggota4": "E",
//           "id_kelas": "KLS_6",
//           "createdAt": "2024-06-06T10:28:22.000Z",
//           "updatedAt": "2024-06-06T15:05:23.000Z"
//       },
//       "kelompokGenap": {
//           "id": "KEL_microscopic-fiend8918",
//           "username": "microscopic-fiend89",
//           "password": "lWZm6",
//           "nama_kelompok": "Tiger Team",
//           "status": "story",
//           "ketua": "Ariq",
//           "anggota1": "Nadya",
//           "anggota2": "Agung",
//           "anggota3": "Adrian",
//           "anggota4": "Mail",
//           "id_kelas": "KLS_6",
//           "createdAt": "2024-06-06T10:28:22.000Z",
//           "updatedAt": "2024-06-06T14:51:23.000Z"
//       }
//   }
// ]

type ClassInPertandingan = {
  id: string;
  username: string;
  password: string;
  nama_kelompok: string;
  status: string;
  ketua: string;
  anggota1: string;
  anggota2: string;
  anggota3: string;
  anggota4: string;
  id_kelas: string;
  createdAt: string;
  updatedAt: string;
};

type PertandinganWithClass = {
  id: string;
  kode_kelompok_ganjil: string;
  kode_kelompok_genap: string;
  id_kelas: string;
  createdAt: string;
  updatedAt: string;
  kelompokGanjil: ClassInPertandingan;
  kelompokGenap: ClassInPertandingan;
};

export type { ClassInPertandingan, PertandinganWithClass };