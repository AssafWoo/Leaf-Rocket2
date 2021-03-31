const express = require('express');

const router = express.Router();

const mockData = {
    name:'Leaf',
    countries:['Israel', 'Usa'],
    sectors:['Saas','Enviorment'],
    city:'Tel-aviv',
    state:'N/A',
    street:'Bakers Street',
    number_of_workers:100
}
// define the home page route
router.use('/settings', (_, res) => {
    res.send(mockData)
});

module.exports = router;