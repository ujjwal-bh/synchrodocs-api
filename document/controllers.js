const Document = require("./Document")
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');


const createDocument = async (req, res) => {
    const {id} = req.user;

    const document = await Document.create({ user: id, data: "" });

    res.status(StatusCodes.CREATED).json({
        document
    })
}



const getAllDocuments = async (req, res) => {
    const {id} = req.user;
    const documents = await Document.find({user: id})
    res.status(StatusCodes.OK).json({ documents });
};

const getSingleDocument = async (req, res) => {
    const {documentId} = req.params;

    const document = await Document.findById(documentId);
    if(!document){
        throw new CustomError.NotFoundError(`Document with id ${documentId} not found`)
    }
    res.status(StatusCodes.OK).json({document})
}

const updateDocument = async (req, res) => {
    const {documentId} = req.params;
    const {id} = req.user;
    const {title} = req.body
    

    console.log(documentId, id, title)

    if(!id){
        throw new CustomError.UnauthorizedError("Cannot update title")
    }
    let document = await Document.findOne({_id: documentId, user: id})

    console.log("document", document)
    if(!document){
        throw new CustomError.NotFoundError(`Unable to update document`);
    }
    document = await Document.findByIdAndUpdate({user: id, _id: documentId}, {title})
    res.status(StatusCodes.OK).json({ document });
};
module.exports = {
    createDocument,
    getAllDocuments,
    updateDocument,
     getSingleDocument,
}