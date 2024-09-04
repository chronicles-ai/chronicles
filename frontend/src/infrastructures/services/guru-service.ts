import Teacher from '../models/teacher';

export async function fetchTeachers(): Promise<Teacher[]> {
  try {
    const response = await fetch(
      'http://localhost:3000/chronicles-v1/api/guru/get'
    );
    const posts = await response.json();

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return posts;
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message);
    }
    
    throw Error('Failed to fetch teachers');
  }
}
