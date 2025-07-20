import { getAllRiddles,getRiddleById,addRiddle,updateRiddle,deleteRiddle } from "../DAL/riddlesDAL.js";



// קבל את כל החידות
export async function getAllRiddlesController(req, res) {
  try {
    const riddles = await getAllRiddles();
    res.json(riddles);
  } catch (error) {
    res.status(500).json({ error: "Failed to get riddles" });
  }
}




// קבל חידה לפי id
export async function getRiddleByIdController(req, res) {
  try {
    const riddle = await getRiddleById(req.params.id);
    if (!riddle) return res.status(404).json({ error: "Riddle not found" });
    res.json(riddle);
  } catch (error) {
    res.status(500).json({ error: "Failed to get riddle" });
  }
}




// הוסף חידה חדשה
export async function addRiddleController(req, res) {
  try {
    const newRiddle = await addRiddle(req.body);
    res.status(201).json(newRiddle);
  } catch (error) {
    res.status(500).json({ error: "Failed to add riddle" });
  }
}




// עדכן חידה לפי id
export async function updateRiddleController(req, res) {
  try {
    const updatedRiddle = await updateRiddle(req.params.id, req.body);
    if (!updatedRiddle) return res.status(404).json({ error: "Riddle not found" });
    res.json(updatedRiddle);
  } catch (error) {
    res.status(500).json({ error: "Failed to update riddle" });
  }
}




// מחק חידה לפי id
export async function deleteRiddleController(req, res) {
  try {
    const deleted = await deleteRiddle(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Riddle not found" });
    res.json({ msg: "Riddle deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete riddle" });
  }
}
