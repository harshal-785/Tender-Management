const express = require('express');
const router = express.Router();
const tenderController = require('../controllers/tender.controller');

router.get('/', tenderController.getAll);
router.post('/', tenderController.create);

module.exports = router;
