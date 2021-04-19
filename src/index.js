require('dotenv').config()
const express = require('express');
const httpStatus = require('http-status');
const cors = require('cors');
const myRoutes = require('./routes');
const ApiError = require('./utils/ApiError');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// parse json request body
app.use(express.json());

//enable cors
app.use(cors());
app.options('*', cors());

//routes
const users = [];

const usersInfo = [
    {name: 'Assaf', company:'Leaf corp.'}
];


// app.use('/', myRoutes);
app.get('/signup', (req, res) => {
    res.json(users)
});

app.get('/information', authenticateToken, (req, res) => {
    res.json(usersInfo.filter(info => info.name === req.loggedUser.name));
});



app.post('/signup', async (req, res) => {
    try {   
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = { name:req.body.name, password: hashedPassword };
        users.push(user)
        res.status(201).send()
        
    } catch {
        res.status(500).send('Error')
    }
});


app.post('/login', async (req, res) => {
    const user = users.find(user => user.name === req.body.name);
    if(user == null) return res.status(400).send('User not found') 
    try {
        if(await bcrypt.compare(req.body.password, user.password)){
            const loggedUser = {name: user.name}
            const accessToken = jwt.sign(loggedUser, process.env.ACCESS_TOKEN_SECRET);
            res.json({accessToken: accessToken})
        } else {
            res.send('Not allowed')
        }
    } catch {
        res.status(500).send('Error')
    }
});

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, loggedUser) => {
        if(err) return res.status(403)
        req.loggedUser = loggedUser
        next();
    })
}


//send back 404 for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not Found'))
})

app.listen(8000, () => {
    console.log('Server running on port 8000...')
})
