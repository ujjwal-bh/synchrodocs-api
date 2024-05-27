const express = require('express');
const router = express.Router();

const { authenticateUser } = require('../middlewares/authentication');

const {createDocument, getAllDocuments, updateDocument, getSingleDocument} = require("./controllers")
router.route('/')
.post([authenticateUser],createDocument)
.get([authenticateUser], getAllDocuments)


router.route("/:documentId")
.get([authenticateUser], getSingleDocument)
.patch([authenticateUser], updateDocument)

module.exports = router;