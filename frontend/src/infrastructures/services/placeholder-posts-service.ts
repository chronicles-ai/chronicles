import Post from '../models/post';

export async function fetchPosts(): Promise<Post[]> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return posts;
  } catch (error) {
    throw Error('Failed to fetch posts');
  }
}
