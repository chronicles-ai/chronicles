// {
//   "id": "STRY_3",
//   "judul": "The Keeper and The Bucket",
//   "orientation": "The old lighthouse keeper, Ms. Amelia, lived a solitary life perched on a cliff overlooking a churning sea.Her days were filled with the rhythmic clang of the foghorn, the salty spray clinging to her weathered face, and the constant companionship of a scruffy seagull named Salty.One particularly stormy night, the foghorn malfunctioned. Panic clawed at Ms. Amelia's throat.Without the warning, ships could crash upon the treacherous rocks.",
//   "complication": "Thinking fast, Ms. Amelia grabbed a dented metal bucket and raced to the roof.Under the howling wind and blinding rain, she banged the bucket repeatedly against the metal railing, mimicking the foghorn's deep groan.Salty squawked in protest, but perched bravely on her shoulder as she continued the relentless clanging.Throughout the night, Ms. Amelia's arm ached, but her determination never faltered.",
//   "resolution": "As dawn broke, painting the sky with streaks of pink and orange, the storm subsided.Relief washed over Ms. Amelia as she saw a ship change course, its horn blaring a grateful salute.Exhausted but exhilarated, she settled back in her chair, Salty snuggled beside her.A knock on the door startled them.A group of coastguard officers stood there, smiles on their faces.They'd heard the 'foghorn' and come to investigate, but Ms. Amelia's quick thinking had saved the day.",
//   "reorientation": "News of Ms. Amelia's heroism spread like wildfire.The old lighthouse keeper, once a solitary figure, became a local legend.From that day on, she wasn't just the keeper of the lighthouse; she was the keeper of the sea.Her days were no longer lonely, filled with visits from grateful sailors and townsfolk alike.Salty, ever the loyal companion, continued to share her perch, forever a witness to Ms. Amelia's bravery.",
//   "url_gambar": "https://storage.googleapis.com/chonicles-image.appspot.com/Images/defaultClass/defaultGroup/defaultClass-defaultGroup.webp",
//   "id_kelompok": "KEL_beefy-midwife3110",
//   "createdAt": "2024-06-02T16:39:33.000Z",
//   "updatedAt": "2024-06-02T16:39:34.000Z"
// }

export type StoryResponse = {
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
}

type Story = {
  id: string;
  title: string;
  orientation: string;
  complication: string;
  resolution: string;
  reorientation: string;
  imageUrl: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
};

export default Story;
