const express = require('express');

const router = express.Router();


const mockData = {
    name:'Leaf',
    country_name:'Israel',
    emissions:{
        co2:'1231'
    },
    city:'Tel-aviv',
    state:'N/A',
    street:'Bakers Street',
    company_input:{kwh:'150'},
    number_of_workers:100
}
// define the home page route
router.use('/', (_, res) => {
    res.send(mockData)
});

module.exports = router;