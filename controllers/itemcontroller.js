import express from "express"
import mongoose from "mongoose"
import Item from "../schema/Item.js"


export async function getAllItems() {
    const items = await Item.find({})
    return {
        success: true,
        count: items.length,
        data: items
    }
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function getItem(req, res) {
    const {id} = req.params

    if(!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ success: false, error: "Invalid item id" })
    }
    const item = await Item.findById(id)
    if(item == null) {
        return res.status(404).json({ success: false, error: "No item found from id given" })
    }
    res.send(item)
}

export async function createItem(name, category, price) {
    const item = new Item({ name, category, price })
    return await item.save()
}

export async function updateItem(id, name, category, price) {
    if(!mongoose.isValidObjectId(id)) {
        return false
    }
    let itemUpdated = await Item.findByIdAndUpdate({_id: id}, {name: name, category: category, price: price}, {new: true})

    return itemUpdated;
}

export async function deleteItem(id) {
    if(!mongoose.isValidObjectId(id)) {
        return false
    }
    return await Item.findByIdAndDelete(id)
}
