// {
//   "id": "RSTRY_44",
//   "id_story": "STRY_42",
//   "id_kelompok": "KEL_informed-spiel1035",
//   "judul": "The Guardian of Eldenwood",
//   "orientation": "In the quaint village of Eldenwood, nestled at the edge of an ancient forest, life moved at a leisurely pace. The villagers, known for their kindness and hospitality, lived in harmony with nature. Among them was Clara, a young woman with a heart as vast as the forest itself. She lived in a cozy cottage with her aging grandmother, tending to a small garden and helping neighbors with their chores. Clara's days were filled with simple joys: the chirping of birds, the rustling of leaves, and the soft glow of the morning sun.\n",
//   "complication": "One evening, a strange mist rolled into Eldenwood from the forest, shrouding the village in an eerie fog. With it came whispers of an ancient legend that had long been forgotten. The legend spoke of a guardian spirit that protected the forest and the village, but it also warned of a dark force that sought to awaken and bring ruin. As the mist thickened, strange occurrences began to plague Eldenwood. Livestock disappeared, crops withered, and an unshakable sense of dread settled over the villagers. Clara, deeply concerned for her village, decided to seek answers in the heart of the forest. Armed with her courage and a lantern, she ventured into the woods, guided by the faint glimmer of moonlight. The deeper she went, the denser the mist became, until she stumbled upon an ancient stone altar, covered in moss and vines.\n",
//   "resolution": "Realizing that the dark force was growing stronger, Clara knew she had to act quickly. The altar revealed an old, weathered book that spoke of a ritual to awaken the guardian spirit and banish the darkness. It required a pure heart and a sacrifice of something deeply cherished. Clara thought of her grandmother's locket, a precious family heirloom. With a heavy heart, she placed the locket on the altar and recited the ancient incantation from the book. As she finished, the mist began to swirl and coalesce into a towering figure of light. The guardian spirit, majestic and serene, emerged from the mist. With a wave of its hand, the spirit dispelled the dark force, sending it back into the depths of the forest. The mist lifted, revealing the forest and village bathed in a warm, golden light.",
//   "reorientation": "Clara returned to Eldenwood as a hero, her bravery and selflessness celebrated by all. The village prospered once more, and the legend of the guardian spirit was remembered and honored. Clara's life continued with newfound purpose, her bond with the forest and its protector stronger than ever. She often visited the ancient altar, now a place of reverence, and told the tale of the mist and the guardian to children, ensuring that the legend would never be forgotten again. Life in Eldenwood resumed its peaceful rhythm, but now with a deeper appreciation for the balance between nature and humanity. Clara's courage had not only saved her village but also reminded everyone of the enduring power of hope and the importance of protecting the harmony that binds them all."
// }

export type RestoryResponse = {
  id: string;
  id_story: string;
  id_kelompok: string;
  judul: string;
  orientation: string;
  complication: string;
  resolution: string;
  reorientation: string;
};

type Restory = {
  id: string;
  storyId: string;
  teamId: string;
  title: string;
  orientation: string;
  complication: string;
  resolution: string;
  reorientation: string;
};

export default Restory;