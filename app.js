import express from'express';
import jwt from'jsonwebtoken';

const app = express();

app.get('/api',(req, res)=>{
    res.json({
        message:'welcome on the API'
    });
});

app.post('/api/posts',verifyToken,(req, res)=>{
    jwt.verify(req.token, 'secretkey',(err, authData)=>{
        if(err){
            res.sendStatus(403);
        }else{

            res.json({
                message: 'Post create...',
                authData
            });
        }
    })
});

app.post('/api/login',(req, res)=>{
    const user ={
        id:1,
        username:'Epa',
        email:'epa@gmail.com'
    }

    jwt.sign({user}, 'secretkey',(err, token)=>{
        res.json({
            token
        });
    });
});

function verifyToken(req, res, next){
    const beareHeader = req.headers['authorization']; 
     
    if( typeof beareHeader !=='undefined'){
       const bearer = beareHeader.split(' ');
       const bearerToken = bearer[1];
       req.token = bearerToken;
       next();
    }else{
        res.sendStatus(403);
    }
}

app.listen(3000,(req, res)=>{
    console.log("Server started on port 3000"); 
})