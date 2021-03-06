import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from 'mongodb';

async function handler(req: NextApiRequest, res: NextApiResponse) {

  let client
  try {
    client = await MongoClient.connect(`${process.env.MONGODB_CLIENT}`)

  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!' });
    return;

  }

  if (req.method === 'GET') {
    try {
      const id = Number(req.query.carId)
      const db = client.db('exotic_cars')
      const document = await db.collection('cars').find({ "id": id }).toArray()
      res.status(200).json({ message: 'Fetch Cars Details', selectedCar: document })
    } catch (error) {
      res.status(500).json({ message: 'Fetch Cars Details failed' })
    }
  }

  client.close();
}

export default handler;