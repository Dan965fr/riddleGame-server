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
    // Check if player exists by name
    const playerData = {
      username: req.body.username,
      best_time: null,
    };
    const newPlayer = await addPlayer(playerData);
    res.status(201).json(newPlayer);
  } catch (error) {
    console.error('Error in addPlayerController:', error)
    res.status(500).json({ error: 'Failed to add player' });
  }
}



// עדכן זמן שחקן
export async function updatePlayerTimeController(req, res) {
  try {
    const time = Number(req.body.best_time);
    if (isNaN(time) || time < 0) return res.status(400).json({ error: "Invalid time value" });

    const player = await getPlayerById(req.params.id);
    if (!player) return res.status(404).json({ error: 'Player not found' });

    if (player.best_time === null || time < player.best_time) {
      const updateResult = await updatePlayerTime(req.params.id, time);
      return res.json(updateResult);
    } else {
      return res.json({ msg: "No improvement", player });
    }
  } catch (error) {
    console.error('Error updating player time:', error);
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
