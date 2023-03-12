const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

const secretkey= "secretkey";

app.get("/" , (req, res) => {
    res.send("Hello World");
});



app.post("/login", (req, res) => {
    // Mock user
    const user = {
        id: 1,
        username: "brad",
        email: "awais@gmail.com"
    }
    jwt.sign({user}, secretkey , { expiresIn: '30s' }, (err, token) => {
        res.json({
            token
        });
    });
});


app.post("/posts", verifyToken, (req, res) => {
    jwt.verify(req.token, secretkey, (err, authData) => {
        if(err){
            res.sendStatus(403);
        } else {
            res.json({
                message: "Post created...",
                authData
            });
        }
    });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}



app.listen(3000, () => {
    console.log("Server started on port 3000");
});

