const express = require('express');
const dashboardRoute = require('./dashboard.route');
const settingRoute = require('./settings.route');
const emissionsRoute = require('./emissions.route');

const router = express.Router();

const defaultRoutes = [
    {
        path:'/',
        route: dashboardRoute,
    },
    {
        path:'/settings',
        route: settingRoute,
    },
    {
        path:'/emissions',
        route: emissionsRoute,
    },
]

defaultRoutes.forEach((route) => {
    router.get(route.path, route.route);
});


module.exports = router;