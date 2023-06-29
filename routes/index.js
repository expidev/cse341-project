const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send(
        req.session.user !== undefined ?
        `Logged in as ${req.session.user.firstName}`
        : "Logged Out"
    )
})
router.use('/', require('./swagger'))
router.use('/users', require('./users'))
router.use('/drugstores', require('./drugstore'))
router.use('/auth', require('./authentication'))

module.exports = router;