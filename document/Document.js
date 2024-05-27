const {Schema, model } = require("mongoose")

const document = new Schema({
    _id: String,
    data : Object,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = model("Document", document)