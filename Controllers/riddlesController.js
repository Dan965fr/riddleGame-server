import { readData,writeData } from "../DAL/riddlesDAL.js";


// Get All Riddles
export async function getAllRiddles(req,res){
    try{
        const riddles = await readData();
        res.json(riddles)
    }catch{
        res.status(500).json({error:`faild to read files`});
    }

}


// add new riddle
export async function addRiddle(req,res){
    try{
        const riddles = await readData();
        const maxId = riddles.reduce((max,r)=> Math.max(max,r.id),0);
        const newRiddle = {id: maxId + 1, ...req.body};
        riddles.push(newRiddle);
        await writeData(riddles);
        res.status(201).json({newRiddle})
        
    }catch{
        res.status(500).json({error:`faild to add riddle`});
    }
}


// update riddle
export async function updateRiddle(req,res){
  try {
      const riddles = await readData();
      const index = riddles.findIndex(r => r.id === req.body.id);
      if(index === -1) return res.status(404).json({error:`Riddle not found`});
  
      riddles[index] = {...riddles[index],...req.body};
      await writeData(riddles);
      res.json(riddles[index])
  } catch {
    res.status(500).json({error:`faild to update riddle`})
    
  }

}



// delete riddle
export async function deleteRiddle(req,res){
    try {
        const riddles = await readData();
        const index = riddles.findIndex(r => r.id === req.body.id);
        if(index === -1) return res.status(404).json({error:`Riddle not found`});
    
        riddles.splice(index,1);
        await writeData(riddles)
        res.status(204).end();
    } catch {
        res.status(500).json({error: `faild to delete riddle`})
        
    }

}
