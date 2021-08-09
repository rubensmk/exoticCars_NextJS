import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from 'mongodb';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  let client
  try {
    client = await MongoClient.connect(`mongodb+srv://rubensmk:Z9EoszzKTS6Khi79@cluster0.njy0y.mongodb.net/cars?retryWrites=true&w=majority`)
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!' });
    return;

  }

  if (req.method === 'GET') {
    try {
      const db = client.db('exotic_cars')

      const documents = await db.collection('cars').find().toArray()
      res.status(200).json({ message: 'Fetch Cars Success', cars: documents })
    } catch (error) {
      res.status(500).json({ message: 'Fetch Cars failed' })
    }
  }

  client.close();
}

export default handler;