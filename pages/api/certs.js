import { connectToDatabase } from '../../util/mongodb';

export default async (req, res) => {
    const { db } = await connectToDatabase();
    // console.log(res);

    const certs = await db.collection('certs').find({}).toArray();

    res.json(certs);
};
