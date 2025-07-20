import { readPlayers, writePlayers } from "../DAL/playersDAL.js";



// Get all players
export async function getAllPlayers(req, res) {
  try {
    const players = await readPlayers();
    res.json(players);
  } catch(error) {
    res.status(500).json({ error: "Failed to read players" });
  }
}



// Get player by id
export async function getPlayerById(req, res) {
  try {
    const id = Number(req.params.id);
    const players = await readPlayers();
    const player = players.find(p => p.id === id);

    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }

    res.json(player);
  } catch(error) {
    res.status(500).json({ error: "Server error" });
  }
}



// Add new player
export async function addPlayer(req, res) {
  try {
    const players = await readPlayers();
    const maxId = players.reduce((max, p) => Math.max(max, p.id), 0);

    const name =  req.body.name ;

    const newPlayer = { id: maxId + 1,lowestTime:null, name };

    players.push(newPlayer);
    await writePlayers(players);

    res.status(201).json(newPlayer);
  } catch(error) {
    res.status(500).json({ error: "Failed to add player" });
  }
}

// Update player time
export async function updatePlayerTime(req, res) {
  try {
    const id = Number(req.params.id);
    const { time } = req.body;


    if (typeof time !== 'number' || isNaN(time)) {
      
      return res.status(400).json({ error: "Invalid time value" });
    }

    const players = await readPlayers();
    console.log("Players loaded from DB/file:", players);

    const index = players.findIndex(p => p.id === id);
    console.log("Found player index:", index);

    if (index === -1) {
      console.log("Player not found");
      return res.status(404).json({ error: "Player not found" });
    }

    console.log("Current lowestTime:", players[index].lowestTime);

    if (!players[index].lowestTime || time < players[index].lowestTime) {
      players[index].lowestTime = time;

      try {
        await writePlayers(players);
        console.log("players file update")
      } catch (writeErr) {
        console.error("faild to write players",writeErr)
        return res.status(500).json({error:"faild to save player"})
      }

      
      return res.json({ msg: "New record!", player: players[index] });
    } else {
      
      res.json({ msg: "Time not improved", player: players[index] });
    }
  } catch (error) {
    console.error("Error updating player time:", error);
    res.status(500).json({ error: "Failed to update player" });
  }
}
