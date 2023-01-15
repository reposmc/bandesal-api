const {
    createToken
} = require('../controllers/auth.controller.js')

const {
    Router
} = require('express');

const router = Router();

router.post('/api/bandesal/v1/auth/createToken', createToken);

module.exports = router;