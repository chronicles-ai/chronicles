// {
//   "id_story_ganjil": "123",
//   "orientation_ganjil": "hello world",
//   "complication_ganjil": "hello world",
//   "resolution_ganjil": "hello world",
//   "reorientation_ganjil": "hello world",
//   "kode_kelompok_ganjil": "123",
//   "id_story_genap": "123",
//   "orientation_genap": "hello world",
//   "complication_genap": "hello world",
//   "resolution_genap": "hello world",
//   "reorientation_genap": "hello world",
//   "kode_kelompok_genap": "hello world"
// }

type SimilarityParams = {
  orientation_ganjil: string;
  complication_ganjil: string;
  resolution_ganjil: string;
  reorientation_ganjil: string;
  orientation_genap: string;
  complication_genap: string;
  resolution_genap: string;
  reorientation_genap: string;
}

export default SimilarityParams;