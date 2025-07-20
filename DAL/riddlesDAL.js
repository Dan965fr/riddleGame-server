import { connectToRiddleDB } from "../db/connectMongo.js";
import { ObjectId } from "mongodb";



export async function getAllRiddles(){
    const db = await connectToRiddleDB();
    return db.collection("riddles").find().toArray();

}


export async function getRiddleById(id){
    const db = await connectToRiddleDB();
    return db.collection("riddles").findOne({_id: new ObjectId(id)});
}



export async function addRiddle(riddleData){
    const db = await connectToRiddleDB();
    const result = await db.collection("riddles").insertOne(riddleData);
    const insertedRiddle = await db.collection("riddles").findOne({ _id: result.insertedId });
    return insertedRiddle;
}



export async function updateRiddle(id, updatedData) {
  const db = await connectToRiddleDB();
  await db.collection("riddles").updateOne(
    { _id: new ObjectId(id) },
    { $set: updatedData }
  );
  return getRiddleById(id);
}



export async function deleteRiddle(id) {
  const db = await connectToRiddleDB();
  const result = await db.collection("riddles").deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}