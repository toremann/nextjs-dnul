import { connectToDatabase } from './mongodb';

export async function getMongoDB() {
  try {
    const { db } = await connectToDatabase();
    const data = await db.collection('certs').find({}).toArray();
    return data;
  } catch (error) {
    return { error };
  }
}

export async function getGithubEvents() {
  try {
    const response = await fetch('https://api.github.com/users/toremann/events/public');
    const data = await response.json();

    return data.filter((data) => {
      return data.type === 'PushEvent';
    });
  } catch (error) {
    return { error };
  }
}
