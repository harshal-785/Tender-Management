const express = require('express');
const router = express.Router();
const masterController = require('../controllers/master.controller');

router.get('/:type', masterController.getAll);
router.post('/:type', masterController.create);
router.put('/:type/:id', masterController.update);
router.delete('/:type/:id', masterController.remove);

module.exports = router;