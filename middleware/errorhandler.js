import { fileURLToPath } from "url";
import path from "path";
import fs from "fs"
import express from "express";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const logsDirectory = path.join(__dirname, "../", "logs");
const pathToFile = path.join(logsDirectory, "error.txt")

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
export default function handleError(err, req, res, next) {
    const statusCode = err.status || err.statusCode || 500;

    let log = `${new Date().toLocaleString(`en-US`)} >> ${req.originalUrl} >> ${err.stack || err.message}\n`

    fs.mkdirSync(logsDirectory, { recursive: true });
    fs.appendFileSync(pathToFile, log)
    res.status(statusCode).json({
        error: err.message
    });
}