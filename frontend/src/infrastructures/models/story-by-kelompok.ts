// {
//   "id": "KEL_monthly-dispute722",
//   "username": "monthly-dispute72",
//   "password": "Fp16m",
//   "nama_kelompok": "CiptaInovasi",
//   "status": "story",
//   "ketua": "Andina Ayu Adni",
//   "anggota1": "Budi Santoso",
//   "anggota2": "Citra Maharani",
//   "anggota3": "Dian Prasetyo",
//   "anggota4": "Eka Rahmawati",
//   "id_kelas": "KLS_7",
//   "createdAt": "2024-06-09T11:08:20.000Z",
//   "updatedAt": "2024-06-09T12:56:58.000Z",
//   "kelompok_story": {
//       "id": "STRY_1",
//       "judul": "Elon Musk",
//       "orientation": "Elon Musk, seorang pengusaha visioner dan inovator, memiliki kisah hidup yang penuh dengan tantangan dan pencapaian luar biasa. Lahir di Pretoria, Afrika Selatan pada 28 Juni 1971, Musk menunjukkan minat yang besar pada teknologi sejak usia muda. Dia menghabiskan banyak waktu membaca buku-buku sains dan fiksi ilmiah, serta belajar pemrograman komputer secara otodidak.\n\nPada usia 12 tahun, Musk membuat dan menjual permainan komputer pertamanya yang bernama \"Blastar.\" Ketertarikannya pada teknologi dan inovasi terus berkembang, dan pada usia 17 tahun, Musk pindah ke Kanada untuk melanjutkan pendidikannya di Queen's University. Setelah dua tahun di Kanada, ia pindah ke University of Pennsylvania di Amerika Serikat, di mana ia memperoleh gelar dalam bidang ekonomi dan fisika.",
//       "complication": "Setelah lulus, Musk memulai perjalanan kewirausahaannya dengan mendirikan Zip2, sebuah perusahaan perangkat lunak yang menyediakan panduan kota online untuk surat kabar. Perusahaan ini berhasil dan kemudian dijual ke Compaq seharga hampir $300 juta. Keberhasilan ini menjadi landasan bagi langkah-langkah besar berikutnya.\n\nMusk kemudian mendirikan X.com, sebuah perusahaan layanan pembayaran online yang akhirnya menjadi PayPal setelah bergabung dengan Confinity. PayPal menjadi salah satu sistem pembayaran paling populer di dunia dan dijual ke eBay seharga $1,5 miliar dalam bentuk saham. Dengan kekayaan yang diperoleh dari penjualan PayPal, Musk memutuskan untuk mengejar impian yang lebih besar.\n\nPada tahun 2002, Musk mendirikan SpaceX dengan tujuan membuat perjalanan luar angkasa lebih terjangkau dan suatu hari menjadikan manusia spesies multiplanet. Meskipun menghadapi banyak rintangan dan kegagalan awal, SpaceX berhasil meluncurkan roket Falcon 1 ke orbit pada tahun 2008, menjadikannya perusahaan swasta pertama yang mencapai prestasi tersebut. Kesuksesan SpaceX terus berlanjut dengan berbagai peluncuran penting dan kontrak dengan NASA.\n\nSelain SpaceX, Musk juga mendirikan Tesla Motors pada tahun 2004, dengan visi untuk mempercepat transisi dunia ke energi berkelanjutan. Di bawah kepemimpinannya, Tesla berhasil mengembangkan mobil listrik yang populer dan berteknologi tinggi, seperti Model S, Model 3, dan Model X. Keberhasilan Tesla dalam mengubah industri otomotif membawa Musk ke puncak daftar orang terkaya di dunia.",
//       "resolution": "Setelah lulus, Musk memulai perjalanan kewirausahaannya dengan mendirikan Zip2, sebuah perusahaan perangkat lunak yang menyediakan panduan kota online untuk surat kabar. Perusahaan ini berhasil dan kemudian dijual ke Compaq seharga hampir $300 juta. Keberhasilan ini menjadi landasan bagi langkah-langkah besar berikutnya.",
//       "reorientation": "Meskipun menghadapi banyak tantangan dan kritik sepanjang perjalanan karirnya, Musk tetap fokus pada visinya untuk masa depan yang lebih baik. Dia terus mendorong batas-batas teknologi dengan proyek-proyek seperti Hyperloop, Neuralink, dan The Boring Company. Pengalaman hidup Elon Musk menunjukkan bahwa dengan keberanian, ketekunan, dan inovasi, seseorang dapat mencapai hal-hal yang luar biasa dan mengubah dunia.",
//       "url_gambar": "https://storage.googleapis.com/chonicles-image.appspot.com/Images/KLS_7/KEL_monthly-dispute722/KLS_7-KEL_monthly-dispute722-b8c5d20b-2105-4013-802f-693821546060.webp",
//       "id_kelompok": "KEL_monthly-dispute722",
//       "createdAt": "2024-06-09T11:39:22.000Z",
//       "updatedAt": "2024-06-09T11:39:22.000Z"
//   }
// }


type StoryByKelompokResponse = {
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
  kelompok_story: {
    id: string;
    judul: string;
    orientation: string;
    complication: string;
    resolution: string;
    reorientation: string;
    url_gambar: string;
    id_kelompok: string;
    createdAt: string;
    updatedAt: string;
  };
};

export default StoryByKelompokResponse;