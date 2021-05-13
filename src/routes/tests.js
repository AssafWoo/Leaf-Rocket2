const router = require('express').Router();

router.get('/dashboard', (req, res) => {
    res.json({savedCash: {amount:'23412'}});
});

module.exports = router;