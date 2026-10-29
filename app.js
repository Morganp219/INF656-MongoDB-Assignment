import express from 'express'
import 'dotenv/config'
import LogRequest from './middleware/requestlogger.js'
import { router } from './routes/itemroutes.js'
import handleError from './middleware/errorhandler.js'
import isMongoRunning from './middleware/mongoload.js'


const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(isMongoRunning)
app.use(LogRequest)
app.use("/", express.static('public'))
// Fix VSCode Postman Caching Issue
app.use((req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
});


app.use("/api/items", router)

app.use((req, res)=> {
    res.status(404).json({
        error: "Unknown route."
    })
})

app.use(handleError)

app.listen(PORT, () => {
    console.log(`Server is Listening on ${PORT}`)
})
