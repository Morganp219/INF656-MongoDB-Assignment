import { model, Schema } from "mongoose";
const itemSchema = new Schema({
    name: String,
    category: String,
    price: Number
})

const Item = model('Item', itemSchema)

export default Item