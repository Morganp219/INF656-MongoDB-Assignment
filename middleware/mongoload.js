import express from "express";
import { mongoconnection } from "../data/dataloader.js";

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export default function isMongoRunning(req, res, next) {
    // readyState: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    if (mongoconnection.connection.readyState !== 1) {
        return res.status(503).json({
            success: false,
            error: "Database is not connected."
        })
    }
    next()
}
