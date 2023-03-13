const express = require('express');
const jwt = require('jsonwebtoken');

const {transporter} = require('./controller/sendMail');

const app = express();

const secretkey= "secretkey";

app.get("/" , (req, res) => {
    res.send("Hello World");
});



app.post("/login", (req, res) => {
    const user = req.body;
    jwt.sign({user}, secretkey , { expiresIn: '30s' }, (err, token) => {
        res.json({
            token
        });
    });
    const mailOptions = {
        from: "demo00629@gmail.com",
        to: "sameedzahoor.contact@gmail.com, muhammadawais.contact0@gmail.com",
        subject: "Successfully Login",
        text: "Jwt Token Generated for 30 seconds",
    };
    

    transporter.sendMail(mailOptions, (err, info) => {
        if(err){
            console.log(err);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
});


app.post("/posts", verifyToken, (req, res) => {
    jwt.verify(req.token, secretkey, (err, authData) => {
        if(err){
            res.sendStatus(403);
            const mailOptions = {
                from: "demo00629@gmail.com",
                to: "sameedzahoor.contact@gmail.com, muhammadawais.contact0@gmail.com",
                subject: "Jwt Token Expired",
                text: "Jwt Token Expired",
            };
            
        
            transporter.sendMail(mailOptions, (err, info) => {
                if(err){
                    console.log(err);
                } else {
                    console.log("Email sent: " + info.response);
                }
            });
        } else {
            res.json({
                message: "Post created...",
                authData
            });
            const mailOptions = {
                from: "demo00629@gmail.com",
                to: "sameedzahoor.contact@gmail.com, muhammadawais.contact0@gmail.com",
                subject: "Get SUCCESSFULLY Access to Posts",
                text: "Get SUCCESSFULLY Access to Posts",
            };
            
        
            transporter.sendMail(mailOptions, (err, info) => {
                if(err){
                    console.log(err);
                } else {
                    console.log("Email sent: " + info.response);
                }
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

