import mongoose from "mongoose"

export const mongoconnection = await mongoose.connect(process.env.mongouri)
