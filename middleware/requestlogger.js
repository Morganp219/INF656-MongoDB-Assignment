import express from "express";
import fs from "fs"
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const logsDirectory = path.join(__dirname, "../", "logs");
let pathToFile = path.join(__dirname, "../", "/logs", "requests.txt")

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
export default function LogRequest(req, res, next) {
    addRequest(req)
    next()
}


function addRequest(req) {
    let log = `${new Date().toLocaleString(`en-US`)} >> ${req.method} >> ${req.url}\n`
    console.log(log);
    if(!fs.existsSync(pathToFile)) {
        fs.mkdirSync(logsDirectory, { recursive: true });
        fs.writeFileSync(pathToFile, log)
        return;
    }
    fs.appendFileSync(pathToFile, log)

}