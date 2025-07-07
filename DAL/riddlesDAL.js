import fs from "fs/promises";

export async function readData(path) {
    const raw = await fs.readFile(path, "utf-8");
    return JSON.parse(raw);
}

export async function writeData(path, data) {
    const str = JSON.stringify(data, null, 2);
    await fs.writeFile(path, str, "utf-8");
}
