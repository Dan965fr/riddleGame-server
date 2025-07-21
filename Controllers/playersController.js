import {
  getAllPlayers,
  getPlayerById,
  addPlayer,
  updatePlayerTime,
  deletePlayer,
} from '../DAL/playersDAL.js';




// קבל את כל השחקנים
export async function getAllPlayersController(req, res) {
  try {
    const players = await getAllPlayers();
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get players' });
  }
}




// קבל שחקן לפי ID
export async function getPlayerByIdController(req, res) {
  try {
    const player = await getPlayerById(req.params.id);
    if (!player) return res.status(404).json({ error: 'Player not found' });
    res.json(player);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get player' });
  }
}




// הוסף שחקן חדש
export async function addPlayerController(req, res) {
  try {
    const newPlayer = await addPlayer(req.body);
    res.status(201).json(newPlayer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add player' });
  }
}



// עדכן זמן שחקן
export async function updatePlayerTimeController(req, res) {
  try {
    // req.body.lowestTime צריך להיות מספר
    const time = Number(req.body.lowestTime);
    if (isNaN(time) || time < 0) return res.status(400).json({ error: "Invalid time value" });

    const updated = await updatePlayerTime(req.params.id, time);
    if (!updated) return res.status(404).json({ error: 'Player not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update player time' });
  }
}




// מחק שחקן
export async function deletePlayerController(req, res) {
  try {
    const deleted = await deletePlayer(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Player not found' });
    res.json({ msg: 'Player deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete player' });
  }
}
