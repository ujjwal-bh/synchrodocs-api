const Document = require("./Document")
const { StatusCodes } = require('http-status-codes');

const createDocument = async (req, res) => {
    const {userId} = req.user()

    const document = await Document.create({ user: userId, data: "" });

    res.status(StatusCodes.CREATED).json({
        document: {
            id: document._id,
        }
    })
}



const getAllDocuments = async (req, res) => {
    const {userId} = req.user();
    const documents = await User.find({user: userId})
    res.status(StatusCodes.OK).json({ documents });
};

module.exports = {
    createDocument,
    getAllDocuments
}