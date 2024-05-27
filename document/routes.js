const express = require('express');
const router = express.Router();

const { authenticateUser } = require('../middlewares/authentication');

const {createDocument, getAllDocuments} = require("./controllers")
router.route('/')
.post([authenticateUser],createDocument)
.get([authenticateUser], getAllDocuments)

module.exports = router;