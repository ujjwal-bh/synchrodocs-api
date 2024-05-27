const {Schema, model } = require("mongoose")

const document = new Schema({
    data : Object,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title:{
        type: String,
        required: false,
        default: "Document"
    }
})

module.exports = model("Document", document)