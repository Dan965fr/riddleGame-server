import http from "http";
import { readData, writeData } from "./DAL/riddlesDAL.js";
import { parse } from "url";

const PORT = 3007;

const PATH = "./lib/riddles.txt";

const server = http.createServer(async (req, res) => {
    const { pathname } = parse(req.url, true);


    let body = "";
    req.on("data",chunk => body += chunk);
    req.on("end",async () =>{
        try{
            const data = body ? JSON.parse(body) : null;
            const riddles = await readData(PATH)


            //GET ALL RIDDLES
            if(req.method === "GET" && pathname === "/riddles"){
                res.writeHead(200,{"Content-Type":"application/json"});
                res.end(JSON.stringify(riddles))
            }


            // POST
            else if(req.method === "POST" && pathname === "/riddles/addRiddle"){
                const maxId = riddles.reduce((max,r)=> Math.max(max,r.id),0);
                const newRiddle = {id: maxId + 1, ...data};
                riddles.push(newRiddle);
                await writeData(PATH,riddles);
                res.writeHead(201,{"Content-Type":"application/json"});
                res.end(JSON.stringify(newRiddle))
            }


            // PUT
            else if(req.method === "PUT" && pathname === "/riddles/updateRiddle"){
                const index = riddles.findIndex(r => r.id === data.id)
                if(index === -1){
                    res.writeHead(404);
                    res.end(JSON.stringify({error:"riddle not found"}));
                    return;
                }

                riddles[index] = {...riddles[index],...data};
                await writeData(PATH,riddles);
                res.writeHead(200,{"Content-Type":"application/json"});
                res.end(JSON.stringify(riddles[index]));
            }



            // delete
            else if(req.method === "DELETE" && pathname === "/riddles/deleteRiddle"){
                const index = riddles.findIndex(r => r.id === data.id);

                if(index === -1){
                    res.writeHead(404);
                    res.end(JSON.stringify({error:"riddle not found"}));
                    return;
                }
                riddles.splice(index,1);
                await writeData(PATH,riddles);
                res.writeHead(204);
                res.end();

            }
            else{
                res.writeHead(404);
                res.end(JSON.stringify({error:"route not found"}))
            }
        }catch{
            res.writeHead(400);
            res.end(JSON.stringify({error:"invalid request or data"}))
        }
    });

    
    

   });

    


server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
