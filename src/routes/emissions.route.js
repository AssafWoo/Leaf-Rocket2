const express = require('express');

const router = express.Router();


const mockData = {
    co2:'124212'
}
// define the home page route
router.use('/emissions', (_, res) => {
    res.send(mockData)
});

module.exports = router;