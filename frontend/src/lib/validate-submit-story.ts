type Params = {
  title: string;
  orientation: string;
  complication: string;
  resolution: string;
  reorientation: string;
};

export default function validateSubmitStory({
  title,
  orientation,
  complication,
  resolution,
  reorientation,
}: Params): string | null {
  if (title.trim() === '') {
    return 'Title cannot be empty';
  }

  if (orientation.trim() === '') {
    return 'Orientation cannot be empty';
  }

  if (complication.trim() === '') {
    return 'Complication cannot be empty';
  }

  if (resolution.trim() === '') {
    return 'Resolution cannot be empty';
  }

  if (reorientation.trim() === '') {
    return 'Reorientation cannot be empty';
  }

  return null;
}
