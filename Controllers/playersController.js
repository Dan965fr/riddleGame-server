import { readPlayers, writePlayers } from "../DAL/playersDAL.js";



// Get all players
export async function getAllPlayers(req, res) {
  try {
    const players = await readPlayers();
    res.json(players);
  } catch {
    res.status(500).json({ error: "Failed to read players" });
  }
}



// Get player by name
export async function getPlayerByName(req, res) {
  try {
    const { name } = req.params;
    const players = await readPlayers();
    const player = players.find(p => p.name.toLowerCase() === name.toLowerCase());

    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }

    res.json(player);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
}



// Add new player
export async function addPlayer(req, res) {
  try {
    const players = await readPlayers();
    const maxId = players.reduce((max, p) => Math.max(max, p.id), 0);
    const newPlayer = { id: maxId + 1, ...req.body };

    players.push(newPlayer);
    await writePlayers(players);
    res.status(201).json(newPlayer);
  } catch {
    res.status(500).json({ error: "Failed to add player" });
  }
}

// Update player time
export async function updatePlayerTime(req, res) {
  try {
    const { name } = req.params;
    const { time } = req.body;

    const players = await readPlayers();
    const index = players.findIndex(p => p.name.toLowerCase() === name.toLowerCase());

    if (index === -1) {
      return res.status(404).json({ error: "Player not found" });
    }

    if (!players[index].lowestTime || time < players[index].lowestTime) {
      players[index].lowestTime = time;
      await writePlayers(players);
      res.json({ msg: "New record!", player: players[index] });
    } else {
      res.json({ msg: "Time not improved", player: players[index] });
    }
  } catch {
    res.status(500).json({ error: "Failed to update player" });
  }
}
