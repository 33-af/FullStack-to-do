const express = require('express');
const router = express.Router();
const { all, add,  edit, remove, currenttodo } = require('../controllers/todo')
const { auth } = require('../middleware/auth');

router.get('/', auth, all);
router.get('/:id', auth, currenttodo )
router.post('/add', auth, add);
router.post('/remove/:id', auth, remove);
router.put('/edit/:id', auth, edit)

module.exports = router;