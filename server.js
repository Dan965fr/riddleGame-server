import http from "http";
import { readData, writeData } from "./riddlesDAL.js";
import { parse } from "url";

const PORT = 3007;

const server = http.createServer(async (req, res) => {
    const { pathname } = parse(req.url, true);

    //GET ALL RIDDLES 
    if (req.method === "GET" && pathname === "/riddles") {
        try {
            const riddles = await readData("riddles.txt");
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(riddles));
        } catch {
            res.writeHead(500);
            res.end(JSON.stringify({ error: "Failed to load riddles" }));
        }
    }

    
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
