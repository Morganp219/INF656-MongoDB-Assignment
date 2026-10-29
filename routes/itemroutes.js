import express from "express"
import validator from "validator"
import { createItem, deleteItem, getAllItems, getItem, updateItem } from "../controllers/itemcontroller.js"
export const router = express.Router()

router.get("/", async (req, res)=> {
    res.send(await getAllItems())
})

router.get("/:id", getItem)

router.post("/", async (req, res) => {
    let {name, price, category} = req.body

    price = Number(price)
    if(validateString(name, 1) || validateString(category, 1) || isNaN(price)) {
        return res.status(400).json({ success: false, error: "Invalid Item Data" })
    }
    const item = await createItem(name, category, price)
    res.status(201).send(item)

})

router.patch("/:id", async (req, res)=> {
    let {name, price, category} = req.body
    const {id} = req.params
    let updatedItem = await updateItem(id, name, category, price)
    if(updatedItem === false) {
        return res.status(400).json({ success: false, error: "Invalid item id" })
    }
    if(updatedItem == null) {
        return res.status(404).json({ success: false, error: "Unable to find item!" })
    }
    res.send(updatedItem)
})

router.delete("/:id", async (req, res)=> {
    const {id} = req.params
    let item = await deleteItem(id)
    if(item === false) {
        return res.status(400).json({ success: false, error: "Invalid item id" })
    }
    if(item == null) {
        return res.status(404).json({ success: false, error: "Unable to find item!" })
    }
    res.status(204).end()
})
/**
 * @description Checks the string to ensure its a string and has ATLEAST 1 character
 * @param {string} str
 * @param {number} minLength
 * @returns {boolean}
 */
function validateString(str, minLength) {
    return typeof str !== "string" || !validator.isLength(str.trim(), {min: minLength})
}
