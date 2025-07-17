import fs from 'fs/promises';

const PATH = "./lib/players.txt";


export async function readPlayers() {
    const raw = await fs.readFile(PATH,"utf-8")
    return JSON.parse(raw);
}


export async function writePlayers(data){
    const str = JSON.stringify(data,null,2)
    await fs.writeFile(PATH,str,"utf-8")

}